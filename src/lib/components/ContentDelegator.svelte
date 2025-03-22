<script lang="ts">
	import TextFormatter from "./content-components/TextFormatter.svelte";
	import CodeBlock from "./content-components/CodeBlock.svelte";
	import InteractableCodeBlock from "./content-components/InteractableCodeBlock.svelte";
	import Question from "./content-components/Question.svelte";

	type Props = { contentFragments: readonly string[] };
	const { contentFragments }: Props = $props();
</script>

<div class="content">
	{#each contentFragments as text}
		{#if text.startsWith("###")}
			<h3><TextFormatter content={text.slice(3)} /></h3>
		{:else if text.startsWith("```") && text.endsWith("```")}
			{#if text.includes("$")}
				<InteractableCodeBlock content={text.slice(3, -3)} />
			{:else}
				<CodeBlock content={text.slice(3, -3)} />
			{/if}
		{:else if text.includes("|")}
			<Question content={text} />
		{:else}
			<p><TextFormatter content={text} /></p>
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
	}

	p {
		margin-block: 1em;
		line-height: 1.5;
	}
</style>
