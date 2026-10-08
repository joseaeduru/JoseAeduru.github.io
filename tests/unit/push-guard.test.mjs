import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

// This repo is public. The private-terms check can only run on the owner's PC,
// so it has to run before every push, not only when someone remembers.

test('a pre-push hook runs the full verify chain', () => {
  assert.ok(existsSync('.githooks/pre-push'), '.githooks/pre-push is missing');
  const hook = readFileSync('.githooks/pre-push', 'utf8');
  assert.match(hook, /^#!\/bin\/sh/);
  assert.match(hook, /npm run verify/);
});

test('npm install points git at the hooks folder', () => {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  assert.equal(pkg.scripts.prepare, 'node scripts/install-hooks.mjs');
  const installer = readFileSync('scripts/install-hooks.mjs', 'utf8');
  assert.match(installer, /core\.hooksPath/);
  assert.match(installer, /\.githooks/);
});
