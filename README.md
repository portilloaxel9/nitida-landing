# Nítida · Landing de asesoría energética

Landing page de captación para una asesoría energética ficticia que revisa facturas de luz y gas
del mercado español. Desarrollada a código con **Astro + SCSS + TypeScript**, sin plantillas ni
maquetadores visuales.

> Prueba técnica de diseño web / frontend. La empresa, los datos de contacto y los textos legales
> son **simulados**.

## Enlaces

|                   |                                                          |
| ----------------- | -------------------------------------------------------- |
| **Web publicada** | _pendiente de desplegar (ver [Despliegue](#despliegue))_ |
| **Repositorio**   | _este mismo_                                             |

---

## 1. Tecnología y por qué

| Decisión                                 | Motivo                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[Astro 7](https://astro.build)**       | La landing es contenido estático con una isla de interactividad (el formulario). Astro genera HTML puro y **no envía ningún framework al navegador**: solo ~3 kB de JS propio. Con React o Next.js el resultado visual sería idéntico pero con mucho más peso y complejidad para lo que pide esta página. |
| **SCSS con variables CSS**               | Los _tokens_ (color, tipografía, espaciado) viven como _custom properties_ en `:root`, así se pueden cambiar en un punto y se heredan en toda la web. SCSS aporta anidamiento y un único mixin de breakpoints (`@include mq(md)`), sin frameworks de utilidades.                                          |
| **Estilos con alcance por componente**   | Cada `.astro` lleva su `<style lang="scss">`: no hay CSS global creciendo sin control ni colisiones de nombres.                                                                                                                                                                                           |
| **TypeScript**                           | Tipado en los datos de contenido y en la lógica del formulario. `npm run check` valida tipos, accesibilidad básica y plantillas.                                                                                                                                                                          |
| **[Lucide](https://lucide.dev)**         | Iconos SVG en línea, importados uno a uno (solo entra en el bundle el que se usa).                                                                                                                                                                                                                        |
| **[Fontsource](https://fontsource.org)** | Tipografías **autoalojadas**: mejor rendimiento (sin conexión a un tercero para el render) y sin transferir la IP de quien visita a Google Fonts, que en la UE es un problema de RGPD. Por eso tampoco hace falta banner de cookies: la web no usa ninguna.                                               |
| **Sin dependencias de UI**               | Nada de Bootstrap/Tailwind/librerías de gráficos: el gráfico de consumo, la factura del hero y el acordeón están hechos con HTML/CSS nativos.                                                                                                                                                             |

**Tipografías:** Bricolage Grotesque (titulares, con personalidad), Figtree (texto, muy legible en
pantalla) y JetBrains Mono (cifras de factura y etiquetas técnicas, refuerza el aire de "documento").

## 2. Puesta en marcha

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # genera /dist (HTML estático)
npm run preview    # sirve /dist en local
npm run check      # tipos + diagnósticos de Astro
```

Requiere Node 22.12 o superior.

## 3. Estructura del proyecto

```
src/
├─ components/
│  ├─ ui/              Button.astro · Logo.astro          (piezas reutilizables)
│  ├─ Header.astro     Cabecera fija con CTA siempre visible
│  ├─ Hero.astro       Titular, CTA y franja de datos clave
│  ├─ BillMockup.astro Factura "desmontada" del hero (HTML/CSS, no es una imagen)
│  ├─ Problem.astro    El dolor del cliente + nube de tecnicismos
│  ├─ Solution.astro   Qué revisamos + gráfico de consumo
│  ├─ UsageChart.astro Gráfico de barras por hora con periodos punta/llano/valle
│  ├─ Benefits.astro   Rejilla tipo bento con 6 beneficios
│  ├─ HowItWorks.astro Los 3 pasos
│  ├─ Faq.astro        Acordeón con <details> nativo
│  ├─ Contact.astro    Sección de conversión
│  ├─ LeadForm.astro   Formulario + estado de éxito
│  ├─ Footer.astro     Enlaces e información legal simulada
│  └─ MobileCta.astro  Barra de conversión fija en móvil
├─ data/               Contenido y textos separados del marcado
│  ├─ site.ts          Marca, contacto, navegación y pie
│  ├─ content.ts       Factura de ejemplo, dolores, beneficios, pasos, FAQ…
│  └─ legal.ts         Textos legales simulados
├─ layouts/
│  └─ BaseLayout.astro <head>, SEO, Open Graph, datos estructurados y fuentes
├─ pages/
│  ├─ index.astro      La landing
│  ├─ legal.astro      Aviso legal, privacidad y cookies (simulados)
│  └─ og.astro         Plantilla 1200×630 de la que sale /public/og.png
├─ scripts/            TypeScript del cliente (formulario y animación al hacer scroll)
├─ styles/             global.scss (tokens + base) y _mixins.scss (breakpoints)
└─ utils/format.ts     Formato de euros y decimales en es-ES
```

**Todo el contenido está en `src/data/`**: cambiar un beneficio, una pregunta frecuente o el nombre
de la empresa no obliga a tocar ni una línea de HTML.

## 4. Sistema de diseño

Definido en `src/styles/global.scss`:

| Token                   | Valor       | Uso                                                                        |
| ----------------------- | ----------- | -------------------------------------------------------------------------- |
| `--c-ink`               | `#0e2320`   | Texto y secciones oscuras (verde casi negro, más cálido que un negro puro) |
| `--c-paper`             | `#f6f2e9`   | Fondo crema: evita el blanco clínico y recuerda al papel de una factura    |
| `--c-volt`              | `#ffd23f`   | Acento de marca y **único color de los CTA principales**                   |
| `--c-leaf`              | `#16704a`   | Ahorro (importes nuevos, confirmaciones)                                   |
| `--c-coral`             | `#d9582c`   | Dinero que se escapa (avisos en la factura)                                |
| `--c-valle/llano/punta` | rampa coral | Periodos horarios del gráfico, de más barato a más caro                    |

- **Escala tipográfica fluida** con `clamp()`: no hay saltos bruscos entre móvil y escritorio.
- **Breakpoints** (en `em`, respetan el zoom): 36 / 48 / 64 / 80 em.
- **Ritmo visual**: claro → claro → oscuro → claro → crema → claro → oscuro. Las secciones oscuras
  marcan los dos momentos clave (la solución y el formulario).

## 5. Decisiones de diseño

- **El recurso visual del hero es una factura real desmontada**, no una foto de archivo. Marca en
  coral los tres sobrecostes típicos (potencia sobredimensionada, precio del kWh y un servicio de
  mantenimiento no solicitado) y muestra el total antes y después. Explica el servicio sin que haya
  que leer una línea de texto, pesa unos pocos kB y se ve nítido en cualquier pantalla.
- **Jerarquía orientada a conversión**: un solo CTA principal ("revisión gratuita") repetido en
  cabecera, hero, pasos, formulario y pie, siempre en amarillo; el resto de acciones son
  secundarias. En móvil aparece una barra fija con el CTA cuando el usuario deja atrás el hero y
  desaparece al llegar al formulario para no tapar contenido.
- **Copy con conocimiento del sector español**: potencia contratada, 2.0TD, punta/llano/valle, CUPS,
  bono social, permanencias. Las objeciones habituales ("¿me quedaré sin luz?", "¿es gratis de
  verdad?") se responden justo antes del formulario.
- **El gráfico de consumo** usa una rampa de un solo tono ordenada por precio del periodo (claro =
  barato, oscuro = caro) en vez del típico semáforo rojo/amarillo/verde: se distingue bien con
  cualquier tipo de daltonismo y mantiene el significado "más oscuro = más caro". Comprobado con un
  validador de contraste y separación de color; además del color, cada periodo lleva leyenda con su
  porcentaje.
- **Cifras coherentes**: todos los importes de la factura de ejemplo cuadran entre sí (113,14 € →
  83,15 € ≈ 360 €/año) y van acompañados del aviso de que es un ejemplo ilustrativo.
- **Microcopy que reduce fricción**: "menos de un minuto", "sin coste y sin compromiso", "solo
  necesitas una factura reciente".

## 6. Accesibilidad

- HTML semántico, un solo `<h1>`, `lang="es"` y enlace "Saltar al contenido".
- Contraste AA comprobado en todas las combinaciones de texto (también sobre fondo oscuro y amarillo).
- Foco visible en todos los elementos interactivos y área táctil mínima de 44 px.
- Formulario con etiquetas reales, errores asociados por `aria-describedby`, `aria-invalid` y foco
  automático al primer campo a corregir; el estado de envío se anuncia con `role="status"`.
- El gráfico tiene alternativa textual (`role="img"` + resumen) y el dato clave está también escrito.
- Se respeta `prefers-reduced-motion`: sin animaciones para quien las desactiva.
- Sin JavaScript la página se ve y se lee completa, y el formulario conserva la validación nativa
  del navegador.

## 7. Rendimiento

- HTML estático, cero JavaScript de framework; solo el formulario, el efecto de la cabecera y la
  aparición al hacer scroll (~3 kB).
- Tipografías variables autoalojadas, subconjunto latino y `preload` de las dos que se usan al
  primer pintado.
- Sin imágenes de mapa de bits en la página: ilustraciones e iconos son HTML/CSS/SVG.

## 8. El formulario

Campos: nombre, teléfono, email, tipo de cliente (particular / autónomo / empresa / comunidad),
mensaje opcional y aceptación de la política de privacidad, con la información básica de protección
de datos junto al botón.

- Validación en español con reglas propias (teléfono español de 9 cifras, email, consentimiento).
- Los errores solo aparecen al salir de un campo y se corrigen mientras se escribe.
- Campo trampa (_honeypot_) contra bots.
- **El envío está simulado**: `sendLead()` en `src/scripts/lead-form.ts` espera 1,2 s y muestra el
  estado de éxito. Es el único punto a cambiar para conectarlo a un CRM, a un endpoint propio o a
  un servicio tipo Formspree.

## 9. Despliegue

El proyecto es 100 % estático (`dist/`), así que funciona en cualquier hosting:

- **Vercel / Netlify**: importar el repositorio; ambos detectan Astro (`npm run build` → `dist`).
- La URL pública se toma automáticamente de la plataforma para el `canonical` y las etiquetas Open
  Graph; también se puede fijar con la variable de entorno `SITE_URL`.

## 10. Uso de IA

Se ha utilizado **Claude (Claude Code)** como herramienta de apoyo durante el desarrollo:

- Lluvia de ideas de concepto y nombre de marca, y primeras versiones de los textos en español.
- Generación del andamiaje de componentes y estilos a partir de la estructura y las decisiones de
  diseño definidas previamente.
- Revisión cruzada de accesibilidad, contraste y microcopy.
- Verificación visual del resultado en móvil, tablet y escritorio, y pruebas del formulario.

Lo que **no** ha hecho la IA: elegir el concepto visual, el sistema de color y tipografía, la
jerarquía de la página ni el enfoque de conversión; esas decisiones están explicadas en el punto 5.

> **Nota para la entrega:** completa este apartado con tu propio flujo (qué le pediste, qué
> descartaste, qué ajustaste a mano y qué harías distinto), que es justamente lo que se evalúa.

## 11. Qué es simulado

Nombre de la empresa, logotipo, teléfono, email, dirección, CIF, datos registrales, enlaces del pie
marcados con `#` y los textos legales. La factura y la curva de consumo son ejemplos ilustrativos
con cifras coherentes, no datos de un cliente real.

## 12. Siguientes pasos

- Conectar el formulario a un CRM y añadir medición de conversión (con consentimiento).
- Test A/B del titular y del CTA principal.
- Página de gracias con seguimiento de conversión y recordatorio para adjuntar la factura.
- Versión con testimonios y logotipos de comercializadoras cuando haya material real.
