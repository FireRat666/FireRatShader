/*
 * FireRatShader Landing — Language Switcher
 *
 * Loads JSON translation files from docs/i18n/<locale>.json and swaps
 * the innerHTML of every [data-i18n] element.
 */

(function () {
    'use strict';

    const LOCALES = {
        'en-US': 'English',
        'ja-JP': '日本語',
        'ko-KR': '한국어',
        'zh-CN': '简体中文',
        'zh-TW': '繁體中文',
        'es-ES': 'Español',
        'de-DE': 'Deutsch',
        'fr-FR': 'Français',
        'it-IT': 'Italiano',
        'pt-BR': 'Português (Brasil)',
        'ru-RU': 'Русский',
        'pl-PL': 'Polski',
        'vi-VN': 'Tiếng Việt',
        'th-TH': 'ไทย'
    };

    const STORAGE_KEY = 'frs-doc-locale';
    const DISMISS_KEY = 'frs-doc-banner-dismissed';
    let currentLocale = 'en-US';
    let translations = {};

    async function loadTranslations(locale) {
        if (translations[locale]) return;
        try {
            const res = await fetch('docs/i18n/' + locale + '.json', { cache: 'no-cache' });
            if (!res.ok) throw new Error('HTTP ' + res.status);
            const data = await res.json();
            translations[locale] = data.strings || {};
        } catch (err) {
            console.warn('FireRat i18n: failed to load', locale, err);
            translations[locale] = {};
        }
    }

    function applyTranslations() {
        const strings = translations[currentLocale] || {};
        const els = document.querySelectorAll('[data-i18n]');
        els.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (strings[key]) el.innerHTML = strings[key];
        });
        document.documentElement.setAttribute('lang', currentLocale);
        document.querySelectorAll('.lang-switcher select').forEach(sel => {
            sel.value = currentLocale;
        });
    }

    function injectSwitcher() {
        let host = document.querySelector('.lang-switcher');
        if (!host) {
            host = document.createElement('div');
            host.className = 'lang-switcher';
            host.setAttribute('data-no-translate', 'true');
            const header = document.querySelector('header');
            if (header) {
                header.appendChild(host);
            } else {
                document.body.appendChild(host);
            }
        }
        const sel = document.createElement('select');
        sel.setAttribute('aria-label', 'Language');
        for (const [code, name] of Object.entries(LOCALES)) {
            const opt = document.createElement('option');
            opt.value = code;
            opt.textContent = name;
            sel.appendChild(opt);
        }
        sel.value = currentLocale;
        sel.addEventListener('change', e => setLocale(e.target.value, true));
        host.appendChild(sel);
    }

    function maybeShowBanner(detectedLocale) {
        if (detectedLocale === 'en-US') return;
        if (!LOCALES[detectedLocale]) return;
        if (localStorage.getItem(DISMISS_KEY) === '1') return;
        if (localStorage.getItem(STORAGE_KEY)) return;

        const banner = document.createElement('div');
        banner.className = 'lang-banner';
        banner.setAttribute('role', 'dialog');
        banner.innerHTML =
            '<span class="lang-banner-text"></span>' +
            '<button class="lang-banner-yes"></button>' +
            '<button class="lang-banner-no"></button>';
        const text = banner.querySelector('.lang-banner-text');
        const yes = banner.querySelector('.lang-banner-yes');
        const no = banner.querySelector('.lang-banner-no');

        const t = (key) => (translations[currentLocale] && translations[currentLocale][key]) ||
                            (key === 'banner.text' ? 'This page is available in' :
                             key === 'banner.yes' ? 'Switch' :
                             key === 'banner.no' ? 'No thanks' : '');
        text.textContent = t('banner.text') + ' ' + LOCALES[detectedLocale] + '?';
        yes.textContent = t('banner.yes');
        no.textContent = t('banner.no');

        yes.addEventListener('click', () => {
            setLocale(detectedLocale, true);
            banner.remove();
        });
        no.addEventListener('click', () => {
            localStorage.setItem(DISMISS_KEY, '1');
            banner.remove();
        });

        document.body.appendChild(banner);
    }

    async function setLocale(locale, persist) {
        if (!LOCALES[locale]) return;
        currentLocale = locale;
        await loadTranslations(locale);
        applyTranslations();
        if (persist) {
            localStorage.setItem(STORAGE_KEY, locale);
            localStorage.setItem(DISMISS_KEY, '1');
        }
    }

    function detectBrowserLocale() {
        const langs = navigator.languages || [navigator.language || 'en-US'];
        for (const lang of langs) {
            if (LOCALES[lang]) return lang;
            const base = lang.split('-')[0].toLowerCase();
            for (const code of Object.keys(LOCALES)) {
                if (code.split('-')[0].toLowerCase() === base) return code;
            }
        }
        return 'en-US';
    }

    document.addEventListener('DOMContentLoaded', async () => {
        injectSwitcher();
        const stored = localStorage.getItem(STORAGE_KEY);
        const detected = detectBrowserLocale();
        const target = stored || detected;

        if (target !== 'en-US') {
            await setLocale(target, false);
        }

        if (!stored && detected !== 'en-US' && LOCALES[detected]) {
            await loadTranslations(detected);
            currentLocale = detected;
            maybeShowBanner(detected);
            currentLocale = stored || 'en-US';
        }
    });
})();
