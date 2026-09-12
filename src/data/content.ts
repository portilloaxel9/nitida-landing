/**
 * Contenido de la landing separado del marcado: los componentes solo pintan
 * lo que hay aquí, así los textos se pueden revisar o traducir sin tocar HTML/CSS.
 */
import BadgeEuro from '@lucide/astro/icons/badge-euro';
import CalendarCheck from '@lucide/astro/icons/calendar-check';
import ChartLine from '@lucide/astro/icons/chart-line';
import ClipboardCheck from '@lucide/astro/icons/clipboard-check';
import FileCheck from '@lucide/astro/icons/file-check';
import FileSearch from '@lucide/astro/icons/file-search';
import Gauge from '@lucide/astro/icons/gauge';
import Percent from '@lucide/astro/icons/percent';
import PhoneCall from '@lucide/astro/icons/phone-call';
import PiggyBank from '@lucide/astro/icons/piggy-bank';
import Receipt from '@lucide/astro/icons/receipt';
import Scale from '@lucide/astro/icons/scale';
import UserCheck from '@lucide/astro/icons/user-check';

/* ---------- Hero: factura de ejemplo (importes coherentes entre sí) ---------- */
export const bill = {
  period: 'Junio 2026 · 30 días',
  tariff: '2.0TD',
  lines: [
    {
      label: 'Término de potencia',
      detail: '5,75 kW × 30 días',
      amount: 23.03,
      leak: 'Te sobra potencia: con 4,6 kW tienes suficiente',
    },
    {
      label: 'Término de energía',
      detail: '310 kWh × 0,189 €/kWh',
      amount: 58.59,
      leak: 'Precio del kWh alto para tu consumo',
    },
    { label: 'Impuesto eléctrico', detail: '5,11 %', amount: 4.17 },
    { label: 'Alquiler de contador', amount: 0.81 },
    { label: 'Servicio «Mantenimiento Plus»', amount: 6.9, leak: 'Un servicio que no necesitas' },
    { label: 'IVA', detail: '21 %', amount: 19.64 },
  ],
  before: 113.14,
  after: 83.15,
  yearlySaving: 360,
};

export const stats = [
  { value: '0 €', label: 'cuesta la revisión' },
  { value: '+30', label: 'comercializadoras comparadas' },
  { value: '24 h', label: 'para darte una respuesta' },
  { value: '100 %', label: 'independientes' },
];

/* ---------- Problema ---------- */
export const jargon = [
  'Término de potencia',
  'Peajes y cargos',
  'P1 · P2 · P3',
  'kW ≠ kWh',
  'PVPC',
  'Precio indexado',
  'Excesos de potencia',
  'Energía reactiva',
  'Alquiler de contador',
  'Impuesto eléctrico',
  'CUPS',
  'Discriminación horaria',
];

export const pains = [
  {
    icon: ChartLine,
    quote: 'Cada mes pago una cantidad distinta y no sé por qué.',
    text: 'Precios que cambian, periodos, peajes… Sin entender la factura es imposible saber si pagas lo justo.',
  },
  {
    icon: Gauge,
    quote: 'No sé si necesito toda la potencia que tengo contratada.',
    text: 'La potencia se paga cada día, la uses o no. Tenerla sobredimensionada es uno de los sobrecostes más habituales.',
  },
  {
    icon: Percent,
    quote: 'Me ofrecieron un descuento y ahora pago más que antes.',
    text: 'Muchas ofertas suben cuando termina la promoción, y casi nunca te avisan.',
  },
  {
    icon: Receipt,
    quote: 'Hay conceptos en la factura que no recuerdo haber contratado.',
    text: 'Mantenimientos, seguros o packs que se cuelan en la factura y se pagan mes a mes.',
  },
];

/* ---------- Solución ---------- */
export const checks = [
  'Precio de la energía y tipo de tarifa: fija, indexada o PVPC',
  'Potencia contratada en cada periodo',
  'Reparto de tu consumo en horas punta, llano y valle',
  'Servicios y cargos añadidos que no necesitas',
  'Permanencias y condiciones de tu contrato',
  'Excesos de potencia y energía reactiva en empresas',
];

/** Consumo por horas (kWh) de un día laborable tipo, de 0 h a 23 h */
export const hourlyUsage = [
  0.25, 0.2, 0.18, 0.18, 0.18, 0.2, 0.3, 0.55, 0.6, 0.45, 0.35, 0.35, 0.4, 0.6, 0.7, 0.5, 0.4, 0.45,
  0.6, 0.8, 0.95, 1.05, 0.8, 0.45,
];

/* ---------- Beneficios ---------- */
export const benefits = [
  {
    icon: BadgeEuro,
    figure: '0 €',
    title: 'Revisión 100 % gratuita',
    text: 'El estudio no te cuesta nada ni te compromete a nada. Tú decides si seguimos adelante.',
  },
  {
    icon: PiggyBank,
    title: 'Ahorro que se nota pronto',
    text: 'Los cambios de tarifa o potencia se aplican en pocos días, sin obras ni cortes de suministro.',
  },
  {
    icon: Scale,
    title: 'Asesoría independiente',
    text: 'Comparamos más de 30 comercializadoras y te recomendamos la que encaja con tu consumo.',
  },
  {
    icon: ClipboardCheck,
    title: 'Nos ocupamos del papeleo',
    text: 'Gestionamos el cambio de tarifa, potencia o compañía por ti. Solo tienes que firmar.',
  },
  {
    icon: UserCheck,
    title: 'Una persona de referencia',
    text: 'Siempre la misma persona, con nombre y teléfono directo. Nada de centralitas.',
  },
  {
    icon: CalendarCheck,
    title: 'Revisión anual incluida',
    text: 'Cada año volvemos a revisar tus condiciones para que no vuelvas a pagar de más cuando cambien los precios.',
  },
];

/* ---------- Cómo funciona ---------- */
export const steps = [
  {
    icon: PhoneCall,
    title: 'Analizamos tu caso',
    text: 'Hablamos contigo para entender cómo y cuándo usas la energía en tu casa o en tu negocio.',
    time: 'Llamada de 10 minutos',
  },
  {
    icon: FileSearch,
    title: 'Revisamos tu factura y tu consumo',
    text: 'Con una factura reciente y tu curva de consumo estudiamos precio, potencia, periodos y servicios añadidos.',
    time: 'En 48 horas',
  },
  {
    icon: FileCheck,
    title: 'Te proponemos una solución',
    text: 'Recibes un informe claro con el ahorro estimado. Si te convence, gestionamos el cambio por ti.',
    time: 'Tú decides, sin compromiso',
  },
];

/* ---------- Preguntas frecuentes ---------- */
export const faqs = [
  {
    q: '¿De verdad la revisión es gratis?',
    a: 'Sí. El estudio y la propuesta no tienen coste ni te comprometen a nada. Si decides cambiar, nuestra retribución la paga la comercializadora, nunca tú, y te lo explicamos con total transparencia.',
  },
  {
    q: '¿Me quedaré sin luz si cambio de compañía?',
    a: 'No. Cambiar de comercializadora no implica cortes, obras ni cambio de contador: la red y la distribuidora de tu zona siguen siendo las mismas.',
  },
  {
    q: '¿Qué necesito para empezar?',
    a: 'Solo una factura reciente de luz o de gas (una foto o el PDF valen). En ella aparecen tu CUPS, tu potencia y tu tarifa, que es lo que necesitamos para empezar.',
  },
  {
    q: '¿Trabajáis también con empresas y comunidades?',
    a: 'Sí. Asesoramos a hogares, autónomos, pymes y comunidades de propietarios, tanto en tarifas domésticas (2.0TD) como en tarifas de negocio (3.0TD y 6.1TD).',
  },
  {
    q: '¿Tengo algún tipo de permanencia con vosotros?',
    a: 'No. Puedes dejar nuestro servicio cuando quieras. Y si tu contrato actual tiene permanencia, la tenemos en cuenta antes de proponerte ningún cambio.',
  },
];
