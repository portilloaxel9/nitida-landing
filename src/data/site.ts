/**
 * Datos de marca y contacto centralizados.
 * La empresa es ficticia: cambiar aquí el nombre, el teléfono o la dirección
 * actualiza toda la web (cabecera, formulario, pie y datos estructurados).
 */
export const site = {
  name: 'Nítida',
  legalName: 'Nítida Asesoría Energética, S.L.',
  description:
    'Revisamos gratis tu factura de luz y gas y te decimos cómo pagar menos. Asesoría energética independiente para hogares, autónomos, empresas y comunidades en toda España.',
  phone: '900 000 000',
  phoneHref: 'tel:+34900000000',
  email: 'hola@nitida-energia.es',
  schedule: 'L–V de 9:00 a 19:00',
  address: {
    street: 'Calle Ejemplo 12',
    postalCode: '28001',
    city: 'Madrid',
  },
  cif: 'B00000000',
} as const;

export const nav = [
  { label: 'Qué revisamos', href: '/#solucion' },
  { label: 'Ventajas', href: '/#beneficios' },
  { label: 'Cómo funciona', href: '/#como-funciona' },
  { label: 'Preguntas', href: '/#faq' },
];

// Enlaces simulados ("#") salvo los que apuntan a secciones o a la página legal
export const footerNav = [
  {
    title: 'Servicios',
    links: [
      { label: 'Hogares', href: '#' },
      { label: 'Autónomos', href: '#' },
      { label: 'Empresas', href: '#' },
      { label: 'Comunidades de propietarios', href: '#' },
    ],
  },
  {
    title: 'Nítida',
    links: [
      { label: 'Cómo funciona', href: '/#como-funciona' },
      { label: 'Sobre nosotros', href: '#' },
      { label: 'Blog de ahorro', href: '#' },
      { label: 'Trabaja con nosotros', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Aviso legal', href: '/legal#aviso-legal' },
      { label: 'Política de privacidad', href: '/legal#privacidad' },
      { label: 'Política de cookies', href: '/legal#cookies' },
    ],
  },
];
