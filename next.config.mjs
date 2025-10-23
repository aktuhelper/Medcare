/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
      domains: [
        'res.cloudinary.com',
        'localhost',
        'gravatar.com',
        'lh3.googleusercontent.com',
        'medcare-appointment-admin.onrender.com',  // <--- add this
      ],
      unoptimized: true,
    },
  };
  
  export default nextConfig;
  