import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { firstPagePath } from "$lib/data/dataAcess";

export const load: PageServerLoad = async () => {
	redirect(307, firstPagePath());
};
