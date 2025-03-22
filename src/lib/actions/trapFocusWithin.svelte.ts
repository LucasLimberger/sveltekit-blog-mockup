export default function trapFocusWithin(node: HTMLElement) {
	const originallyFocused = document.activeElement as HTMLElement | null;

	$effect(() => {
		getFocusableElements()[0]?.focus();
		node.addEventListener("keydown", handleKeydown);

		return () => {
			node.removeEventListener("keydown", handleKeydown);
			originallyFocused?.focus();
		};
	});

	function getFocusableElements() {
		return Array.from(
			node.querySelectorAll<HTMLElement>(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
			),
		);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key !== "Tab") {
			return;
		}

		const currentlyFocused = document.activeElement;
		const elements = getFocusableElements();
		const first = elements[0];
		const last = elements.at(-1);

		if (event.shiftKey && currentlyFocused === first) {
			last!.focus();
			event.preventDefault();
			return;
		}

		if (!event.shiftKey && currentlyFocused === last) {
			first.focus();
			event.preventDefault();
		}
	}
}
