const config = () => ({
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4000,
  proxies: process.env.PROXIES
});

export default config;
