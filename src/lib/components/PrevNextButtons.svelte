<script lang="ts">
	import { previousPage, nextPage } from "$lib/scripts/dataAcess";

	type Props = { currentTopic: string; currentPage: string };
	const { currentTopic, currentPage }: Props = $props();

	const previous = $derived(previousPage(currentTopic, currentPage));
	const next = $derived(nextPage(currentTopic, currentPage));
</script>

<div class="container">
	{@render link(previous, "Anterior")}
	{@render link(next, "Próximo")}
</div>

{#snippet link(href: string | null, text: string)}
	{#if href === null}
		<div class="text-wrapper disabled">{text}</div>
	{:else}
		<a {href} class="text-wrapper" data-sveltekit-keepfocus>{text}</a>
	{/if}
{/snippet}

<style>
	.container {
		display: flex;
		column-gap: 1rem;
		justify-content: space-between;
	}

	a {
		display: block;
		color: inherit;
		text-decoration: none;
	}

	a:hover,
	a:focus-visible {
		outline: 0.2rem solid var(--focus-outline-clr);
		outline-offset: 0.125rem;
	}

	.text-wrapper {
		padding: 0.5rem 0.75rem;
		border-radius: 1.25rem;
		background-color: var(--accent-clr);
		font-size: 1.125rem;
		font-weight: bold;
	}

	.text-wrapper.disabled {
		cursor: not-allowed;
		background-color: var(--button-disabled-clr);
	}
</style>
