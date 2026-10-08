// Runs on "npm install". Tells git to use the hooks in .githooks/, so the
// pre-push check is active on every clone without any manual setup.
import { execFileSync } from 'node:child_process';

try {
  execFileSync('git', ['config', 'core.hooksPath', '.githooks'], { stdio: 'ignore' });
} catch {
  // Not a git checkout (for example an unpacked archive). Nothing to set up.
}
