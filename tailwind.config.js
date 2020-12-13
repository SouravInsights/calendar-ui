module.exports = {
  purge: ["./src/**/*.js", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        // Custom grid template columns
        "grid-rows-calendar-grid": "minmax(150px, 25%) 1fr",
      },
    },
  },
  variants: {},
  plugins: [],
};
