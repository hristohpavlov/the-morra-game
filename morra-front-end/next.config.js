/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  env: {
    MONGO_URI: "mongodb+srv://admin:admin@cluster0.2zn9q02.mongodb.net/nextAuthDB?retryWrites=true&w=majority",
    SERVER_URL: "http://localhost:5000",
  },
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig;