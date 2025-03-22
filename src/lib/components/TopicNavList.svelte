<script lang="ts">
	import { allPageNames } from "$lib/scripts/dataAcess";
	type Props = {
		topicName: string;
		currentPathname: string;
		visitedPaths: readonly string[];
	};
	const { topicName, currentPathname, visitedPaths }: Props = $props();
</script>

<h2>{topicName}</h2>
<ol>
	{#each allPageNames(topicName) as pageName}
		{@const pathname = `/${topicName}/${pageName}`}
		<li>
			<a
				href={pathname}
				class:visited={visitedPaths.includes(pathname)}
				aria-current={pathname === currentPathname ? "page" : undefined}
				data-sveltekit-keepfocus
			>
				{pageName}
			</a>
		</li>
	{/each}
</ol>

<style>
	h2 {
		margin: 0;
		margin-bottom: 1rem;
		font-family: var(--heading-font);
		font-size: 2rem;
	}

	ol {
		margin: 0;
		margin-bottom: 1.5rem;
		padding: 0;
		display: flex;
		flex-direction: column;
		row-gap: 0.5rem;

		list-style-type: none;
	}

	a {
		position: relative;
		display: block;
		padding: 0.25rem 0.5rem 0.25rem 0.75rem;

		border-radius: 0 0.25rem 0.25rem 0;
		outline: transparent solid 0.125rem;
		outline-offset: 1px;
		color: inherit;
		text-decoration: none;

		transition-property: outline-color, background-color;
		transition-duration: 0.3s;
	}
	a:hover {
		background-color: var(--link-hover-bg-clr, var(--background-secondary-clr));
	}
	a:focus-visible {
		outline-color: var(--focus-outline-clr);
		background-color: var(--link-hover-bg-clr, var(--background-secondary-clr));
	}
	a[aria-current] {
		background-color: var(--nav-current-clr);
		font-style: italic;
		cursor: default;
	}
	@media (prefers-reduced-motion: reduce) {
		a {
			transition: none;
		}
	}

	a::before {
		content: "";
		position: absolute;
		display: block;
		top: 0;
		bottom: 0;
		left: 0;
		width: 0.25rem;
		background-color: var(--background-tertiary-clr);
	}
	a.visited::before {
		background-color: var(--nav-visited-clr);
	}
	a[aria-current]::before {
		background-color: var(--nav-current-marker-clr);
	}
</style>
