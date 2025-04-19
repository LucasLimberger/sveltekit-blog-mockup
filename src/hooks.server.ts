import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	const theme = event.url.searchParams.get("theme");
	if (theme === "dark" || theme === "light") {
		return await resolve(event, {
			transformPageChunk({ html }) {
				return html.replace("<html", `<html class="${theme}"`);
			},
		});
	}
	return await resolve(event);
};
