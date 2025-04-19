<script lang="ts">
	import trapFocusWithin from "$lib/actions/trapFocusWithin.svelte";
	import customSlide from "$lib/transitions/customSlide";
	import TopicPagesList from "./TopicPagesList.svelte";

	type Props = {
		isOpen: boolean;
		pages: readonly { title: string; subtitle: string; path: string }[];
		currentPath: string;
		onDismiss: () => void;
	};
	const { isOpen, pages, currentPath, onDismiss }: Props = $props();
	const topics = $derived(Object.groupBy(pages, page => page.title));

	function handleBodyKeyDown(event: KeyboardEvent) {
		if (event.key === "Escape" && isOpen) {
			event.preventDefault();
			onDismiss();
		}
	}
</script>

<svelte:body on:keydown={handleBodyKeyDown} />

{#if isOpen}
	<div
		class="container"
		use:trapFocusWithin
		transition:customSlide={{ duration: 500, amountY: "100% + 2rem" }}
	>
		<div class="button-wrapper">
			<button aria-label="Fechar menu" onclick={onDismiss}>
				<div class="close-icon" role="presentation"></div>
			</button>
		</div>
		<nav aria-label="Todas as páginas">
			<ol>
				{#each Object.entries(topics) as [title, pages]}
					<li>
						<TopicPagesList {title} pages={pages!} {currentPath} />
					</li>
				{/each}
			</ol>
		</nav>
	</div>
{/if}

<style>
	.container {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		max-height: 75%;
		display: flex;
		z-index: 1;
	}
	@media (prefers-reduced-motion: reduced) {
		.container {
			animation-duration: 0s;
		}
	}

	nav {
		flex-grow: 1;
		display: flex;
		padding: 2rem 0 0 2rem;

		background-color: var(--background-secondary-clr);
		outline: 1px solid var(--button-outline-clr);
		box-shadow: 0.75rem 0.25rem 0.5rem 0.75rem var(--nav-shadow-clr);
		--link-hover-bg-clr: var(--background-primary-clr);
	}

	.button-wrapper {
		position: absolute;
		top: 0;
		right: 0;
		translate: -0.5rem -50%;
		width: 3rem;
		height: 3rem;

		border-radius: 50%;
		background-color: var(--background-tertiary-clr);
	}
	button {
		width: 100%;
		height: 100%;
		padding: 0.75rem;

		border-radius: 50%;
		background-color: transparent;
		/* Usando fundo transparente para que a transição não ative quando o tema mudar */
		border: none;
		box-shadow: 0.25rem -0.5rem 0.5rem var(--nav-shadow-clr);
		color: inherit;
		font: inherit;
		font-size: 1.5rem;
		font-weight: bold;
		cursor: pointer;

		transition: background-color 0.3s;
	}

	button:hover,
	button:focus-visible {
		outline: 0.2rem solid var(--focus-outline-clr);
		background-color: var(--background-secondary-clr);
	}
	@media (prefers-reduced-motion: reduce) {
		button {
			transition: none;
		}
	}

	.close-icon {
		width: 100%;
		height: 100%;
		mask: url($lib/icons/close-icon.svg) center no-repeat;
		background-color: var(--text-primary-clr);
	}

	@media (min-width: 60rem) {
		.container {
			left: 3rem;
			right: 3rem;
		}
		nav {
			border-top-left-radius: 1rem;
		}
		.button-wrapper {
			translate: 40% -40%;
		}
		button {
			box-shadow: 1.25rem -0.5rem 0.5rem var(--nav-shadow-clr);
		}
	}

	ol {
		flex-grow: 1;
		margin: 0;
		padding: 0 2.5rem 0 0.125rem;

		display: flex;
		flex-wrap: wrap;
		column-gap: max(4rem, 5vw);
		row-gap: 3rem;

		overflow-y: auto;
		list-style: none;
	}

	li {
		flex: 1 10rem;
	}
</style>
