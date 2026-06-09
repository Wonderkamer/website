import { classicEmberSupport, ember, extensions } from '@embroider/vite';
import { babel } from '@rollup/plugin-babel';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const require = createRequire(import.meta.url);
const appRoot = dirname(fileURLToPath(import.meta.url));

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
  server: {
    // The NestJS backend dev server proxies to the frontend at
    // EMBER_PROXY_TARGET=http://127.0.0.1:4222 (historically ember-cli's port +
    // host, set in .ember-cli.js). Vite defaults to port 4200 and binds IPv6
    // `localhost` (::1) only, so the IPv4 proxy target can't reach it. Pin both
    // the port and an explicit IPv4 host so `nestjs-ember-static` connects.
    host: '127.0.0.1',
    port: 4222,
    strictPort: true,
  },
  resolve: {
    alias: [
      {
        find: /^ember-headless-form\/-private\/(.*?)(?:\.js)?$/,
        replacement: `${headlessFormRoot}/dist/-private/$1.js`,
      },
      {
        // ember-get-config (pulled in by ember-changeset-validations) reads the
        // app config via the legacy AMD `require('<modulePrefix>/config/
        // environment')`, which isn't registered in Embroider+Vite and throws at
        // boot. Replace it with a module that reads the same config from the meta
        // tag. Remove if ember-changeset-validations drops ember-get-config.
        find: /^ember-get-config$/,
        replacement: resolve(appRoot, 'compat/ember-get-config.js'),
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
