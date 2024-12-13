/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['localhost'], // Thêm 'localhost' vào danh sách miền cho phép
    },
    reactStrictMode: false,
  };

export default nextConfig;