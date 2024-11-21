export const environment = {
  production: false,
  authToken: import.meta.env.NG_APP_AUTH_TOKEN_LOCAL,
  apiUrl: import.meta.env.NG_APP_API_URL_DEV,
  version: import.meta.env.NG_APP_VERSION,
  appName: import.meta.env.NG_APP_NAME,
  client_id: import.meta.env.NG_APP_DMS_CLIENT_ID,
  client_secret: import.meta.env.NG_APP_DMS_SECRET,
  scope: 'access_rest_api',
  grant_type: 'client_credentials',
  dms_api_url: import.meta.env.NG_APP_DMS_API_URL,
};
