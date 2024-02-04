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


// Fullscreen upon clicking image in gallery. Esc key breaks website.
function toggleFullscreen(element) {
  if (!document.fullscreenElement) {
    element.parentElement.classList.add('fullscreen');
    element.requestFullscreen().catch(err => {
      console.error(`Error attempting to enable full-screen mode: ${err.message}`);
    });

    // Add event listener for "Esc" key
    document.addEventListener('keydown', exitFullscreenOnEsc);
  } else {
    document.exitFullscreen();
    element.parentElement.classList.remove('fullscreen');
    // Remove the event listener when exiting fullscreen
    document.removeEventListener('keydown', exitFullscreenOnEsc);
  }
}

function exitFullscreenOnEsc(event) {
  if (event.key === 'Escape') {
    document.exitFullscreen();
    // You may need to remove 'fullscreen' class manually if needed
  }
}

// Enlarge image with lightbox and close it with X button or ESC key
const lightbox = document.getElementById('lightbox');
const lightboxContent = document.getElementById('lightbox-content');
const triggers = document.querySelectorAll('.lightbox-trigger');

function openLightbox(imageSrc) {
  lightboxContent.src = imageSrc;
  lightbox.style.display = 'flex';
}

function closeLightbox() {
  lightbox.style.display = 'none';
}

triggers.forEach(trigger => {
  trigger.addEventListener('click', () => {
    openLightbox(trigger.src);
  });
});

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeLightbox();
  }
});
  