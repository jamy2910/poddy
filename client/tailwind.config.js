/** @type {import('tailwindcss').Config} */
export default {
  corePlugins: {
    preflight: false
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      main: ['Inter', 'Nunito']
    },
    extend: {
      screens: {
        smmax: {'max': '640px'},
        mdmax: {'max': '768px'},
        lgmax: {'max': '1024px'},
        xlmax: {'max': '1280px'}
      },
      spacing: {
        commentBox: '750px'
      }
    },
  },
  plugins: [],
}

