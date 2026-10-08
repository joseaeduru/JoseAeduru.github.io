import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';

const read = (file) => readFileSync(`dist/${file}`, 'utf8');

test('home page is built', () => {
  assert.ok(existsSync('dist/index.html'), 'dist/index.html missing. Run "npm run build" first.');
});

test('home has the required SEO head', () => {
  const html = read('index.html');
  const title = html.match(/<title>([^<]*)<\/title>/)[1];
  assert.match(title, /Jose Aeduru/);
  assert.match(title, /Lead Oracle Cloud HCM Consultant/);
  assert.match(title, /Frisco, TX/);
  const description = html.match(/<meta name="description" content="([^"]*)"/)[1];
  assert.match(description, /Lead Oracle Cloud HCM/);
  assert.match(description, /Oracle Fusion HCM/);
  assert.match(description, /Frisco, TX/);
  assert.match(html, /<link rel="canonical" href="https:\/\/joseaeduru\.github\.io\/"/);
  assert.match(html, /<meta property="og:title"/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /<html lang="en"/);
});

test('JSON-LD describes Jose as a Person with the right links', () => {
  const html = read('index.html');
  const json = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(json['@type'], 'Person');
  assert.equal(json.name, 'Jose Aeduru');
  assert.equal(json.jobTitle, 'Lead Oracle Cloud HCM Consultant');
  assert.deepEqual(json.sameAs, ['https://www.linkedin.com/in/jose1038']);
  assert.equal(json.address.addressLocality, 'Frisco');
});

test('every page has exactly one h1, a skip link and the header and footer', () => {
  for (const file of ['index.html', '404.html']) {
    const html = read(file);
    assert.equal(html.match(/<h1[\s>]/g).length, 1, file);
    assert.match(html, /class="skip-link"/, file);
    assert.match(html, /<header class="site-header"/, file);
    assert.match(html, /<footer class="site-footer theme-dark" id="contact"/, file);
  }
});

test('blog link is in the header only when a post is published', () => {
  const hasPosts =
    existsSync('dist/blog') &&
    readdirSync('dist/blog', { withFileTypes: true }).some((entry) => entry.isDirectory());
  const html = read('index.html');
  assert.equal(html.includes('href="/blog/"'), hasPosts);
});

test('static files are built', () => {
  for (const file of ['404.html', 'favicon.svg', 'robots.txt', 'sitemap-index.xml']) {
    assert.ok(existsSync(`dist/${file}`), file);
  }
});

test('home shows the hero, contact links and all sections', () => {
  const html = read('index.html');
  assert.match(html, /<h1[^>]*>Oracle HCM programs, from design\s*<em>through go-live\.<\/em>/);
  assert.match(html, /full-lifecycle implementations/);
  assert.match(html, /href="mailto:mailmejo9@gmail\.com"/);
  assert.match(html, /href="https:\/\/www\.linkedin\.com\/in\/jose1038"/);
  assert.match(html, /Frisco, TX \(open to remote\)/);
  for (const id of ['expertise', 'work', 'experience', 'approach', 'credentials', 'contact']) {
    assert.match(html, new RegExp(`id="${id}"`), id);
  }
});

test('home lists six roles, three certifications and links to the experience page', () => {
  const html = read('index.html');
  for (const employer of ['Pace Suburban Bus', 'Fortive', 'Deloitte USI', 'Tata Consultancy Services', 'Satva Solutions', 'Growel Softech']) {
    assert.ok(html.includes(employer), employer);
  }
  assert.equal(html.match(/Cloud Implementation Professional/g).length, 3);
  assert.match(html, /href="\/experience\/"/);
});

test('experience page shows every role with its confirmed title, dates and place', () => {
  const html = read('experience/index.html');
  const facts = [
    ['pace', 'Lead Oracle Cloud HCM Consultant', 'Pace Suburban Bus', 'Aug 2025 – Present', 'Remote'],
    ['fortive', 'Lead Oracle Cloud HCM Consultant', 'Fortive', 'Jun 2024 – Jul 2025', 'Remote / Texas'],
    ['deloitte', 'Senior Oracle Cloud HCM Consultant', 'Deloitte USI', 'Nov 2019 – May 2024', 'Remote'],
    ['tcs', 'Oracle Cloud HCM Consultant', 'Tata Consultancy Services', 'Sep 2016 – Nov 2019', 'Hyderabad, India'],
    ['satva', 'Senior Oracle Cloud HCM Techno-Functional Analyst', 'Satva Solutions', 'Jun 2015 – Sep 2016', 'Pune, India'],
    ['growel', 'Oracle HCM Business Analyst', 'Growel Softech', 'Apr 2012 – Jun 2015', 'Pune, India'],
  ];
  const articles = html.split('<article').slice(1);
  assert.equal(articles.length, facts.length);
  facts.forEach(([id, title, employer, dates, place], index) => {
    const article = articles[index];
    assert.match(article, new RegExp(`id="${id}"`), id);
    for (const text of [title, employer, dates, place]) {
      assert.ok(article.includes(text), `${id}: ${text}`);
    }
  });
});

test('experience page has one h1 and its own title', () => {
  const html = read('experience/index.html');
  assert.equal(html.match(/<h1[\s>]/g).length, 1);
  assert.match(html.match(/<title>([^<]*)<\/title>/)[1], /Experience \| Jose Aeduru/);
  assert.match(html, /<link rel="canonical" href="https:\/\/joseaeduru\.github\.io\/experience\/"/);
});

test('blog index is built and drafts are not', () => {
  const html = read('blog/index.html');
  assert.equal(html.match(/<h1[\s>]/g).length, 1);
  assert.ok(!existsSync('dist/blog/post-template'), 'the draft template must never be built');
  assert.ok(!html.includes('Post template'), 'the draft template must not be listed');
});

test('blog index says so when there are no posts yet', () => {
  const html = read('blog/index.html');
  const hasPosts = readdirSync('dist/blog', { withFileTypes: true }).some((entry) => entry.isDirectory());
  assert.equal(html.includes('First article coming soon.'), !hasPosts);
});

test('home takes its availability line from the profile data', async () => {
  const { site } = await import('../../src/data/profile.mjs');
  assert.ok(read('index.html').includes(site.availability));
});

test('home shows four selected work cases, each with a headline figure and a fold-out', () => {
  const html = read('index.html');
  assert.equal(html.match(/class="work"/g).length, 4);
  assert.equal(html.match(/<details/g).length, 4);
  for (const text of ['Four business units.', 'About 30 minutes with HDL.', 'its first audit.', 'Features analyzed for 26C']) {
    assert.ok(html.includes(text), text);
  }
});

test('home offers no resume download and no item barred from the public site', () => {
  const html = read('index.html');
  assert.doesNotMatch(html, /\.pdf|\.docx|download/i);
  assert.doesNotMatch(html, /DEV1|guidance checks|security mapping/i);
});
