interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly NODE_ENV: string;
  readonly NG_APP_NAME: string;
  readonly NG_APP_VERSION: string;
  readonly NG_APP_AUTH_TOKEN_TEST: string;
  readonly NG_APP_AUTH_TOKEN_DEV: string;
  readonly NG_APP_API_URL_TEST: string;
  readonly NG_APP_API_URL_DEV: string;
}
