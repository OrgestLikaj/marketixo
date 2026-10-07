/**
 * Consent storage + analytics loader.
 *
 * Choice is stored in the first-party cookie `mx_consent` (necessary cookie,
 * 6 months), e.g. `v1.a1.m0`. Bump CONSENT_VERSION when the cookie policy
 * changes materially — everyone is asked again.
 *
 * Other scripts can track conversions safely with:
 *   window.mxTrack?.('generate_lead', { form: 'contact' })
 * — it is a no-op unless the visitor consented.
 */
type Consent = { analytics: boolean; marketing: boolean };
type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    fbq?: ((...args: unknown[]) => void) & { callMethod?: unknown; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
    _fbq?: unknown;
    mxTrack?: (event: string, params?: Record<string, unknown>) => void;
    mxOpenConsent?: () => void;
  }
}

const CONSENT_VERSION = 'v1';
const COOKIE = 'mx_consent';
const MAX_AGE = 60 * 60 * 24 * 182;

function read(): Consent | null {
  const raw = document.cookie.split('; ').find((c) => c.startsWith(`${COOKIE}=`))?.split('=')[1];
  if (!raw) return null;
  const [version, a, m] = raw.split('.');
  if (version !== CONSENT_VERSION) return null;
  return { analytics: a === 'a1', marketing: m === 'm1' };
}

function write(c: Consent) {
  const value = `${CONSENT_VERSION}.${c.analytics ? 'a1' : 'a0'}.${c.marketing ? 'm1' : 'm0'}`;
  document.cookie = `${COOKIE}=${value}; path=/; max-age=${MAX_AGE}; SameSite=Lax; Secure`;
}

function loadScript(src: string) {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      wait_for_update: 500,
    });
  }
  return window.gtag;
}

const loaded = new Set<string>();

function apply(c: Consent, ids: { ga4?: string; gtm?: string; pixel?: string }) {
  if (ids.ga4 || ids.gtm) {
    const gtag = ensureGtag();
    gtag('consent', 'update', {
      analytics_storage: c.analytics ? 'granted' : 'denied',
      ad_storage: c.marketing ? 'granted' : 'denied',
      ad_user_data: c.marketing ? 'granted' : 'denied',
      ad_personalization: c.marketing ? 'granted' : 'denied',
    });
  }

  // GTM: loaded once anything is granted; tags inside GTM must respect Consent Mode.
  if (ids.gtm && (c.analytics || c.marketing) && !loaded.has('gtm')) {
    loaded.add('gtm');
    window.dataLayer!.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    loadScript(`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(ids.gtm)}`);
  } else if (ids.ga4 && !ids.gtm && c.analytics && !loaded.has('ga4')) {
    loaded.add('ga4');
    const gtag = ensureGtag();
    gtag('js', new Date());
    gtag('config', ids.ga4, { anonymize_ip: true });
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ids.ga4)}`);
  }

  if (ids.pixel && c.marketing && !loaded.has('pixel')) {
    loaded.add('pixel');
    /* Standard Meta Pixel bootstrap, without the inline <script>. */
    const fbq = function (...args: unknown[]) {
      const f = window.fbq!;
      if (f.callMethod) (f.callMethod as (...a: unknown[]) => void).apply(f, args);
      else f.queue!.push(args);
    } as NonNullable<Window['fbq']>;
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = '2.0';
    fbq.queue = [];
    window.fbq = fbq;
    window._fbq = fbq;
    loadScript('https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', ids.pixel);
    fbq('track', 'PageView');
  }
}

export function initConsent() {
  const root = document.querySelector<HTMLElement>('[data-consent]');
  const dialog = document.querySelector<HTMLDialogElement>('[data-consent-dialog]');
  if (!root || !dialog) return;

  const ids = { ga4: root.dataset.ga4 || undefined, gtm: root.dataset.gtm || undefined, pixel: root.dataset.pixel || undefined };
  const enabled = root.dataset.enabled === 'true';
  const form = dialog.querySelector('form')!;
  const boxes = {
    analytics: form.querySelector<HTMLInputElement>('input[name="analytics"]'),
    marketing: form.querySelector<HTMLInputElement>('input[name="marketing"]'),
  };

  const decide = (c: Consent) => {
    write(c);
    root.hidden = true;
    apply(c, ids);
  };

  const current = read();
  if (current) apply(current, ids);
  else if (enabled) root.hidden = false;

  window.mxTrack = (event, params = {}) => {
    const c = read();
    if (c?.analytics && window.gtag) window.gtag('event', event, params);
    if (c?.marketing && window.fbq && event === 'generate_lead') window.fbq('track', 'Lead');
  };

  const openSettings = () => {
    const c = read() ?? { analytics: false, marketing: false };
    if (boxes.analytics) boxes.analytics.checked = c.analytics;
    if (boxes.marketing) boxes.marketing.checked = c.marketing;
    dialog.showModal();
  };
  window.mxOpenConsent = openSettings;

  root.addEventListener('click', (e) => {
    const action = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-cc]')?.dataset.cc;
    if (action === 'accept') decide({ analytics: true, marketing: true });
    if (action === 'reject') decide({ analytics: false, marketing: false });
    if (action === 'settings') openSettings();
  });

  dialog.addEventListener('close', () => {
    const v = dialog.returnValue;
    if (v === 'accept') decide({ analytics: true, marketing: true });
    else if (v === 'reject') decide({ analytics: false, marketing: false });
    else if (v === 'save') decide({ analytics: !!boxes.analytics?.checked, marketing: !!boxes.marketing?.checked });
    dialog.returnValue = '';
  });

  document.querySelectorAll('[data-cookie-settings]').forEach((b) => b.addEventListener('click', openSettings));
}
