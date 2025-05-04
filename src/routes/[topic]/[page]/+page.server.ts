import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ url, fetch }) => {
	const path = url.pathname;
	const response = await fetch("/api" + path);

	if (response.status >= 400 && response.status <= 599) {
		error(response.status, response.statusText);
	}

	const pageContents = await response.json();
	return {
		path,
		...pageContents,
	};
}) satisfies PageServerLoad;
