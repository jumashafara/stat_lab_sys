module.exports = {
  content: ['./views/**/*.ejs', './public/**/*.ejs'],
  theme: {
    screens: {
      sm: '480px',
      md: '760px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      dark: '#343a40',
      light: '#f8f9fa',
      info: '#0dcaf0',
      success: '#198754',
      primary: '#0d6efd',
      secondary: '#6c757d',
      warning: '#ffc107',
      danger: '#dc3545'
    }
  },
  plugins: [],
}
