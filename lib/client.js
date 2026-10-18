window.__ModuleLoader__.load({
	id: "dsh-effort-slider",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let react_jsx_runtime = require("react/jsx-runtime");
		const { useState, useRef, useEffect, useMemo, useSyncExternalStore, useId } = react;
		const { jsx, jsxs, Fragment } = react_jsx_runtime;

		//#region styles
		const css = ".esl_root{min-width:0;position:relative}.esl_trigger{min-width:0;max-width:220px;height:28px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:none;border-radius:24px;outline:none;align-items:center;gap:4px;padding:0 4px 0 8px;font-size:13px;font-weight:500;line-height:20px;display:flex}.esl_trigger:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}.esl_trigger:focus-visible{box-shadow:0 0 0 2px var(--dsw-alias-border-l3)}.esl_trigger:disabled{color:var(--dsw-alias-label-dimmed);cursor:default}.esl_triggerLabel{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}.esl_triggerEffort{color:var(--dsw-alias-label-caption);flex:none}.esl_chevron{color:var(--dsw-alias-label-caption);flex:none;transition:transform .12s}.esl_chevronOpen{transform:rotate(180deg)}.esl_menu{z-index:20;border:1px solid var(--dsw-alias-border-inverted);background:var(--dsw-specific-menu);width:min(240px,100vw - 32px);max-height:min(360px,100vh - 96px);box-shadow:var(--dsw-shadow-lv3);color:var(--dsw-alias-label-primary);--dsh-scrollbar-thumb:var(--dsw-alias-scrollbar-bg-l2);--dsh-scrollbar-thumb-hover:var(--dsw-alias-scrollbar-hover-l2);border-radius:12px;flex-direction:column;padding:4px;display:flex;position:absolute;bottom:calc(100% + 8px);right:0;overflow:hidden}.esl_status,.esl_empty{color:var(--dsw-alias-label-tertiary);padding:10px;font-size:13px;line-height:20px}.esl_error,.esl_warning{background:var(--dsw-alias-interactive-bg-hover-danger);color:var(--dsw-alias-state-error-primary);border-radius:8px;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:4px;padding:7px 8px;font-size:12px;line-height:18px;display:flex}.esl_warning{background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-state-warn-label)}.esl_retry{color:inherit;font:inherit;cursor:pointer;background:0 0;border:none;flex:none;padding:0;font-weight:600}.esl_cell{width:100%;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border:none;border-radius:8px;outline:none;align-items:center;gap:8px;padding:8px;font-size:13px;line-height:18px;display:flex}.esl_cell:hover{background:var(--dsw-alias-interactive-bg-hover)}.esl_cell:focus-visible{box-shadow:inset 0 0 0 2px var(--dsw-alias-state-business-primary)}.esl_cellLabel{flex:1}.esl_cellValue{color:var(--dsw-alias-label-caption);max-width:110px;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.esl_cellChevron{color:var(--dsw-alias-label-caption);flex:none}.esl_groups{--dsh-scrollbar-thumb:var(--dsw-alias-scrollbar-bg-l2);--dsh-scrollbar-thumb-hover:var(--dsw-alias-scrollbar-hover-l2);flex:1;min-height:0;overflow:hidden auto}.esl_group{padding:2px 0 6px}.esl_groupTitle{color:var(--dsw-alias-label-tertiary);padding:6px 8px 2px;font-size:12px;font-weight:600;line-height:18px}.esl_option{width:100%;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border:none;border-radius:8px;outline:none;align-items:center;gap:8px;padding:8px;font-size:13px;line-height:18px;display:flex}.esl_option:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}.esl_option:focus-visible{box-shadow:inset 0 0 0 2px var(--dsw-alias-state-business-primary)}.esl_option:disabled{cursor:default;opacity:.6}.esl_optionCopy{flex:1;min-width:0}.esl_modelName{display:block;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.esl_description{color:var(--dsw-alias-label-tertiary);display:block;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;font-size:12px}.esl_check{color:var(--dsw-alias-state-business-primary);flex:none}.esl_selected{background:var(--dsw-alias-interactive-bg-hover)}.esl_effortPane{padding:6px 2px 10px}.esl_effortHeader{align-items:baseline;gap:8px;padding:4px 10px 0;display:flex}.esl_effortCaption{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}.esl_effortValue{color:var(--dsw-alias-label-primary);font-size:15px;font-weight:600;line-height:22px}.esl_sliderWrap{padding:2px 0 0}.esl_slider{cursor:grab;outline:none;padding:10px 0 4px}.esl_slider:focus-visible .esl_thumb{box-shadow:0 0 0 2px var(--dsw-alias-state-business-primary)}.esl_sliderDisabled{cursor:default}.esl_track{position:relative;height:28px;padding:0 12px}.esl_trackLine{position:absolute;left:12px;right:12px;top:50%;height:10px;border-radius:999px;background:var(--dsw-alias-border-l1,rgba(15,17,21,.10));transform:translateY(-50%)}.esl_fill{position:absolute;left:12px;top:50%;height:10px;border-radius:999px;background-size:100% 100%;transform:translateY(-50%);transition:width .12s ease-out;box-shadow:0 0 12px rgba(120,90,255,.35)}.esl_thumb{position:absolute;top:50%;width:22px;height:22px;border-radius:50%;background:#fff;border:none;box-shadow:0 2px 6px rgba(0,0,0,.35),0 0 0 1px rgba(0,0,0,.06);transform:translate(-50%,-50%);transition:left .12s ease-out}.esl_sliderDragging .esl_fill,.esl_sliderDragging .esl_thumb{transition:none}.esl_sliderDragging{cursor:grabbing}.esl_sliderDragging .esl_thumb{transform:translate(-50%,-50%) scale(1.12)}.esl_tick{position:absolute;top:50%;width:4px;height:4px;border-radius:50%;background:rgba(255,255,255,.55);transform:translate(-50%,-50%);mix-blend-mode:screen}.esl_labels{position:relative;height:16px;padding:0 12px}.esl_label{position:absolute;top:0;color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:16px;transform:translateX(-50%);white-space:nowrap}.esl_label[data-edge=\"first\"]{transform:none}.esl_label[data-edge=\"last\"]{transform:translateX(-100%)}.esl_labelActive{font-weight:600}.esl_effortDescription{color:var(--dsw-alias-label-tertiary);padding:6px 10px 0;font-size:12px;line-height:16px}.esl_effortBusy{height:18px;color:var(--dsw-alias-label-caption);padding:2px 12px 0;font-size:12px;line-height:16px}";
		const tagId = "dsh-effort-slider/client.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-effort-slider";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		const C = {
			root: "esl_root",
			trigger: "esl_trigger",
			triggerLabel: "esl_triggerLabel",
			triggerEffort: "esl_triggerEffort",
			chevron: "esl_chevron",
			chevronOpen: "esl_chevronOpen",
			menu: "esl_menu",
			status: "esl_status",
			empty: "esl_empty",
			error: "esl_error",
			warning: "esl_warning",
			retry: "esl_retry",
			cell: "esl_cell",
			cellLabel: "esl_cellLabel",
			cellValue: "esl_cellValue",
			cellChevron: "esl_cellChevron",
			groups: "esl_groups",
			group: "esl_group",
			groupTitle: "esl_groupTitle",
			option: "esl_option",
			optionCopy: "esl_optionCopy",
			modelName: "esl_modelName",
			description: "esl_description",
			check: "esl_check",
			selected: "esl_selected",
			effortPane: "esl_effortPane",
			effortHeader: "esl_effortHeader",
			effortCaption: "esl_effortCaption",
			effortValue: "esl_effortValue",
			sliderWrap: "esl_sliderWrap",
			slider: "esl_slider",
			sliderDragging: "esl_sliderDragging",
			sliderDisabled: "esl_sliderDisabled",
			track: "esl_track",
			trackLine: "esl_trackLine",
			fill: "esl_fill",
			thumb: "esl_thumb",
			tick: "esl_tick",
			labels: "esl_labels",
			label: "esl_label",
			labelActive: "esl_labelActive",
			effortDescription: "esl_effortDescription",
			effortBusy: "esl_effortBusy"
		};
		//#endregion

		//#region helpers
		function clsx() {
			let out = "";
			for (let i = 0; i < arguments.length; i++) {
				const value = arguments[i];
				if (!value) continue;
				if (typeof value === "string") {
					if (out) out += " ";
					out += value;
				} else if (Array.isArray(value)) {
					const part = clsx.apply(null, value);
					if (part) {
						if (out) out += " ";
						out += part;
					}
				} else if (typeof value === "object") {
					for (const key in value) if (value[key]) {
						if (out) out += " ";
						out += key;
					}
				}
			}
			return out;
		}
		const SLIDER_PAD = 12;
		/**
		* The Codex reasoning palette: blue at the low end, violet in the middle,
		* deep purple at the top, exactly as the Codex effort slider renders it.
		*
		* BLUE -> VIOLET blends across the first two thirds of the track and
		* VIOLET -> DEEP across the last third, so dragging right visibly "heats up"
		* instead of merely lengthening a bar. TEXT_VIOLET is a separate, brighter
		* stop for the value label: COLOR_DEEP is nearly invisible on a dark panel,
		* and the label must stay readable on both themes.
		*/
		const PALETTE = {
			blue: [77, 147, 248],
			violet: [147, 51, 234],
			/** Top-of-range accent. Bright lavender rather than a deep purple: the
			*  Codex artwork's own gradient ends at #c084fc, and a dark stop is
			*  nearly invisible against the dark composer panel. */
			top: [192, 132, 252],
			textViolet: [139, 92, 246]
		};
		/** Position where the violet starts bleeding in. */
		const ENERGY_START = 1 / 3;
		/** Position where violet has fully taken over and starts deepening. */
		const ENERGY_END = 2 / 3;
		const clamp01 = (value) => (value < 0 ? 0 : value > 1 ? 1 : value);
		const mixRgb = (from, to, t) => [
			Math.round(from[0] + (to[0] - from[0]) * t),
			Math.round(from[1] + (to[1] - from[1]) * t),
			Math.round(from[2] + (to[2] - from[2]) * t)
		];
		const rgbOf = (color) => `rgb(${color[0]},${color[1]},${color[2]})`;
		/**
		* Color of the fill's right end at one position.
		* @param ratio - 0..1 position along the track.
		* @returns a CSS rgb() color.
		*/
		function accentAt(ratio) {
			const t = clamp01(ratio);
			if (t <= ENERGY_START) return rgbOf(PALETTE.blue);
			if (t <= ENERGY_END) return rgbOf(mixRgb(PALETTE.blue, PALETTE.violet, (t - ENERGY_START) / (ENERGY_END - ENERGY_START)));
			return rgbOf(mixRgb(PALETTE.violet, PALETTE.top, (t - ENERGY_END) / (1 - ENERGY_END)));
		}
		/**
		* The fill gradient: always starts at blue and ends at the current accent,
		* so the leftmost stretch stays blue while the right end heats up. A sheen
		* layer rides on top for the glossy highlight Codex has.
		* @param ratio - 0..1 position.
		* @returns a CSS background-image value.
		*/
		function fillPaint(ratio) {
			const sheen = "linear-gradient(100deg, transparent 18%, rgba(255,255,255,.30) 38%, transparent 62%)";
			const body = `linear-gradient(90deg, ${rgbOf(PALETTE.blue)} 0%, ${accentAt(ratio)} 100%)`;
			return sheen + ", " + body;
		}
		/**
		* Readable color for the value label at one position.
		* @param ratio - 0..1 position.
		* @returns a CSS rgb() color.
		*/
		function labelColorAt(ratio) {
			const t = clamp01(ratio);
			if (t <= ENERGY_START) return rgbOf(PALETTE.blue);
			return rgbOf(mixRgb(PALETTE.blue, PALETTE.textViolet, (t - ENERGY_START) / (1 - ENERGY_START)));
		}
		const posLeft = (ratio) => "calc(" + SLIDER_PAD + "px + (100% - " + SLIDER_PAD * 2 + "px) * " + ratio + ")";
		const fillWidth = (ratio) => "calc((100% - " + SLIDER_PAD * 2 + "px) * " + ratio + ")";
		function ChevronDownIcon({ className }) {
			return jsx("svg", { viewBox: "0 0 14 14", width: "14", height: "14", "aria-hidden": true, className, children: jsx("path", { d: "M3 5l4 4 4-4", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) });
		}
		function ChevronRightIcon({ className }) {
			return jsx("svg", { viewBox: "0 0 14 14", width: "14", height: "14", "aria-hidden": true, className, children: jsx("path", { d: "M5 3l4 4-4 4", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) });
		}
		function CheckIcon() {
			return jsx("svg", { viewBox: "0 0 16 16", width: "16", height: "16", "aria-hidden": true, children: jsx("path", { d: "M3 8.5l3.2 3.2L13 5.2", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }) });
		}
		//#endregion

		//#region EffortSlider
		/**
		* Smooth pointer-driven slider over `count` discrete effort stops. The thumb
		* and fill follow the pointer 1:1 (continuous drag); the value snaps to the
		* nearest stop only for the label/commit, and the thumb eases onto the tick
		* after the drag ends.
		*/
		function EffortSlider({ value, count, labels, activeIndex, disabled, ariaLabel, onChange, onCommit }) {
			const trackRef = useRef(null);
			const [dragging, setDragging] = useState(false);
			const draggingRef = useRef(false);
			const steps = count < 2 ? 1 : count - 1;
			const percent = count < 2 ? 0 : value;
			const ratioFromClientX = (clientX) => {
				const el = trackRef.current;
				if (el === null) return 0;
				const rect = el.getBoundingClientRect();
				const inner = rect.width - SLIDER_PAD * 2;
				if (inner <= 0) return 0;
				return Math.min(1, Math.max(0, (clientX - rect.left - SLIDER_PAD) / inner));
			};
			const onPointerDown = (event) => {
				if (disabled || count < 2) return;
				event.preventDefault();
				const el = trackRef.current;
				draggingRef.current = true;
				setDragging(true);
				try { el.setPointerCapture(event.pointerId); } catch (error) {}
				onChange(ratioFromClientX(event.clientX));
			};
			const onPointerMove = (event) => {
				if (!draggingRef.current) return;
				onChange(ratioFromClientX(event.clientX));
			};
			const endDrag = (event) => {
				if (!draggingRef.current) return;
				draggingRef.current = false;
				setDragging(false);
				const el = trackRef.current;
				if (el !== null && typeof el.hasPointerCapture === "function" && el.hasPointerCapture(event.pointerId)) {
					try { el.releasePointerCapture(event.pointerId); } catch (error) {}
				}
				onCommit();
			};
			const onKeyDown = (event) => {
				if (disabled || count < 2) return;
				const step = 1 / steps;
				let next = null;
				if (event.key === "ArrowRight" || event.key === "ArrowUp") next = Math.min(1, value + step);
				else if (event.key === "ArrowLeft" || event.key === "ArrowDown") next = Math.max(0, value - step);
				else if (event.key === "Home") next = 0;
				else if (event.key === "End") next = 1;
				if (next === null) return;
				event.preventDefault();
				onChange(next);
				onCommit();
			};
			const ticks = [];
			for (let i = 0; i < count; i++) ticks.push(jsx("span", { className: C.tick, style: { left: posLeft(i / steps), background: i <= activeIndex ? "rgba(255,255,255,.85)" : "rgba(255,255,255,.35)" } }, "tick-" + i));
			const labelsRow = [];
			for (let i = 0; i < count; i++) {
				const pct = i / steps;
				labelsRow.push(jsx("span", {
					className: clsx(C.label, i === activeIndex && C.labelActive),
					style: i === activeIndex ? { left: posLeft(pct), color: labelColorAt(pct) } : { left: posLeft(pct) },
					"data-edge": i === 0 ? "first" : i === count - 1 ? "last" : void 0,
					children: labels[i]
				}, "label-" + i));
			}
			return jsxs("div", {
				className: C.sliderWrap,
				children: [
					jsxs("div", {
						ref: trackRef,
						className: clsx(C.slider, dragging && C.sliderDragging, disabled && C.sliderDisabled),
						role: "slider",
						tabIndex: disabled ? -1 : 0,
						"aria-label": ariaLabel,
						"aria-valuemin": 0,
						"aria-valuemax": Math.max(0, count - 1),
						"aria-valuenow": Math.max(0, activeIndex),
						"aria-valuetext": labels[activeIndex],
						"aria-disabled": disabled || void 0,
						onPointerDown,
						onPointerMove,
						onPointerUp: endDrag,
						onPointerCancel: endDrag,
						onKeyDown,
						style: { touchAction: "none" },
						children: jsxs("div", {
							className: C.track,
							children: [
								jsx("div", { className: C.trackLine }),
								jsx("div", { className: C.fill, style: { width: fillWidth(percent), backgroundImage: fillPaint(percent) } }),
								jsx("div", { className: C.thumb, style: { left: posLeft(percent), boxShadow: `0 2px 8px rgba(0,0,0,.35), 0 0 0 2px ${accentAt(percent)}` } }),
								...ticks
							]
						})
					}),
					jsx("div", { className: C.labels, children: labelsRow })
				]
			});
		}
		//#endregion

		//#region EffortSliderModelSelect
		/**
		* Composer model seat (shadows ui-model-selection's conversation.input.model
		* entry at priority -1): the same trigger + two-level menu, but the effort
		* pane is a smooth slider over the adapter-published effort levels instead of
		* a radio list. Commits on drag release (or arrow keys); the menu stays open
		* so the value can be fine-tuned, and a failed commit snaps the thumb back.
		*/
		function EffortSliderModelSelect({ locked, available, directory, load, select, t }) {
			const state = useSyncExternalStore((fn) => directory.subscribe(fn), () => directory.getSnapshot(), () => directory.getSnapshot());
			const [open, setOpen] = useState(false);
			const [pane, setPane] = useState("root");
			const lastActionRef = useRef("load");
			const rootRef = useRef(null);
			const triggerRef = useRef(null);
			const itemRefs = useRef([]);
			const id = useId();

			const choices = useMemo(() => state.groups.flatMap((group) => group.models.map((model) => ({
				group,
				model,
				selection: {
					provider: group.id,
					model: model.id,
					...(model.reasoning?.defaultEffort === void 0 ? {} : { reasoningEffort: model.reasoning.defaultEffort })
				}
			}))), [state.groups]);
			const currentChoice = choices[state.current === null ? -1 : choices.findIndex((c) => c.selection.provider === state.current?.provider && c.selection.model === state.current.model)];
			const reasoning = currentChoice?.model.reasoning;
			const effectiveEffort = state.current?.reasoningEffort ?? reasoning?.defaultEffort;
			const effortLabel = reasoning === void 0 ? void 0 : effectiveEffort === void 0 ? t("effort.providerDefault") : reasoning.efforts.find((level) => level.id === effectiveEffort)?.name ?? effectiveEffort;
			const effortChoices = useMemo(() => reasoning === void 0 ? [] : [
				...(reasoning.defaultEffort === void 0 ? [{ key: "provider-default", effort: void 0, label: t("effort.providerDefault") }] : []),
				...reasoning.efforts.map((effort) => ({
					key: "effort:" + effort.id,
					effort: effort.id,
					label: effort.name,
					...(effort.description === void 0 ? {} : { description: effort.description })
				}))
			], [reasoning, t]);

			const busy = state.status === "selecting";
			const reload = () => { lastActionRef.current = "load"; load(); };

			useEffect(() => {
				if (available) { lastActionRef.current = "load"; load(); }
			}, [available, load]);
			useEffect(() => {
				if (!open) return;
				const closeOutside = (event) => { if (!rootRef.current?.contains(event.target)) setOpen(false); };
				document.addEventListener("mousedown", closeOutside);
				return () => document.removeEventListener("mousedown", closeOutside);
			}, [open]);

			// Slider geometry: continuous ratio 0..1 over the effort stops.
			const n = effortChoices.length;
			const steps = n < 2 ? 1 : n - 1;
			const committedIndex = effortChoices.findIndex((level) => level.effort === effectiveEffort);
			const [ratio, setRatio] = useState(committedIndex < 0 ? 0 : committedIndex / steps);
			useEffect(() => {
				const idx = effortChoices.findIndex((level) => level.effort === effectiveEffort);
				setRatio(idx < 0 ? 0 : idx / steps);
			}, [effectiveEffort, effortChoices, steps]);

			const liveIndex = n === 0 ? -1 : Math.max(0, Math.min(n - 1, Math.round(ratio * steps)));
			const liveChoice = n === 0 ? void 0 : effortChoices[liveIndex];

			const failToast = () => {
				const message = directory.getSnapshot().error;
				if (message !== null) {
					const idx = effortChoices.findIndex((level) => level.effort === effectiveEffort);
					setRatio(idx < 0 ? 0 : idx / steps);
				}
			};
			const commitEffort = () => {
				if (state.current === null || n === 0) return;
				const idx = Math.max(0, Math.min(n - 1, Math.round(ratio * steps)));
				const level = effortChoices[idx];
				if (level === void 0) return;
				setRatio(idx / steps);
				if (effectiveEffort === level.effort) return;
				lastActionRef.current = "select";
				select({
					provider: state.current.provider,
					model: state.current.model,
					...(level.effort === void 0 ? {} : { reasoningEffort: level.effort })
				}).then((accepted) => { if (!accepted) failToast(); });
			};

			if (!available) return null;

			const show = () => { setPane("root"); setOpen(true); reload(); };
			const close = (restoreFocus = false) => {
				setOpen(false);
				setPane("root");
				if (restoreFocus) queueMicrotask(() => { triggerRef.current?.focus(); });
			};
			const moveFocus = (offset) => {
				const items = itemRefs.current.filter((item) => item !== null);
				if (items.length === 0) return;
				const active = items.findIndex((item) => item === document.activeElement);
				items[(Math.max(active, 0) + offset + items.length) % items.length]?.focus();
			};
			const onRootKeyDown = (event) => {
				if (event.key === "Escape" && open) {
					event.preventDefault();
					if (pane !== "root") setPane("root");
					else close(true);
					return;
				}
				if (!open) return;
				if (event.key === "ArrowDown" || event.key === "ArrowUp") {
					event.preventDefault();
					moveFocus(event.key === "ArrowDown" ? 1 : -1);
				}
			};
			const onBlur = (event) => {
				if (event.relatedTarget instanceof Node && rootRef.current?.contains(event.relatedTarget)) return;
				close();
			};
			const choose = (selection) => {
				if (state.current?.provider === selection.provider && state.current.model === selection.model) { close(true); return; }
				lastActionRef.current = "select";
				select(selection).then((accepted) => { if (!accepted) failToast(); });
			};

			const modelLabel = currentChoice?.model.name ?? t("trigger.fallback");
			const triggerLabel = effortLabel === void 0 ? modelLabel : modelLabel + " · " + effortLabel;
			const triggerAria = currentChoice === void 0 ? t("trigger.selectAria") : effortLabel === void 0 ? t("trigger.aria", { model: modelLabel }) : t("trigger.ariaEffort", { model: modelLabel, effort: effortLabel });

			itemRefs.current = [];
			let itemIndex = 0;
			const itemRef = () => {
				const at = itemIndex++;
				return (node) => { itemRefs.current[at] = node; };
			};

			return jsxs("div", {
				ref: rootRef,
				className: C.root,
				onKeyDown: onRootKeyDown,
				onBlur,
				children: [
					jsxs("button", {
						ref: triggerRef,
						type: "button",
						className: C.trigger,
						"aria-label": triggerAria,
						"aria-haspopup": "menu",
						"aria-expanded": open,
						"aria-controls": open ? id + "-menu" : void 0,
						title: triggerLabel,
						disabled: locked,
						onClick: () => { if (open) close(); else show(); },
						children: [
							jsx("span", { className: C.triggerLabel, children: modelLabel }),
							effortLabel !== void 0 && jsx("span", { className: C.triggerEffort, children: effortLabel }),
							jsx(ChevronDownIcon, { className: clsx(C.chevron, open && C.chevronOpen) })
						]
					}),
					open && jsxs("div", {
						id: id + "-menu",
						className: C.menu,
						role: "menu",
						"aria-label": t("menu.aria"),
						"aria-busy": state.status === "loading" || busy,
						children: [
							pane === "root" && jsxs(Fragment, { children: [
								jsxs("button", {
									ref: itemRef(),
									type: "button",
									role: "menuitem",
									className: C.cell,
									onClick: () => { setPane("model"); },
									children: [
										jsx("span", { className: C.cellLabel, children: t("menu.model") }),
										jsx("span", { className: C.cellValue, children: modelLabel }),
										jsx(ChevronRightIcon, { className: C.cellChevron })
									]
								}),
								reasoning !== void 0 && jsxs("button", {
									ref: itemRef(),
									type: "button",
									role: "menuitem",
									className: C.cell,
									onClick: () => { setPane("effort"); },
									children: [
										jsx("span", { className: C.cellLabel, children: t("menu.effort") }),
										jsx("span", { className: C.cellValue, children: effortLabel }),
										jsx(ChevronRightIcon, { className: C.cellChevron })
									]
								})
							] }),
							pane === "model" && jsxs(Fragment, { children: [
								state.status === "loading" && jsx("div", { className: C.status, children: t("status.loading") }),
								state.error !== null && lastActionRef.current === "load" && jsxs("div", { className: C.error, children: [
									jsx("span", { children: t("error.action", { message: state.error }) }),
									jsx("button", { type: "button", className: C.retry, onClick: reload, children: t("action.reload") })
								] }),
								state.failures.map((failure) => jsxs("div", { className: C.warning, children: [
									jsx("span", { children: t("warning.groupLoad", { name: failure.name, message: failure.message }) }),
									jsx("button", { type: "button", className: C.retry, onClick: reload, children: t("action.reload") })
								] }, failure.id)),
								jsx("div", { className: clsx(C.groups, "scrollable"), children: state.groups.map((group) => {
									const headingId = id + "-" + group.id;
									return jsxs("section", {
										role: "group",
										"aria-labelledby": headingId,
										className: C.group,
										children: [
											jsx("div", { className: C.groupTitle, id: headingId, children: group.name }),
											group.models.map((model) => {
												const selected = state.current?.provider === group.id && state.current.model === model.id;
												return jsxs("button", {
													ref: itemRef(),
													type: "button",
													role: "menuitemradio",
													"aria-checked": selected,
													className: clsx(C.option, selected && C.selected),
													title: model.name,
													disabled: busy,
													onClick: () => { choose({ provider: group.id, model: model.id }); },
													children: [
														jsxs("span", { className: C.optionCopy, children: [
															jsx("span", { className: C.modelName, children: model.name }),
															model.description !== void 0 && jsx("span", { className: C.description, children: model.description })
														] }),
														jsx("span", { className: C.check, children: selected ? jsx(CheckIcon, {}) : null })
													]
												}, model.id);
											})
										]
									}, group.id);
								}) }),
								state.status === "ready" && choices.length === 0 && jsx("div", { className: C.empty, children: t("empty.models") })
							] }),
							pane === "effort" && jsxs(Fragment, { children: [
								state.error !== null && lastActionRef.current === "load" && jsxs("div", { className: C.error, children: [
									jsx("span", { children: t("error.action", { message: state.error }) }),
									jsx("button", { type: "button", className: C.retry, onClick: reload, children: t("action.reload") })
								] }),
								state.error !== null && lastActionRef.current === "select" && jsxs("div", { className: C.error, children: [
									jsx("span", { children: t("error.action", { message: state.error }) }),
									jsx("button", { type: "button", className: C.retry, onClick: reload, children: t("action.reload") })
								] }),
								n === 0 ? jsx("div", { className: C.empty, children: t("empty.efforts") })
									: jsxs("div", { className: C.effortPane, children: [
										jsxs("div", { className: C.effortHeader, children: [
											jsx("span", { className: C.effortCaption, children: t("menu.effort") }),
											jsx("span", { className: C.effortValue, children: liveChoice?.label ?? effortLabel })
										] }),
										jsx(EffortSlider, {
											value: ratio,
											count: n,
											labels: effortChoices.map((level) => level.label),
											activeIndex: liveIndex,
											disabled: state.current === null,
											ariaLabel: t("slider.aria", { model: modelLabel }),
											onChange: (r) => { setRatio(r); },
											onCommit: commitEffort
										}),
										liveChoice?.description !== void 0 && jsx("div", { className: C.effortDescription, children: liveChoice.description }),
										jsx("div", { className: C.effortBusy, children: busy ? t("status.saving") : "" })
									] })
							] })
						]
					})
				]
			});
		}
		//#endregion

		//#region locales
		/** Dictionary namespace owned by this plugin. */
		const NS = "effortSlider";
		/** Simplified Chinese dictionary (key-set source of truth). */
		const zh = {
			"trigger.fallback": "选择模型",
			"trigger.selectAria": "选择模型",
			"trigger.aria": "选择模型，当前 {model}",
			"trigger.ariaEffort": "选择模型，当前 {model}，思考强度 {effort}",
			"menu.aria": "模型与思考强度",
			"menu.model": "模型",
			"menu.effort": "思考强度",
			"effort.providerDefault": "Default",
			"status.loading": "正在刷新模型列表…",
			"status.saving": "正在保存…",
			"error.action": "模型操作失败：{message}",
			"action.reload": "重新加载",
			"warning.groupLoad": "{name} 加载失败：{message}",
			"empty.models": "没有可用的模型。",
			"empty.efforts": "当前模型未提供思考强度。",
			"slider.aria": "调整思考强度，当前模型 {model}"
		};
		/** English dictionary, checked complete against the zh key set. */
		const en = {
			"trigger.fallback": "Select model",
			"trigger.selectAria": "Select model",
			"trigger.aria": "Select model, current {model}",
			"trigger.ariaEffort": "Select model, current {model}, thinking effort {effort}",
			"menu.aria": "Model and thinking effort",
			"menu.model": "Model",
			"menu.effort": "Effort",
			"effort.providerDefault": "Default",
			"status.loading": "Refreshing model list…",
			"status.saving": "Saving…",
			"error.action": "Model operation failed: {message}",
			"action.reload": "Reload",
			"warning.groupLoad": "{name} failed to load: {message}",
			"empty.models": "No models available.",
			"empty.efforts": "This model provides no effort levels.",
			"slider.aria": "Adjust thinking effort, current model {model}"
		};
		//#endregion

		//#region plugin
		/** Required services: the seat's slot registry, the shared model directory, sessions, and locale. */
		const inject = ["slots", "modelDirectories", "sessions", "locale", "remote", "remote.session"];
		/**
		* Client plugin body: register this plugin's dictionaries, then shadow the
		* conversation.input.model slot at priority -1 with the slider seat. The
		* stock ui-model-selection seat remains registered at priority 0 as the
		* fallback (it renders if this entry ever abdicates).
		* @param ctx - client root context.
		*/
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, { zh, en }), "dsh-effort-slider: dictionaries");
			ctx.slots.inject("conversation.input.model", () => ctx.slots.register({
				name: "conversation.input.model",
				locale: NS,
				priority: -1,
				inject: (sessionId) => {
					const directory = ctx.modelDirectories.directoryFor(sessionId);
					const available = ctx.sessions.subagentAddress(sessionId) === void 0;
					return {
						available,
						directory: directory.store,
						load: () => { if (available) directory.load().catch(() => {}); },
						select: (selection) => available ? directory.select(selection).then(() => true, () => false) : Promise.resolve(false)
					};
				}
			}, EffortSliderModelSelect));
		}
		//#endregion
		exports.EffortSlider = EffortSlider;
		exports.EffortSliderModelSelect = EffortSliderModelSelect;
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
