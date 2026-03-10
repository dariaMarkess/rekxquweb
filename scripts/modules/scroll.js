/**
 * Scroll Effects Module
 * Эффекты скролла для хедера и параллакс
 */

/**
 * Эффект скролла для хедера
 */
export function initHeaderScroll() {
    const header = document.getElementById('header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

/**
 * Параллакс эффект для фона hero секции
 */
export function initHeroParallax() {
    const heroBg = document.querySelector('.hero-gradient');
    if (!heroBg) return;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    });
}
