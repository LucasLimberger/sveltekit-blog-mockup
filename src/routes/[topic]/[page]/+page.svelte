<script lang="ts">
	import OptionsMenu from "$lib/components/OptionsMenu.svelte";
	import TopicPagesList from "$lib/components/TopicPagesList.svelte";
	import NavMenu from "$lib/components/NavMenu.svelte";
	import PrevNextButtons from "$lib/components/PrevNextButtons.svelte";
	import ContentDelegator from "$lib/components/ContentDelegator.svelte";

	const { data } = $props();
	const currentPath = $derived(data.path);
	const title = $derived(data.title);
	const subtitle = $derived(data.subtitle);
	const pageContent = $derived(data.content);
	const previousPagePath = $derived(data.previousPagePath);
	const nextPagePath = $derived(data.nextPagePath);
	const allPageTitles = $derived(data.allPageTitles);
	const currentTopicTitles = $derived(data.allPageTitles.filter(page => page.title === title));

	let visitedPaths = $state<string[]>([]);
	$effect(() => {
		const localStorageValue = localStorage.getItem("visitedPages");
		if (localStorageValue !== null) {
			visitedPaths = localStorageValue.split(",");
		}
	});
	$effect(() => {
		if (!visitedPaths.includes(currentPath)) {
			visitedPaths.push(currentPath);
			localStorage.setItem("visitedPages", visitedPaths.join(","));
		}
	});

	let menuIsOpen = $state(false);
	function toggleMenu() {
		menuIsOpen = !menuIsOpen;
	}
</script>

<svelte:head>
	<title>{title} - {subtitle}</title>
</svelte:head>

<div class="page-wrapper">
	<aside>
		<div class="separator" role="presentation"></div>
		<OptionsMenu onMenuButtonClick={toggleMenu} />
		<div class="separator" role="presentation"></div>
		<nav>
			<TopicPagesList {title} pages={currentTopicTitles} {currentPath} {visitedPaths} />
		</nav>
		<NavMenu
			isOpen={menuIsOpen}
			pages={allPageTitles}
			{currentPath}
			{visitedPaths}
			onDismiss={toggleMenu}
		/>
	</aside>
	<main>
		<article>
			<header>
				<h1>{title}</h1>
				<div class="separator accent" role="presentation"></div>
				<h2>{subtitle}</h2>
			</header>
			<section>
				<ContentDelegator content={pageContent} />
			</section>
		</article>
		<PrevNextButtons {previousPagePath} {nextPagePath} />
	</main>
</div>

<style>
	.page-wrapper {
		max-width: 90rem;
		margin-inline: auto;
		isolation: isolate;

		display: grid;
		grid-template-areas:
			"main"
			"sidebar";
		row-gap: 3rem;
		padding-inline: max(7vw, 2.5rem);
		padding-bottom: 2rem;
	}

	aside {
		z-index: 1;
		grid-area: sidebar;
		display: flex;
		flex-direction: column;
		row-gap: 1rem;
	}

	@media (min-width: 60rem) {
		/* 60rem = 960px */
		.page-wrapper {
			grid-template-areas: "sidebar main";
			grid-template-columns: 1fr 4fr;
			column-gap: 4rem;
			padding: 0 4rem 0 2rem;
		}

		aside {
			position: sticky;
			top: 0;
			padding-top: 2.4rem;
			max-height: 100dvh;
		}

		aside > .separator:first-child {
			display: none;
		}

		nav {
			padding: 0 0.5rem 0.25rem 0.25rem;
			overflow-y: auto;
		}
	}

	.separator {
		height: 0.25rem;
		background-color: var(--background-tertiary-clr);
	}
	.separator.accent {
		background-color: var(--accent-clr);
	}

	main {
		grid-area: main;
		display: flex;
		flex-direction: column;
		row-gap: 2.5rem;
		padding-block: 2rem;

		background-color: var(--background-primary-clr);
	}

	h1,
	h2 {
		font-family: var(--heading-font);
		font-weight: bold;
		letter-spacing: var(--heading-font-letter-spacing);
	}
	h1 {
		margin: 0;
		font-size: 2.75rem;
	}
	h2 {
		margin: 0.5em 0 1em 0;
		font-size: 2rem;
		font-style: italic;
	}
	h2::before {
		content: ">";
		margin-right: 0.25ch;
		font-style: normal;
		color: var(--accent-clr);
	}
</style>
