import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: "#FDFBF7",
          warm: "#FBF9F4",
        },
        surface: {
          DEFAULT: "#FAF8F5",
          raised: "#F4EFEB",
          hover: "#EFECE6",
          dark: "#1A1A1A",
        },
        border: {
          DEFAULT: "#E5DFD5",
          subtle: "#EFECE6",
          dark: "#2A2A2A",
        },
        charcoal: {
          DEFAULT: "#1A1A1A",
          soft: "#2A2A2A",
          muted: "#4A3E3D",
        },
        espresso: {
          DEFAULT: "#2C221E",
          deep: "#1F1714",
          soft: "#3F322D",
        },
        gold: {
          light: "#F7F1E8",
          DEFAULT: "#C5A880",
          hover: "#A3855E",
          dark: "#8C6E48",
          shimmer: "#D4AF37",
        },
        blush: {
          DEFAULT: "#F9ECE8",
          border: "#F0D9D3",
          deep: "#E5B9B0",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "Inter", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-up": "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "shimmer": "shimmer 2.5s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
