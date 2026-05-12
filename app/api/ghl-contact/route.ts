import { NextResponse } from "next/server";
import {
  buildCustomFieldsPayload,
  type FormDataEntries,
  type FormKind,
} from "@/lib/ghlFields";
import fieldIdsJson from "@/lib/ghlFieldIds.json";

const FIELD_IDS = fieldIdsJson as Record<FormKind, Record<string, string>>;

interface IncomingBody {
  formKind?: FormKind;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  source?: string;
  tags?: string[];
  entries?: FormDataEntries;
}

export async function POST(request: Request) {
  let body: IncomingBody;
  try {
    body = (await request.json()) as IncomingBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const baseUrl = process.env.GHL_BASE_URL || "https://services.leadconnectorhq.com";
  const locationId =
    process.env.GHL_LOCATION_ID || process.env.NEXT_PUBLIC_GHL_LOCATION_ID;
  const apiKey = process.env.GHL_API_KEY || process.env.NEXT_PUBLIC_GHL_API_KEY;

  if (!locationId || !apiKey) {
    console.error("[ghl-contact] Missing GHL credentials — set GHL_LOCATION_ID and GHL_API_KEY (server-side only).");
    return NextResponse.json(
      { error: "Missing GHL credentials" },
      { status: 500 }
    );
  }

  const formKind: FormKind = body.formKind === "client" ? "client" : "investor";
  const entries: FormDataEntries = body.entries ?? {};
  const idMap = FIELD_IDS[formKind] ?? {};

  const { customFields, missingFieldIds } = buildCustomFieldsPayload(
    formKind,
    entries,
    idMap
  );

  if (missingFieldIds.length) {
    console.warn(
      `[ghl-contact] No GHL custom field IDs configured for ${formKind} fields:`,
      missingFieldIds.join(", "),
      "— run `npm run sync:ghl` to create/sync them."
    );
  }

  const payload: Record<string, unknown> = {
    locationId,
    firstName: body.firstName ?? "",
    lastName: body.lastName ?? "",
    email: body.email ?? "",
    phone: body.phone ?? "",
    source:
      body.source ??
      (formKind === "client" ? "Client Landing Page" : "Investor Landing Page"),
    tags: Array.isArray(body.tags) ? body.tags : [],
  };

  if (body.companyName) payload.companyName = body.companyName;
  if (customFields.length) payload.customFields = customFields;

  try {
    const response = await fetch(`${baseUrl}/contacts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        Version: "2021-07-28",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[ghl-contact] GHL responded with error:", response.status, errorText);

      const lower = errorText.toLowerCase();
      let reason: "duplicate" | "invalid_email" | "invalid_phone" | "unknown" = "unknown";
      if (
        response.status === 409 ||
        response.status === 422 ||
        lower.includes("duplicate") ||
        lower.includes("already exist") ||
        lower.includes("does not allow duplicate")
      ) {
        reason = "duplicate";
      } else if (lower.includes("email")) {
        reason = "invalid_email";
      } else if (lower.includes("phone")) {
        reason = "invalid_phone";
      }

      return NextResponse.json(
        { error: "GHL request failed", reason, status: response.status },
        { status: 502 }
      );
    }

    const data = await response.json();
    return NextResponse.json({
      ok: true,
      contact: data,
      droppedFields: missingFieldIds,
    });
  } catch (error) {
    console.error("[ghl-contact] Fetch threw:", error);
    return NextResponse.json(
      { error: "GHL request error", details: String(error) },
      { status: 500 }
    );
  }
}
