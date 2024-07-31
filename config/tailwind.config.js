const path = require('path');

const appRoot = path.join(__dirname, '../');
const libraries = [
  /* someLibraryName */
];

const libraryPaths = libraries.map((name) => path.dirname(require.resolve(name)));

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `${appRoot}/app/**/*.{js,ts,hbs,gjs,gts,html}`,
    `${appRoot}/public/**/*.md`,
    ...libraryPaths.map((libraryPath) => `${libraryPath}/**/*.{js,ts,hbs,gjs,gts,html}`),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Dosis-Regular', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')(),
    // require('@tailwindcss/aspect-ratio'),
    // require('tailwindcss-animate'),
    // require('flowbite/plugin'),
    // require('rippleui'),
    // require('tailwind-scrollbar-hide'), // https://github.com/reslear/tailwind-scrollbar-hide
    require('daisyui'),
  ],
};
