/**
 * Modal Module
 * Handles modal window for project cases with dynamic content
 */

// Data for project cases
const caseData = {
    design: {
        title: 'Дизайн постеров',
        subtitle: 'Примеры работ в области дизайна',
        type: 'gallery',
        items: [
            {
                image: 'src/cases/caseDesign/scrOne.jpg',
                title: 'Постер 1'
            },
            {
                image: 'src/cases/caseDesign/scrTwo.jpg',
                title: 'Постер 2'
            },
            {
                image: 'src/cases/caseDesign/scrThree.jpg',
                title: 'Постер 3'
            }
        ]
    },
    montage: {
        title: 'Видеомонтаж',
        subtitle: 'Примеры видеоработ на YouTube',
        type: 'links',
        platform: 'youtube',
        items: [
            {
                url: 'https://www.youtube.com/watch?v=Mx1TGlIkzxA',
                title: 'Я прошел все части ЗАБЫТОГО ХОРРОРА на 100% | Hello Neighbor',
                description: 'Автор - Raidzin'
            },
            {
                url: 'https://www.youtube.com/watch?v=u94WQ8EquCE',
                title: 'О чем был Sally Face?',
                description: 'Автор - maheh'
            }
        ]
    },
    coding: {
        title: 'Разработка ПО',
        subtitle: 'Примеры проектов на GitHub',
        type: 'links',
        platform: 'github',
        items: [
            {
                url: 'https://github.com/dariaMarkess/mdred',
                title: 'mdred',
                description: 'Удобный редактор заметок Markdown'
            },
            {
                url: 'https://github.com/dariaMarkess/ElectroDownloader',
                title: 'ElectroDownloader',
                description: 'Программа для скачивания видео/аудио со всего интернета'
            },
            {
                url: 'https://github.com/dariaMarkess/StudentList',
                title: 'StudentList',
                description: 'ПО для составления отчётов посещаемости студентов'
            }
        ]
    }
};

// SVG Icons
const icons = {
    youtube: `<svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>`,
    github: `<svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-6.27 0-1.38.495-2.52 1.305-3.42-.255-.405-.57-1.305.12-2.715 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.69 1.41.375 2.31.12 2.715.81.9 1.305 2.04 1.305 3.42 0 4.95-2.805 5.97-5.475 6.27.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>`,
    arrow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>`
};

class Modal {
    constructor() {
        this.overlay = document.getElementById('modal-overlay');
        this.modal = document.getElementById('modal');
        this.closeBtn = document.getElementById('modal-close');
        this.title = document.getElementById('modal-title');
        this.subtitle = document.getElementById('modal-subtitle');
        this.body = document.getElementById('modal-body');
        this.isOpen = false;

        this.init();
    }

    init() {
        // Close button
        this.closeBtn.addEventListener('click', () => this.close());

        // Close on overlay click
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Setup project cards
        this.setupProjectCards();
    }

    setupProjectCards() {
        const cards = document.querySelectorAll('.project-card');
        
        cards.forEach((card, index) => {
            const caseType = card.dataset.case;
            
            if (caseType && caseData[caseType]) {
                // Make card clickable
                card.style.cursor = 'pointer';
                
                card.addEventListener('click', () => {
                    this.open(caseType);
                });
            }
        });
    }

    open(caseType) {
        const data = caseData[caseType];
        if (!data) return;

        // Set header
        this.title.textContent = data.title;
        this.subtitle.textContent = data.subtitle;

        // Render content based on type
        if (data.type === 'gallery') {
            this.renderGallery(data.items);
        } else if (data.type === 'links') {
            this.renderLinks(data.items, data.platform);
        }

        // Show modal
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.isOpen = true;
    }

    close() {
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
        this.isOpen = false;

        // Clear content after animation
        setTimeout(() => {
            this.body.innerHTML = '';
        }, 300);
    }

    renderGallery(items) {
        const gallery = document.createElement('div');
        gallery.className = 'modal-gallery';

        items.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'modal-gallery-item';

            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.title || 'Project image';

            galleryItem.appendChild(img);
            gallery.appendChild(galleryItem);
        });

        this.body.appendChild(gallery);
    }

    renderLinks(items, platform) {
        const linksContainer = document.createElement('div');
        linksContainer.className = 'modal-links';

        items.forEach(item => {
            const linkCard = document.createElement('a');
            linkCard.className = 'modal-link-card';
            linkCard.href = item.url;
            linkCard.target = '_blank';
            linkCard.rel = 'noopener noreferrer';

            linkCard.innerHTML = `
                <div class="modal-link-icon ${platform}">
                    ${icons[platform]}
                </div>
                <div class="modal-link-content">
                    <div class="modal-link-title">${item.title}</div>
                    <div class="modal-link-description">${item.description || ''}</div>
                </div>
                <div class="modal-link-arrow">
                    ${icons.arrow}
                </div>
            `;

            linksContainer.appendChild(linkCard);
        });

        this.body.appendChild(linksContainer);
    }
}

// Export for use in main.js
export { Modal, caseData };
