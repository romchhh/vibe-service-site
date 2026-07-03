/** @type {import('next').NextConfig} */
const blogData = require('./src/data/blog.json')

const EXTRA_IMAGE_HOSTS = ['images.unsplash.com']

function collectImageHostnames() {
  const hostnames = new Set(EXTRA_IMAGE_HOSTS)

  for (const post of blogData.posts) {
    const image = post.image
    if (typeof image !== 'string' || !image.startsWith('http')) continue

    try {
      hostnames.add(new URL(image).hostname)
    } catch {
      // skip invalid URLs
    }
  }

  return [...hostnames].sort().map((hostname) => ({
    protocol: 'https',
    hostname,
  }))
}

const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: collectImageHostnames(),
  },
  compress: true,
  poweredByHeader: false,
}

module.exports = nextConfig
