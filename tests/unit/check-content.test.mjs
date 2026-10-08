import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import {
  findPublicViolations,
  findSensitiveViolations,
  findRepoViolations,
  listRepoFiles,
  parseTerms,
  loadTerms,
} from '../../scripts/check-content.mjs';

// Every value in this file is made up. This repo is public: never paste a real
// phone number, a real address or a real private term into a test.

const OK_PAGE = `<html><head><style>.a{margin:0 auto}@media (min-width:600px){.a{b:"555 010 0100"}}</style></head>
<body><a href="mailto:mailmejo9@gmail.com">mailmejo9@gmail.com</a>
<a href="https://www.linkedin.com/in/jose1038">LinkedIn</a>
<p>Aug 2025 – Present. Reviewed 109 features for 26B and 129 for 26C.</p></body></html>`;

test('clean page has no public violations', () => {
  assert.deepEqual(findPublicViolations(OK_PAGE), []);
});

test('formatted phone numbers are caught', () => {
  assert.equal(findPublicViolations('<p>(555) 010-0199</p>').length, 1);
  assert.equal(findPublicViolations('<p>555-010-0199</p>').length, 1);
  assert.equal(findPublicViolations('<p>555.010.0199</p>').length, 1);
});

test('unformatted phone numbers and tel links are caught', () => {
  const found = findPublicViolations('<a href="tel:+15550100199">+1-5550100199</a>');
  assert.ok(found.some((v) => v.startsWith('tel link')));
  assert.ok(found.some((v) => v.startsWith('phone number')));
});

test('em dashes are caught in every spelling', () => {
  assert.equal(findPublicViolations('<p>a — b</p>').length, 1);
  assert.equal(findPublicViolations('<p>a &mdash; b</p>').length, 1);
  assert.equal(findPublicViolations('<p>a &#8212; b</p>').length, 1);
});

test('en dashes are allowed', () => {
  assert.deepEqual(findPublicViolations('<p>Jun 2024 – Jul 2025</p>'), []);
});

test('any other email address is caught', () => {
  const found = findPublicViolations('<a href="mailto:someone@example.com">x</a>');
  assert.ok(found.some((v) => v.includes('someone@example.com')));
});

test('allowed email is case-insensitive', () => {
  assert.deepEqual(findPublicViolations('<p>MailMeJo9@Gmail.com</p>'), []);
});

test('any other LinkedIn profile URL is caught', () => {
  const found = findPublicViolations('<a href="https://linkedin.com/in/someone-else-123">x</a>');
  assert.ok(found.some((v) => v.startsWith('LinkedIn URL')));
});

test('parseTerms drops blanks and comments', () => {
  assert.deepEqual(parseTerms('# note\n\nAlpha Beta\r\n  Gamma  \n'), ['Alpha Beta', 'Gamma']);
});

test('sensitive terms match regardless of case', () => {
  assert.equal(findSensitiveViolations('<p>the alpha beta thing</p>', ['Alpha Beta']).length, 1);
});

test('sensitive terms match when words are joined or split across lines', () => {
  assert.equal(findSensitiveViolations('<p>AlphaBeta</p>', ['Alpha Beta']).length, 1);
  assert.equal(findSensitiveViolations('<p>Alpha\n              Beta</p>', ['Alpha Beta']).length, 1);
  assert.equal(findSensitiveViolations('<p>Alpha&nbsp;Beta</p>', ['Alpha Beta']).length, 1);
});

test('sensitive terms match when hyphenated, in a URL, or split by markup', () => {
  const terms = ['Alpha Beta'];
  assert.equal(findSensitiveViolations('<p>Alpha-Beta</p>', terms).length, 1, 'hyphen');
  assert.equal(findSensitiveViolations('<a href="/blog/alpha-beta-notes/">x</a>', terms).length, 1, 'slug');
  assert.equal(findSensitiveViolations('<p>Alpha <em>Beta</em></p>', terms).length, 1, 'inline tag');
  assert.equal(findSensitiveViolations('<p>Alpha<br>Beta</p>', terms).length, 1, 'line break tag');
  assert.equal(findSensitiveViolations('<p>Alpha&shy;Beta</p>', terms).length, 1, 'soft hyphen');
  assert.equal(findSensitiveViolations('<p>Alpha&#xA0;Beta</p>', terms).length, 1, 'hex entity');
});

test('sensitive terms match in the plural', () => {
  assert.equal(findSensitiveViolations('<p>two ZZQs</p>', ['ZZQ']).length, 1);
});

test('short sensitive terms do not match inside longer words', () => {
  assert.deepEqual(findSensitiveViolations('<p>zzqx and azzq and Alphabet Beta</p>', ['ZZQ', 'Alpha Beta']), []);
  assert.equal(findSensitiveViolations('<p>the ZZQ feed</p>', ['ZZQ']).length, 1);
});

test('number terms match with or without the comma, and only as whole numbers', () => {
  assert.equal(findSensitiveViolations('<p>compared 9,876 items</p>', ['9,876']).length, 1);
  assert.equal(findSensitiveViolations('<p>compared 9876 items</p>', ['9,876']).length, 1);
  assert.deepEqual(findSensitiveViolations('<p>19,8760 items</p>', ['9,876']), []);
});

test('a phone number term matches every way of writing it', () => {
  const terms = ['555 010 0199'];
  for (const text of ['(555) 010-0199', '555-010-0199', '555.010.0199', '5550100199', '(555)010-0199']) {
    assert.equal(findSensitiveViolations(`<p>${text}</p>`, terms).length, 1, text);
  }
});

test('repo scan names the file that holds a sensitive term', () => {
  const files = [
    { path: 'src/content/blog/draft.md', content: '---\ndraft: true\n---\nNotes on Alpha-Beta.' },
    { path: 'README.md', content: 'Nothing private here.' },
  ];
  assert.deepEqual(findRepoViolations(files, ['Alpha Beta']), [
    'src/content/blog/draft.md: sensitive term: Alpha Beta',
  ]);
});

test('repo file list covers source and tests, and skips ignored files and the lockfile', () => {
  const files = listRepoFiles();
  assert.ok(files.includes('package.json'));
  assert.ok(files.includes('tests/unit/check-content.test.mjs'));
  assert.ok(files.includes('src/content/blog/post-template.md'));
  assert.ok(!files.includes('package-lock.json'));
  assert.ok(!files.some((f) => f.startsWith('banned-terms')));
  assert.ok(!files.some((f) => f.startsWith('docs/superpowers') || f.startsWith('node_modules') || f.startsWith('dist')));
});

test('loadTerms throws when the file is missing', async () => {
  await assert.rejects(loadTerms(path.join(tmpdir(), 'no-such-terms-file.txt')), /not found/);
});

test('loadTerms throws when the file has no terms', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'terms-'));
  const file = path.join(dir, 'terms.txt');
  await writeFile(file, '# only a comment\n\n');
  await assert.rejects(loadTerms(file), /no terms/);
});

test('loadTerms rejects a file that is not UTF-8, instead of matching nothing', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'terms-'));
  const file = path.join(dir, 'terms.txt');
  await writeFile(file, Buffer.from('﻿Alpha Beta\r\nGamma\r\n', 'utf16le'));
  await assert.rejects(loadTerms(file), /UTF-8/);
});

test('loadTerms returns the terms, with or without a UTF-8 byte order mark', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'terms-'));
  const file = path.join(dir, 'terms.txt');
  await writeFile(file, '# c\nAlpha Beta\nGamma\n');
  assert.deepEqual(await loadTerms(file), ['Alpha Beta', 'Gamma']);
  await writeFile(file, '﻿Alpha Beta\nGamma\n');
  assert.deepEqual(await loadTerms(file), ['Alpha Beta', 'Gamma']);
});
