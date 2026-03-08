// ============================================
// Scroll Reveal
// ============================================
const revealElements = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, index * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ============================================
// Navigation scroll effect
// ============================================
const nav = document.getElementById('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    nav.classList.toggle('scrolled', currentScroll > 80);
    lastScroll = currentScroll;
});

// ============================================
// Mobile menu
// ============================================
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ============================================
// Lightbox
// ============================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        lightboxImg.src = img.src.replace('w=800', 'w=1600').replace('w=1200', 'w=1600');
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ============================================
// Smooth parallax on hero
// ============================================
const hero = document.getElementById('hero');
const heroContent = document.querySelector('.hero-content');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroHeight = hero.offsetHeight;

    if (scrolled < heroHeight) {
        const progress = scrolled / heroHeight;
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - progress * 1.5;
    }
});

// ============================================
// Cursor glow on gallery items (desktop only)
// ============================================
if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            item.style.setProperty('--glow-x', `${x}px`);
            item.style.setProperty('--glow-y', `${y}px`);
        });
    });
}
