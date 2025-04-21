<script lang="ts">
	import tokenize from "$lib/scripts/tokenize";
	import TextFormatter from "./content-components/TextFormatter.svelte";
	import CodeBlock from "./content-components/CodeBlock.svelte";
	import InteractableCodeBlock from "./content-components/InteractableCodeBlock.svelte";
	import Question from "./content-components/Question.svelte";

	type Props = { content: string };
	const { content }: Props = $props();

	const tokens = $derived(
		tokenize(content, {
			"code-block": /```.+?```/s,
			"line-break": /\n(?=\n)/,
			heading: /^###.+$/m,
			question: /^.*?\|.+$/m,
			text: /^.+$/m,
		}),
	);
</script>

<div class="content">
	{#each tokens as token}
		{#if token.type === "code-block"}
			{#if token.value.includes("$TEXT") || token.value.includes("$NUMBER")}
				<InteractableCodeBlock content={token.value.slice(3, -3)} />
			{:else}
				<CodeBlock content={token.value.slice(3, -3)} />
			{/if}
		{:else if token.type === "line-break"}
			<br />
		{:else if token.type === "heading"}
			<h3><TextFormatter content={token.value.slice(3)} /></h3>
		{:else if token.type === "question"}
			<Question content={token.value} />
		{:else if token.type === "text"}
			<p><TextFormatter content={token.value} /></p>
		{/if}
	{/each}
</div>

<style>
	.content {
		min-width: 30rem;
	}

	h3 {
		margin-block: 1.5em 1em;
		font-family: var(--heading-font);
		font-size: 1.4rem;
		font-weight: bold;
		line-height: 1.5;
		letter-spacing: var(--heading-font-letter-spacing);
	}

	p {
		margin-block: 1em;
		line-height: 1.5;
	}
</style>
