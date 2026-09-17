const { COLORS, FONTS } = require("./src/constants/theme");

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
        primary: {
          DEFAULT: COLORS.primary,
          light: COLORS.primaryLight,
          dark: COLORS.primaryDark,
        },
        secondary: COLORS.primaryDark,
        surface: COLORS.surface,
        cream: COLORS.cream,
        ink: COLORS.ink,
        link: COLORS.link,
        active: COLORS.active,
        activeLight: COLORS.activeLight,
        border: COLORS.border,
        muted: COLORS.muted,
        pillBg: COLORS.pillBg,
      },
      fontFamily: {
        poppins: [FONTS.regular],
        "poppins-medium": [FONTS.medium],
        "poppins-semibold": [FONTS.semibold],
        "poppins-bold": [FONTS.bold],
      },
    },
  },
  plugins: [],
};
