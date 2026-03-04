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

export type UnifiedNewsItem = {
	slug: string;
	date: Date;
	description: string;
	link?: string;
};

export async function getUnifiedNews() {
	const [newsEntries, blogEntries] = await Promise.all([getAllNews(), getAllBlog()]);

	const manualNews: UnifiedNewsItem[] = newsEntries.map((item) => ({
		slug: `news-${item.slug}`,
		date: item.data.date,
		description: item.data.description,
		link: item.data.link,
	}));

	const blogNews: UnifiedNewsItem[] = blogEntries.map((item) => ({
		slug: `blog-${item.slug}`,
		date: item.data.date,
		description: `ブログを公開しました: ${item.data.title}`,
		link: `/blog/${item.slug}/`,
	}));

	const manualLinks = new Set(
		manualNews.map((item) => item.link).filter((link): link is string => Boolean(link)),
	);
	const filteredBlogNews = blogNews.filter(
		(item) => !item.link || !manualLinks.has(item.link),
	);

	return [...manualNews, ...filteredBlogNews].sort(
		(a, b) => b.date.getTime() - a.date.getTime(),
	);
}
