import typography from '@tailwindcss/typography';
import path from 'path';

const appRoot = __dirname;
const libraries = [
  /* someLibraryName */
];

const libraryPaths = libraries.map((name) => path.dirname(require.resolve(name)));

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    `${appRoot}/app/**/*.{js,ts,hbs,gjs,gts,html}`,
    ...libraryPaths.map((libraryPath) => `${libraryPath}/**/!(*vendor|*node_modules)/**/*.{js,ts,hbs,gjs,gts,html}`),
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FE0076',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [typography],
};
