// @ts-check
import { defineConfig } from 'astro/config';

// URL pública del sitio: la aporta la plataforma de despliegue (Vercel o Netlify)
// o se puede fijar con SITE_URL. Se usa para la etiqueta canonical y Open Graph.
const site =
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL &&
    `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  process.env.URL ||
  'http://localhost:4321';

// https://astro.build/config
export default defineConfig({
  site,
});
