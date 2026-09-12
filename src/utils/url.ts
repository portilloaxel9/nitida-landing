/**
 * Antepone la base del sitio a una ruta interna.
 *
 * Hace falta porque en GitHub Pages la web vive en un subdirectorio
 * (/nitida-landing/) mientras que en Vercel, Netlify o en local vive en la raíz.
 * Los anclajes (#seccion) y las URL externas se devuelven tal cual.
 */
export function withBase(path: string): string {
  if (path.startsWith('#') || /^[a-z]+:/i.test(path)) return path;

  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;

  return `${base}${clean}`;
}
