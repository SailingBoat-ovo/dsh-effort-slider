// Build a standalone preview page (no DSH runtime) from the real plugin CSS and
// markup shapes. `preview.png` in the repo is a headless-browser screenshot of
// the page this writes:
//
//   node tests/build-preview.mjs lib/client.js .preview
//   <chrome/edge> --headless=new --hide-scrollbars --force-device-scale-factor=2 \
//       --window-size=1180,760 --screenshot=preview.png file:///$PWD/.preview/preview.html
//
// Colours come from the plugin's own PALETTE, so the screenshot cannot drift
// from what ships; class names are read from the component's `C` map for the
// same reason.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const clientPath = process.argv[2] ?? join(here, "..", "lib", "client.js");
const outDir = process.argv[3] ?? join(here, "..", ".preview");
mkdirSync(outDir, { recursive: true });

const src = readFileSync(clientPath, "utf8");
const css = JSON.parse(src.match(/const css = ("(?:[^"\\]|\\.)*");/)[1]);

// Shipped class names, read straight from the component's C map so the preview
// cannot drift from the plugin.
const cMap = {};
for (const m of src.matchAll(/^\t\t\t(\w+): "([\w]+)",?$/gm)) cMap[m[1]] = m[2];

const dark = {
  bg: "#1b1c1f",
  panel: "#232428",
  menu: "#26272b",
  text: "#e8e9ec",
  label2: "#b9bcc4",
  label3: "#8b8f99",
  caption: "#71757f",
  borderInv: "rgba(255,255,255,.08)",
  borderL1: "rgba(255,255,255,.10)",
  hover: "rgba(255,255,255,.06)",
  module: "rgba(255,255,255,.06)",
  business: "#4d93f8",
  shadow: "0 12px 32px rgba(0,0,0,.45)",
  scrollbar: "rgba(255,255,255,.14)",
  scrollbarHover: "rgba(255,255,255,.22)",
};

const tokens = `
  --dsw-alias-label-primary: ${dark.text};
  --dsw-alias-label-secondary: ${dark.label2};
  --dsw-alias-label-tertiary: ${dark.label3};
  --dsw-alias-label-caption: ${dark.caption};
  --dsw-alias-label-dimmed: #5a5e66;
  --dsw-alias-border-inverted: ${dark.borderInv};
  --dsw-alias-border-l1: ${dark.borderL1};
  --dsw-alias-border-l3: rgba(255,255,255,.28);
  --dsw-specific-menu: ${dark.menu};
  --dsw-alias-interactive-bg-hover: ${dark.hover};
  --dsw-alias-bg-module-platform: ${dark.module};
  --dsw-alias-state-business-primary: ${dark.business};
  --dsw-alias-state-error-primary: #ff6b6b;
  --dsw-alias-state-warn-label: #f0b429;
  --dsw-alias-scrollbar-bg-l2: ${dark.scrollbar};
  --dsw-alias-scrollbar-hover-l2: ${dark.scrollbarHover};
  --dsw-shadow-lv3: ${dark.shadow};
  --dsh-scrollbar-thumb: ${dark.scrollbar};
  --dsh-scrollbar-thumb-hover: ${dark.scrollbarHover};
`;

const C = (name) => cMap[name];

// --- colour ramp, mirrored from the plugin so the preview shows the real ramp.
const PALETTE = { blue: [77, 147, 248], violet: [147, 51, 234], top: [192, 132, 252] };
const ENERGY_START = 1 / 3;
const ENERGY_END = 2 / 3;
const clamp01 = (v) => Math.min(1, Math.max(0, v));
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
const rgb = (c) => `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
const accentAt = (ratio) => {
  const t = clamp01(ratio);
  if (t <= ENERGY_START) return rgb(PALETTE.blue);
  if (t <= ENERGY_END) return rgb(mix(PALETTE.blue, PALETTE.violet, (t - ENERGY_START) / (ENERGY_END - ENERGY_START)));
  return rgb(mix(PALETTE.violet, PALETTE.top, (t - ENERGY_END) / (1 - ENERGY_END)));
};
const labelColorAt = (ratio) => rgb(mix(PALETTE.blue, [139, 92, 246], clamp01((ratio - ENERGY_START) / (1 - ENERGY_START))));
const fillPaint = (ratio) =>
  "linear-gradient(100deg, transparent 18%, rgba(255,255,255,.30) 38%, transparent 62%), " +
  `linear-gradient(90deg, ${rgb(PALETTE.blue)} 0%, ${accentAt(ratio)} 100%)`;

const LEVELS = ["Low", "Medium", "High", "Max"];
const ALIASES = ["low", "medium", "high", "max"];
const PAD = 12;

const posLeft = (r) => `calc(${PAD}px + (100% - ${PAD * 2}px) * ${r})`;
const fillWidth = (r) => `calc((100% - ${PAD * 2}px) * ${r})`;

function slider(ratio, activeIndex) {
  const steps = LEVELS.length - 1;
  const ticks = LEVELS.map((_, i) => {
    const pct = i / steps;
    return `<span class="${C("tick")}" style="left:${posLeft(pct)};background:${i <= activeIndex ? "rgba(255,255,255,.85)" : "rgba(255,255,255,.35)"}"></span>`;
  }).join("");
  const labels = LEVELS.map((label, i) => {
    const pct = i / steps;
    const edge = i === 0 ? "first" : i === LEVELS.length - 1 ? "last" : "";
    const active = i === activeIndex;
    return `<span class="${C("label")}${active ? " " + C("labelActive") : ""}" style="left:${posLeft(pct)};${active ? `color:${labelColorAt(pct)}` : ""}"${edge ? ` data-edge="${edge}"` : ""}>${label}</span>`;
  }).join("");
  return `<div class="${C("sliderWrap")}">
    <div class="${C("slider")}" role="slider" tabindex="0" aria-valuemin="0" aria-valuemax="${steps}" aria-valuenow="${activeIndex}">
      <div class="${C("track")}">
        <div class="${C("trackLine")}"></div>
        <div class="${C("fill")}" style="width:${fillWidth(ratio)};background-image:${fillPaint(ratio)}"></div>
        <div class="${C("thumb")}" style="left:${posLeft(ratio)};box-shadow:0 2px 8px rgba(0,0,0,.35), 0 0 0 2px ${accentAt(ratio)}"></div>
        ${ticks}
      </div>
      <div class="${C("labels")}">${labels}</div>
    </div>
  </div>`;
}

function effortPane(ratio, activeIndex, model, provider, levelLabel, description) {
  return `<div class="${C("effortPane")}">
    <div class="${C("modelRow")}">
      <span class="${C("modelPill")}" title="${provider} / ${model}">
        <span class="${C("modelDot")}"></span>
        <span class="${C("modelPillName")}">${model}</span>
      </span>
      <span class="${C("modelNote")}">${provider}</span>
    </div>
    <div class="${C("effortHeader")}">
      <span class="${C("effortCaption")}">思考强度</span>
      <span class="${C("effortValue")}" style="color:${labelColorAt(ratio)}">${levelLabel}</span>
    </div>
    ${slider(ratio, activeIndex)}
    <div class="${C("effortDescription")}">${description}</div>
    <div class="${C("effortBusy")}"></div>
  </div>`;
}

const chevronDown = `<svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true" class="${C("chevron")} ${C("chevronOpen")}"><path d="M3 5l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const chevronRight = `<svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true" class="${C("cellChevron")}"><path d="M5 3l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const check = `<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 5.2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

function trigger(model, effort) {
  return `<button type="button" class="${C("trigger")}">
    <span class="${C("triggerLabel")}">${model}</span>
    <span class="${C("triggerEffort")}">${effort}</span>
    ${chevronDown}
  </button>`;
}

function rootPane(model, effort) {
  return `<div class="${C("menu")}" role="menu">
    <button type="button" role="menuitem" class="${C("cell")}">
      <span class="${C("cellLabel")}">模型</span>
      <span class="${C("cellValue")}">${model}</span>
      ${chevronRight}
    </button>
    <button type="button" role="menuitem" class="${C("cell")}">
      <span class="${C("cellLabel")}">思考强度</span>
      <span class="${C("cellValue")}">${effort}</span>
      ${chevronRight}
    </button>
  </div>`;
}

function modelPane(current) {
  const groups = [
    { name: "DeepSeek", models: [["DeepSeek V4", "旗舰推理模型"], ["DeepSeek Chat", "通用对话"]] },
    { name: "OpenRouter", models: [["Claude Sonnet", "Anthropic"]] },
  ];
  return `<div class="${C("menu")}" role="menu">
    <div class="${C("groups")} scrollable">
      ${groups.map((g) => `<section role="group" class="${C("group")}">
        <div class="${C("groupTitle")}">${g.name}</div>
        ${g.models.map(([name, desc]) => {
          const selected = name === current;
          return `<button type="button" role="menuitemradio" aria-checked="${selected}" class="${C("option")}${selected ? " " + C("selected") : ""}">
            <span class="${C("optionCopy")}">
              <span class="${C("modelName")}">${name}</span>
              <span class="${C("description")}">${desc}</span>
            </span>
            <span class="${C("check")}">${selected ? check : ""}</span>
          </button>`;
        }).join("")}
      </section>`).join("")}
    </div>
  </div>`;
}

const model = "DeepSeek V4";
const provider = "DeepSeek";
const effort = "High";

const html = `<!doctype html>
<html lang="zh"><head><meta charset="utf-8">
<style>
  html, body { margin: 0; }
  body {
    background: radial-gradient(120% 120% at 50% 0%, #26282d 0%, #17181b 60%);
    font-family: "Segoe UI", "Microsoft YaHei UI", system-ui, sans-serif;
    color: #e8e9ec;
    padding: 40px 44px 34px;
  }
  .stage { display: flex; gap: 20px; align-items: flex-start; flex-wrap: wrap; }
  .col { display: flex; flex-direction: column; gap: 14px; }
  .caption { color: #8b8f99; font-size: 12px; letter-spacing: .02em; margin: 0 0 2px 2px; }
  .composer {
    background: #202126; border: 1px solid rgba(255,255,255,.07); border-radius: 16px;
    padding: 10px 12px; display: flex; align-items: center; gap: 10px; min-width: 340px;
  }
  .composer .placeholder { color: #71757f; font-size: 13px; flex: 1; }
  .frame { position: relative; width: 248px; }
  .frame .${C("menu")} { position: static; width: 240px; }
  .frame .${C("effortPane")} { width: 240px; box-sizing: border-box; }
  .backdrop {
    position: absolute; inset: -1px; border-radius: 12px;
    box-shadow: 0 18px 44px rgba(0,0,0,.5);
  }
  .ramp { display: flex; gap: 6px; align-items: center; margin-top: 6px; }
  .ramp span { font-size: 11px; color: #8b8f99; }
  ${tokens}
  ${css}
  .esl_menu { position: static; }
</style></head>
<body>
  <div style="display:flex;align-items:flex-end;gap:14px;margin:0 0 22px 2px">
    <div>
      <div style="font-size:19px;font-weight:650;letter-spacing:.01em">dsh-effort-slider</div>
      <div style="color:#8b8f99;font-size:12.5px;margin-top:3px">Codex 风格思考强度滑条 · 始终显示当前模型</div>
    </div>
    <div class="ramp" style="margin:0 0 3px auto">
      <span>low</span>
      <span style="width:132px;height:8px;border-radius:999px;background:linear-gradient(90deg,${rgb(PALETTE.blue)} 0%,${rgb(PALETTE.violet)} 60%,${rgb(PALETTE.top)} 100%)"></span>
      <span>max</span>
    </div>
  </div>

  <div class="stage">
    <div class="col">
      <p class="caption">触发按钮 · trigger</p>
      <div class="composer">
        ${trigger(model, effort)}
        <span class="placeholder">问点什么…</span>
      </div>
    </div>
  </div>

  <div class="stage" style="margin-top:24px">
    <div class="col">
      <p class="caption">菜单首页 · menu root</p>
      <div class="frame">${rootPane(model, effort)}</div>
    </div>
    <div class="col">
      <p class="caption">强度面板 · High</p>
      <div class="frame">${effortPane(2 / 3, 2, model, provider, "High", "更长的思考，适合复杂推理与多步任务。")}</div>
    </div>
    <div class="col">
      <p class="caption">低档 · Low</p>
      <div class="frame">${effortPane(0, 0, model, provider, "Low", "最快，适合简单问题。")}</div>
    </div>
    <div class="col">
      <p class="caption">最高档 · Max</p>
      <div class="frame">${effortPane(1, 3, model, provider, "Max", "最深的推理预算。")}</div>
    </div>
  </div>

  <div class="stage" style="margin-top:24px">
    <div class="col">
      <p class="caption">模型列表 · model list</p>
      <div class="frame">${modelPane(model)}</div>
    </div>
    <div class="col">
      <p class="caption">切换模型后 · after switching</p>
      <div class="frame">${effortPane(1 / 3, 1, "Claude Sonnet", "OpenRouter", "Medium", "平衡速度与质量。")}</div>
    </div>
  </div>
</body></html>`;

writeFileSync(join(outDir, "preview.html"), html, "utf8");
console.log("wrote", join(outDir, "preview.html"));
