// ============================================
// Page Loader
// ============================================
const loader = document.getElementById('loader');
const loaderProgress = document.querySelector('.loader-progress');

document.body.classList.add('loading');

let progress = 0;
const loadInterval = setInterval(() => {
    progress += Math.random() * 30;
    if (progress > 100) progress = 100;
    loaderProgress.style.width = progress + '%';
    if (progress === 100) {
        clearInterval(loadInterval);
        setTimeout(() => {
            loader.classList.add('done');
            document.body.classList.remove('loading');
        }, 400);
    }
}, 200);

// ============================================
// Scroll Reveal with direction support
// ============================================
const revealElements = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');

            // Trigger count-up for stats
            const counter = entry.target.querySelector('[data-count]');
            if (counter) countUp(counter);

            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ============================================
// Count-up animation for stats
// ============================================
function countUp(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const duration = 2000;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

// ============================================
// Navigation scroll effect
// ============================================
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 100);
}, { passive: true });

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
// Horizontal gallery drag scroll
// ============================================
const track = document.getElementById('galleryTrack');
let isDown = false;
let startX;
let scrollLeft;

track.addEventListener('mousedown', (e) => {
    isDown = true;
    track.style.cursor = 'grabbing';
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
});

track.addEventListener('mouseleave', () => {
    isDown = false;
    track.style.cursor = 'grab';
});

track.addEventListener('mouseup', () => {
    isDown = false;
    track.style.cursor = 'grab';
});

track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2;
    track.scrollLeft = scrollLeft - walk;
});

// Mouse wheel horizontal scroll on gallery
track.addEventListener('wheel', (e) => {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        track.scrollLeft += e.deltaY;
    }
}, { passive: false });

// ============================================
// Lightbox with navigation
// ============================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCounter = document.getElementById('lightboxCounter');
const galleryItems = document.querySelectorAll('.gallery-item');
let currentIndex = 0;

function getHighResUrl(img) {
    return img.src.replace(/w=\d+/, 'w=1600');
}

function openLightbox(index) {
    currentIndex = index;
    const img = galleryItems[index].querySelector('img');
    lightboxImg.src = getHighResUrl(img);
    lightboxImg.alt = img.alt;
    lightboxCounter.textContent = `${index + 1} / ${galleryItems.length}`;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    currentIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
    const img = galleryItems[currentIndex].querySelector('img');
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
        lightboxImg.src = getHighResUrl(img);
        lightboxImg.alt = img.alt;
        lightboxCounter.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
        lightboxImg.style.opacity = '1';
    }, 200);
}

galleryItems.forEach((item, index) => {
    item.addEventListener('click', (e) => {
        // Don't open lightbox if user was dragging
        if (Math.abs(e.pageX - startX - track.offsetLeft) > 5) return;
        openLightbox(index);
    });
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target === lightboxImg) closeLightbox();
});

document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
document.querySelector('.lightbox-prev').addEventListener('click', (e) => {
    e.stopPropagation();
    navigateLightbox(-1);
});
document.querySelector('.lightbox-next').addEventListener('click', (e) => {
    e.stopPropagation();
    navigateLightbox(1);
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
});

// ============================================
// Hero parallax
// ============================================
const hero = document.getElementById('hero');
const heroContent = document.querySelector('.hero-content');
const heroBg = document.querySelector('.hero-bg-img');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroHeight = hero.offsetHeight;

    if (scrolled < heroHeight) {
        const progress = scrolled / heroHeight;
        heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
        heroContent.style.opacity = 1 - progress * 1.8;
        heroBg.style.transform = `scale(${1.1 + progress * 0.1}) translateY(${scrolled * 0.15}px)`;
    }
}, { passive: true });

// ============================================
// Parallax divider image
// ============================================
const dividers = document.querySelectorAll('[data-parallax]');

window.addEventListener('scroll', () => {
    dividers.forEach(div => {
        const rect = div.getBoundingClientRect();
        const inView = rect.top < window.innerHeight && rect.bottom > 0;
        if (inView) {
            const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            const img = div.querySelector('img');
            img.style.transform = `translateY(${(progress - 0.5) * -80}px)`;
        }
    });
}, { passive: true });

// ============================================
// Custom cursor (desktop only)
// ============================================
if (window.matchMedia('(hover: hover)').matches) {
    const cursor = document.getElementById('cursor');
    let cursorX = 0, cursorY = 0;
    let targetX = 0, targetY = 0;

    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    function updateCursor() {
        cursorX += (targetX - cursorX) * 0.12;
        cursorY += (targetY - cursorY) * 0.12;
        cursor.style.left = cursorX - 40 + 'px';
        cursor.style.top = cursorY - 40 + 'px';
        requestAnimationFrame(updateCursor);
    }
    updateCursor();

    // Show cursor on gallery items
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => cursor.classList.add('active'));
        item.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });

    // Change cursor text for about image
    const aboutImage = document.querySelector('.about-image');
    if (aboutImage) {
        aboutImage.addEventListener('mouseenter', () => {
            cursor.querySelector('.cursor-text').textContent = '';
            cursor.style.width = '20px';
            cursor.style.height = '20px';
            cursor.classList.add('active');
        });
        aboutImage.addEventListener('mouseleave', () => {
            cursor.querySelector('.cursor-text').textContent = 'View';
            cursor.style.width = '80px';
            cursor.style.height = '80px';
            cursor.classList.remove('active');
        });
    }
}

// ============================================
// Smooth scroll for nav links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
