/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container:{
        padding: '2rem',
        center: true
      }, 
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors:{
      'weather-primary': '#00668A',
      'weather-secondary': '#004E71',
      'weather-secondary-hover': '#00b0ff',  
      white: '#ffffff',
      black: '#000000',
      red:'#e44d4d',
      'red-hover': '#F8B4B4',
      grey: '#F3F4F6',
    }, 
  },
  plugins: [],
}

