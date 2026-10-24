/**
 * Render-level checks for the composer seat: mount the component with a fake
 * model directory, open the menu, and walk the rendered tree to prove the
 * model name really reaches the trigger, the menu root row, and the effort
 * pane's model pill.
 *
 * Unlike compat-021.mjs (which only asserts markup/strings), this drives the
 * React tree the way a user does — click the trigger, click the Effort cell —
 * so a regression in the pane structure fails here rather than in the UI.
 */
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const clientPath = join(here, "..", "lib", "client.js");
const require = createRequire(import.meta.url);
const react = require("react");
const jsx = require("react/jsx-runtime");
const { act, create } = require("react-test-renderer");

const doc = {
  querySelector: () => null,
  createElement: () => ({ dataset: {}, set textContent(v) {}, appendChild() {} }),
  head: { appendChild: () => {} },
  addEventListener: () => {},
  removeEventListener: () => {},
};
// The bundle reads bare `document` inside effects, so publish the stub globally.
globalThis.document = doc;
const win = { __ModuleLoader__: null, document: doc };
win.__ModuleLoader__ = { load: (h) => { win.__handoff = h; } };
new Function("window", readFileSync(clientPath, "utf8"))(win);
const mod = win.__handoff.factory((s) => {
  if (s === "react") return react;
  if (s === "react/jsx-runtime") return jsx;
  throw new Error("require " + s);
});

const catalog = {
  current: { provider: "deepseek", model: "deepseek-v4", reasoningEffort: "high" },
  routable: true,
  groups: [{
    id: "deepseek",
    name: "DeepSeek",
    models: [
      {
        id: "deepseek-v4",
        name: "DeepSeek V4",
        description: "Flagship reasoning model",
        reasoning: {
          defaultEffort: "medium",
          efforts: [
            { id: "low", name: "Low", description: "Fast answers" },
            { id: "medium", name: "Medium" },
            { id: "high", name: "High", description: "Think longer" },
          ],
        },
      },
      { id: "deepseek-chat", name: "DeepSeek Chat" },
    ],
  }],
  failures: [],
  status: "ready",
  error: null,
};
const store = { getSnapshot: () => catalog, subscribe: () => () => {} };

let failed = 0;
const check = (label, ok) => {
  if (!ok) failed += 1;
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
};

/** Collect every text run in the tree. */
const texts = (node) => {
  if (node === null || node === undefined) return [];
  if (typeof node === "string") return [node];
  if (Array.isArray(node)) return node.flatMap(texts);
  return texts(node.children);
};
/** Collect every element (non-string) node. */
const elements = (node) => {
  if (node === null || node === undefined || typeof node === "string") return [];
  if (Array.isArray(node)) return node.flatMap(elements);
  return [node, ...elements(node.children)];
};
const classOf = (node) => (node.props && node.props.className) || "";
const byClass = (root, name) => elements(root).filter((n) => classOf(n).split(" ").includes(name));

const selectionCalls = [];
const render = (element) => {
  let renderer;
  act(() => { renderer = create(element); });
  return renderer;
};

const Seat = mod.EffortSliderModelSelect;
const seat = (dir, extra = {}) => react.createElement(Seat, {
  locked: false,
  available: true,
  directory: dir,
  load: () => {},
  select: (sel) => { selectionCalls.push(sel); return Promise.resolve(true); },
  t: (key, vars) => (vars ? key + "|" + Object.values(vars).join("|") : key),
  ...extra,
});

// --- closed trigger ------------------------------------------------------
let r = render(seat(store));
let trigger = byClass(r.root, "esl_trigger")[0];
check("trigger renders", trigger !== undefined);
check("trigger shows the model name", texts(trigger).includes("DeepSeek V4"));
check("trigger shows the effort label", texts(trigger).includes("High"));
check("trigger reads model then effort", (() => {
  const flat = texts(trigger).filter((s) => s === "DeepSeek V4" || s === "High");
  return flat[0] === "DeepSeek V4" && flat[1] === "High";
})());
check("trigger aria names the model and the effort",
  String(trigger.props["aria-label"]).includes("DeepSeek V4") && String(trigger.props["aria-label"]).includes("High"));

// --- open the menu -------------------------------------------------------
act(() => { trigger.props.onClick(); });
check("menu opens", byClass(r.root, "esl_menu").length === 1);

const modelCell = byClass(r.root, "esl_cell").find((n) => texts(n).includes("menu.model"));
check("menu root has a Model row", modelCell !== undefined);
check("Model row's value is the live model name", texts(modelCell).includes("DeepSeek V4"));

const effortCell = byClass(r.root, "esl_cell").find((n) => texts(n).includes("menu.effort"));
check("menu root has an Effort row", effortCell !== undefined);
check("Effort row's value is the live level", texts(effortCell).includes("High"));

// --- effort pane ---------------------------------------------------------
act(() => { effortCell.props.onClick(); });
const pane = byClass(r.root, "esl_effortPane")[0];
check("effort pane opens", pane !== undefined);
const row = byClass(r.root, "esl_modelRow")[0];
const pill = byClass(r.root, "esl_modelPill")[0];
check("effort pane has a model row", row !== undefined);
check("effort pane has a model pill", pill !== undefined);
check("model pill carries the model name", texts(pill).includes("DeepSeek V4"));
check("model row shows the provider name", texts(row).includes("DeepSeek"));
check("model pill has a status dot", byClass(pill, "esl_modelDot").length === 1);
check("model row sits above the effort header", (() => {
  const all = elements(pane);
  return all.indexOf(row) < all.indexOf(byClass(r.root, "esl_effortHeader")[0]);
})());

const slider = byClass(r.root, "esl_slider")[0];
check("effort pane renders the slider", slider !== undefined);
check("slider counts three stops", slider.props["aria-valuemax"] === 2);
check("slider starts on the committed level", slider.props["aria-valuenow"] === 2);

// --- dragging ------------------------------------------------------------
const track = byClass(r.root, "esl_track")[0];
check("track renders", track !== undefined);
check("fill and thumb render",
  byClass(r.root, "esl_fill").length === 1 && byClass(r.root, "esl_thumb").length === 1);

// --- model without reasoning --------------------------------------------
// Snapshots must be referentially stable: useSyncExternalStore re-renders until
// getSnapshot() returns an identical value.
const chatSnapshot = { ...catalog, current: { provider: "deepseek", model: "deepseek-chat" } };
r = render(seat({ getSnapshot: () => chatSnapshot, subscribe: () => () => {} }));
trigger = byClass(r.root, "esl_trigger")[0];
check("non-reasoning model still shows its name", texts(trigger).includes("DeepSeek Chat"));
act(() => { trigger.props.onClick(); });
const cells = byClass(r.root, "esl_cell");
check("non-reasoning model hides the Effort row", cells.every((n) => !texts(n).includes("menu.effort")));

// --- unknown selection ---------------------------------------------------
const emptySnapshot = { ...catalog, current: null };
r = render(seat({ getSnapshot: () => emptySnapshot, subscribe: () => () => {} }));
trigger = byClass(r.root, "esl_trigger")[0];
check("no selection falls back to the placeholder", texts(trigger).includes("trigger.fallback"));

// --- unavailable / locked ------------------------------------------------
r = render(seat(store, { available: false }));
check("unavailable session renders nothing", r.toJSON() === null);

r = render(seat(store, { locked: true }));
check("locked session disables the trigger", byClass(r.root, "esl_trigger")[0].props.disabled === true);

console.log(failed === 0 ? "UI RENDER CHECK PASSED" : `${failed} CHECKS FAILED`);
if (failed > 0) process.exit(1);
