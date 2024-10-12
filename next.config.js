/** @type {import('next').NextConfig} */
const nextConfig = {
    // Menambahkan dukungan untuk halaman dengan ekstensi ts dan tsx
    pageExtensions: ['ts', 'tsx'],
  
    // Mengaktifkan optimasi gambar di Next.js
    images: {
      domains: ['yourdomain.com'], // Sesuaikan dengan domain tempat kamu mendapatkan gambar, atau biarkan kosong jika lokal
    },
  
    // Mengaktifkan strict mode di React
    reactStrictMode: true,
  
    // Opsi tambahan lainnya sesuai kebutuhan proyekmu
  };
  
  module.exports = nextConfig;
  