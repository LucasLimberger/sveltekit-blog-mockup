import type { RequestHandler } from "./$types";
import { error, json } from "@sveltejs/kit";
import data from "$lib/data/data.json";

export const GET: RequestHandler = async ({ params }) => {
	const { topic, page } = params;
	const pathname = `/${topic}/${page}`;
	const pageContents = findPageContents(pathname);

	if (pageContents === null) {
		error(404);
	}

	return json({
		...pageContents,
		nextPagePath: nextPagePath(pathname),
		previousPagePath: previousPagePath(pathname),
		allPageTitles: allPageTitles(),
	});
};

function findPageContents(path: string) {
	const [topicPath, pagePath] = path.slice(1).split("/");

	const topicData = data.find(topics => topics.pathDirectory === topicPath);
	if (topicData === undefined) {
		return null;
	}

	const pageData = topicData.pages.find(page => page.path === pagePath);
	if (pageData === undefined) {
		return null;
	}

	return {
		title: topicData.title,
		subtitle: pageData.subtitle,
		content: pageData.content,
	};
}

let memoTitles: readonly {
	readonly path: string;
	readonly title: string;
	readonly subtitle: string;
}[];
function allPageTitles() {
	memoTitles ??= data.flatMap(topic =>
		topic.pages.map(page => ({
			path: `/${topic.pathDirectory}/${page.path}`,
			title: topic.title,
			subtitle: page.subtitle,
		})),
	);
	return memoTitles;
}

function previousPagePath(path: string) {
	const [topicPath, pagePath] = path.slice(1).split("/");
	const topicIndex = findTopicIndex(topicPath);
	if (topicIndex === -1) {
		return null;
	}

	const topicData = data[topicIndex];
	const pageIndex = findPageIndex(topicData, pagePath);
	if (pageIndex === -1) {
		return null;
	}

	const previousPage = topicData.pages[pageIndex - 1] ?? null;
	if (previousPage !== null) {
		return `/${topicPath}/${previousPage.path}`;
	}

	const previousTopic = data[topicIndex - 1] ?? null;
	if (previousTopic === null) {
		return null;
	}
	return `/${previousTopic.pathDirectory}/${previousTopic.pages.at(-1)!.path}`;
}

function nextPagePath(path: string) {
	const [topicPath, pagePath] = path.slice(1).split("/");
	const topicIndex = findTopicIndex(topicPath);
	if (topicIndex === -1) {
		return null;
	}

	const topicData = data[topicIndex];
	const pageIndex = findPageIndex(topicData, pagePath);
	if (pageIndex === -1) {
		return null;
	}

	const nextPage = topicData.pages[pageIndex + 1] ?? null;
	if (nextPage !== null) {
		return `/${topicPath}/${nextPage.path}`;
	}

	const nextTopic = data[topicIndex + 1] ?? null;
	if (nextTopic === null) {
		return null;
	}
	return `/${nextTopic.pathDirectory}/${nextTopic.pages[0].path}`;
}

function findTopicIndex(topicPath: string) {
	return data.findIndex(topics => topics.pathDirectory === topicPath);
}
function findPageIndex(topic: (typeof data)[number], pagePath: string) {
	return topic.pages.findIndex(page => page.path === pagePath);
}
