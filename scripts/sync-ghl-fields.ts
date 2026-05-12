import fs from "node:fs";
import path from "node:path";
import { ALL_GHL_FIELDS, GHL_FIELDS, type FormKind, type GhlFieldDef } from "../lib/ghlFields";

interface GhlExistingField {
  id: string;
  name: string;
  fieldKey?: string;
  dataType: string;
  options?: { id?: string; name?: string; key?: string }[] | string[];
}

const baseUrl =
  process.env.GHL_BASE_URL ||
  process.env.NEXT_PUBLIC_GHL_BASE_URL ||
  "https://services.leadconnectorhq.com";
const locationId =
  process.env.GHL_LOCATION_ID || process.env.NEXT_PUBLIC_GHL_LOCATION_ID;
const apiKey = process.env.GHL_API_KEY || process.env.NEXT_PUBLIC_GHL_API_KEY;

if (!locationId || !apiKey) {
  console.error(
    "Missing env vars. Set GHL_API_KEY and GHL_LOCATION_ID before running this script."
  );
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${apiKey}`,
  Version: "2021-07-28",
  "Content-Type": "application/json",
};

async function listExistingFields(): Promise<GhlExistingField[]> {
  const url = `${baseUrl}/locations/${locationId}/customFields`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to list custom fields: ${res.status} ${text}`);
  }
  const json = (await res.json()) as { customFields?: GhlExistingField[] };
  return json.customFields ?? [];
}

async function createField(def: GhlFieldDef): Promise<string> {
  const url = `${baseUrl}/locations/${locationId}/customFields`;
  const body: Record<string, unknown> = {
    name: def.ghlName,
    dataType: def.dataType,
    model: "contact",
  };
  if (def.options && def.options.length > 0) {
    body.options = def.options;
  }
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to create field "${def.ghlName}": ${res.status} ${text}`);
  }
  const json = (await res.json()) as { customField?: { id: string }; id?: string };
  const id = json.customField?.id ?? json.id;
  if (!id) throw new Error(`No id returned when creating "${def.ghlName}"`);
  return id;
}

function findExistingId(def: GhlFieldDef, existing: GhlExistingField[]): string | undefined {
  const match = existing.find((f) => f.name?.trim().toLowerCase() === def.ghlName.trim().toLowerCase());
  return match?.id;
}

async function main() {
  console.log(`Syncing ${ALL_GHL_FIELDS.length} custom fields to GHL location ${locationId}…`);
  console.log("Fetching existing custom fields…");
  const existing = await listExistingFields();
  console.log(`Found ${existing.length} existing custom fields.`);

  const mapping: Record<FormKind, Record<string, string>> = { investor: {}, client: {} };

  let createdCount = 0;
  let reusedCount = 0;

  for (const formKind of ["investor", "client"] as FormKind[]) {
    for (const def of GHL_FIELDS[formKind]) {
      const existingId = findExistingId(def, existing);
      let id: string;
      if (existingId) {
        id = existingId;
        reusedCount++;
        console.log(`  ✓ Reused "${def.ghlName}" → ${id}`);
      } else {
        try {
          id = await createField(def);
          createdCount++;
          console.log(`  + Created "${def.ghlName}" → ${id}`);
        } catch (err) {
          console.error(`  ✗ Could not create "${def.ghlName}":`, err);
          continue;
        }
      }
      mapping[formKind][def.formName] = id;
    }
  }

  const outPath = path.resolve(process.cwd(), "lib/ghlFieldIds.json");
  fs.writeFileSync(outPath, JSON.stringify(mapping, null, 2) + "\n", "utf8");

  console.log(`\nSync complete: ${reusedCount} reused, ${createdCount} created.`);
  console.log(`Wrote mapping to ${outPath}`);
}

main().catch((err) => {
  console.error("Sync failed:", err);
  process.exit(1);
});
