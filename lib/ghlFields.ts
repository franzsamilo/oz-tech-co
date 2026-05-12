export type GhlDataType =
  | "TEXT"
  | "LARGE_TEXT"
  | "PHONE"
  | "NUMERICAL"
  | "DATE"
  | "SINGLE_OPTIONS"
  | "MULTIPLE_OPTIONS"
  | "CHECKBOX";

export interface GhlFieldDef {
  formName: string;
  ghlName: string;
  dataType: GhlDataType;
  options?: string[];
}

const INVESTOR_FIELDS: GhlFieldDef[] = [
  { formName: "linkedin", ghlName: "Investor — LinkedIn URL", dataType: "TEXT" },
  {
    formName: "accredited",
    ghlName: "Investor — Accredited Status",
    dataType: "SINGLE_OPTIONS",
    options: [
      "Yes - I have annual income of $200K+ OR net worth of $1M+",
      "No - I do not meet accredited investor requirements",
      "Unsure - Please explain requirements",
    ],
  },
  {
    formName: "referralSource",
    ghlName: "Investor — How They Heard",
    dataType: "SINGLE_OPTIONS",
    options: ["Referral", "LinkedIn / Twitter", "Web Summit", "Current Client", "Tech Community", "Other"],
  },
  {
    formName: "range",
    ghlName: "Investor — Investment Range",
    dataType: "SINGLE_OPTIONS",
    options: ["$10,000", "$15,000", "$20,000", "$25,000", "Still exploring / want to learn more"],
  },
  {
    formName: "timing",
    ghlName: "Investor — Investment Timing",
    dataType: "SINGLE_OPTIONS",
    options: ["Within the next 30 days", "30-60 days", "60-90 days", "Just exploring"],
  },
  {
    formName: "consult",
    ghlName: "Investor — Consultation Needs",
    dataType: "SINGLE_OPTIONS",
    options: [
      "No - I make this decision independently",
      "Yes - Partner or spouse",
      "Yes - Investment advisor or attorney",
      "Yes - Investment committee",
    ],
  },
  {
    formName: "interests",
    ghlName: "Investor — Interests",
    dataType: "MULTIPLE_OPTIONS",
    options: [
      "Retainer model",
      "Technology sovereignty",
      "SaaS potential",
      "Team track record",
      "Market opportunity",
      "Values alignment",
      "Personal connection",
    ],
  },
  {
    formName: "experience",
    ghlName: "Investor — Prior Experience",
    dataType: "SINGLE_OPTIONS",
    options: [
      "Yes - Multiple investments",
      "Yes - 1-2 investments",
      "No - This would be my first",
      "No - But I have other investment experience",
    ],
  },
  { formName: "valueAdd", ghlName: "Investor — Value Add", dataType: "LARGE_TEXT" },
  { formName: "bio", ghlName: "Investor — Background", dataType: "LARGE_TEXT" },
  { formName: "concerns", ghlName: "Investor — Concerns / Questions", dataType: "LARGE_TEXT" },
  {
    formName: "tracking",
    ghlName: "Investor — Page Source",
    dataType: "SINGLE_OPTIONS",
    options: ["Direct email", "Network referral", "LinkedIn post", "Twitter/X post", "Search engine", "Other"],
  },
  {
    formName: "privacyConsent",
    ghlName: "Investor — Privacy Consent",
    dataType: "CHECKBOX",
    options: ["I agree to the Privacy Policy and Terms of Service, and consent to processing of my information for this application."],
  },
  {
    formName: "marketingConsent",
    ghlName: "Investor — Marketing Consent",
    dataType: "CHECKBOX",
    options: ["I agree to receive promotional updates and invitations from Oz Tech."],
  },
  {
    formName: "legal",
    ghlName: "Investor — Legal Acknowledgments",
    dataType: "MULTIPLE_OPTIONS",
    options: [
      "This investment involves significant risk",
      "This is suitable for accredited investors only",
      "There is no guarantee of returns or liquidity",
      "I have read and understand the risks disclosed on this page",
    ],
  },
];

const CLIENT_FIELDS: GhlFieldDef[] = [
  { formName: "website", ghlName: "Client — Website URL", dataType: "TEXT" },
  { formName: "industry", ghlName: "Client — Industry", dataType: "TEXT" },
  {
    formName: "revenue",
    ghlName: "Client — Annual Revenue",
    dataType: "SINGLE_OPTIONS",
    options: ["$0–$30K", "$30K–$100K", "$100K–$250K", "$250K–$500K", "$500K+"],
  },
  {
    formName: "situation",
    ghlName: "Client — Situation",
    dataType: "SINGLE_OPTIONS",
    options: [
      "Clear product vision, need a team to build it",
      "DIY tools hit a wall, need a professional rebuild",
      "Burned by agencies/freelancers, need a reliable team",
      "Working software but need AI/integrations/features",
      "Other",
    ],
  },
  { formName: "buildDescription", ghlName: "Client — What to Build", dataType: "LARGE_TEXT" },
  { formName: "problemSolved", ghlName: "Client — Problem Solved", dataType: "LARGE_TEXT" },
  {
    formName: "timeline",
    ghlName: "Client — Project Timeline",
    dataType: "SINGLE_OPTIONS",
    options: [
      "Urgent — need this ASAP",
      "Soon — start within 2–3 months",
      "Flexible — move when the time is right",
      "Just researching",
    ],
  },
  {
    formName: "budgetComfort",
    ghlName: "Client — Budget Comfort",
    dataType: "SINGLE_OPTIONS",
    options: [
      "Yes — budget allocated",
      "Yes — reallocating from subscriptions",
      "Maybe — need to see value first",
      "No — outside budget right now",
    ],
  },
  {
    formName: "tenure",
    ghlName: "Client — Planned Tenure",
    dataType: "SINGLE_OPTIONS",
    options: ["1–3 months", "6–12 months", "12+ months", "Not sure — depends on results"],
  },
  {
    formName: "referralSource",
    ghlName: "Client — How They Heard",
    dataType: "SINGLE_OPTIONS",
    options: [
      "Referral",
      "Google search",
      "LinkedIn / Twitter",
      "Web Summit / conference",
      "Case study or article",
      "YouTube / content",
      "Other",
    ],
  },
  {
    formName: "techLevel",
    ghlName: "Client — Technical Level",
    dataType: "SINGLE_OPTIONS",
    options: ["Non-technical", "Slightly technical", "Moderately technical", "Technical"],
  },
  {
    formName: "toolsTried",
    ghlName: "Client — Tools Tried",
    dataType: "MULTIPLE_OPTIONS",
    options: [
      "Zapier",
      "Make (Integromat)",
      "n8n",
      "AI builder tools (Cursor, Replit, Lovable, etc.)",
      "Custom code (in-house or freelancer)",
      "Agency",
      "Nothing yet",
      "Other",
    ],
  },
  { formName: "notes", ghlName: "Client — Notes", dataType: "LARGE_TEXT" },
  {
    formName: "decisionMaker",
    ghlName: "Client — Decision Maker",
    dataType: "SINGLE_OPTIONS",
    options: [
      "Yes — I decide independently",
      "Yes — but I'll consult a partner/advisor",
      "No — someone else decides",
    ],
  },
  {
    formName: "agreement",
    ghlName: "Client — Terms Agreement",
    dataType: "MULTIPLE_OPTIONS",
    options: [
      "This is a monthly retainer starting at $3,500/month for Founding Members",
      "Founding Member rate locks in forever after 5 spots fill",
      "First project launches in 4 weeks or Month 2 is FREE",
      "Month-to-month terms, cancel anytime with 30-day notice",
      "I've read the FAQ and understand how this works",
    ],
  },
];

export type FormKind = "investor" | "client";

export const GHL_FIELDS: Record<FormKind, GhlFieldDef[]> = {
  investor: INVESTOR_FIELDS,
  client: CLIENT_FIELDS,
};

export const ALL_GHL_FIELDS: GhlFieldDef[] = [...INVESTOR_FIELDS, ...CLIENT_FIELDS];

export type FormDataValue = string | string[];
export type FormDataEntries = Record<string, FormDataValue>;

export interface GhlCustomFieldPayload {
  id: string;
  field_value: string | string[];
}

export function buildCustomFieldsPayload(
  formKind: FormKind,
  entries: FormDataEntries,
  fieldIdMap: Record<string, string>
): {
  customFields: GhlCustomFieldPayload[];
  missingFieldIds: string[];
} {
  const defs = GHL_FIELDS[formKind];
  const customFields: GhlCustomFieldPayload[] = [];
  const missingFieldIds: string[] = [];

  for (const def of defs) {
    const raw = entries[def.formName];
    if (raw === undefined || raw === "" || (Array.isArray(raw) && raw.length === 0)) continue;

    const id = fieldIdMap[def.formName];
    if (!id) {
      missingFieldIds.push(def.formName);
      continue;
    }

    let value: string | string[];
    if (def.dataType === "MULTIPLE_OPTIONS" || def.dataType === "CHECKBOX") {
      value = Array.isArray(raw) ? raw : [raw];
    } else {
      value = Array.isArray(raw) ? raw.join(", ") : raw;
    }

    customFields.push({ id, field_value: value });
  }

  return { customFields, missingFieldIds };
}
