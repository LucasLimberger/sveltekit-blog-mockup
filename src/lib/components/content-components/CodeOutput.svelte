<script lang="ts">
	import CodeFormatter from "./CodeFormatter.svelte";
	type Props = { content: string };
	const { content }: Props = $props();
</script>

<div><CodeFormatter {content} /></div>

<style>
	div {
		padding: 0.8rem;
		height: 100%;
		overflow: hidden auto;
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
		font-size: 0.9rem;
		font-style: italic;
	}
</style>
