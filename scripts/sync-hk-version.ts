import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const RELEASE_VERSION = /^\d+\.\d+\.\d+$/;

const PACKAGE_URL =
  /package:\/\/github\.com\/jdx\/hk\/releases\/download\/v\d+\.\d+\.\d+\/hk@\d+\.\d+\.\d+#/g;

const MIN_HK_VERSION = /^(min_hk_version\s*=\s*")[^"]+(")/m;

export function hkVersionFromMiseToml(source: string): string {
  let inTools = false;

  for (const line of source.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
      inTools = trimmed === '[tools]';
      continue;
    }
    if (!inTools || trimmed === '' || trimmed.startsWith('#')) continue;

    const assignment = trimmed.match(/^hk\s*=\s*(.+?)(?:\s+#.*)?$/);
    if (!assignment) continue;

    const quoted = assignment[1].match(/^["']([^"']+)["']$/);
    if (!quoted) {
      throw new Error(
        `mise.toml hk pin must be a quoted version, found ${assignment[1]}`,
      );
    }
    if (!RELEASE_VERSION.test(quoted[1])) {
      throw new Error(
        `mise.toml pins hk as "${quoted[1]}". hk.pkl package URLs need a full X.Y.Z release.`,
      );
    }
    return quoted[1];
  }

  throw new Error('mise.toml has no hk version under [tools]');
}

export function hkPklPinnedTo(source: string, version: string): string {
  if (!RELEASE_VERSION.test(version)) {
    throw new Error(
      `hk version must be a full X.Y.Z release, found "${version}"`,
    );
  }

  const urls = source.match(PACKAGE_URL);
  if (!urls || urls.length < 2) {
    throw new Error(
      'hk.pkl is missing hk package URLs for Config.pkl and Builtins.pkl',
    );
  }

  const url = `package://github.com/jdx/hk/releases/download/v${version}/hk@${version}#`;
  const withUrls = source.replace(PACKAGE_URL, url);
  if (!MIN_HK_VERSION.test(withUrls)) {
    throw new Error('hk.pkl is missing min_hk_version');
  }
  return withUrls.replace(MIN_HK_VERSION, `$1${version}$2`);
}

function main(): void {
  const check = process.argv.includes('--check');
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const version = hkVersionFromMiseToml(
    readFileSync(resolve(root, 'mise.toml'), 'utf8'),
  );
  const hkPath = resolve(root, 'hk.pkl');
  const current = readFileSync(hkPath, 'utf8');
  const next = hkPklPinnedTo(current, version);

  if (current === next) return;

  if (check) {
    console.error(
      `hk.pkl does not match the hk ${version} pin in mise.toml. Run \`hk fix\` to update it.`,
    );
    process.exitCode = 1;
    return;
  }

  writeFileSync(hkPath, next);
}

const entry = process.argv[1];
if (entry && import.meta.url === pathToFileURL(entry).href) main();
