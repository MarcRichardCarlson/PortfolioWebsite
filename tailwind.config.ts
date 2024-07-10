import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  images: {
    domains: ['carlsonmarc.com'],
  },
  theme: {
    extend: {
      extend: {
        spacing: {
          '2px': '2px',
          '4px': '4px',
          '8px': '8px',
          '16px': '16px',
          '32px': '32px',
          '64px': '64px',
          '128px': '128px',
        }
      },
      gap: {
        '2px': '2px',
        '4px': '4px',
        '8px': '8px',
        '16px': '16px',
        '32px': '32px',
        '64px': '64px',
        '128px': '128px',
      },
      colors: {
        'sky-blue': '#c2def6',
        'deep-sea': '#204554',
        'stone': '#626c69',
        'cloud': '#bdbbbd',
        'light-sky': '#a4c4dc',
        'black-soil' : '#282828'
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'full': '9999px',
        'large': '64px',
      }
    },
  },
  plugins: [],
};
export default config;
