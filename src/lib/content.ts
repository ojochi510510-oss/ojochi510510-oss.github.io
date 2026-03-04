import { getCollection } from "astro:content";

const sortByDateDesc = <T extends { data: { date: Date } }>(a: T, b: T) =>
	b.data.date.getTime() - a.data.date.getTime();

export async function getAllNews() {
	const entries = await getCollection("news", ({ data }) => !data.draft);
	return entries.sort(sortByDateDesc);
}

export async function getAllBlog() {
	const entries = await getCollection("blog", ({ data }) => !data.draft);
	return entries.sort(sortByDateDesc);
}
