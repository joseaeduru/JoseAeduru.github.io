// Pure helpers for blog posts. No Astro imports, so Node can test this file directly.

export function isPublished(post, isProd) {
  return isProd ? post.data.draft !== true : true;
}

export function sortNewestFirst(posts) {
  return [...posts].sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
