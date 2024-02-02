/** @type {import('tailwindcss').Config} */

import themes from 'daisyui/src/theming/themes';
export const themesArr = Object.keys(themes);
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [
    require("daisyui")
  ],
  daisyui: {
    themes: [...themesArr]
  }
}
