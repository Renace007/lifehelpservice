/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Noto Sans SC', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
                display: ['Inter', 'Noto Sans SC', 'system-ui', '-apple-system', 'sans-serif'],
            },
            colors: {
                primary: 'rgb(var(--color-primary) / <alpha-value>)',
                'primary-dark': 'rgb(var(--color-primary-dark) / <alpha-value>)',
                secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
                danger: 'rgb(var(--color-danger) / <alpha-value>)',
                success: 'rgb(var(--color-success) / <alpha-value>)',
                warning: 'rgb(var(--color-warning) / <alpha-value>)',
                'background-light': 'rgb(var(--color-bg-light) / <alpha-value>)',
                'background-dark': 'rgb(var(--color-bg-dark) / <alpha-value>)',
                'surface-light': 'rgb(var(--color-surface-light) / <alpha-value>)',
                'surface-dark': 'rgb(var(--color-surface-dark) / <alpha-value>)',
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
