/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        pathname: '/**',
      },
      // Adicione outros domínios que você usa
      {
        protocol: 'https',
        hostname: '**.unsplash.com', // Todos subdomínios do Unsplash
      },
    ],
    // Ou use domains (mais simples):
    domains: ['images.unsplash.com', 'plus.unsplash.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig