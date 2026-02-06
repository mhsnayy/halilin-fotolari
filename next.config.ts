/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // Burası senin Vercel Blob domainin.
        // Gelecekte değişmemesi için genel bir pattern de kullanabiliriz ama şimdilik net olalım:
        hostname: 'ugagy1rlzzwqj3vo.public.blob.vercel-storage.com',
        port: '',
      },
    ],
  },
};

export default nextConfig;