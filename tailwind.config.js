/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        lemon: ['Lemon', 'sans-serif'],
      },
      gridTemplateColumns: {
        '14/x/14': '14rem auto 14rem',
      },
      colors: {
        customBlue: '#030176', // Define your custom blue color here
        customBtn: "#179AFA",
        customBtn50: "rgba(23,154,250, .8)",
        customLightBlue: "#34BDCA",
        customCyan: "#34BDCA",
        customBGDark: "#212121",
        customBGWhite: "#f5f5f5",
        customColorInput: "#303030",
      },
    },
  },
  plugins: [],
}