import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import tailwindcss from '@tailwindcss/vite';
import { join } from 'node:path';
import { readFileSync, statSync } from 'fs';
import { addImportsDir, defineNuxtModule } from 'nuxt/kit';

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@pinia/nuxt',
    'shadcn-nuxt',
    '@nuxt/fonts',
    defineNuxtModule({
      meta: { name: 'nested-composables' },
      setup(_options, nuxt) {
        for (const layer of nuxt.options._layers) {
          addImportsDir(
            resolve(layer.config.srcDir ?? layer.cwd, 'composables/**'),
          );
        }
      },
    }),
  ],
  devtools: { enabled: true },

  css: [join(currentDir, 'tailwind.css')],
  colorMode: {
    classPrefix: '',
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    storageKey: 'kanopa-scheme',
  },
  vite: {
    plugins: [tailwindcss()],
    vue: {
      script: {
        fs: {
          fileExists: (file: string) => {
            try {
              return statSync(file).isFile();
            }
            catch {
              return false;
            }
          },
          readFile: (file: string) => readFileSync(file, 'utf-8'),
        },
      },
    },
  },

  eslint: {
    checker: true,
    config: {
      stylistic: {
        indent: 2,
        semi: true,
        quotes: 'single',
      },
    },
  },
  fonts: {
    families: [
      {
        name: 'Outfit',
        provider: 'google',
        global: true,
      },
      {
        name: 'Noto Sans JP',
        provider: 'google',
        global: true,
      },
      {
        name: 'Fira Code',
        provider: 'google',
        global: true,
      },
    ],
  },
  i18n: {
    defaultLocale: 'fr',
    langDir: 'locales',
    locales: [
      {
        name: 'Français',
        code: 'fr',
        iso: 'fr-FR',
        file: 'fr.json',
      },
    ],
    strategy: 'no_prefix',
  },
  shadcn: {
    componentDir: join(currentDir, 'app/components/ui'),
    prefix: 'Ui',
  },
});
