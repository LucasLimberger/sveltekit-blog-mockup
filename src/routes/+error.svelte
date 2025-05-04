<script lang="ts">
	import { page } from "$app/state";
	const heading = $derived(page.status === 404 ? "Página não encontrada" : "Algo deu errado");
	function goBack() {
		history.back();
	}
</script>

<main>
	<div class="error-message-container">
		<h1>{heading}<span>({page.status})</span></h1>
		<div class="options">
			<button onclick={goBack}>Voltar</button>
			<a href="/">Voltar ao início</a>
		</div>
	</div>
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
	}

	.error-message-container {
		display: flex;
		flex-direction: column;
		row-gap: 2.5rem;
		text-align: center;
	}

	h1 {
		margin: 0;
		padding: 0.75rem 1rem;
		border-radius: 0.5rem;
		background-color: var(--background-secondary-clr);
		font-size: 2rem;
	}
	span {
		margin-left: 1.5ch;
		color: var(--code-comment-clr);
		font-family: var(--code-font);
		font-size: 1.125rem;
		font-weight: normal;
	}

	.options {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		column-gap: 3rem; /* valor mínimo*/
		padding-inline: 1rem;
		font-weight: bold;
	}

	a {
		padding: 0.25rem;
		color: var(--accent-clr);
		font-size: 1.125rem;
		text-decoration: none;
	}
	a:hover,
	a:focus-visible {
		color: var(--accent-highlight-clr);
		text-decoration: underline 0.125rem;
	}
	a:focus-visible {
		border-radius: 0.25rem;
		outline: 0.125rem solid var(--focus-outline-clr);
	}

	button {
		padding: 0.5rem 1rem;
		border-radius: 1.25rem;
		background-color: var(--accent-clr);
		border: none;
		color: inherit;
		font: inherit;
		font-size: 1.125rem;
		cursor: pointer;
	}
	button:hover,
	button:focus-visible {
		text-decoration: underline 0.125rem;
		background-color: var(--accent-highlight-clr);
	}
	button:focus-visible {
		outline: 0.125rem solid var(--focus-outline-clr);
		outline-offset: 0.125rem;
	}
</style>
