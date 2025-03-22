<script lang="ts">
	import { prefersReducedMotion } from "svelte/motion";
	import { slide } from "svelte/transition";
	import { cubicOut } from "svelte/easing";
	import TextFormatter from "./TextFormatter.svelte";

	type Props = { content: string };
	const { content }: Props = $props();

	const [question, ...options] = $derived(content.split("|").slice(0, -1));
	const explanation = $derived(content.split("|").at(-1))!;

	// svelte-ignore state_referenced_locally
	const optionsClicked = $state(Array(options.length).fill(false));

	let correctlyAnswered = $state(false);
	function handleClick(index: number) {
		optionsClicked[index] = true;
		if (options[index].startsWith("*")) {
			correctlyAnswered = true;
		}
	}
</script>

<div>
	{#if question !== ""}
		<p><TextFormatter content={question} /></p>
	{/if}
	<ul>
		{#each options as text, index}
			{@const isCorrect = text.startsWith("*")}
			{@const wasClicked = optionsClicked[index]}
			<li>
				<button
					disabled={wasClicked}
					class={[wasClicked && (isCorrect ? "correct" : "incorrect")]}
					onclick={() => handleClick(index)}
				>
					<TextFormatter content={isCorrect ? text.slice(1) : text} />
				</button>
			</li>
		{/each}
	</ul>
	{#if correctlyAnswered && explanation !== ""}
		<p in:slide={{ duration: prefersReducedMotion.current ? 0 : 500, easing: cubicOut }}>
			<TextFormatter content={explanation} />
		</p>
	{/if}
</div>

<style>
	p {
		margin-block: 1em;
		padding: 0.5rem;
		border-radius: 0.25rem;
		border: 1px solid var(--background-tertiary-clr);
		line-height: 1.5;
	}

	ul {
		margin: 1em 0;
		padding: 0;
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		gap: 0.75rem;
		list-style-type: none;
	}

	button {
		margin: 0;
		width: 100%;
		padding: 0.5rem 1rem;

		border-radius: 2rem;
		background-color: var(--background-secondary-clr);
		border: none;
		outline: 1px solid var(--button-outline-clr);
		font: inherit;
		color: inherit;
		text-align: left;
		text-box: auto;

		transition: background-color 0.3s;
	}
	button:not(:disabled) {
		cursor: pointer;
	}
	button:not(:disabled):hover,
	button:not(:disabled):focus-visible {
		outline: 0.2rem solid var(--focus-outline-clr);
		background-color: var(--background-prmiary-clr);
	}

	button.correct {
		position: relative;
		isolation: isolate;
		overflow: hidden;
		display: flex;
	}
	button.correct::before {
		content: "";
		align-self: center;
		position: absolute;
		inset-inline: 0;
		aspect-ratio: 1;
		z-index: -1;

		border-radius: 100%;
		background-color: var(--answer-correct-clr);
		animation: grow 0.3s ease-in-out;
	}

	@keyframes grow {
		0% {
			scale: 0;
		}
		100% {
			scale: 1;
		}
	}

	button.incorrect {
		background-color: var(--answer-incorrect-clr);
		animation-name: bgColorShift, shake;
		animation-duration: 500ms;
		animation-timing-function: ease-out;
		animation-fill-mode: forwards;
	}

	@keyframes bgColorShift {
		0% {
			background-color: var(--background-secondary-clr);
		}
	}

	@keyframes shake {
		12.5% {
			translate: -0.25rem 0;
		}
		25% {
			translate: 0.3rem 0;
		}
		37.5% {
			translate: -0.4rem 0;
		}
		50% {
			translate: 0.3rem 0;
		}
		75% {
			translate: -0.25rem 0;
		}
		100% {
			translate: 0 0;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		button.correct::before,
		button.incorrect {
			animation-duration: 0s;
		}
	}
</style>
