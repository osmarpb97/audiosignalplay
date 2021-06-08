module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'

    theme: {
        extend: {},
        screens: {
            'sm': '0px',
            'md': '600px',
            'lg': '960px',
            'xl': '1280px',
            '2xl': '1920px',        }
    },
    variants: {
        extend: {},
    },
    plugins: [],
}