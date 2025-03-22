<script lang="ts">
	import tokenize from "$lib/scripts/tokenize";

	type Props = { content: string };
	const { content }: Props = $props();

	const tokens = $derived(
		tokenize(content, {
			"code-string": /(['"])([^\\\n]|\\[^1-7])*?\1|`[^\$]*?`|`[^]*?\$\{|\}[^]*?(\$\{|`)/,
			"code-comment": /\/\/.*$|\/\*.*?\*\//m,
			"code-special-value": /(?<!\w)(true|false|null|undefined|NaN)(?!\w)/,
			"code-keyword":
				/(?<!\w)(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|export|extends|finally|for|from|function|get|if|import|in|instanceof|let|new|of|return|set|static|super|switch|this|throw|try|typeof|using|var|void|while|with|yield)(?!\w)/,
			"code-function": /\w+?(?= ?\()/,
			"code-number": /(?<![A-Za-z_])\d+(\.\d+)?(e[+-]\d+)?(?![A-Za-z_])/,
			"code-output-marker": /^> /m,
		}),
	);
</script>

<code>
	{#each tokens as token}
		{#if token.type === "none"}
			{token.value}
		{:else}
			<span class={token.type}>{token.value}</span>
		{/if}
	{/each}
</code>

<style>
	code {
		font-family: var(--code-font);
		font-size: inherit;
		line-height: 1.5;
		tab-size: 4;
		white-space: pre-wrap;
		word-break: break-all;
	}

	.code-comment {
		color: var(--code-comment-clr);
	}
	.code-string {
		color: var(--code-string-clr);
	}
	.code-keyword {
		color: var(--code-keyword-clr);
	}
	.code-special-value {
		color: var(--code-special-value-clr);
	}
	.code-function {
		color: var(--code-function-clr);
	}
	.code-number {
		color: var(--code-number-clr);
	}
	.code-output-marker {
		color: var(--code-comment-clr);
		font-weight: bold;
		font-style: normal;
	}
</style>
