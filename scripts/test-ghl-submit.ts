import { buildCustomFieldsPayload, type FormDataEntries, type FormKind } from "../lib/ghlFields";
import fieldIdsJson from "../lib/ghlFieldIds.json";

const FIELD_IDS = fieldIdsJson as Record<FormKind, Record<string, string>>;

const baseUrl =
  process.env.GHL_BASE_URL ||
  process.env.NEXT_PUBLIC_GHL_BASE_URL ||
  "https://services.leadconnectorhq.com";
const locationId =
  process.env.GHL_LOCATION_ID || process.env.NEXT_PUBLIC_GHL_LOCATION_ID;
const apiKey = process.env.GHL_API_KEY || process.env.NEXT_PUBLIC_GHL_API_KEY;

if (!locationId || !apiKey) {
  console.error("Missing GHL_API_KEY or GHL_LOCATION_ID");
  process.exit(1);
}

const formKind: FormKind = (process.argv[2] as FormKind) === "client" ? "client" : "investor";

const stamp = Date.now();

const clientEntries: FormDataEntries = {
  fullName: "Test ClientFlow",
  email: `test-client-${stamp}@oztech-qa.invalid`,
  phone: "+15555550100",
  company: "QA Test Co",
  website: "https://qa.example",
  industry: "SaaS",
  revenue: "$100K–$250K",
  situation: "Clear product vision, need a team to build it",
  buildDescription: "An AI-powered intake portal that routes leads to the right pod.",
  problemSolved: "Founders waste 6+ hours/week on manual triage.",
  timeline: "Soon — start within 2–3 months",
  budgetComfort: "Yes — budget allocated",
  tenure: "12+ months",
  referralSource: "Referral",
  techLevel: "Moderately technical",
  toolsTried: ["Zapier", "Make (Integromat)", "AI builder tools (Cursor, Replit, Lovable, etc.)"],
  notes: "Submitted via end-to-end test script.",
  decisionMaker: "Yes — I decide independently",
  agreement: [
    "This is a monthly retainer starting at $3,500/month for Founding Members",
    "Founding Member rate locks in forever after 5 spots fill",
    "First project launches in 4 weeks or Month 2 is FREE",
    "Month-to-month terms, cancel anytime with 30-day notice",
    "I've read the FAQ and understand how this works",
  ],
};

const investorEntries: FormDataEntries = {
  fullName: "Test InvestorFlow",
  email: `test-investor-${stamp}@oztech-qa.invalid`,
  phone: "+15555550101",
  linkedin: "https://linkedin.com/in/qa-test",
  accredited: "Yes - I have annual income of $200K+ OR net worth of $1M+",
  referralSource: "Referral",
  range: "$25,000",
  timing: "Within the next 30 days",
  consult: "No - I make this decision independently",
  interests: ["Retainer model", "Technology sovereignty", "Team track record"],
  experience: "Yes - Multiple investments",
  valueAdd: "Network in fintech + open-source distribution channels.",
  bio: "20+ years operating B2B SaaS companies, two exits.",
  concerns: "Curious about the SAFE cap and the path to Series A.",
  tracking: "Direct email",
  privacyConsent: ["I agree to the Privacy Policy and Terms of Service, and consent to processing of my information for this application."],
  marketingConsent: ["I agree to receive promotional updates and invitations from Oz Tech."],
  legal: [
    "This investment involves significant risk",
    "This is suitable for accredited investors only",
    "There is no guarantee of returns or liquidity",
    "I have read and understand the risks disclosed on this page",
  ],
};

const entries = formKind === "client" ? clientEntries : investorEntries;
const fullName = entries.fullName as string;
const idMap = FIELD_IDS[formKind] ?? {};
const { customFields, missingFieldIds } = buildCustomFieldsPayload(formKind, entries, idMap);

if (missingFieldIds.length) {
  console.warn(`⚠ Missing GHL IDs for: ${missingFieldIds.join(", ")} — run sync first.`);
}

const payload: Record<string, unknown> = {
  locationId,
  firstName: fullName.split(" ")[0],
  lastName: fullName.split(" ").slice(1).join(" "),
  email: entries.email,
  phone: entries.phone,
  source: formKind === "client" ? "Client Landing Page (TEST)" : "Investor Landing Page (TEST)",
  tags: formKind === "client"
    ? ["OZ Tech Client Intake", "Founding Member Application", "QA Test"]
    : ["OZ Tech Seed Round", "Investor Intake", "QA Test"],
  customFields,
};
if (formKind === "client") payload.companyName = entries.company;

async function main() {
  console.log(`Submitting ${formKind} test contact (${entries.email})…`);
  console.log(`Sending ${customFields.length} custom fields.`);

  const res = await fetch(`${baseUrl}/contacts/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      Version: "2021-07-28",
    },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  console.log(`\nStatus: ${res.status} ${res.statusText}`);
  console.log(`Body: ${text}`);

  if (!res.ok) process.exit(1);
}

main().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
