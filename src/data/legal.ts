import { site } from './site';

const company = `${site.legalName} (CIF ${site.cif}), con domicilio en ${site.address.street}, ${site.address.postalCode} ${site.address.city}`;

/**
 * Textos legales SIMULADOS para una empresa ficticia.
 * Sirven para completar la estructura de la landing; no son asesoramiento jurídico.
 */
export const legalSections = [
  {
    id: 'aviso-legal',
    title: 'Aviso legal',
    body: [
      `En cumplimiento de la Ley 34/2002 de servicios de la sociedad de la información y de comercio electrónico, se informa de que este sitio web es titularidad de ${company}, con teléfono ${site.phone} y correo electrónico ${site.email}.`,
      'El acceso a la web es gratuito y su uso implica la aceptación de estas condiciones. Los contenidos, textos y elementos gráficos pertenecen a su titular y no pueden reproducirse con fines comerciales sin autorización.',
      'El titular no se responsabiliza del uso que terceros hagan de la información publicada ni de los contenidos de webs externas enlazadas desde este sitio.',
    ],
  },
  {
    id: 'privacidad',
    title: 'Política de privacidad',
    body: [
      `<strong>Responsable:</strong> ${company}.`,
      '<strong>Finalidad:</strong> atender las solicitudes de consulta enviadas desde el formulario de contacto y remitir la propuesta de revisión energética. No se elaboran perfiles ni se toman decisiones automatizadas.',
      '<strong>Legitimación:</strong> el consentimiento de la persona interesada, que se recoge de forma expresa mediante la casilla de aceptación del formulario.',
      '<strong>Conservación:</strong> los datos se conservan mientras dure la relación y, después, durante los plazos legalmente exigibles.',
      '<strong>Destinatarios:</strong> no se ceden datos a terceros salvo obligación legal o cuando sea imprescindible para gestionar el cambio de contrato solicitado.',
      `<strong>Derechos:</strong> puedes solicitar el acceso, la rectificación, la supresión, la limitación, la portabilidad o la oposición al tratamiento escribiendo a ${site.email}, así como reclamar ante la Agencia Española de Protección de Datos.`,
    ],
  },
  {
    id: 'cookies',
    title: 'Política de cookies',
    body: [
      'Esta web no utiliza cookies de analítica, publicidad ni seguimiento, y no incorpora recursos de terceros que instalen cookies: las tipografías se sirven desde el propio dominio.',
      'Por ese motivo no se muestra ningún banner de consentimiento. Si en el futuro se incorporasen cookies no esenciales, se solicitaría el consentimiento previo tal y como exige la normativa vigente.',
    ],
  },
];
