/**
 * Main Entry Point
 * Импортирует и инициализирует все модули
 */

import { initCustomCursor } from './modules/cursor.js';
import { initMobileMenu, initSmoothScroll, initActiveNavLink } from './modules/navigation.js';
import { initHeaderScroll, initHeroParallax } from './modules/scroll.js';
import { initScrollAnimations } from './modules/animations.js';
import { initTiltEffect } from './modules/tilt.js';
import { initCounterAnimation } from './modules/counter.js';
import { initContactForm } from './modules/form.js';
import { Modal } from './modules/modal.js';

document.addEventListener('DOMContentLoaded', () => {
    // Инициализация всех модулей
    initCustomCursor();
    initMobileMenu();
    initHeaderScroll();
    initSmoothScroll();
    initScrollAnimations();
    initTiltEffect();
    initCounterAnimation();
    initContactForm();
    initActiveNavLink();
    initHeroParallax();
    
    // Инициализация модального окна
    new Modal();
});

/**
 * Debounce функция для resize событий
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Оптимизация resize событий
 */
window.addEventListener('resize', debounce(() => {
    console.log('Window resized');
}, 250));

/**
 * Console Easter Egg
 */
console.log('%c👋 Привет, разработчик!', 'font-size: 20px; font-weight: bold; color: #fff;');
console.log('%cИнтересует код этого сайта? Пиши: hello@rekxqu.dev', 'font-size: 14px; color: #a0a0a0;');
