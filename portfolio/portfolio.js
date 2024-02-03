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

function toggleFullscreen(element) {
  if (!document.fullscreenElement) {
    element.parentElement.classList.add('fullscreen');
    element.requestFullscreen().catch(err => {
      console.error(`Error attempting to enable full-screen mode: ${err.message}`);
    });
  } else {
    document.exitFullscreen();
    element.parentElement.classList.remove('fullscreen');
  }
}

function toggleEnlarge(container) {
  container.classList.toggle('enlarged');
}
  
  // Listen for fullscreen change event
  document.addEventListener('fullscreenchange', () => {
    const fullscreenElement = document.fullscreenElement;
    if (fullscreenElement) {
      // Apply styles to the element in fullscreen mode
      fullscreenElement.style.width = 'auto';
      fullscreenElement.style.height = 'auto';
    } else {
      // Reset styles when exiting fullscreen
      element.style.width = ''; // Set to default or remove this line if not needed
      element.style.height = ''; // Set to default or remove this line if not needed
      element.style.objectFit = ''; // Set to default or remove this line if not needed
    }
  });
  
  // Example usage:
  // const myElement = document.getElementById('myImage'); // replace 'myImage' with your actual element ID
  // myElement.addEventListener('click', () => toggleFullscreen(myElement));
  