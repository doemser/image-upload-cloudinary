/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  env: {
    CLOUDINARY_PRESET_NAME: process.env.CLOUDINARY_PRESET_NAME,
    CLOUDINARY_CLOUDNAME: process.env.CLOUDINARY_CLOUDNAME,
  },
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
  },
};

module.exports = nextConfig;
