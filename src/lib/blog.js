import { getCollection } from 'astro:content';
import { isPublished, sortNewestFirst } from './posts.mjs';

// Published posts, newest first. Drafts show in "npm run dev" only, never in a build.
export async function getPublishedPosts() {
  const posts = await getCollection('blog', (post) => isPublished(post, import.meta.env.PROD));
  return sortNewestFirst(posts);
}
