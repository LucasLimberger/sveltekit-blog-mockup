<script lang="ts">
	import evaluateOutput from "$lib/scripts/evaluateOutput";
	import CodeFormatter from "./CodeFormatter.svelte";
	import CodeOutput from "./CodeOutput.svelte";

	type Props = { content: string };
	const { content }: Props = $props();
	const inputId = $props.id();

	const separator = $derived(content.match(/\$(TEXT|NUMBER)/)![0]);
	const inputType = $derived(separator === "$TEXT" ? "text" : "number");
	const [contentBefore, contentAfter] = $derived(content.split(separator));

	let inputValue = $state<string | number | null>(null);
	const processedInput = $derived(processInput(inputValue, inputType));
	const output = $derived(evaluateOutput(processCode(content, processedInput)));

	function processInput(value: string | number | null, type: string) {
		if (type === "number") {
			return String(value ?? "0");
		}
		value = String(value ?? "");
		return '"' + value.replaceAll("\\", "\\\\").replaceAll('"', '\\"') + '"';
	}

	function processCode(code: string, input: string) {
		return `let $TEXT, $NUMBER = $TEXT = ${input};\n${code}`;
	}
</script>

<div class="component-container">
	<div class="input-wrapper">
		<pre><code>
				<CodeFormatter content={contentBefore} /><span class="code-insert-point">{processedInput}</span
				><CodeFormatter content={contentAfter} />
			</code></pre>
		<label><input type={inputType} id={inputId} bind:value={inputValue} /></label>
	</div>
	<output for={inputId}><CodeOutput content={output} /></output>
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

	pre {
		margin: 0;
		font-size: 0.9rem;
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
