<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/state";

	type Props = { onMenuButtonClick: () => void };
	const { onMenuButtonClick }: Props = $props();

	const theme = $derived(page.url.searchParams.get("theme"));

	$effect(() => {
		if (theme === "light" || theme === "dark") {
			changeTheme(theme);
		} else {
			const prefersDark = matchMedia("(prefers-color-scheme: dark)").matches;
			changeTheme(prefersDark ? "dark" : "light");
		}
	});

	function toggleTheme() {
		changeTheme(theme === "light" ? "dark" : "light");
	}
	function changeTheme(newTheme: "light" | "dark") {
		goto("?theme=" + newTheme, { noScroll: true, keepFocus: true });
		document.documentElement.className = newTheme;
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
				<div class="icon theme-icon" role="img"></div>
			</button>
		</li>
		<li>
			<button aria-label="Menu de páginas" title="Menu de páginas" onclick={onMenuButtonClick}>
				<div class="icon menu-icon" role="img"></div>
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
	}

	button:hover,
	button:focus-visible {
		outline: 0.2rem solid var(--focus-outline-clr);
		animation: focus 0.3s forwards;
	}
	@keyframes focus {
		to {
			background-color: var(--background-secondary-clr);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		button {
			animation-duration: 0s;
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
