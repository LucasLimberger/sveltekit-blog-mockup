import type { PageServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";
import {
	findPageContents,
	nextPagePath,
	previousPagePath,
	allPageTitles,
} from "$lib/data/dataAcess";

export const load: PageServerLoad = async ({ params, url }) => {
	const path = url.pathname;
	const pageContents = findPageContents(path);
	if (pageContents === null) {
		error(404, "Not found");
	}
	return {
		path,
		title: pageContents.title,
		subtitle: pageContents.subtitle,
		content: pageContents.content,
		previousPagePath: previousPagePath(path),
		nextPagePath: nextPagePath(path),
		allPageTitles: allPageTitles(),
	};
};
