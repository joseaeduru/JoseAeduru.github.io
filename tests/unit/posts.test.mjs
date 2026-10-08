import test from 'node:test';
import assert from 'node:assert/strict';
import { isPublished, sortNewestFirst, formatDate } from '../../src/lib/posts.mjs';

const post = (id, date, draft) => ({ id, data: { pubDate: new Date(date), draft } });

test('drafts are hidden in a production build', () => {
  assert.equal(isPublished(post('a', '2026-10-01', true), true), false);
});

test('posts without a draft flag, or with draft false, are published', () => {
  assert.equal(isPublished(post('a', '2026-10-01', undefined), true), true);
  assert.equal(isPublished(post('a', '2026-10-01', false), true), true);
});

test('drafts are visible in dev so they can be previewed', () => {
  assert.equal(isPublished(post('a', '2026-10-01', true), false), true);
});

test('posts sort newest first without changing the input', () => {
  const input = [post('old', '2026-01-05'), post('new', '2026-10-01'), post('mid', '2026-06-15')];
  assert.deepEqual(sortNewestFirst(input).map((p) => p.id), ['new', 'mid', 'old']);
  assert.deepEqual(input.map((p) => p.id), ['old', 'new', 'mid']);
});

test('one published post is enough to show the blog', () => {
  const posts = [post('draft', '2026-10-07', true), post('live', '2026-10-08', false)];
  assert.deepEqual(posts.filter((p) => isPublished(p, true)).map((p) => p.id), ['live']);
});

test('dates print the same in every time zone', () => {
  assert.equal(formatDate(new Date('2026-10-07')), 'October 7, 2026');
  assert.equal(formatDate(new Date('2026-01-01')), 'January 1, 2026');
});
