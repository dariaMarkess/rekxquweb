/**
 * Contact Form Module
 * Обработка формы контактов
 */

export function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Имитация отправки
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        submitBtn.innerHTML = '<span>Отправка...</span>';
        submitBtn.disabled = true;

        // Симуляция задержки отправки
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Успешная отправка
        submitBtn.innerHTML = '<span>Отправлено! ✓</span>';
        submitBtn.style.background = '#27ca40';

        // Очистка формы
        form.reset();

        // Возврат кнопки в исходное состояние
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);

        console.log('Form submitted:', data);
    });

    // Валидация полей в реальном времени
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.style.borderColor = '#ff5f56';
            } else {
                input.style.borderColor = '';
            }
        });

        input.addEventListener('input', () => {
            input.style.borderColor = '';
        });
    });
}
