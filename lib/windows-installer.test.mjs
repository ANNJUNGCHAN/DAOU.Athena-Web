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

test('Windows installer reads the Drive URL from config/links.json', () => {
  assert.equal(typeof links.downloadForWindows, 'string');
  assert.equal(typeof links.downloadForWindowsFile, 'string');
  assert.match(links.downloadForWindows, /^https:\/\//);
  assert.match(links.downloadForWindowsFile, /\.exe$/i);
  assert.doesNotMatch(links.downloadForWindowsFile, /Athena-Setup-0\.1\.0-beta\.3-x64\.exe/);
  assert.doesNotMatch(
    links.downloadForWindows,
    /1Xqf9dyH8aIYH7Otr9NmC34QYSG2uMC5T/,
  );

  assert.match(installerSource, /from ['"]@\/config\/links\.json['"]/);
  assert.match(installerSource, /links\.downloadForWindowsFile/);
  assert.match(installerSource, /links\.downloadForWindows/);

  assert.match(buttonSource, /href=\{WINDOWS_INSTALLER_URL\}/);
  assert.match(buttonSource, /download=\{WINDOWS_INSTALLER_FILE\}/);
});
