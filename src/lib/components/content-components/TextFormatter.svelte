<script lang="ts">
	import tokenize from "$lib/scripts/tokenize";
	import CodeFormatter from "./CodeFormatter.svelte";

	type Props = { content: string };
	const { content }: Props = $props();

	const tokens = $derived(
		tokenize(content, {
			code: /`(.+?)`/,
			"bold-italic": /(\*\*|__)(\*|_)(.+?)\2\1|(\*|_)(\*\*|__)(.+?)\5\4/,
			bold: /(\*\*|__)(.+?)\1/,
			italic: /(\*|_)(.+?)\1/,
		}),
	);
</script>

<span class="text">
	{#each tokens as token}
		{#if token.type === "none"}
			{token.value}
		{:else if token.type === "code"}
			<span class="inline-code"><CodeFormatter content={token.value.slice(1, -1)} /></span>
		{:else if token.type === "bold"}
			<strong>{token.value.slice(2, -2)}</strong>
		{:else if token.type === "italic"}
			<em>{token.value.slice(1, -1)}</em>
		{:else if token.type === "bold-italic"}
			<strong><em>{token.value.slice(3, -3)}</em></strong>
		{/if}
	{/each}
</span>

<style>
	.text {
		white-space-collapse: preserve;
	}

	strong {
		color: var(--text-accent-clr);
	}

	.inline-code {
		padding-inline: 0.25rem;
		border-radius: 0.15rem;
		background-color: var(--background-secondary-clr);
		font-size: 0.9rem;
	}
</style>
