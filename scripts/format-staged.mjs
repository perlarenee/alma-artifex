import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const cwd = process.cwd();
const pnpmCommand = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
const sourceFilePattern = /\.(?:[cm]?[jt]sx?)$/;

const stagedOutput = execFileSync(
  'git',
  ['diff', '--cached', '--name-only', '--diff-filter=ACMR'],
  { cwd, encoding: 'utf8' }
);

const files = stagedOutput
  .split(/\r?\n/)
  .map((value) => value.trim())
  .filter(Boolean)
  .filter((file) => sourceFilePattern.test(file))
  .filter((file) => existsSync(file));

if (files.length === 0) {
  console.log('No staged source files to format.');
  process.exit(0);
}

const fix = spawnSync(pnpmCommand, ['exec', 'ultracite', 'fix', ...files], {
  cwd,
  stdio: 'inherit',
});

if (fix.status !== 0) {
  process.exit(fix.status ?? 1);
}

const add = spawnSync('git', ['add', ...files], {
  cwd,
  stdio: 'inherit',
});

if (add.status !== 0) {
  process.exit(add.status ?? 1);
}
