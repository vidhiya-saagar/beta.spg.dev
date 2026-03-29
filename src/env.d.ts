/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly API_URL: string;
  readonly CMS_SPACE_ID: string;
  readonly CMS_ACCESS_TOKEN: string;
  readonly CLOUDINARY_CLOUD_NAME: string;
  readonly CLOUDINARY_API_KEY: string;
  readonly CLOUDINARY_API_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
