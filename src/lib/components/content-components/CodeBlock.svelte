<script lang="ts">
	import evaluateOutput from "$lib/scripts/evaluateOutput";
	import CodeFormatter from "./CodeFormatter.svelte";
	import CodeOutput from "./CodeOutput.svelte";

	type Props = { content: string };
	const { content }: Props = $props();

	const codeContent = $derived(content.startsWith("*") ? content.slice(1) : content);
	const output = $derived(content.startsWith("*") ? "" : evaluateOutput(codeContent));
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
