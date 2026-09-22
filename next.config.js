/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // Static HTML export → upload to any hosting
  trailingSlash: true,       // /about/ instead of /about  (better for static hosting)
  images: {
    unoptimized: true,       // Required for static export
  },
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
