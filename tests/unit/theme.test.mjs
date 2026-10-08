import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// The palette lives in two blocks of global.css: ":root" (cream pages) and
// ".theme-dark" (forest green header, hero, page heads and footer).
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

const cream = tokens(':root');
const forest = { ...cream, ...tokens('.theme-dark') };

test('the palette is forest green, cream and gold', () => {
  assert.equal(cream['--bg-solid'], '#faf6ec');
  assert.equal(forest['--bg-solid'], '#145238');
  assert.equal(cream['--accent'], '#dcae32');
});

test('the old navy palette is gone', () => {
  assert.doesNotMatch(css, /#071430|#0b1f4a|#10306c|#f59e0b|#3b82f6/i);
});

test('every text color passes WCAG AA on cream and on forest green', () => {
  for (const [name, scope] of [['cream', cream], ['forest', forest]]) {
    for (const token of ['--text', '--text-muted', '--heading', '--highlight', '--link']) {
      const ratio = contrast(scope[token], scope['--bg-solid']);
      assert.ok(ratio >= 4.5, `${token} on ${name}: ${ratio.toFixed(2)}`);
    }
  }
});

test('text on cards passes WCAG AA', () => {
  for (const token of ['--text', '--text-muted', '--highlight', '--link']) {
    const ratio = contrast(cream[token], cream['--surface']);
    assert.ok(ratio >= 4.5, `${token} on card: ${ratio.toFixed(2)}`);
  }
});

test('button and tag text passes WCAG AA on gold', () => {
  assert.ok(contrast(cream['--accent-ink'], cream['--accent']) >= 4.5);
  assert.ok(contrast(cream['--accent-ink'], cream['--accent-hover']) >= 4.5);
});

test('bright gold is not used for text on cream, where it is too faint', () => {
  assert.ok(contrast(cream['--accent'], cream['--bg-solid']) < 4.5, 'gold on cream is expected to be faint');
  assert.notEqual(cream['--highlight'], cream['--accent']);
});

test('the keyboard focus ring is visible on both backgrounds', () => {
  assert.ok(contrast(cream['--focus'], cream['--bg-solid']) >= 3);
  assert.ok(contrast(forest['--focus'], forest['--bg-solid']) >= 3);
});
