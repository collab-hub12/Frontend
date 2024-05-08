/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/(.*)",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: "https://accounts.google.com/o/oauth2/v2/auth",
          }, // replace this your actual origin
          {
            key: "Access-Control-Allow-Origin",
            value: "http://127.0.0.1:8000",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
