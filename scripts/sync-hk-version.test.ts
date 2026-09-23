import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { hkPklPinnedTo, hkVersionFromMiseToml } from './sync-hk-version.ts';

const hkPkl = `amends "package://github.com/jdx/hk/releases/download/v2.0.0/hk@2.0.0#/Config.pkl"
import "package://github.com/jdx/hk/releases/download/v2.0.0/hk@2.0.0#/Builtins.pkl"

min_hk_version = "2.0.0"
`;

describe('hkVersionFromMiseToml', () => {
  test('reads the hk pin from [tools]', () => {
    const version = hkVersionFromMiseToml(`
[tools]
bun = "1.4.2"
hk = "2.0.1" # git hooks

[tasks.check]
run = "hk check --all"
`);

    expect(version).toBe('2.0.1');
  });

  test('ignores hk mentions outside [tools]', () => {
    const version = hkVersionFromMiseToml(`
hk = "9.9.9"

[tools]
hk = "2.0.1"

[env]
HK_MISE = "1"
`);

    expect(version).toBe('2.0.1');
  });

  test('rejects a pin that is not a full release', () => {
    expect(() => hkVersionFromMiseToml('[tools]\nhk = "latest"\n')).toThrow(
      /full X\.Y\.Z release/,
    );
  });
});

describe('hkPklPinnedTo', () => {
  test('rewrites package URLs and min_hk_version together', () => {
    expect(hkPklPinnedTo(hkPkl, '2.0.1')).toBe(
      hkPkl.replaceAll('2.0.0', '2.0.1'),
    );
  });

  test('leaves an already pinned config unchanged', () => {
    const pinned = hkPklPinnedTo(hkPkl, '2.0.1');
    expect(hkPklPinnedTo(pinned, '2.0.1')).toBe(pinned);
  });

  test('requires both hk package URLs', () => {
    expect(() => hkPklPinnedTo('min_hk_version = "2.0.0"\n', '2.0.1')).toThrow(
      /package URLs/,
    );
  });
});

test('committed hk.pkl matches the hk pin in mise.toml', () => {
  const root = resolve(import.meta.dir, '..');
  const version = hkVersionFromMiseToml(
    readFileSync(resolve(root, 'mise.toml'), 'utf8'),
  );
  const current = readFileSync(resolve(root, 'hk.pkl'), 'utf8');

  expect(current).toBe(hkPklPinnedTo(current, version));
});
