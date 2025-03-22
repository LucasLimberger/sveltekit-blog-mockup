<script lang="ts">
	import repr from "$lib/scripts/repr";
	import CodeFormatter from "./CodeFormatter.svelte";

	type Props = { content: string };
	const { content }: Props = $props();
	const id = $props.id();

	const separator = $derived(content.match(/\$(TEXT|NUMBER)/)![0]);
	const inputType = $derived(separator === "$TEXT" ? "text" : "number");
	const [contentBefore, contentAfter] = $derived(content.split(separator));

	let inputValue = $state<string | number | null>(null);
	let processedInput = $derived(processInput(inputValue, inputType));

	function processInput(value: string | number | null, type: string) {
		if (type === "number") {
			return String(value ?? "0");
		}
		value = String(value ?? "");
		return '"' + value.replaceAll("\\", "\\\\").replaceAll('"', '\\"') + '"';
	}

	function evaluateOutput(code: string) {
		code = code.replaceAll(/console\.(log|error|warn|info)/g, "$OUTPUT.push");
		const setup = `let $TEXT, $NUMBER = $TEXT = ${processedInput}\nconst $OUTPUT = [];\n`;
		code = setup + code + "\n$OUTPUT;";
		try {
			const result: unknown[] = eval(code);
			return result.map(v => "> " + repr(v)).join("\n");
		} catch (error) {
			return (error as Error).name + ": " + (error as Error).message;
		}
	}
</script>

<div class="component-container">
	<div class="input-wrapper">
		<pre><code>
				<CodeFormatter content={contentBefore} /><span class="code-insert-point">{processedInput}</span
				><CodeFormatter content={contentAfter} />
			</code></pre>
		<label><input type={inputType} {id} bind:value={inputValue} /></label>
	</div>
	<output for={id}><CodeFormatter content={evaluateOutput(content)} /></output>
</div>

<style>
	.component-container {
		margin-block: 1em;
		display: grid;
		grid-template-columns: 2fr 1fr;
		column-gap: 1.5rem;
	}

	.input-wrapper {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		row-gap: 1rem;
		border-radius: 0.25rem;
		background-color: var(--background-secondary-clr);
		border: 1px solid var(--background-tertiary-clr);
	}

	pre,
	output {
		margin: 0;
		font-size: 0.9rem;
	}

	output {
		padding: 0.8rem;
		background-color: var(--background-secondary-clr);
		background-image: repeating-linear-gradient(
			to bottom,
			transparent 0%,
			hsl(0 0% 0% / 0.05) 0.25rem,
			transparent 0.5rem
		);
		border-width: 0.2rem;
		border-style: solid;
		border-color: var(--inset-border-clrs);
		font-style: italic;
	}

	input {
		width: 100%;
		padding: 0.25rem 0.5rem;

		border-radius: 0.125rem;
		background-color: var(--background-primary-clr);
		border-width: 0.2rem;
		border-style: solid;
		border-color: var(--inset-border-clrs);
		color: var(--input-text-clr);
		font-family: inherit;
		font-weight: bold;
		font-style: italic;

		transition: background-color 0.3s;
	}
	input:hover,
	input:focus-visible {
		background-color: var(--background-tertiary-clr);
	}
	input:focus-visible {
		border-color: var(--background-primary-clr);
		outline: 0.125rem solid var(--focus-outline-clr);
	}
	@media (prefers-reduced-motion: reduce) {
		input {
			transition: none;
		}
	}
	code {
		white-space-collapse: collapse;
		word-break: break-all;
	}

	.code-insert-point {
		font-weight: bold;
		font-style: italic;
		color: var(--input-text-clr);
		white-space: pre-wrap;
	}
</style>
