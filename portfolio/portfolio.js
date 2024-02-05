// Activate or deactivate "active" class of NAV based on position relative to each section
document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.scroll-link');
    const nav = document.querySelector('nav');

    function highlightNavLinks() {
        let fromTop = window.scrollY + nav.offsetHeight + 120;

        navLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute('href'));

            if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
                navLinks.forEach(link => link.classList.remove('active'));
                link.classList.add('active');
            }
        });
    }
    // Add scroll position as trigger for "active" class
    window.addEventListener('scroll', highlightNavLinks);
    // Smooth scrolling for anchor links
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Initial call to highlightNavLinks to set the initial state
    highlightNavLinks();
    });

// Easing function: easeInOutQuad
function easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
}

// Smooth Scroll to Top function with easing
function scrollToTop() {
    const startTime = performance.now();
    const duration = 2500; // milliseconds

    function scrollStep() {
        const currentTime = performance.now();
        const timeElapsed = currentTime - startTime;

        window.scrollBy(0, easeInOutQuad(timeElapsed, 0, -window.scrollY, duration));

        if (timeElapsed < duration) {
            requestAnimationFrame(scrollStep);
        }
    }

    requestAnimationFrame(scrollStep);
}

const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightbox-content');
const triggers = document.querySelectorAll('.lightbox-trigger');

let currentIndex = 0;

function openLightbox(imageSrc) {
    lightboxContent.src = imageSrc;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    lightbox.style.display = 'none';
}

function navigateGallery(direction) {
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = triggers.length - 1;
    } else if (currentIndex >= triggers.length) {
        currentIndex = 0;
    }

    openLightbox(triggers[currentIndex].src);
}

triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        currentIndex = Array.from(triggers).indexOf(trigger);
        openLightbox(trigger.src);
    });
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeLightbox();
    } else if (event.key === 'ArrowLeft') {
        navigateGallery(-1);
    } else if (event.key === 'ArrowRight') {
        navigateGallery(1);
    }
});
