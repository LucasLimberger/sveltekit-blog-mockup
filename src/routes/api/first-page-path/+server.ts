import type { RequestHandler } from "./$types";
import { json } from "@sveltejs/kit";
import data from "$lib/data/data.json";

export const GET: RequestHandler = async () => {
	const path = `/${data[0].pathDirectory}/${data[0].pages[0].path}`;
	return json(path);
};
