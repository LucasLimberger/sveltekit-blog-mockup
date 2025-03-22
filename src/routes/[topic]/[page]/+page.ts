import type { PageLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { findPageContent } from "$lib/scripts/dataAcess";

export const load: PageLoad = async ({ params }) => {
	const pageContent = findPageContent(params.topic, params.page);

	if (pageContent === null) {
		error(404, "Not found");
	}
	return {
		topicName: params.topic,
		pageName: params.page,
		content: pageContent,
	};
};
