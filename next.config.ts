import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  output: "standalone",

  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // Solo en producción
})(nextConfig);
