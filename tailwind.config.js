/** @type {import('twrnc').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#613AAD',
      },
      boxShadow: {
        'custom-top': '0px -4px 20px 3px #4523A94D',
        'custom-bottom': '0px 4px 20px 4px #4523A94D',
      },
    },
  },
  plugins: [],
};
