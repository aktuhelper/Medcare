/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images:{
        domains: ['res.cloudinary.com','localhost','gravatar.com','lh3.googleusercontent.com'],
        unoptimized:true
    }
};

export default nextConfig;
