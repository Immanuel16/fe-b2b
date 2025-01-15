const config = {
  content: [
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: ({ animation }) => ({
        ...animation,
        fadeIn: "fadeIn 1.5s ease-in-out",
        fadeOut: "fadeOut 1.5s ease-in-out",
      }),
      backgroundColor: ({ theme }) => theme("colors"),
      borderRadius: {
        none: "0px",
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
        btn: "25px",
        input: "8px",
        card: "20px",
        pagination: "32px",
        m: "16px"
      },
      boxShadow: ({ boxShadow }) => ({
        ...boxShadow,
        card: "1px 1px 24px 0px rgba(0, 0, 0, 0.05)",
      }),
      colors: ({ colors }) => ({
        ...colors,
        b2b: {
          primary: "rgba(240, 103, 38, 1)",
          secondary: "#f7b392",
          tertier: "rgba(247, 179, 146, 0.25)",
          "white-60%": "rgba(255,255,255, 0.6)",
          "gray-1": "#6c757d",
          "gray-2": "#979899",
          "gray-3": "#d0d0d0",
          yellow: "#f9d641",
          green: "#00ba88",
          red: "#e25764",
        },
      }),
      spacing: {
        none: "0px",
        xxs: "4px",
        xs: "8px",
        s: "10px",
        sm: "12px",
        m: "16px",
        ml: "24px",
        l: "32px",
        xl: "36px",
        "2xl": "40px",
        "3xl": "48px",
      },
      fontFamily: {
        openSans: ["Open Sans", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
