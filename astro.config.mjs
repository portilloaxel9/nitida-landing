// @ts-check
import { defineConfig } from 'astro/config';

// URL pública del sitio: la aporta la plataforma de despliegue (GitHub Pages,
// Vercel o Netlify) o se puede fijar con SITE_URL. Se usa para la etiqueta
// canonical y para Open Graph.
const site =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL &&
    `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  process.env.URL ||
  'http://localhost:4321';

// Subdirectorio donde se publica. GitHub Pages sirve el proyecto en
// /nitida-landing/ (lo fija el workflow); en local, Vercel o Netlify es la raíz.
const base = process.env.BASE_PATH || '/';

// https://astro.build/config
export default defineConfig({
  site,
  base,
});
