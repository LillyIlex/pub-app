/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/screens/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Sunny-garden green palette
        primary: {
          DEFAULT: "#64ED9F", // bright grass green - loading/tab/header bg
          light: "#8FF3B7",
          dark: "#007836", // deep green - secondary bg, active header
        },
        secondary: "#007836",
        surface: "#FFFFFF", // main content background
        cream: "#FFFBC7", // sunny yellow alt background
        ink: "#0B2B1A", // near-black green for body text/titles
        link: "#1FAE63", // lighter green for links/buttons on white
        active: "#2ECC71", // mid green for active states (filters, tabs)
        border: "#BFEFD2",
        muted: "#6B8F7C",
      },
      fontFamily: {
        poppins: ["Poppins_400Regular"],
        "poppins-medium": ["Poppins_500Medium"],
        "poppins-semibold": ["Poppins_600SemiBold"],
        "poppins-bold": ["Poppins_700Bold"],
      },
    },
  },
  plugins: [],
};
