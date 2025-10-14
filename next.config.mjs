const isProd = process.env.NODE_ENV === 'production';
const STB_USER_DIRECTORY = '/~step';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: isProd ? STB_USER_DIRECTORY : '',
  assetPrefix: isProd ? STB_USER_DIRECTORY  : '',
  env: {
    BASE_PATH: isProd ? STB_USER_DIRECTORY : "",
  }
}

export default nextConfig;
