const config = () => ({
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 4000,
  proxies: process.env.PROXIES,
  serviceURL: process.env.SERVICES_URL || 'services.local:8123'
});

export default config;
