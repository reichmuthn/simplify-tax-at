const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@simplifytax/ui", "@simplifytax/application"],
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  async redirects(){
    return [
      {
        source: "/news",
        destination: "/de/blog",
        permanent: false
      },
      {
        source: "/karriere",
        destination: "/de/karriere",
        permanent: false
      },
      {
        source: "/unser-team",
        destination: "/de/ueber-uns",
        permanent: false
      },
      {
        source: "/kontakt",
        destination: "/de/kontakt",
        permanent: false
      },
      {
        source: "/impressum",
        destination: "/de/impressum",
        permanent: false
      },
      {
        source: "/datenschutz",
        destination: "/de/simplify-tax-datenschutzerkl%C3%A4rung-f%C3%BCr-klienten-2018.pdf",
        permanent: false
      },
      {
        source: "/allgemeine-auftragsbedingungen",
        destination: "/de/simplify-tax-aab-2018.pdf",
        permanent: false
      }
    ];
  }
};

module.exports = withNextIntl(nextConfig);
