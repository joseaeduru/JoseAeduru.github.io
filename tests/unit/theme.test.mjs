import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// The palette lives in two blocks of global.css: ":root" (light pages) and
// ".theme-dark" (the contact footer).
const css = readFileSync('src/styles/global.css', 'utf8');

function tokens(selector) {
  const escaped = selector.replace(/[.:]/g, '\\$&');
  const block = css.match(new RegExp(`(?:^|\\n)${escaped}\\s*\\{([^}]*)\\}`));
  assert.ok(block, `${selector} block not found in global.css`);
  return Object.fromEntries(
    [...block[1].matchAll(/(--[\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]),
  );
}

function luminance(hex) {
  assert.match(hex, /^#[0-9a-f]{6}$/i, `expected a 6-digit hex color, got "${hex}"`);
  const [r, g, b] = [1, 3, 5].map((i) => {
    const v = parseInt(hex.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const light = tokens(':root');
const dark = { ...light, ...tokens('.theme-dark') };
const lightBackgrounds = ['--bg-solid', '--surface', '--band'];

test('the palette is warm off-white, deep green and gold', () => {
  assert.equal(light['--bg-solid'], '#f5f3ee');
  assert.equal(light['--forest'], '#213d3a');
  assert.equal(dark['--bg-solid'], '#213d3a');
});

test('earlier palettes are gone', () => {
  assert.doesNotMatch(css, /#071430|#0b1f4a|#10306c|#f59e0b|#3b82f6|#dcae32|#faf6ec/i);
});

test('every text color passes WCAG AA on every light background', () => {
  for (const bg of lightBackgrounds) {
    for (const token of ['--text', '--text-muted', '--heading', '--label', '--link']) {
      const ratio = contrast(light[token], light[bg]);
      assert.ok(ratio >= 4.5, `${token} on ${bg}: ${ratio.toFixed(2)}`);
    }
  }
});

test('every text color passes WCAG AA on the dark footer', () => {
  for (const token of ['--text', '--text-muted', '--heading', '--label', '--link']) {
    const ratio = contrast(dark[token], dark['--bg-solid']);
    assert.ok(ratio >= 4.5, `${token} on dark: ${ratio.toFixed(2)}`);
  }
});

test('the italic accent is only for large headlines, and passes AA for large text', () => {
  for (const bg of lightBackgrounds) {
    const ratio = contrast(light['--accent'], light[bg]);
    assert.ok(ratio >= 3, `--accent on ${bg}: ${ratio.toFixed(2)}`);
  }
  assert.ok(contrast(dark['--accent'], dark['--bg-solid']) >= 3);
  // Small labels must not reuse the lighter headline accent.
  assert.notEqual(light['--label'], light['--accent']);
});

test('button text passes WCAG AA', () => {
  assert.ok(contrast(light['--btn-ink'], light['--forest']) >= 4.5);
});

test('the keyboard focus ring is visible on light and dark', () => {
  for (const bg of lightBackgrounds) assert.ok(contrast(light['--focus'], light[bg]) >= 3);
  assert.ok(contrast(dark['--focus'], dark['--bg-solid']) >= 3);
});
