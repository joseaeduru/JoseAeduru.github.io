// Scans for content that must not be published: the built HTML in dist/, and every
// file git would push (this repo is public, so source, drafts and tests count too).
// Public rules live here. Private terms live in banned-terms.local.txt, which is never committed.
import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ALLOWED_EMAIL = 'mailmejo9@gmail.com';
export const ALLOWED_LINKEDIN = 'linkedin.com/in/jose1038';
export const TERMS_FILE = 'banned-terms.local.txt';

const PHONE = /\(?\b\d{3}\)?[ .-]\d{3}[ .-]\d{4}\b/g;
const PHONE_RUN = /(?<![\w.])\+?1?-?\d{10}(?!\w)/g;
const TEL_LINK = /tel:/gi;
const EM_DASH = /\u2014|&mdash;|&#8212;|&#x2014;/gi;
const EMAIL = /[a-z0-9._%+-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)+/gi;
const LINKEDIN = /linkedin\.com\/in\/[a-z0-9_-]+/gi;

function withoutStyles(html) {
  return html.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ');
}

export function findPublicViolations(html) {
  const text = withoutStyles(html);
  const found = [];
  for (const m of text.matchAll(PHONE)) found.push(`phone number: ${m[0]}`);
  for (const m of text.matchAll(PHONE_RUN)) found.push(`phone number: ${m[0]}`);
  for (const m of text.matchAll(TEL_LINK)) found.push(`tel link: ${m[0]}`);
  for (const m of text.matchAll(EM_DASH)) found.push(`em dash: ${m[0]}`);
  for (const m of text.matchAll(EMAIL)) {
    if (m[0].toLowerCase() !== ALLOWED_EMAIL) found.push(`email address: ${m[0]}`);
  }
  for (const m of text.matchAll(LINKEDIN)) {
    if (m[0].toLowerCase() !== ALLOWED_LINKEDIN) found.push(`LinkedIn URL: ${m[0]}`);
  }
  return found;
}

export function parseTerms(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line !== '' && !line.startsWith('#'));
}

const NAMED_ENTITIES = { nbsp: ' ', shy: '\u00ad', amp: '&', hyphen: '-', ndash: '\u2013', mdash: '\u2014' };

function codePoint(value, original) {
  try {
    return String.fromCodePoint(value);
  } catch {
    return original;
  }
}

function decodeEntities(text) {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (match, hex) => codePoint(parseInt(hex, 16), match))
    .replace(/&#(\d+);/g, (match, digits) => codePoint(Number(digits), match))
    .replace(/&([a-z]+);/gi, (match, name) => NAMED_ENTITIES[name.toLowerCase()] ?? match);
}

// Words of a term may be joined, or separated by a few characters that are not
// letters or digits (space, hyphen, slash, soft hyphen). A comma inside a number
// is optional, and a word may carry a plural "s".
function termPattern(term) {
  const words = term
    .trim()
    .split(/\s+/)
    .map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/,/g, ',?'));
  const plural = /[a-z]$/i.test(term.trim()) ? 's?' : '';
  return new RegExp(`(?<![a-z0-9])${words.join('[^a-z0-9]{0,6}')}${plural}(?![a-z0-9])`, 'i');
}

// Looks at the text twice: as written (so URLs and attributes count) and with
// the tags removed (so a term split by markup still counts).
export function findSensitiveViolations(html, terms) {
  const raw = decodeEntities(html).replace(/\s+/g, ' ');
  const views = [raw, raw.replace(/<[^>]*>/g, '')];
  return terms
    .filter((term) => {
      const pattern = termPattern(term);
      return views.some((view) => pattern.test(view));
    })
    .map((term) => `sensitive term: ${term}`);
}

// The repo is public, so drafts, tests and docs are as visible as the built pages.
export function findRepoViolations(files, terms) {
  return files.flatMap((file) =>
    findSensitiveViolations(file.content, terms).map((item) => `${file.path}: ${item}`),
  );
}

const SKIPPED_FILES = new Set(['package-lock.json']);
const BINARY_FILE = /\.(png|jpe?g|gif|webp|avif|ico|woff2?|ttf|eot|pdf|zip)$/i;

// Every file git would publish: tracked files plus new files that are not ignored.
export function listRepoFiles() {
  const out = execFileSync('git', ['ls-files', '-z', '--cached', '--others', '--exclude-standard'], {
    encoding: 'utf8',
  });
  return out
    .split('\0')
    .filter((file) => file !== '' && !SKIPPED_FILES.has(file) && !BINARY_FILE.test(file));
}

export async function loadTerms(file) {
  if (!existsSync(file)) {
    throw new Error(`${file} not found. It lists private terms and is kept off GitHub. Restore it before pushing.`);
  }
  const bytes = await readFile(file);
  const text = bytes.toString('utf8');
  // A file saved as UTF-16 (Windows PowerShell does this) would load as terms that match nothing.
  if (bytes.includes(0) || text.includes('�')) {
    throw new Error(`${file} is not saved as UTF-8. Save it again as UTF-8, or the check cannot read it.`);
  }
  const terms = parseTerms(text);
  if (terms.length === 0) throw new Error(`${file} has no terms.`);
  return terms;
}

async function main() {
  const publicOnly = process.argv.includes('--public-only');
  if (!existsSync('dist')) {
    console.error('dist/ not found. Run "npm run build" first.');
    process.exit(1);
  }
  const files = (await readdir('dist', { recursive: true })).filter((f) => f.endsWith('.html'));
  if (files.length === 0) {
    console.error('No HTML files in dist/.');
    process.exit(1);
  }
  let terms = [];
  if (!publicOnly) {
    try {
      terms = await loadTerms(TERMS_FILE);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }
  let problems = 0;
  for (const file of files) {
    const html = await readFile(path.join('dist', file), 'utf8');
    const found = [...findPublicViolations(html), ...findSensitiveViolations(html, terms)];
    for (const item of found) {
      console.error(`${file}: ${item}`);
      problems += 1;
    }
  }
  let repoFiles = [];
  if (!publicOnly) {
    for (const file of listRepoFiles()) {
      if (existsSync(file)) repoFiles.push({ path: file, content: await readFile(file, 'utf8') });
    }
    for (const item of findRepoViolations(repoFiles, terms)) {
      console.error(item);
      problems += 1;
    }
  }
  if (problems > 0) {
    console.error(`Content check failed: ${problems} problem(s).`);
    process.exit(1);
  }
  const scope = publicOnly
    ? 'public rules only'
    : `public rules and ${terms.length} private terms, plus ${repoFiles.length} repo file(s) for private terms`;
  console.log(`Content check passed: ${files.length} built page(s), ${scope}.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
