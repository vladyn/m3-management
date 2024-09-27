interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly NODE_ENV: string;
  readonly NG_APP_NAME: string;
  readonly NG_APP_VERSION: string;
  readonly NG_APP_AUTH_TOKEN: string;
  readonly NG_APP_FOO: string;
  readonly NG_APP_BAR: string;
  readonly NG_APP_API_URL: string;
}
