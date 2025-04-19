<script lang="ts">
	import { page } from "$app/state";

	type Props = { previousPagePath: string | null; nextPagePath: string | null };
	const { previousPagePath, nextPagePath }: Props = $props();

	const theme = $derived(page.url.searchParams.get("theme"));
</script>

<div class="component-container">
	{@render link(previousPagePath + "?theme=" + theme, "Anterior")}
	{@render link(nextPagePath + "?theme=" + theme, "Próximo")}
</div>

{#snippet link(href: string | null, text: string)}
	{#if href === null}
		<div class="text-wrapper disabled">{text}</div>
	{:else}
		<a {href} class="text-wrapper" data-sveltekit-keepfocus>{text}</a>
	{/if}
{/snippet}

<style>
	.component-container {
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
		text-decoration: underline;
		text-decoration-thickness: 0.125em;
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
