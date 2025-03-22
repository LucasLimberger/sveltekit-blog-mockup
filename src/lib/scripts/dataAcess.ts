import data from "./../data/data.json";

type Topic = (typeof data)[number];
type Page = Topic["pages"][number];

export function findPageContent(topicName: string, pageName: string) {
	const topicData = findTopicData(topicName);
	if (topicData === null) {
		return null;
	}

	const pageData = findPageData(topicData, pageName);
	if (pageData === null) {
		return null;
	}

	return pageData.content;
}

export function allTopicNames() {
	return data.map(topic => topic.title);
}

export function allPageNames(topicName: string) {
	const topicData = findTopicData(topicName);
	if (topicData === null) {
		return [];
	}
	return topicData.pages.map(page => page.subtitle);
}

export function firstPagePath() {
	return `/${data[0].title}/${data[0].pages[0].subtitle}`;
}

export function previousPage(topicName: string, pageName: string) {
	const topicIndex = findTopicIndex(topicName);
	if (topicIndex === -1) {
		return null;
	}

	const topicData = data[topicIndex];
	const pageIndex = findPageIndex(topicData, pageName);
	if (pageIndex === -1) {
		return null;
	}

	const previousPage = topicData.pages[pageIndex - 1] ?? null;
	if (previousPage !== null) {
		return `/${topicName}/${previousPage.subtitle}`;
	}

	const previousTopic = data[topicIndex - 1] ?? null;
	if (previousTopic === null) {
		return null;
	}
	return `/${previousTopic.title}/${previousTopic.pages.at(-1)!.subtitle}`;
}

export function nextPage(topicName: string, pageName: string) {
	const topicIndex = findTopicIndex(topicName);
	if (topicIndex === -1) {
		return null;
	}

	const topicData = data[topicIndex];
	const pageIndex = findPageIndex(topicData, pageName);
	if (pageIndex === -1) {
		return null;
	}

	const nextPage = topicData.pages[pageIndex + 1] ?? null;
	if (nextPage !== null) {
		return `/${topicName}/${nextPage.subtitle}`;
	}

	const nextTopic = data[topicIndex + 1] ?? null;
	if (nextTopic === null) {
		return null;
	}
	return `/${nextTopic.title}/${nextTopic.pages[0].subtitle}`;
}

function findTopicIndex(topicName: string) {
	return data.findIndex(topics => topics.title === topicName);
}
function findPageIndex(topic: Topic, pageName: string) {
	return topic.pages.findIndex(page => page.subtitle === pageName);
}
function findTopicData(topicName: string): Topic | null {
	return data.find(topics => topics.title === topicName) ?? null;
}
function findPageData(topic: Topic, pageName: string): Page | null {
	return topic.pages.find(page => page.subtitle === pageName) ?? null;
}
