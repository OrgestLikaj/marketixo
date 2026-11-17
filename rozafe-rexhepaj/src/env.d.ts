/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** 'true' for the GitHub Pages preview build (set in astro.config.mjs from the PREVIEW variable). */
  readonly PREVIEW: string;
}
