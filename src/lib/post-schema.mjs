import { z } from 'astro/zod';

const text = z.string().trim().min(1);
// A blank "pubDate:" would otherwise be read as 1 January 1970.
const date = z.coerce.date().min(new Date('2000-01-01'));

// Strict: an unknown key (for example "Draft" instead of "draft") stops the build,
// so a post meant to stay a draft cannot be published by a typo.
export const postSchema = z
  .object({
    title: text,
    description: text,
    pubDate: date,
    updatedDate: date.optional(),
    draft: z.boolean().optional(),
  })
  .strict();
