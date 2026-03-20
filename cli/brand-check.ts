import { fileExists } from "./_shared/files.ts";
import { printSection, printSuccess, printError, printInfo } from "./_shared/prompts.ts";

console.log(`
╔══════════════════════════════════════════════════════════╗
║            CONTENTY — Brand Asset Checker                ║
╚══════════════════════════════════════════════════════════╝
`);

printSection("Logo Files", "Checking assets/brand/ for required logo variants.");

console.log("  Expected naming convention:\n");
console.log("  ┌────────────────────────────┬──────────────────────────────────┐");
console.log("  │ File                       │ Purpose                          │");
console.log("  ├────────────────────────────┼──────────────────────────────────┤");
console.log("  │ logo-icon.svg / .png       │ Square icon, favicon source      │");
console.log("  │ logo-horizontal.svg / .png │ Wide horizontal lockup           │");
console.log("  │ logo-vertical.svg / .png   │ Stacked vertical lockup          │");
console.log("  │ logo-color.svg             │ Full-color version (any layout)  │");
console.log("  │ logo-white.svg             │ White-only (dark backgrounds)    │");
console.log("  │ logo-black.svg             │ Black-only (light backgrounds)   │");
console.log("  └────────────────────────────┴──────────────────────────────────┘\n");

const REQUIRED_ASSETS: { file: string; description: string }[] = [
  { file: "assets/brand/logo-icon.svg", description: "Square icon (SVG)" },
  { file: "assets/brand/logo-icon.png", description: "Square icon (PNG)" },
  { file: "assets/brand/logo-horizontal.svg", description: "Horizontal lockup (SVG)" },
  { file: "assets/brand/logo-horizontal.png", description: "Horizontal lockup (PNG)" },
  { file: "assets/brand/logo-vertical.svg", description: "Vertical lockup (SVG)" },
  { file: "assets/brand/logo-vertical.png", description: "Vertical lockup (PNG)" },
  { file: "assets/brand/logo-color.svg", description: "Full-color version" },
  { file: "assets/brand/logo-white.svg", description: "White-only version" },
  { file: "assets/brand/logo-black.svg", description: "Black-only version" },
];

let present = 0;
let missing = 0;

for (const asset of REQUIRED_ASSETS) {
  if (fileExists(asset.file)) {
    console.log(`  ✓ ${asset.file}  — ${asset.description}`);
    present++;
  } else {
    printError(`  Missing: ${asset.file}  — ${asset.description}`);
    missing++;
  }
}

// ── Additional brand files ───────────────────────────────

printSection("Additional Brand Files", "Optional but recommended brand assets.");

const OPTIONAL_ASSETS = [
  { file: "assets/brand/favicon.ico", description: "Favicon (.ico format)" },
  { file: "assets/brand/og-image.png", description: "Open Graph default image (1200x630)" },
  { file: "assets/brand/apple-touch-icon.png", description: "Apple touch icon (180x180)" },
];

for (const asset of OPTIONAL_ASSETS) {
  if (fileExists(asset.file)) {
    console.log(`  ✓ ${asset.file}  — ${asset.description}`);
  } else {
    printInfo(`  Optional: ${asset.file}  — ${asset.description}`);
  }
}

// ── Summary ──────────────────────────────────────────────

console.log(`\n${"═".repeat(60)}`);
console.log(`  Brand Assets: ${present}/${present + missing} required files present`);
console.log(`${"═".repeat(60)}\n`);

if (missing === 0) {
  printSuccess("All required brand assets are present.");
} else {
  printError(
    `${missing} required asset(s) missing.\n` +
    "  Place your logo files in assets/brand/ using the naming convention above.\n" +
    "  SVG is preferred for logos. PNG should be at least 512px wide."
  );
}
