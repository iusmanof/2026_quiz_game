export const getBasicAuthHeaderHelper = () => {
  const login = process.env.BASIC_AUTH_USER;
  const password = process.env.BASIC_AUTH_PASSWORD;
  return `Basic ${Buffer.from(`${login}:${password}`).toString('base64')}`;
};
