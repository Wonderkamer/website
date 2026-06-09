import { classicEmberSupport, ember, extensions } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';
import { createRequire } from 'node:module';
import { dirname } from 'node:path';
import { defineConfig } from 'vite';

const require = createRequire(import.meta.url);

// ember-headless-form@1.1.1 ships its `-private/*` component modules but blocks
// them in package.json `exports` with `"./-private/*": null`. Its own compiled
// templates still deep-import those modules (e.g. `-private/components/field`),
// which the classic build tolerated but Vite's strict ESM resolution rejects.
// Alias the blocked subpath back to the real dist files. Scoped to this one
// addon; remove once it exposes these modules (or we drop the dependency).
// Resolve the package root via its main entry ("./dist/index.js"), then walk up
// out of `dist/` — the package blocks `package.json` in its exports map.
const headlessFormRoot = dirname(dirname(require.resolve('ember-headless-form')));

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^ember-headless-form\/-private\/(.*?)(?:\.js)?$/,
        replacement: `${headlessFormRoot}/dist/-private/$1.js`,
      },
    ],
  },
  plugins: [
    classicEmberSupport(),
    ember(),
    // extra plugins here
    babel({
      babelHelpers: 'runtime',
      extensions,
    }),
  ],
});
