/** @type {import('next').NextConfig} */

const nextConfig = {
    images:{
        domains:[
            "res.cloudinary.com",
            "upload.wikimedia.org",
            "avatars.githubusercontent.com",
            "lh3.googleusercontent.com",
            "png.pngtree.com",
            "t4.ftcdn.net"
        ]
    }
};

module.exports = {
    async headers() {
      return [
        {
          // matching all API routes
          source: "/api/:path*",
          headers: [
            { key: "Access-Control-Allow-Credentials", value: "true" },
            { key: "Access-Control-Allow-Origin", value: "*" },
            { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
            { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
          ]
        }
      ]
    }
  };
  

export default nextConfig;
