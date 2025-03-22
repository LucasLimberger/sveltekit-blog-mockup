import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
	let theme = event.cookies.get("theme");

	if (theme === "dark") {
		return await resolve(event, {
			transformPageChunk({ html }) {
				return html.replace("<html", '<html class="dark"');
			},
		});
	}

	return await resolve(event);
};
