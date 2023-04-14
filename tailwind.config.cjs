/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#202225',
        'secondary': '#292B2F',
        "bg-message": "#E4E6EB",
        "customIcon": "#868E991A",
        "customColor": "rgba(0, 0, 0, 0.5)",
        "borderColor": "rgba(0, 0, 0, 0.2)",
        "focusColor": "#4F545C99",
        "underline": "#4F545C7A",
        "focusHover": "#4F545C66",
        "buttonColor": "#5865F2",
        "hoverButton": "#4752C4",
        "text": "#96989D",
        "label": "#B9BBBE",
        "errorMsg": "#FA777C",
        "bgScreen": "#36393F",
        "message": "#DCDDDE",
      },
      borderRadius: {
        'primary': "10px",
        'custom': "18px"
      },
      fontFamily: {
        'custom': ["gg sans", "Helvetica Neue", "Helvetica", "Arial", "Noto Sans", 'sans-serif'],
      },
      flex: {
        'custom': "0 0 auto"
      },
      zIndex: {
        '1': "1",
        '99': "99"
      },
      boxShadow: {
        "custom" : "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
        "sm" : "0px 4px 8px 0px rgba(0, 0, 0, 0.2)",
        "medium": "0 0 11px rgba(33, 33, 33, 0.2)",
      },
      flex: {
        "0": "0 0 auto",
        "flex1": "1",
        "100": "0 0 100%",
      },
      backgroundColor: {
        "custom": "rgba(134, 142, 153, 0.1)",
        "borderBg": "rgba(0, 0, 0, .04)",
      },
      gridTemplateRows: {
        "custom": "repeat(auto-fill,minmax(100%,1fr))",
      }
    },
  },
  plugins: [],
}
