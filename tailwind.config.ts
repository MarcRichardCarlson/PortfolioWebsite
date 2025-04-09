import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  images: {
    domains: ['carlsonmarc.com'],
  },
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1400px',
      },
    },
    extend: {
      spacing: {
        '2px': '2px',
        '4px': '4px',
        '8px': '8px',
        '16px': '16px',
        '32px': '32px',
        '64px': '64px',
        '128px': '128px',
        '13': '3.25rem', // 13 units = 13 * 0.25rem = 3.25rem
      },
      colors: {
        'black-soil': '#222',
        'input-black': '#2c3136',
        'dark-grey': '#1b2024',
        'light-grey': '#f3f4f6',
        'black-smooth': '#0d1014',
        'white-smooth': '#e1e4e8',
        'true-blue': '#007AFF',
        'true-blue-light': '#339CFF',
        'tech-orange': '#D55F28',
        'tech-orange-hover': '#C14E21',
        'custom-purple': '#c0a8f2',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #1b2024 20%, #243037 50%, #007AFF 200%)',
        'custom-gradient-light': 'linear-gradient(to right, #ffffff 10%, #f1f5f9 20%, #007AFF 100%)',
      },
      boxShadow: {
        'custom-shadow': '0 8px 15px 5px rgba(0, 0, 0, 0.1), 0 4px 6px 0px rgba(0, 0, 0, 0.1)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        targa: ['Targa', 'sans-serif'],
        'targa-ms': ['Targa MS', 'sans-serif'],
        'targa-hand': ['Targa MS Hand', 'sans-serif'],
        orbitron: ['var(--font-orbitron)'],
        montserrat: ['var(--font-montserrat)'],
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'full': '9999px',
        'large': '64px',
      },
    },
  },
  plugins: [],
};

export default config;
