// Measure the preview page geometry so the screenshot can be cropped exactly and
// so layout problems (overflow, ragged widths) are caught without a human looking.
//
//   node tests/measure-preview.mjs [previewDir] [width] [height]
//
// Set EDGE_PATH to use a browser other than the default Edge install.
import { execFileSync } from "node:child_process";
import { writeFileSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const EDGE = process.env.EDGE_PATH ?? "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const here = dirname(fileURLToPath(import.meta.url));
const dir = process.argv[2] ?? join(here, "..", ".preview");
const width = Number(process.argv[3] ?? 1180);
const height = Number(process.argv[4] ?? 1200);

const html = readFileSync(join(dir, "preview.html"), "utf8");
const probe = `<script>
const sel = [".esl_trigger", ".esl_menu", ".esl_effortPane", ".esl_modelRow", ".esl_modelPill", ".esl_slider", ".esl_labels", ".stage", ".col", ".esl_groups", ".esl_option"];
const report = { doc: [document.documentElement.scrollWidth, document.documentElement.scrollHeight], nodes: [] };
for (const s of sel) {
  document.querySelectorAll(s).forEach((el, i) => {
    const r = el.getBoundingClientRect();
    report.nodes.push({ s: s + "[" + i + "]", x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), sh: el.scrollHeight, ch: el.clientHeight });
  });
}
document.title = "M:" + JSON.stringify(report);
</script></body>`;
writeFileSync(join(dir, "measure.html"), html.replace("</body>", probe), "utf8");

const dom = execFileSync(EDGE, [
  "--headless=new", "--disable-gpu", `--window-size=${width},${height}`,
  "--virtual-time-budget=2500", "--dump-dom", "file:///" + join(dir, "measure.html").replace(/\\/g, "/"),
], { encoding: "utf8", maxBuffer: 1 << 26, stdio: ["ignore", "pipe", "ignore"] });

const m = dom.match(/<title>M:(.*?)<\/title>/s);
if (m === null) {
  console.error("probe title not found");
  process.exit(1);
}
const report = JSON.parse(m[1].replace(/&quot;/g, '"').replace(/&amp;/g, "&"));
console.log("doc:", report.doc.join(" x "));
for (const n of report.nodes) {
  console.log(`${n.s.padEnd(20)} x=${String(n.x).padStart(4)} y=${String(n.y).padStart(4)} w=${String(n.w).padStart(4)} h=${String(n.h).padStart(3)}  scrollH=${n.sh}`);
}
const contentBottom = Math.max(...report.nodes.map((n) => n.y + n.h));
console.log("content bottom:", contentBottom);

// A fixed-width mock column must stay fixed: unequal pane widths mean the text
// inside is stretching the box, and the screenshot comes out ragged.
const paneWidths = new Set(report.nodes.filter((n) => n.s.startsWith(".esl_effortPane")).map((n) => n.w));
const overflowing = report.nodes.filter((n) => n.s.startsWith(".esl_modelRow") && n.sh > n.ch);
if (paneWidths.size > 1) {
  console.error("FAIL  effort panes have different widths:", [...paneWidths].join(", "));
  process.exit(1);
}
if (overflowing.length > 0) {
  console.error("FAIL  model rows overflow:", overflowing.map((n) => n.s).join(", "));
  process.exit(1);
}
console.log("layout ok: panes uniform, no overflow");
