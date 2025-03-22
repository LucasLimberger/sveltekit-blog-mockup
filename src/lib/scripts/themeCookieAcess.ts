export function getThemeCookieValue(document: Document) {
	const value = document.cookie.match(/(?:^|; )theme=([^;]+)/)?.[1] ?? null;
	if (value === "dark" || value === "light") {
		return value;
	} else {
		return null;
	}
}

export function setThemeCookieValue(document: Document, value: "light" | "dark") {
	const oneYear = 60 * 60 * 24 * 365;
	document.cookie = `theme=${value}; max-age=${oneYear}; path=/`;
}
