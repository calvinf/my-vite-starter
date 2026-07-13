/* oxlint-disable typescript/no-empty-object-type */
/* oxlint-disable typescript/no-unused-vars */
import { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';
import { Matchers, AsymmetricMatchers } from 'bun:test';

declare module 'bun:test' {
  interface Matchers<T>
    extends TestingLibraryMatchers<typeof expect.stringContaining, T> {}
  interface AsymmetricMatchers extends TestingLibraryMatchers {}
}
