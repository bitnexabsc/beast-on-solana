/** @type {import("tailwindcss").Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        beast: {
          void: "#0d0030",
          toxic: "#ee1c72",
          rage: "#7d02a0",
          ember: "#f30259",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        sans: ["var(--font-body)", "sans-serif"],
        countdown: ["var(--font-countdown)", "sans-serif"],
      },
    },
  },
};

export default config;
