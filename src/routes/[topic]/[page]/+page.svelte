<script lang="ts">
	import OptionsMenu from "$lib/components/OptionsMenu.svelte";
	import TopicNavList from "$lib/components/TopicNavList.svelte";
	import NavMenu from "$lib/components/NavMenu.svelte";
	import PrevNextButtons from "$lib/components/PrevNextButtons.svelte";
	import ContentDelegator from "$lib/components/ContentDelegator.svelte";

	const { data } = $props();
	const topicName = $derived(data.topicName);
	const pageName = $derived(data.pageName);
	const content = $derived(data.content);
	const currentPathname = $derived(`/${topicName}/${pageName}`);

	let menuOpen = $state(false);
	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	const visitedPaths = $state(getVisitedPaths());
	$effect(() => {
		if (!visitedPaths.includes(currentPathname)) {
			visitedPaths.push(currentPathname);
		}
	});
	$effect(() => {
		localStorage.setItem("visitedPaths", [...visitedPaths].join(","));
	});

	function getVisitedPaths() {
		if (typeof window === "undefined") {
			return [];
		}
		const localStorageValue = localStorage.getItem("visitedPaths");
		if (localStorageValue === null) {
			return [];
		}
		return localStorageValue.split(",");
	}
</script>

<svelte:head>
	<title>{topicName} - {pageName}</title>
</svelte:head>

<div class="page-wrapper">
	<aside>
		<div class="separator" role="presentation"></div>
		<OptionsMenu onMenuButtonClick={toggleMenu} />
		<div class="separator" role="presentation"></div>
		<nav>
			<TopicNavList {topicName} {currentPathname} {visitedPaths} />
		</nav>
		<NavMenu isOpen={menuOpen} {currentPathname} {visitedPaths} onDismiss={toggleMenu} />
	</aside>
	<main>
		<article>
			<header>
				<h1>{topicName}</h1>
				<div class="separator accent" role="presentation"></div>
				<h2>{pageName}</h2>
			</header>
			<section>
				<ContentDelegator contentFragments={content} />
			</section>
		</article>
		<PrevNextButtons currentTopic={topicName} currentPage={pageName} />
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
