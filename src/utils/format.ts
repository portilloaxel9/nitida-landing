const euro = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });

/** 23.03 → "23,03 €" (con espacio de no separación antes del símbolo) */
export const eur = (value: number) => euro.format(value);

/** 1.05 → "1,05" */
export const decimal = (value: number, digits = 2) =>
  value.toLocaleString('es-ES', { minimumFractionDigits: digits, maximumFractionDigits: digits });
