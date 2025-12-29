// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.timeline-item, .project-card, .skill-category, .education-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add visible class styles
const style = document.createElement('style');
style.textContent = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Navbar background on scroll
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        nav.style.background = 'rgba(10, 10, 11, 0.95)';
    } else {
        nav.style.background = 'rgba(10, 10, 11, 0.8)';
    }

    lastScroll = currentScroll;
});

// Typing effect for code block (optional enhancement)
const codeBlock = document.querySelector('.code-block code');
if (codeBlock) {
    const originalHTML = codeBlock.innerHTML;
    const text = codeBlock.textContent;

    // Only run typing effect if user prefers motion
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        codeBlock.innerHTML = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                codeBlock.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 15);
            } else {
                // Restore syntax highlighting after typing
                codeBlock.innerHTML = originalHTML;
            }
        }

        // Start typing when code block is in view
        const codeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 500);
                    codeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        codeObserver.observe(codeBlock.parentElement);
    }
}

// Add stagger delay to timeline items
document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

// Add stagger delay to project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.15}s`;
});

// Add stagger delay to skill categories
document.querySelectorAll('.skill-category').forEach((category, index) => {
    category.style.transitionDelay = `${index * 0.1}s`;
});
