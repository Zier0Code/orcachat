/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      darkMode: 'selector',
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
        customBGWhite: "bg-slate-200",
        customColorIput: "#303030",
      },
    },
  },
  plugins: [],
}