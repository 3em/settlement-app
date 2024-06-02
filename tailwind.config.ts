import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        airbnb: {
          primary: '#FF5A5F',
          secondary: '#00A699',
        },
      },
      fontFamily: {
        airbnb: ['Circular', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
