/**
 * Progressive enhancement for the project request form.
 * Server-side validation in public/api/contact.php is the source of truth;
 * this only gives faster, friendlier feedback.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function initContactForm() {
  document.querySelectorAll<HTMLFormElement>('[data-contact-form]').forEach((form) => {
    const msg = form.dataset;
    const summary = form.querySelector<HTMLElement>('[data-summary]')!;
    const success = form.querySelector<HTMLElement>('[data-success]')!;
    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
    const label = button.querySelector<HTMLElement>('[data-label]')!;
    const ts = form.querySelector<HTMLInputElement>('[data-ts]');
    if (ts) ts.value = String(Math.floor(Date.now() / 1000));

    // Pre-select a service from ?service=<key> (links from service pages).
    const pre = new URLSearchParams(location.search).get('service');
    if (pre) form.querySelector<HTMLInputElement>(`input[name="services[]"][value="${CSS.escape(pre)}"]`)?.click();
    if (new URLSearchParams(location.search).get('error')) summary.hidden = false;

    const fields = {
      name: form.elements.namedItem('name') as HTMLInputElement,
      email: form.elements.namedItem('email') as HTMLInputElement,
      message: form.elements.namedItem('message') as HTMLTextAreaElement,
      consent: form.elements.namedItem('consent') as HTMLInputElement,
    };

    const setError = (el: HTMLInputElement | HTMLTextAreaElement, text: string) => {
      const err = document.getElementById(`${el.id}-err`);
      if (err) err.textContent = text;
      el.setAttribute('aria-invalid', text ? 'true' : 'false');
    };

    const check = (el: HTMLInputElement | HTMLTextAreaElement): boolean => {
      let text = '';
      if (el.type === 'checkbox') text = (el as HTMLInputElement).checked ? '' : msg.msgConsent!;
      else if (!el.value.trim()) text = msg.msgRequired!;
      else if (el.type === 'email' && !EMAIL.test(el.value.trim())) text = msg.msgEmail!;
      setError(el, text);
      return !text;
    };

    // Validate on blur once touched, re-validate live after an error.
    Object.values(fields).forEach((el) => {
      el.addEventListener('blur', () => el.value && check(el));
      el.addEventListener('input', () => el.getAttribute('aria-invalid') === 'true' && check(el));
      el.addEventListener('change', () => el.getAttribute('aria-invalid') === 'true' && check(el));
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const results = Object.values(fields).map((el) => ({ el, ok: check(el) }));
      const firstBad = results.find((r) => !r.ok);
      if (firstBad) {
        summary.hidden = false;
        firstBad.el.focus();
        return;
      }
      summary.hidden = true;
      button.disabled = true;
      const original = label.textContent;
      label.textContent = msg.msgSending!;

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
        if (!res.ok || !data.ok) throw new Error(data.error || 'generic');
        form.classList.add('is-sent');
        success.hidden = false;
        success.focus();
        window.mxTrack?.('generate_lead', { form: 'project_request' });
      } catch (err) {
        const code = err instanceof Error ? err.message : 'generic';
        summary.querySelector('p')!.textContent = code === 'rate' ? msg.msgRate! : msg.msgGeneric!;
        summary.hidden = false;
        summary.focus();
      } finally {
        button.disabled = false;
        label.textContent = original;
      }
    });
  });
}
