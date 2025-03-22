<script lang="ts">
	import { getThemeCookieValue, setThemeCookieValue } from "$lib/scripts/themeCookieAcess";

	type Props = { onMenuButtonClick: () => void };
	const { onMenuButtonClick }: Props = $props();

	type ThemeOption = "light" | "dark";
	let theme = $state<ThemeOption>("dark");

	$effect(() => {
		let startingTheme: ThemeOption =
			getThemeCookieValue(document) ??
			(matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
		setTheme(startingTheme);
	});

	function toggleTheme() {
		setTheme(theme === "light" ? "dark" : "light");
	}

	function setTheme(value: ThemeOption) {
		theme = value;
		document.documentElement.classList.toggle("dark", value === "dark");
		setThemeCookieValue(document, value);
	}
</script>

<div>
	<menu>
		<li>
			<button
				aria-label="Mudar tema"
				aria-pressed={theme === "dark"}
				title="Mudar tema"
				onclick={toggleTheme}
			>
				<div class="icon theme-icon" role="presentation"></div>
			</button>
		</li>
		<li>
			<button aria-label="Menu de páginas" title="Menu de páginas" onclick={onMenuButtonClick}>
				<div class="icon menu-icon"></div>
			</button>
		</li>
	</menu>
</div>

<style>
	menu {
		margin: 0;
		padding: 0;
		display: flex;
		justify-content: space-between;

		list-style: none;
	}

	button {
		margin: 0;
		width: 2.5rem;
		height: 2.5rem;
		padding: 0.375rem;

		border-radius: 0.5rem;
		background-color: var(--background-tertiary-clr);
		border: none;
		outline: 1px solid var(--button-outline-clr);
		color: inherit;
		font: inherit;
		cursor: pointer;

		transition: background-color 0.3s;
	}
	button:hover,
	button:focus-visible {
		background-color: var(--background-secondary-clr);
		outline: 0.2rem solid var(--focus-outline-clr);
	}
	@media (prefers-reduced-motion: reduce) {
		button {
			transition: none;
		}
	}

	.icon {
		width: 100%;
		height: 100%;
		background-color: var(--text-primary-clr);
		mask-position: center;
		mask-repeat: no-repeat;
	}

	.menu-icon {
		mask-image: url($lib/icons/menu-icon.svg);
	}

	.theme-icon {
		mask-image: url($lib/icons/theme-icon.svg);
	}
</style>
