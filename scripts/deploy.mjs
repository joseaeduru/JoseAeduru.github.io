// Publishes the site: checks it, builds it, and pushes the built pages to "main",
// which is the branch GitHub Pages serves. The source lives on the "source" branch.
//
//   npm run deploy
//
// Nothing is published if the check fails or there are uncommitted changes.
import { execFileSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import path from 'node:path';

const SOURCE_BRANCH = 'source';
const PUBLISH_BRANCH = 'main';
const INDEX = path.resolve('.git', 'deploy-index');

const git = (args, env = {}) =>
  execFileSync('git', args, { encoding: 'utf8', env: { ...process.env, ...env } }).trim();
const run = (command, args) => execFileSync(command, args, { stdio: 'inherit', shell: true });
const stop = (message) => {
  console.error(`Not published: ${message}`);
  process.exit(1);
};

const branch = git(['rev-parse', '--abbrev-ref', 'HEAD']);
if (branch !== SOURCE_BRANCH) stop(`you are on "${branch}". Switch to "${SOURCE_BRANCH}" first.`);
if (git(['status', '--porcelain']) !== '') stop('there are uncommitted changes. Commit them first.');

// Tests, a fresh build into dist/, and the content check (public rules and private terms).
run('npm', ['run', 'verify']);
if (!existsSync(path.join('dist', 'index.html'))) stop('dist/index.html was not built.');
if (!existsSync(path.join('dist', '.nojekyll'))) stop('dist/.nojekyll is missing (it comes from public/).');

git(['fetch', '--quiet', 'origin']);
const parent = git(['rev-parse', `origin/${PUBLISH_BRANCH}`]);
const sourceCommit = git(['rev-parse', '--short', 'HEAD']);

// Stage exactly the contents of dist/ in a throwaway index, so the working tree is untouched.
rmSync(INDEX, { force: true });
const env = { GIT_INDEX_FILE: INDEX };
git(['--work-tree=dist', 'add', '--all', '.'], env);
const tree = git(['write-tree'], env);
rmSync(INDEX, { force: true });

if (tree === git(['rev-parse', `${parent}^{tree}`])) {
  console.log('Nothing to publish: the live site already matches this build.');
  process.exit(0);
}

const commit = git(['commit-tree', tree, '-p', parent, '-m', `Publish site from ${SOURCE_BRANCH} ${sourceCommit}`]);
run('git', ['push', 'origin', `${commit}:refs/heads/${PUBLISH_BRANCH}`]);
console.log(`Published ${sourceCommit}. GitHub Pages updates in about a minute: https://joseaeduru.github.io/`);
