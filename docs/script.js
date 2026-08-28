document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav a');

    function safeQuerySelector(selector) {
        if (!selector || typeof selector !== 'string' || !selector.startsWith('#') || selector === '#') {
            return null;
        }
        try {
            return document.querySelector(selector);
        } catch (e) {
            return null;
        }
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
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', hash);
    }
});