// ===== CORE FUNCTIONALITY AND NAVIGATION =====

// ===== NAVIGATION SYSTEM =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const heroSection = document.getElementById('hero');

    if (!navbar || !heroSection) return;

    // Show/hide navbar based on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Hero is visible - hide navbar
                navbar.classList.remove('nav-visible');
            } else {
                // Hero is not visible - show navbar
                navbar.classList.add('nav-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    observer.observe(heroSection);
}

// ===== SMOOTH SCROLL FUNCTIONALITY =====
function initSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });
}

// ===== MOBILE MENU FUNCTIONALITY =====
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (!mobileMenuToggle || !navMenu) return;

    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function () {
        mobileMenuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on links
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
}

function closeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
    if (navMenu) navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== SCROLL INDICATOR =====
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (!scrollIndicator) return;

    // Hide scroll indicator when user scrolls
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '1';
        }
    });
}

// ===== CURRENT SECTION HIGHLIGHT =====
function initCurrentSectionHighlight() {
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    if (sections.length === 0 || navLinks.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');

                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('current-section');
                });

                // Add active class to current section link
                const currentLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (currentLink) {
                    currentLink.classList.add('current-section');
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-80px 0px -80px 0px'
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// ===== PARTICLE SYSTEM =====
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        this.mouse = { x: 0, y: 0 };
        
        this.setupCanvas();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }
    
    setupCanvas() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }
    
    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2,
                color: `hsl(${Math.random() * 60 + 160}, 70%, 60%)`
            });
        }
    }
    
    bindEvents() {
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += (dx / distance) * force * 0.01;
                particle.vy += (dy / distance) * force * 0.01;
            }
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary check
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Keep particles in bounds
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
            
            // Add some drift
            particle.vx *= 0.99;
            particle.vy *= 0.99;
        });
    }
    
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fill();
        });
        
        this.ctx.globalAlpha = 1;
    }
    
    drawConnections() {
        this.particles.forEach((particle, i) => {
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = `rgba(0, 194, 168, ${0.2 * (1 - distance / 120)})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            });
        });
    }
    
    animate() {
        this.updateParticles();
        this.drawParticles();
        this.drawConnections();
        requestAnimationFrame(() => this.animate());
    }
}

function initParticleSystem() {
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        new ParticleSystem(canvas);
    }
}

// ===== ADVANCED TYPOGRAPHY EFFECTS =====

// Enhanced Typewriter Effect
function initTypewriter() {
    const titleElement = document.getElementById('hero-title');
    if (!titleElement) return;

    const titles = [
        'Web Developer',
        'Python Programmer',
        'Multimedia Designer',
        'Full-Stack Developer'
    ];

    let currentTitleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        const currentTitle = titles[currentTitleIndex];

        if (isDeleting) {
            titleElement.textContent = currentTitle.substring(0, currentCharIndex - 1);
            currentCharIndex--;
        } else {
            titleElement.textContent = currentTitle.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;
        typeSpeed += Math.random() * 50;

        if (!isDeleting && currentCharIndex === currentTitle.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentTitleIndex = (currentTitleIndex + 1) % titles.length;
            typeSpeed = 500;
        }

        setTimeout(typeWriter, typeSpeed);
    }

    setTimeout(typeWriter, 1000);
}

// Initialize all typography effects
function initAdvancedTypography() {
    initTypewriter();
}



// ===== UTILITY FUNCTIONS =====
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
        error: e.error
    });
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled Promise Rejection:', e.reason);
});

function safeExecute(fn, context = 'Unknown') {
    try {
        return fn();
    } catch (error) {
        console.error(`Error in ${context}:`, error);
        return null;
    }
}

// ===== PAGE-SPECIFIC INITIALIZATION =====
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm && typeof ContactForm !== 'undefined') {
        new ContactForm();
    }
}

function initCertificateModal() {
    const certificateModal = document.getElementById('certificate-modal');
    if (certificateModal && typeof CertificateModal !== 'undefined') {
        new CertificateModal();
    }
}

// ===== MAIN INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Core functionality
    safeExecute(() => initNavigation(), 'Navigation');
    safeExecute(() => initSmoothScroll(), 'Smooth Scroll');
    safeExecute(() => initMobileMenu(), 'Mobile Menu');
    safeExecute(() => initScrollIndicator(), 'Scroll Indicator');
    safeExecute(() => initCurrentSectionHighlight(), 'Section Highlight');
    
    // Page-specific functionality
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'index.html':
        case '':
            safeExecute(() => initAdvancedTypography(), 'Typography Effects');
            safeExecute(() => initParticleSystem(), 'Particle System');
            break;
        case 'contact.html':
            safeExecute(() => initContactForm(), 'Contact Form');
            break;
        case 'certificates.html':
            safeExecute(() => initCertificateModal(), 'Certificate Modal');
            break;
        case 'skills.html':
            safeExecute(() => initSkillsFilter(), 'Skills Filter');
            safeExecute(() => initSkillsLevelAnimation(), 'Skills Level Animation');
            break;
    }
});

// ===== SKILLS FILTER FUNCTIONALITY =====
function initSkillsFilter() {
    console.log('Initializing skills filter...');
    const filterTabs = document.querySelectorAll('.filter-tab');
    const skillsCategories = document.querySelectorAll('.skills-category');

    console.log('Filter tabs found:', filterTabs.length);
    console.log('Skills categories found:', skillsCategories.length);

    if (filterTabs.length === 0 || skillsCategories.length === 0) {
        console.log('No filter tabs or categories found, exiting...');
        return;
    }

    // Add click event listeners to filter tabs
    filterTabs.forEach((tab, index) => {
        console.log(`Adding click listener to tab ${index}:`, tab.textContent);
        tab.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            console.log('Filter clicked:', filter);
            
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Filter categories
            filterCategories(filter);
        });
    });

    function filterCategories(filter) {
        console.log('Filtering categories for:', filter);
        skillsCategories.forEach(category => {
            const categoryType = category.getAttribute('data-category');
            console.log(`Category: ${categoryType}, Filter: ${filter}`);
            
            if (filter === 'all') {
                // Show all categories
                category.style.display = 'block';
                category.style.opacity = '1';
                category.style.transform = 'translateY(0)';
                console.log('Showing all categories');
            } else if (categoryType === filter) {
                // Show matching category
                category.style.display = 'block';
                category.style.opacity = '1';
                category.style.transform = 'translateY(0)';
                console.log(`Showing category: ${categoryType}`);
            } else {
                // Hide non-matching categories
                category.style.opacity = '0';
                category.style.transform = 'translateY(20px)';
                console.log(`Hiding category: ${categoryType}`);
                
                // Hide after transition
                setTimeout(() => {
                    if (category.style.opacity === '0') {
                        category.style.display = 'none';
                    }
                }, 300);
            }
        });
    }

    // Initialize with all skills visible
    filterCategories('all');
}

// ===== SKILLS LEVEL ANIMATION =====
function initSkillsLevelAnimation() {
    const skillBars = document.querySelectorAll('.level-bar');
    
    if (skillBars.length === 0) return;

    // Animate skill bars when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const level = bar.getAttribute('data-level');
                
                // Animate the width
                setTimeout(() => {
                    bar.style.width = level + '%';
                }, 200);
                
                // Stop observing this element
                observer.unobserve(bar);
            }
        });
    }, {
        threshold: 0.5
    });

    skillBars.forEach(bar => {
        // Set initial width to 0
        bar.style.width = '0%';
        bar.style.transition = 'width 1s ease-out';
        
        // Start observing
        observer.observe(bar);
    });
}