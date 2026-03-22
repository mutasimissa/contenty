import { fileExists, readYaml, readText, getLocales, resolve } from "./files.ts";

export type ProjectStage =
  | "empty"
  | "intake-done"
  | "strategy-done"
  | "identity-done"
  | "offers-done"
  | "sitemap-done"
  | "content-done"
  | "launched"
  | "live";

export interface ProjectState {
  stage: ProjectStage;
  businessName: string;
  completedFiles: string[];
  missingFiles: string[];
  hasWebsite: boolean;
  hasBrandIdentity: boolean;
  isBrandingStale: boolean;
  locales: string[];
  defaultLocale: string;
  brandAssets: { present: string[]; missing: string[] };
}

const BUSINESS_FILES = [
  "business/01-business-input.yaml",
  "business/02-brand-strategy.md",
  "business/02b-brand-identity.yaml",
  "business/03-business-model.md",
  "business/04-value-proposition.md",
  "business/05-personas-jobs.md",
  "business/06-sitemap.yaml",
  "business/08-seo-brief.md",
  "business/09-content-deck.md",
  "business/10-launch-checklist.md",
];

const BRAND_ASSET_FILES = [
  "assets/brand/logo.svg",
  "assets/brand/logo-icon.svg",
];

const isPopulated = (path: string): boolean => {
  if (!fileExists(path)) return false;
  try {
    const content = readText(path);
    if (path.endsWith(".yaml") || path.endsWith(".yml")) {
      const data = readYaml<Record<string, unknown>>(path);
      const vals = Object.values(data);
      return vals.some((v) =>
        v !== null && v !== undefined && v !== "" &&
        !(Array.isArray(v) && v.length === 0) &&
        !(typeof v === "object" && !Array.isArray(v) && Object.keys(v as object).length === 0)
      );
    }
    const stripped = content.replace(/^#.*$/gm, "").replace(/<!--.*?-->/gs, "").replace(/^-\s*$/gm, "").trim();
    return stripped.length > 20;
  } catch {
    return false;
  }
};

const detectStage = (completed: string[]): ProjectStage => {
  const has = (f: string) => completed.includes(f);

  if (has("business/09-content-deck.md") && has("business/10-launch-checklist.md")) {
    return "content-done";
  }
  if (has("business/06-sitemap.yaml") && has("business/08-seo-brief.md")) {
    return "sitemap-done";
  }
  if (has("business/03-business-model.md") && has("business/04-value-proposition.md") && has("business/05-personas-jobs.md")) {
    return "offers-done";
  }
  if (has("business/02b-brand-identity.yaml")) {
    return "identity-done";
  }
  if (has("business/02-brand-strategy.md")) {
    return "strategy-done";
  }
  if (has("business/01-business-input.yaml")) {
    return "intake-done";
  }
  return "empty";
};

export const getProjectState = (): ProjectState => {
  const completed: string[] = [];
  const missing: string[] = [];

  for (const f of BUSINESS_FILES) {
    if (isPopulated(f)) {
      completed.push(f);
    } else {
      missing.push(f);
    }
  }

  let businessName = "";
  try {
    const input = readYaml<Record<string, unknown>>("business/01-business-input.yaml");
    businessName = (input.business_name as string) || "";
  } catch { /* empty */ }

  const hasWebsite = fileExists("website/deno.json") || fileExists("website/fresh.config.ts");

  const { defaultLocale, locales } = getLocales();

  const stage = hasWebsite
    ? (detectStage(completed) === "content-done" ? "launched" : detectStage(completed))
    : detectStage(completed);

  const brandPresent: string[] = [];
  const brandMissing: string[] = [];
  for (const f of BRAND_ASSET_FILES) {
    if (fileExists(f)) {
      brandPresent.push(f);
    } else {
      brandMissing.push(f);
    }
  }

  const hasBrandIdentity = isPopulated("business/02b-brand-identity.yaml");

  const isBrandingStale = (() => {
    if (!hasWebsite || !hasBrandIdentity) return false;
    try {
      const brandMtime = Deno.statSync(resolve("business/02b-brand-identity.yaml")).mtime;
      const stylesMtime = Deno.statSync(resolve("website/assets/styles.css")).mtime;
      if (brandMtime && stylesMtime) return brandMtime > stylesMtime;
    } catch { /* file doesn't exist */ }
    return false;
  })();

  return {
    stage,
    businessName,
    completedFiles: completed,
    missingFiles: missing,
    hasWebsite,
    hasBrandIdentity,
    isBrandingStale,
    locales,
    defaultLocale,
    brandAssets: { present: brandPresent, missing: brandMissing },
  };
};

export const STAGE_LABELS: Record<ProjectStage, string> = {
  "empty": "Not started",
  "intake-done": "Intake complete — needs brand strategy",
  "strategy-done": "Brand strategy done — needs brand identity",
  "identity-done": "Brand identity done — needs offer design",
  "offers-done": "Offers done — needs sitemap & IA",
  "sitemap-done": "Sitemap done — needs content",
  "content-done": "Content complete — ready to build",
  "launched": "Website bootstrapped",
  "live": "Live",
};
