module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Chỉ định tất cả các file trong thư mục src (hoặc thư mục chính của bạn)
    './public/**/*.html',         // Chỉ định các file HTML trong thư mục public
  ],
  theme: {
    extend: {
      screens: {
        'xs': '480px',  // Kích thước màn hình nhỏ
        'sm': '640px',  // Kích thước màn hình nhỏ (default)
        'md': '768px',  // Kích thước màn hình vừa
        'lg': '1024px', // Kích thước màn hình lớn
        'xl': '1280px', // Kích thước màn hình rất lớn
        '2xl': '1536px', // Kích thước màn hình lớn hơn (2xl)
      },
      images: {
        domains: ['localhost'], // Thêm 'localhost' vào đây
      },
    },
  },
  plugins: [],
};