import test from 'node:test';
import assert from 'node:assert/strict';
import { postSchema } from '../../src/lib/post-schema.mjs';

const good = { title: 'A post', description: 'What it covers.', pubDate: '2026-10-07' };
const ok = (data) => postSchema.safeParse(data).success;

test('a complete post is accepted, with or without the optional fields', () => {
  assert.equal(ok(good), true);
  assert.equal(ok({ ...good, draft: true, updatedDate: '2026-10-08' }), true);
});

test('a misspelled draft flag is rejected, so an unfinished post cannot go live', () => {
  assert.equal(ok({ ...good, Draft: true }), false);
  assert.equal(ok({ ...good, drafts: true }), false);
});

test('a blank date is rejected instead of becoming 1970', () => {
  assert.equal(ok({ ...good, pubDate: null }), false);
  assert.equal(ok({ ...good, pubDate: 'not-a-date' }), false);
});

test('an empty title or description is rejected', () => {
  assert.equal(ok({ ...good, title: '' }), false);
  assert.equal(ok({ ...good, title: '   ' }), false);
  assert.equal(ok({ ...good, description: '' }), false);
});

test('a missing field is rejected', () => {
  for (const key of ['title', 'description', 'pubDate']) {
    const data = { ...good };
    delete data[key];
    assert.equal(ok(data), false, key);
  }
});
