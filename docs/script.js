/*
 * FireRatShader site script (landing page + docs).
 *
 * Language switcher: loads JSON translation files from docs/i18n/<locale>.json and
 * swaps the innerHTML of every [data-i18n] element. Falls back to the current
 * content if a key is missing.
 *   - Dropdown selector (14 languages).
 *   - Browser-language detection with a dismissible banner prompt.
 *   - localStorage persistence (one-click "always use this language").
 *   - Hash-stable: no page reloads, no URL change, history preserved.
 *
 * Page UI: docs contents drawer on small screens, active-section highlighting,
 * click-to-copy heading links, back-to-top button, and hover-to-play media tiles
 * (a still image loads first; the animated WebP only loads on hover/focus).
 */

(function () {
    'use strict';

    // ---- Locale list (must match translate_docs.py) ----
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
    let translations = {};  // locale -> { key: string }

    // ---- Translation loading ----
    async function loadTranslations(locale) {
        if (translations[locale]) return;
        // Determine the i18n base path relative to the current page.
        // Pages live at / and /docs/. The i18n folder is /docs/i18n/.
        const i18nBase = isDocsPage() ? 'i18n/' : 'docs/i18n/';
        try {
            const res = await fetch(i18nBase + locale + '.json', { cache: 'no-cache' });
            if (!res.ok) throw new Error('HTTP ' + res.status);
            const data = await res.json();
            translations[locale] = data.strings || {};
        } catch (err) {
            console.warn('FireRat i18n: failed to load', locale, err);
            translations[locale] = {};
        }
    }

    function isDocsPage() {
        return /\/docs\//.test(location.pathname);
    }

    // ---- Apply ----
    function applyTranslations() {
        const strings = translations[currentLocale] || {};
        const els = document.querySelectorAll('[data-i18n]');
        let swapped = 0;
        els.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (strings[key]) {
                el.innerHTML = strings[key];
                swapped++;
            }
        });
        document.documentElement.setAttribute('lang', currentLocale);
        // Update the active option in any visible switcher.
        document.querySelectorAll('.lang-switcher select').forEach(sel => {
            sel.value = currentLocale;
        });
    }

    // ---- Selector UI ----
    function injectSwitcher() {
        // Find an existing placeholder or insert into header.
        let host = document.querySelector('.lang-switcher');
        if (!host) {
            // Create a small floating widget top-right.
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

    // ---- Banner prompt ----
    function maybeShowBanner(detectedLocale) {
        if (detectedLocale === 'en-US') return;
        if (!LOCALES[detectedLocale]) return;
        if (localStorage.getItem(DISMISS_KEY) === '1') return;
        if (localStorage.getItem(STORAGE_KEY)) return;  // user already picked

        const banner = document.createElement('div');
        banner.className = 'lang-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Language prompt');
        banner.innerHTML =
            '<span class="lang-banner-text"></span>' +
            '<button class="lang-banner-yes"></button>' +
            '<button class="lang-banner-no"></button>';
        const text = banner.querySelector('.lang-banner-text');
        const yes = banner.querySelector('.lang-banner-yes');
        const no = banner.querySelector('.lang-banner-no');

        // Banner strings are looked up from current locale, falling back to English.
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

    // ---- Locale change ----
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
            // Exact match first
            if (LOCALES[lang]) return lang;
            // Region-insensitive: e.g. "ja" -> "ja-JP"
            const base = lang.split('-')[0].toLowerCase();
            for (const code of Object.keys(LOCALES)) {
                if (code.split('-')[0].toLowerCase() === base) return code;
            }
        }
        return 'en-US';
    }

    // ---- Existing smooth-scroll code (kept intact) ----
    function initSmoothScroll() {
        const links = document.querySelectorAll('nav a[href^="#"]');
        function safeQuerySelector(selector) {
            if (!selector || typeof selector !== 'string' || !selector.startsWith('#') || selector === '#') {
                return null;
            }
            try { return document.querySelector(selector); } catch (e) { return null; }
        }
        for (const link of links) {
            link.addEventListener('click', (event) => {
                const targetId = event.currentTarget.getAttribute('href');
                const targetElement = safeQuerySelector(targetId);
                if (targetElement) {
                    event.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    history.pushState(null, '', targetId);
                }
            });
        }
        const hash = location.hash;
        const targetElement = safeQuerySelector(hash);
        if (targetElement) {
            // Deep links jump straight to their section on load; only in-page clicks animate.
            targetElement.scrollIntoView({ behavior: 'instant', block: 'start' });
            history.replaceState(null, '', hash);
        }
    }

    // ---- Docs: contents drawer (small screens) ----
    function initDocsDrawer() {
        const toggle = document.querySelector('.menu-toggle');
        const sidebar = document.querySelector('.docs-sidebar');
        if (!toggle || !sidebar) return;
        const setOpen = (open) => {
            document.body.classList.toggle('nav-open', open);
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        };
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            setOpen(!document.body.classList.contains('nav-open'));
        });
        sidebar.addEventListener('click', (e) => { if (e.target.closest('a')) setOpen(false); });
        document.addEventListener('click', (e) => {
            if (document.body.classList.contains('nav-open') && !sidebar.contains(e.target)) setOpen(false);
        });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
    }

    // ---- Docs: highlight the sidebar link for the section being read ----
    function initScrollSpy() {
        const sidebar = document.querySelector('.docs-sidebar');
        if (!sidebar) return;
        const targets = [];
        sidebar.querySelectorAll('a[href^="#"]').forEach(a => {
            const el = document.getElementById(a.getAttribute('href').slice(1));
            if (el) targets.push({ el, link: a });
        });
        if (!targets.length) return;
        // Document order, so a nested AudioLink article wins over its parent section once reached.
        targets.sort((x, y) => x.el.compareDocumentPosition(y.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
        let current = null, queued = false;
        const update = () => {
            queued = false;
            let hit = targets[0];
            for (const t of targets) {
                if (t.el.getBoundingClientRect().top <= 120) hit = t; else break;
            }
            if (hit === current) return;
            current = hit;
            sidebar.querySelectorAll('a.active').forEach(a => a.classList.remove('active'));
            hit.link.classList.add('active');
            const parentList = hit.link.closest('ul ul');
            if (parentList) parentList.parentElement.querySelector(':scope > a').classList.add('active');
            // Keep the active link in view inside the desktop sidebar without moving the page.
            if (getComputedStyle(sidebar).position !== 'sticky') return;
            const r = hit.link.getBoundingClientRect(), sb = sidebar.getBoundingClientRect();
            if (r.top < sb.top + 40 || r.bottom > sb.bottom - 40) sidebar.scrollTop += r.top - sb.top - sb.height / 3;
        };
        window.addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
        update();
    }

    // ---- Docs: click a heading to copy a link to it ----
    function initHeadingLinks() {
        const main = document.querySelector('.docs-main');
        if (!main) return;
        main.querySelectorAll('h2, h3, h4').forEach(h => {
            const id = h.id || (h.tagName === 'H2' && h.parentElement.id) ||
                       (h.parentElement.tagName === 'ARTICLE' && h.parentElement.id) || '';
            if (!id) return;
            h.classList.add('linkable');
            h.title = 'Copy link to this section';
            h.addEventListener('click', (e) => {
                if (e.target.closest('a')) return;
                const url = location.origin + location.pathname + '#' + id;
                history.replaceState(null, '', '#' + id);
                const done = () => {
                    h.classList.add('copied');
                    setTimeout(() => h.classList.remove('copied'), 1400);
                };
                if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, () => {});
            });
        });
    }

    function initBackToTop() {
        const btn = document.querySelector('.back-to-top');
        if (!btn) return;
        const onScroll = () => btn.classList.toggle('show', window.scrollY > 900);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    // ---- Landing: hover/focus a tile to play its animation ----
    function initMediaTiles() {
        document.querySelectorAll('.media-tile[data-webp]').forEach(tile => {
            const img = tile.querySelector('img');
            if (!img) return;
            const still = img.getAttribute('src');
            const play = () => { img.src = tile.dataset.webp; };
            const stop = () => { img.src = still; };
            tile.addEventListener('mouseenter', play);
            tile.addEventListener('mouseleave', stop);
            tile.addEventListener('focus', play);
            tile.addEventListener('blur', stop);
        });
    }

    // ---- Boot ----
    document.addEventListener('DOMContentLoaded', async () => {
        initSmoothScroll();
        initDocsDrawer();
        initScrollSpy();
        initHeadingLinks();
        initBackToTop();
        initMediaTiles();
        injectSwitcher();

        // Decide which locale to use.
        const stored = localStorage.getItem(STORAGE_KEY);
        const detected = detectBrowserLocale();
        const target = stored || detected;

        if (target !== 'en-US') {
            await setLocale(target, false);
        }

        // If user hasn't chosen, and the detected language isn't English,
        // show the banner AFTER the initial apply so the banner text itself
        // can be in the user's language.
        if (!stored && detected !== 'en-US' && LOCALES[detected]) {
            // Pre-load detected locale for the banner text.
            await loadTranslations(detected);
            currentLocale = detected;  // temporarily for banner lookup
            maybeShowBanner(detected);
            currentLocale = stored || 'en-US';  // restore
        }
    });
})();
