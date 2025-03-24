<script lang="ts">
	import { goto } from "$app/navigation";
	import { firstPagePath } from "$lib/data/dataAcess";
	import { getThemeCookieValue, setThemeCookieValue } from "$lib/scripts/themeCookieAcess";

	if (typeof window !== "undefined") {
		if (getThemeCookieValue(document) === null) {
			const theme = matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
			setThemeCookieValue(document, theme);
		}
		goto(firstPagePath(), { replaceState: true });
	}
</script>
