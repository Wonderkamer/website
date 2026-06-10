// Replacement for `ember-get-config`.
//
// The upstream package (2.1.1, the latest) reads the app config at runtime via
// the legacy AMD loader: `require('<modulePrefix>/config/environment').default`.
// Under Embroider + Vite the app config is an ES module that is not registered
// in that loader, and the require runs during vendor bootstrap (before the app
// module can register anything), so it throws "Could not find module".
//
// We instead read the same config the app reads — from the `<meta>` tag that
// the build serializes (storeConfigInMeta), via @embroider/config-meta-loader.
// ember-changeset-validations (the only consumer here) just needs the config
// object, so this is a drop-in default export.
import loadConfigFromMeta from '@embroider/config-meta-loader';

export default loadConfigFromMeta('@wonderkamer/frontend');
