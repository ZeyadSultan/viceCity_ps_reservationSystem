/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        // use environment variable to get the host
        destination: `http://${
          process.env.NODE_ENV === "production" ? "backend" : "localhost"
        }:8080/api/:path*`,
      },
    ];
  },
  output: "standalone",
};

export default nextConfig;
