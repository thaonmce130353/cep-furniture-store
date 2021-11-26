module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '140': '35rem',
        '120': '30rem',
        '200': '50rem',
        '100vh': '100vh',
        '9/100': '9%',
        '99/100': '99%'
      }
    },
    flex: {
      '40': '1 1 40rem',
    },
    lineHeight: {
      '15': '5rem'
    },
    boxShadow: {
      DEFAULT: '0 0.5rem 1rem rgba(0, 0, 0, 0.1)'
    },
    zIndex: {
      '1000': '1000',
      '900': '900',
      '100': '100',
      '10': '10'
    },
    borderRadius: {
      '5rem': '5rem',
      '2rem': '2rem',
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      'light-bg': '#f6fbf6',
      'box-product-item': '#f2f2f2',
      'btn-green': '#244d4d',
      'product-hover': 'rgba(242, 242, 242, 0.7)',

    }),
    gridTemplateColumns: {
      'category': 'repeat(auto-fit, minmax(16rem, 1fr))',
      'product': 'repeat(auto-fit, minmax(26rem, 1fr))',
      'our-service': 'repeat(auto-fit, minmax(30rem, 1fr))',
      'product-detail': 'repeat(2, minmax(0, 1fr))',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
