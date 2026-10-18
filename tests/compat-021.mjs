import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
const require = createRequire(new URL("../package.json", import.meta.url));
const react = require("react");
const jsx = require("react/jsx-runtime");

const doc = {
  querySelector: () => null,
  createElement: () => ({ dataset: {}, set textContent(v) {}, appendChild() {} }),
  head: { appendChild: () => {} },
};
const win = { __ModuleLoader__: null, document: doc };
win.__ModuleLoader__ = { load: (h) => { win.__handoff = h; } };
const code = readFileSync(new URL("../lib/client.js", import.meta.url), "utf8");
new Function("window", code)(win);
const mod = win.__handoff.factory((s) => {
  if (s === "react") return react;
  if (s === "react/jsx-runtime") return jsx;
  throw new Error("require " + s);
});
console.log("exports:", Object.keys(mod).join(", "));

let failed = 0;
const check = (l, c) => { const ok = !!c; if (!ok) failed += 1; console.log(`${ok ? "PASS" : "FAIL"}  ${l}`); };

check("inject declares remote + remote.session (0.2.1 traced-service requirement)",
  mod.inject.includes("remote") && mod.inject.includes("remote.session"));

// 0.2.1-shaped ctx: services read directly, slots.inject on ctx.
const store = { getSnapshot: () => ({ current: null, routable: true, groups: [], failures: [], status: "idle", error: null }), subscribe: () => () => {} };
const sessionCalls = [];
const ctx = {
  viewport: undefined,
  effect: (fn) => { fn(); return () => {}; },
  locale: { register: () => {}, bind: () => (k) => k },
  sessions: { subagentAddress: (id) => { sessionCalls.push(id); return undefined; } },
  modelDirectories: { directoryFor: (id) => ({ store, load: () => Promise.resolve(), select: () => Promise.resolve() }) },
  slots: {
    inject: (key, cb) => { check("registers conversation.input.model", key === "conversation.input.model"); cb(); },
    register: (opts, comp) => { mod.__opts = opts; mod.__comp = comp; return () => {}; },
  },
};
mod.apply(ctx);

check("registration shadows the stock seat at priority -1", mod.__opts?.priority === -1);
check("registration carries locale", mod.__opts?.locale === "effortSlider");
check("component is a function", typeof mod.__comp === "function");

// The inject face must resolve without throwing (this is what crashed before).
const face = mod.__opts.inject("session-1");
check("inject face resolves available/directory/load/select",
  face.available === true && face.directory === store && typeof face.load === "function" && typeof face.select === "function");

const markup = require("react-dom/server").renderToStaticMarkup(react.createElement(mod.__comp, {
  locked: false, available: true, directory: store, load: () => {}, select: () => Promise.resolve(true),
  t: (k) => k,
}));
check("renders the trigger without crashing", markup.includes("esl_trigger") || markup.length > 0);

console.log(failed === 0 ? "EFFORT-SLIDER CHECK PASSED" : `${failed} CHECKS FAILED`);
if (failed > 0) process.exit(1);
