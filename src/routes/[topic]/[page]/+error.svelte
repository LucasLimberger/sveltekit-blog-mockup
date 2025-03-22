<main>
	<div class="error-message-container">
		<h1>Página não encontrada</h1>
		<a href="/">Voltar ao início</a>
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
		justify-content: center;
		align-items: center;
		row-gap: 1rem;
		padding: 2rem;

		border-radius: 0.5rem;
		background-color: var(--background-secondary-clr);
		text-align: center;
	}

	h1 {
		margin: 0;
		font-size: 2rem;
		font-weight: normal;
	}

	a {
		color: var(--accent-clr);
		font-size: 1.125rem;
	}
</style>
