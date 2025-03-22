import { cubicInOut } from "svelte/easing";
import { prefersReducedMotion } from "svelte/motion";
import type { TransitionConfig } from "svelte/transition";

export default function customSlide(
	node: Element,
	{ delay = 0, duration = 400, easing = cubicInOut, amountX = "0px", amountY = "0px" } = {},
): TransitionConfig {
	return {
		delay,
		duration: prefersReducedMotion.current ? 0 : duration,
		easing,
		css: (t: number, u: number) =>
			`translate: calc((${amountX}) * ${u}) calc((${amountY}) * ${u});`,
	};
}
