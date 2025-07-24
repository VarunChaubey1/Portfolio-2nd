gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('open');
});

// Loader Animation
window.addEventListener('load', () => {
    gsap.to('.loader', {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => {
            document.querySelector('.loader').style.display = 'none';
        }
    });
});

// Navbar Animation
gsap.from('.navbar', {
    y: -80,
    duration: 1.2,
    ease: 'power3.out',
    opacity: 0,
    delay: 0.2
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        document.querySelector('.navbar').classList.add('scrolled');
    } else {
        document.querySelector('.navbar').classList.remove('scrolled');
    }
});

// Reach Out Button Animation
gsap.from('.reach-out-btn', {
    opacity: 0,
    x: 60,
    duration: 1.2,
    ease: 'power3.out',
    delay: 0.4
});

// Hero Section Animations
gsap.from('.hero-title', {
    opacity: 0,
    y: window.innerWidth < 768 ? 20 : 40,
    duration: 1,
    ease: 'power2.out',
    delay: 0.6
});
gsap.from('.tagline', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: 'power2.out',
    delay: 0.8
});
gsap.from('.intro-text', {
    opacity: 0,
    y: 20,
    duration: 1,
    ease: 'power2.out',
    delay: 1.0
});
gsap.from('.button-container', {
    opacity: 0,
    y: 20,
    duration: 1,
    ease: 'power2.out',
    delay: 1.2
});

// Profile Photo and Rotating Ring Animation
gsap.from(['.profile-photo', '.rotating-ring'], {
    opacity: 0,
    scale: 0.95,
    duration: 1.2,
    ease: 'power3.out',
    delay: 1.4,
    stagger: 0.2
});

gsap.to('.profile-photo', {
    y: 5,
    duration: 3,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true
});

// Parallax Effect for Hero
gsap.to('.hero-visual', {
    y: '-10%',
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    }
});

// Progress Circle Animation
document.querySelectorAll('.progress-circle').forEach(circle => {
    const percentage = circle.getAttribute('data-percentage');
    const ring = circle.querySelector('.progress-ring__circle');
    const circumference = 2 * Math.PI * 36;

    ring.style.strokeDasharray = `${circumference} ${circumference}`;
    ring.style.strokeDashoffset = circumference;

    gsap.to(ring, {
        strokeDashoffset: circumference - (percentage / 100) * circumference,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: circle,
            start: 'top 85%'
        }
    });
});

// Slider Logic for Projects
const projectSlider = document.querySelector('.project-slider');
const projectCards = document.querySelectorAll('.project-card');
const projectPrevBtn = document.querySelector('#projects .prev-btn');
const projectNextBtn = document.querySelector('#projects .next-btn');
const projectPagination = document.querySelector('#projects .pagination');
let projectIndex = 0;

// Clone project cards for infinite loop
projectCards.forEach(card => {
    const clone = card.cloneNode(true);
    projectSlider.appendChild(clone);
});

// Calculate number of sets (3 cards per set)
const projectCardsTotal = projectCards.length;
const cardsPerSet = 3;
const projectSetsTotal = Math.ceil(projectCardsTotal / cardsPerSet);

// Generate pagination dots for Projects (one dot per set)
for (let i = 0; i < projectSetsTotal; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    projectPagination.appendChild(dot);
}

const projectDots = document.querySelectorAll('#projects .pagination .dot');

// Calculate card width (including margin) based on screen size
const getProjectCardWidth = () => window.innerWidth < 768 ? 260 + 24 : 320 + 32; // Card width + margin (1.5rem = 24px, 2rem = 32px)
const getProjectSetWidth = () => getProjectCardWidth() * cardsPerSet; // Width of 3 cards

// Update slider position for Projects
function updateProjectSlider() {
    const setWidth = getProjectSetWidth();
    const offset = -(projectIndex * setWidth);
    gsap.to(projectSlider, {
        x: offset,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
            if (projectIndex >= projectSetsTotal) {
                projectIndex = 0;
                gsap.set(projectSlider, { x: 0 });
            } else if (projectIndex < 0) {
                projectIndex = projectSetsTotal - 1;
                gsap.set(projectSlider, { x: -setWidth * (projectSetsTotal - 1) });
            }
            // Update active dot
            projectDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === projectIndex % projectSetsTotal);
            });
        }
    });
}

// Auto-slide for Projects
let projectAutoSlideInterval = setInterval(() => {
    projectIndex++;
    updateProjectSlider();
}, 3000); // 3 seconds per set

// Pause on hover
projectSlider.addEventListener('mouseenter', () => {
    clearInterval(projectAutoSlideInterval);
});
projectSlider.addEventListener('mouseleave', () => {
    projectAutoSlideInterval = setInterval(() => {
        projectIndex++;
        updateProjectSlider();
    }, 3000);
});

// Button controls for Projects
projectNextBtn.addEventListener('click', () => {
    projectIndex++;
    updateProjectSlider();
    clearInterval(projectAutoSlideInterval);
    projectAutoSlideInterval = setInterval(() => {
        projectIndex++;
        updateProjectSlider();
    }, 3000);
});

projectPrevBtn.addEventListener('click', () => {
    projectIndex--;
    updateProjectSlider();
    clearInterval(projectAutoSlideInterval);
    projectAutoSlideInterval = setInterval(() => {
        projectIndex++;
        updateProjectSlider();
    }, 3000);
});

// Dot navigation for Projects
projectDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        projectIndex = index;
        updateProjectSlider();
        clearInterval(projectAutoSlideInterval);
        projectAutoSlideInterval = setInterval(() => {
            projectIndex++;
            updateProjectSlider();
        }, 3000);
    });
});

// Initial slide position
updateProjectSlider();

// Slider Logic for Achievements
const achievementSlider = document.querySelector('.achievement-slider');
const achievementCards = document.querySelectorAll('.achievement-card');
const achievementPrevBtn = document.querySelector('#achievements .prev-btn');
const achievementNextBtn = document.querySelector('#achievements .next-btn');
const achievementPagination = document.querySelector('#achievements .pagination');
let achievementIndex = 0;

// Clone achievement cards for infinite loop
achievementCards.forEach(card => {
    const clone = card.cloneNode(true);
    achievementSlider.appendChild(clone);
});

// Calculate number of sets (3 cards per set)
const achievementCardsTotal = achievementCards.length;
const achievementSetsTotal = Math.ceil(achievementCardsTotal / cardsPerSet);

// Generate pagination dots for Achievements (one dot per set)
for (let i = 0; i < achievementSetsTotal; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    achievementPagination.appendChild(dot);
}

const achievementDots = document.querySelectorAll('#achievements .pagination .dot');

// Calculate card width (including margin) based on screen size
const getAchievementCardWidth = () => window.innerWidth < 768 ? 260 + 24 : 320 + 32; // Card width + margin (1.5rem = 24px, 2rem = 32px)
const getAchievementSetWidth = () => getAchievementCardWidth() * cardsPerSet; // Width of 3 cards

// Update slider position for Achievements
function updateAchievementSlider() {
    const setWidth = getAchievementSetWidth();
    const offset = -(achievementIndex * setWidth);
    gsap.to(achievementSlider, {
        x: offset,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
            if (achievementIndex >= achievementSetsTotal) {
                achievementIndex = 0;
                gsap.set(achievementSlider, { x: 0 });
            } else if (achievementIndex < 0) {
                achievementIndex = achievementSetsTotal - 1;
                gsap.set(achievementSlider, { x: -setWidth * (achievementSetsTotal - 1) });
            }
            // Update active dot
            achievementDots.forEach((dot, i) => {
                dot.classList.toggle('active', i === achievementIndex % achievementSetsTotal);
            });
        }
    });
}

// Auto-slide for Achievements
let achievementAutoSlideInterval = setInterval(() => {
    achievementIndex++;
    updateAchievementSlider();
}, 3000); // 3 seconds per set

// Pause on hover
achievementSlider.addEventListener('mouseenter', () => {
    clearInterval(achievementAutoSlideInterval);
});
achievementSlider.addEventListener('mouseleave', () => {
    achievementAutoSlideInterval = setInterval(() => {
        achievementIndex++;
        updateAchievementSlider();
    }, 3000);
});

// Button controls for Achievements
achievementNextBtn.addEventListener('click', () => {
    achievementIndex++;
    updateAchievementSlider();
    clearInterval(achievementAutoSlideInterval);
    achievementAutoSlideInterval = setInterval(() => {
        achievementIndex++;
        updateAchievementSlider();
    }, 3000);
});

achievementPrevBtn.addEventListener('click', () => {
    achievementIndex--;
    updateAchievementSlider();
    clearInterval(achievementAutoSlideInterval);
    achievementAutoSlideInterval = setInterval(() => {
        achievementIndex++;
        updateAchievementSlider();
    }, 3000);
});

// Dot navigation for Achievements
achievementDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        achievementIndex = index;
        updateAchievementSlider();
        clearInterval(achievementAutoSlideInterval);
        achievementAutoSlideInterval = setInterval(() => {
            achievementIndex++;
            updateAchievementSlider();
        }, 3000);
    });
});

// Initial slide position
updateAchievementSlider();

// Lightbox Functionality
function openLightbox(src, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
    lightbox.style.display = 'flex';
    gsap.fromTo(
        lightboxImg,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' }
    );
    gsap.fromTo(
        lightboxCaption,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.2 }
    );
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    gsap.to([lightboxImg, lightboxCaption], {
        scale: 0.8,
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
            lightbox.style.display = 'none';
            lightboxImg.src = '';
            lightboxCaption.textContent = '';
        }
    });
}

// Close lightbox when clicking outside the image
document.getElementById('lightbox').addEventListener('click', (e) => {
    if (e.target === document.getElementById('lightbox')) {
        closeLightbox();
    }
});

// Form Submission with Google Sheets Integration
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('success-message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    
    fetch('https://script.google.com/macros/s/AKfycbzTBadbgobgzPdXGDM3IlSh04II6DkWcG4oluV4dQY9WlDlEanw5cFqgzkw0vXR0zxQ/exec', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.result === 'success') {
            // Show success message
            successMessage.style.display = 'block';
            gsap.fromTo(
                successMessage,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
            );
            // Hide success message after 3 seconds
            gsap.to(successMessage, {
                opacity: 0,
                y: 20,
                duration: 0.5,
                ease: 'power2.in',
                delay: 3,
                onComplete: () => {
                    successMessage.style.display = 'none';
                    contactForm.reset();
                }
            });
        } else {
            console.error('Error:', data.error);
            alert('There was an error submitting the form. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting the form. Please try again.');
    });
});