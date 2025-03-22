<script lang="ts">
	import repr from "$lib/scripts/repr";
	import CodeFormatter from "./CodeFormatter.svelte";
	import CodeOutput from "./CodeOutput.svelte";

	type Props = { content: string };
	const { content }: Props = $props();

	const codeContent = $derived(content.startsWith("*") ? content.slice(1) : content);
	const output = $derived(content.startsWith("*") ? "" : evaluateOutput(codeContent));

	function evaluateOutput(code: string) {
		code = code.replaceAll(/console\.(log|error|warn|info)/g, "$OUTPUT.push");
		code = "const $OUTPUT = [];\n" + code + "\n$OUTPUT;";
		try {
			const result: unknown[] = eval(code);
			return result.map(v => "> " + repr(v)).join("\n");
		} catch (error) {
			return (error as Error).name + ": " + (error as Error).message;
		}
	}
</script>

<div class="component-container">
	<pre class="code"><CodeFormatter content={codeContent} /></pre>
	{#if output !== ""}
		<samp><CodeOutput content={output} /></samp>
	{/if}
</div>

<style>
	.component-container {
		margin-block: 1em;
		display: grid;
		grid-template-columns: 2fr 1fr;
		column-gap: 1.5rem;
	}
	pre {
		margin: 0;
		overflow: hidden auto;
		background-color: var(--background-secondary-clr);
		font-size: 0.9rem;
		padding: 1rem;
		border-radius: 0.25rem;
		border: 1px solid var(--background-tertiary-clr);
	}
	pre:last-child {
		grid-column: 1 / -1;
	}
</style>
