import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";
import {
	findPageContents,
	nextPagePath,
	previousPagePath,
	allPageTitles,
} from "$lib/data/dataAcess";

export const load: PageLoad = async ({ params }) => {
	const path = `/${params.topic}/${params.page}`;
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
