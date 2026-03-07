import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const baseUrl =
    process.env.GHL_BASE_URL ||
    process.env.NEXT_PUBLIC_GHL_BASE_URL ||
    "https://services.leadconnectorhq.com";
  const locationId =
    process.env.GHL_LOCATION_ID || process.env.NEXT_PUBLIC_GHL_LOCATION_ID;
  const apiKey = process.env.GHL_API_KEY || process.env.NEXT_PUBLIC_GHL_API_KEY;

  if (!locationId || !apiKey) {
    return NextResponse.json(
      { error: "Missing GHL credentials" },
      { status: 500 }
    );
  }

  try {
    const payload = { locationId, ...body };
    if (!Array.isArray(payload.customFields)) {
      delete (payload as Record<string, unknown>).customFields;
    }

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
      return NextResponse.json(
        { error: "GHL request failed", details: errorText },
        { status: 502 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "GHL request error", details: String(error) },
      { status: 500 }
    );
  }
}
