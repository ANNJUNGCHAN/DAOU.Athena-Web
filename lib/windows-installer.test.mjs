import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'path';

const libDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(libDir, '..');
const links = JSON.parse(
  readFileSync(path.join(rootDir, 'config', 'links.json'), 'utf8'),
);
const installerSource = readFileSync(
  path.join(libDir, 'windows-installer.ts'),
  'utf8',
);
const buttonSource = readFileSync(
  path.join(rootDir, 'components', 'download-button.tsx'),
  'utf8',
);

test('Windows installer reads the v0.1.2 GitHub release asset from config/links.json', () => {
  assert.equal(typeof links.downloadForWindows, 'string');
  assert.equal(typeof links.downloadForWindowsFile, 'string');
  assert.match(links.downloadForWindows, /^https:\/\//);
  assert.match(links.downloadForWindowsFile, /\.exe$/i);
  assert.equal(links.downloadForWindowsFile, 'Athena-Setup-0.1.2-x64.exe');
  assert.equal(
    links.downloadForWindows,
    'https://github.com/ANNJUNGCHAN/DAOU.Athena/releases/download/v0.1.2/Athena-Setup-0.1.2-x64.exe',
  );

  assert.match(installerSource, /from ['"]@\/config\/links\.json['"]/);
  assert.match(installerSource, /links\.downloadForWindowsFile/);
  assert.match(installerSource, /links\.downloadForWindows/);

  assert.match(buttonSource, /href=\{WINDOWS_INSTALLER_URL\}/);
  assert.match(buttonSource, /download=\{WINDOWS_INSTALLER_FILE\}/);
});
