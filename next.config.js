/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    CLOUDINARY_PRESET_NAME: process.env.CLOUDINARY_PRESET_NAME,
    CLOUDINARY_CLOUDNAME: process.env.CLOUDINARY_CLOUDNAME,
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig;
