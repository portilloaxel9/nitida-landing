/**
 * Formulario de captación: validación accesible + envío simulado.
 *
 * - Sin JS, el formulario sigue funcionando con la validación nativa del navegador.
 * - Con JS: los errores aparecen al salir de un campo (no mientras se escribe por
 *   primera vez) y se corrigen en vivo en cuanto el dato es válido.
 * - Al enviar con errores, el foco va al primer campo a corregir.
 * - `sendLead` simula la llamada: es el único punto a cambiar para conectar un CRM/API real.
 */

type FieldName = 'name' | 'phone' | 'email' | 'clientType' | 'privacy';
type Validator = (value: string, form: HTMLFormElement) => string;

// Móviles (6, 7) y fijos (8, 9) españoles, con o sin prefijo +34 / 0034
const PHONE_ES = /^(?:\+34|0034)?[6-9]\d{8}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const validators: Record<FieldName, Validator> = {
  name: (value) =>
    value.trim().length >= 2 ? '' : 'Escribe tu nombre para saber cómo dirigirnos a ti.',
  phone: (value) => {
    const digits = value.replace(/[\s().-]/g, '');
    if (!digits) return 'Necesitamos un teléfono para llamarte.';
    return PHONE_ES.test(digits)
      ? ''
      : 'Revisa el teléfono: debe tener 9 cifras (p. ej. 612 345 678).';
  },
  email: (value) => {
    if (!value.trim()) return 'Escribe tu email para enviarte la propuesta.';
    return EMAIL.test(value.trim())
      ? ''
      : 'Revisa el email: parece incompleto (p. ej. nombre@correo.es).';
  },
  clientType: (value) => (value ? '' : 'Elige el tipo de cliente.'),
  privacy: (_, form) =>
    (form.elements.namedItem('privacy') as HTMLInputElement).checked
      ? ''
      : 'Necesitamos que aceptes la política de privacidad para poder llamarte.',
};

const isValidatedField = (name: string): name is FieldName => name in validators;

/** Simulación de envío. En producción: fetch('/api/leads', { method: 'POST', body: data }) */
async function sendLead(_data: FormData): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1200));
}

export function initLeadForm(form: HTMLFormElement) {
  const root = form.parentElement!;
  const success = root.querySelector<HTMLElement>('[data-form-success]')!;
  const successText = root.querySelector<HTMLElement>('[data-success-text]')!;
  const status = form.querySelector<HTMLElement>('[data-form-status]')!;
  const submit = form.querySelector<HTMLButtonElement>('[data-submit]')!;
  const submitLabel = submit.querySelector<HTMLElement>('.btn__label')!;
  const defaultLabel = submitLabel.textContent;

  const touched = new Set<FieldName>();
  let sending = false;

  // Con JS tomamos el control de la validación (mensajes propios en español)
  form.noValidate = true;

  const controlsOf = (name: FieldName) =>
    Array.from(form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(`[name="${name}"]`));

  const valueOf = (name: FieldName) => {
    const control = form.elements.namedItem(name) as HTMLInputElement | RadioNodeList | null;
    return control?.value ?? '';
  };

  function showError(name: FieldName, message: string) {
    const error = form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
    if (error) error.textContent = message;
    controlsOf(name).forEach((control) =>
      message
        ? control.setAttribute('aria-invalid', 'true')
        : control.removeAttribute('aria-invalid'),
    );
  }

  function validate(name: FieldName) {
    const message = validators[name](valueOf(name), form);
    showError(name, message);
    return !message;
  }

  form.addEventListener('focusout', (event) => {
    const { name, value, type } = event.target as HTMLInputElement;
    if (!isValidatedField(name) || type === 'radio' || type === 'checkbox') return;
    // No regañamos a quien solo pasa por un campo vacío con el tabulador
    if (!value && !touched.has(name)) return;
    touched.add(name);
    validate(name);
  });

  form.addEventListener('input', (event) => {
    const { name } = event.target as HTMLInputElement;
    if (isValidatedField(name) && touched.has(name)) validate(name);
  });

  form.addEventListener('change', (event) => {
    const { name, type } = event.target as HTMLInputElement;
    if (!isValidatedField(name) || (type !== 'radio' && type !== 'checkbox')) return;
    touched.add(name);
    validate(name);
  });

  function setSending(value: boolean) {
    sending = value;
    submit.setAttribute('aria-busy', String(value));
    submitLabel.textContent = value ? 'Enviando…' : defaultLabel;
  }

  function showSuccess(fullName: string) {
    const firstName = fullName.trim().split(/\s+/)[0];
    successText.textContent = `Gracias, ${firstName}. Te llamaremos en menos de 24 horas laborables para empezar tu revisión.`;
    form.hidden = true;
    success.hidden = false;
    success.focus();
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending) return;

    const fields = Object.keys(validators) as FieldName[];
    fields.forEach((name) => touched.add(name));
    const invalid = fields.filter((name) => !validate(name));

    if (invalid.length) {
      status.textContent =
        invalid.length === 1
          ? 'Revisa el campo marcado.'
          : `Revisa los ${invalid.length} campos marcados.`;
      controlsOf(invalid[0])[0]?.focus();
      return;
    }

    status.textContent = '';
    const data = new FormData(form);

    // Si un bot ha rellenado el campo trampa, fingimos éxito sin enviar nada
    if (data.get('website')) {
      showSuccess(String(data.get('name')));
      return;
    }

    setSending(true);
    try {
      await sendLead(data);
      showSuccess(String(data.get('name')));
    } catch {
      status.textContent = 'No hemos podido enviar tu solicitud. Inténtalo de nuevo o llámanos.';
    } finally {
      setSending(false);
    }
  });

  root.querySelector('[data-form-reset]')?.addEventListener('click', () => {
    form.reset();
    touched.clear();
    (Object.keys(validators) as FieldName[]).forEach((name) => showError(name, ''));
    success.hidden = true;
    form.hidden = false;
    controlsOf('name')[0]?.focus();
  });
}
