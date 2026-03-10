/**
 * Custom Cursor Module
 * Кастомный курсор с эффектом следования
 */

export function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorFollower = document.querySelector('.cursor-follower');

    if (!cursorDot || !cursorFollower) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animate() {
        // Плавное движение точки
        cursorX += (mouseX - cursorX) * 0.5;
        cursorY += (mouseY - cursorY) * 0.5;

        // Ещё более плавное движение кольца
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;

        cursorDot.style.left = `${cursorX}px`;
        cursorDot.style.top = `${cursorY}px`;
        cursorFollower.style.left = `${followerX}px`;
        cursorFollower.style.top = `${followerY}px`;

        requestAnimationFrame(animate);
    }
    animate();

    // Эффект при наведении на интерактивные элементы
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.classList.add('active');
        });
        el.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('active');
        });
    });
}
