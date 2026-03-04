import { defineCollection, z } from "astro:content";

const commonSchema = z.object({
	title: z.string(),
	date: z.coerce.date(),
	description: z.string(),
	link: z.string().optional(),
	draft: z.boolean().optional().default(false),
});

const news = defineCollection({
	type: "content",
	schema: commonSchema,
});

const blog = defineCollection({
	type: "content",
	schema: commonSchema,
});

export const collections = { news, blog };
