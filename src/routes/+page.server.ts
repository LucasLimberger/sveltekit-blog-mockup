import type { PageServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";

export const load = (async event => {
	const response = await event.fetch("/api/first-page-path");
	const pathname = await response.json();
	if (typeof pathname !== "string") {
		error(500, "Could not find first page");
	}
	redirect(307, pathname);
}) satisfies PageServerLoad;
