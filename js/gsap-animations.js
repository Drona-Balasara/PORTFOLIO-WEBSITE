// ===== ADVANCED GSAP ANIMATIONS CONTROLLER =====

// Master Animation Controller with Performance Optimization
class AdvancedAnimationController {
    constructor() {
        this.masterTimeline = null;
        this.pageTimelines = new Map();
        this.scrollTriggers = [];
        this.activeAnimations = new Set();
        this.animationQueue = [];
        
        // Performance settings
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.isSlowDevice = this.detectSlowDevice();
        this.animationSettings = this.getOptimizedSettings();
        
        // Animation presets
        this.presets = {
            fadeIn: { opacity: 0, y: 30, duration: 0.6, ease: 'power3.out' },
            slideUp: { y: 50, opacity: 0, duration: 0.8, ease: 'back.out(1.7)' },
            scaleIn: { scale: 0.8, opacity: 0, duration: 0.5, ease: 'back.out(1.7)' },
            slideLeft: { x: -50, opacity: 0, duration: 0.7, ease: 'power3.out' },
            slideRight: { x: 50, opacity: 0, duration: 0.7, ease: 'power3.out' }
        };
        
        this.init();
    }
    
    init() {
        if (typeof gsap === 'undefined') {
            console.warn('GSAP not loaded, animations disabled');
            this.setupFallbacks();
            return;
        }
        
        this.setupGlobalSettings();
        this.createMasterTimeline();
        this.initializeAnimations();
        this.setupScrollTriggers();
        this.setupPerformanceMonitoring();
    }
    
    detectSlowDevice() {
        const cores = navigator.hardwareConcurrency || 2;
        const memory = navigator.deviceMemory || 4;
        return cores < 4 || memory < 4;
    }
    
    getOptimizedSettings() {
        if (this.isReducedMotion) {
            return {
                duration: 0.1,
                ease: 'none',
                stagger: 0.05,
                enabled: false
            };
        }
        
        if (this.isSlowDevice) {
            return {
                duration: 0.4,
                ease: 'power2.out',
                stagger: 0.1,
                enabled: true
            };
        }
        
        return {
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.15,
            enabled: true
        };
    }
    
    setupGlobalSettings() {
        gsap.config({
            nullTargetWarn: false,
            trialWarn: false,
            force3D: true
        });
        
        // Set global timeline scale based on performance
        if (this.isReducedMotion) {
            gsap.globalTimeline.timeScale(0.01);
        } else if (this.isSlowDevice) {
            gsap.globalTimeline.timeScale(0.7);
        }
        
        // Register ScrollTrigger plugin
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }
    }
    
    createMasterTimeline() {
        this.masterTimeline = gsap.timeline({
            paused: true,
            onComplete: () => this.onMasterTimelineComplete(),
            onUpdate: () => this.onMasterTimelineUpdate()
        });
    }
    
    initializeAnimations() {
        // Initialize all page-specific animations
        this.initHeroAnimations();
        this.initNavigationAnimations();
        this.initSectionAnimations();
        this.initCardAnimations();
        this.initFormAnimations();
        this.initModalAnimations();
    }
    
    initHeroAnimations() {
        const heroTl = gsap.timeline({ paused: true });
        
        if (document.querySelector('.hero-section')) {
            heroTl
                .from('.hero-title', {
                    ...this.presets.slideUp,
                    delay: 0.2
                })
                .from('.hero-subtitle', {
                    ...this.presets.fadeIn,
                    delay: 0.1
                }, '-=0.4')
                .from('.hero-description', {
                    ...this.presets.fadeIn,
                    duration: this.animationSettings.duration
                }, '-=0.3')
                .from('.hero-buttons .btn', {
                    ...this.presets.scaleIn,
                    stagger: this.animationSettings.stagger
                }, '-=0.2')
                .from('.hero-canvas', {
                    opacity: 0,
                    scale: 1.1,
                    duration: 1.2,
                    ease: 'power2.out'
                }, 0);
        }
        
        this.pageTimelines.set('hero', heroTl);
    }
    
    initNavigationAnimations() {
        const navTl = gsap.timeline({ paused: true });
        
        if (document.querySelector('.nav-bar')) {
            navTl
                .from('.nav-bar', {
                    y: -100,
                    opacity: 0,
                    duration: this.animationSettings.duration * 1.3,
                    ease: this.animationSettings.ease
                })
                .from('.nav-item', {
                    opacity: 0,
                    y: -20,
                    duration: this.animationSettings.duration * 0.7,
                    ease: 'power2.out',
                    stagger: this.animationSettings.stagger * 0.7
                }, '-=0.4')
                .from('.theme-toggle', {
                    scale: 0,
                    rotation: 180,
                    duration: this.animationSettings.duration,
                    ease: 'back.out(1.7)'
                }, '-=0.3');
        }
        
        this.pageTimelines.set('navigation', navTl);
    }
    
    initSectionAnimations() {
        const sections = document.querySelectorAll('.section-title, .page-title');
        
        sections.forEach((section) => {
            gsap.set(section, { opacity: 0, y: 30 });
        });
    }
    
    initCardAnimations() {
        const cardSelectors = [
            '.project-card',
            '.certificate-card',
            '.contact-info-item',
            '.faq-item',
            '.participation-card'
        ];
        
        cardSelectors.forEach(selector => {
            const cards = document.querySelectorAll(selector);
            cards.forEach(card => {
                gsap.set(card, { opacity: 0, y: 30, scale: 0.95 });
            });
        });
        
        // Keep skill cards visible by default - they'll animate on scroll
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach(card => {
            gsap.set(card, { opacity: 1, y: 0, scale: 1 });
        });
        
        // Keep experience cards visible by default - they'll animate on scroll
        const experienceCards = document.querySelectorAll('.experience-card');
        experienceCards.forEach(card => {
            gsap.set(card, { opacity: 1, y: 0, scale: 1 });
        });
    }
    
    initFormAnimations() {
        const formElements = document.querySelectorAll('.form-group');
        formElements.forEach(element => {
            gsap.set(element, { opacity: 0, x: -20 });
        });
    }
    
    initModalAnimations() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                gsap.set(modalContent, { 
                    scale: 0.8, 
                    opacity: 0,
                    y: 50
                });
            }
        });
    }
    
    setupScrollTriggers() {
        if (typeof ScrollTrigger === 'undefined' || !this.animationSettings.enabled) {
            this.setupFallbackScrollAnimations();
            return;
        }
        
        // Hero section
        this.createScrollTrigger('.hero-section', {
            start: 'top 90%',
            onEnter: () => this.playTimeline('hero')
        });
        
        // Navigation
        this.createScrollTrigger('.nav-bar', {
            start: 'top top',
            onEnter: () => this.playTimeline('navigation')
        });
        
        // Section titles
        this.setupSectionTitleAnimations();
        
        // Card animations
        this.setupCardScrollAnimations();
        
        // Form animations
        this.setupFormScrollAnimations();
        
        // Parallax effects
        this.setupParallaxEffects();
    }
    
    setupSectionTitleAnimations() {
        const titles = document.querySelectorAll('.section-title, .page-title');
        
        titles.forEach(title => {
            this.createScrollTrigger(title, {
                start: 'top 85%',
                onEnter: () => {
                    gsap.to(title, {
                        opacity: 1,
                        y: 0,
                        duration: this.animationSettings.duration,
                        ease: this.animationSettings.ease
                    });
                }
            });
        });
    }
    
    setupCardScrollAnimations() {
        const cardContainers = [
            '.skills-grid',
            '.experience-timeline',
            '.projects-grid',
            '.certificates-grid',
            '.contact-info-grid',
            '.faq-grid',
            '.participation-grid'
        ];
        
        cardContainers.forEach(containerSelector => {
            const container = document.querySelector(containerSelector);
            if (!container) return;
            
            const cards = container.querySelectorAll('.skill-card, .experience-card, .project-card, .certificate-card, .contact-info-item, .faq-item, .participation-card');
            
            if (cards.length > 0) {
                this.createScrollTrigger(container, {
                    start: 'top 80%',
                    onEnter: () => {
                        gsap.to(cards, {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            duration: this.animationSettings.duration,
                            ease: 'back.out(1.7)',
                            stagger: this.animationSettings.stagger
                        });
                    }
                });
            }
        });
    }
    
    setupFormScrollAnimations() {
        const forms = document.querySelectorAll('.contact-form');
        
        forms.forEach(form => {
            const formGroups = form.querySelectorAll('.form-group');
            
            if (formGroups.length > 0) {
                this.createScrollTrigger(form, {
                    start: 'top 80%',
                    onEnter: () => {
                        gsap.to(formGroups, {
                            opacity: 1,
                            x: 0,
                            duration: this.animationSettings.duration,
                            ease: this.animationSettings.ease,
                            stagger: this.animationSettings.stagger * 0.5
                        });
                    }
                });
            }
        });
    }
    
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero-canvas, .background-shape');
        
        parallaxElements.forEach(element => {
            this.createScrollTrigger(element, {
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
                onUpdate: (self) => {
                    const progress = self.progress;
                    gsap.to(element, {
                        y: progress * 100,
                        duration: 0.3,
                        ease: 'none'
                    });
                }
            });
        });
    }
    
    createScrollTrigger(trigger, options = {}) {
        const defaultOptions = {
            trigger: trigger,
            start: 'top 80%',
            once: true
        };
        
        const scrollTrigger = ScrollTrigger.create({
            ...defaultOptions,
            ...options
        });
        
        this.scrollTriggers.push(scrollTrigger);
        return scrollTrigger;
    }
    
    setupFallbackScrollAnimations() {
        // Simple intersection observer fallback
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            document.querySelectorAll('[data-animate]').forEach(el => {
                observer.observe(el);
            });
        }
    }
    
    setupFallbacks() {
        // CSS-based animation fallbacks
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                animation: fadeInUp 0.6s ease-out forwards;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setupPerformanceMonitoring() {
        // Monitor animation performance
        let frameCount = 0;
        let lastTime = performance.now();
        
        const checkPerformance = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                
                if (fps < 30 && !this.isSlowDevice) {
                    console.warn('Low FPS detected, reducing animation complexity');
                    this.reduceAnimationComplexity();
                }
                
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(checkPerformance);
        };
        
        requestAnimationFrame(checkPerformance);
    }
    
    reduceAnimationComplexity() {
        gsap.globalTimeline.timeScale(0.5);
        this.animationSettings.duration *= 0.7;
        this.animationSettings.stagger *= 0.7;
    }
    
    // Public API methods
    playTimeline(name) {
        const timeline = this.pageTimelines.get(name);
        if (timeline && this.animationSettings.enabled) {
            timeline.play();
        }
    }
    
    pauseTimeline(name) {
        const timeline = this.pageTimelines.get(name);
        if (timeline) {
            timeline.pause();
        }
    }
    
    animateElement(element, preset = 'fadeIn', options = {}) {
        if (!this.animationSettings.enabled) return;
        
        const animation = {
            ...this.presets[preset],
            ...options
        };
        
        return gsap.from(element, animation);
    }
    
    createCustomAnimation(elements, fromVars, toVars = {}) {
        if (!this.animationSettings.enabled) return;
        
        gsap.set(elements, fromVars);
        return gsap.to(elements, {
            ...toVars,
            duration: toVars.duration || this.animationSettings.duration,
            ease: toVars.ease || this.animationSettings.ease
        });
    }
    
    onMasterTimelineComplete() {
        console.log('Master timeline completed');
        this.activeAnimations.clear();
    }
    
    onMasterTimelineUpdate() {
        // Update progress indicators if needed
    }
    
    // Cleanup method
    destroy() {
        this.scrollTriggers.forEach(trigger => trigger.kill());
        this.pageTimelines.forEach(timeline => timeline.kill());
        if (this.masterTimeline) {
            this.masterTimeline.kill();
        }
        this.activeAnimations.clear();
    }
    
    // Refresh all scroll triggers (useful for dynamic content)
    refresh() {
        if (typeof ScrollTrigger !== 'undefined') {
            ScrollTrigger.refresh();
        }
    }
}

// Enhanced Page Transition Controller
class EnhancedPageTransitionController {
    constructor() {
        this.isTransitioning = false;
        this.transitionDuration = 0.8;
        this.transitionEase = 'power2.inOut';
        
        this.init();
    }
    
    init() {
        if (typeof gsap === 'undefined') return;
        
        this.setupPageTransitions();
        this.setupPageEntrance();
    }
    
    setupPageTransitions() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href]');
            if (link && this.shouldTransition(link)) {
                e.preventDefault();
                this.transitionToPage(link.href);
            }
        });
    }
    
    shouldTransition(link) {
        const href = link.getAttribute('href');
        
        if (!href || 
            href.startsWith('#') || 
            href.startsWith('mailto:') || 
            href.startsWith('tel:') || 
            href.includes('://') ||
            link.target === '_blank' ||
            link.classList.contains('no-transition')) {
            return false;
        }
        
        return true;
    }
    
    transitionToPage(url) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        // Create sophisticated transition overlay
        const overlay = this.createTransitionOverlay();
        document.body.appendChild(overlay);
        
        // Show overlay immediately
        gsap.set(overlay, { opacity: 1 });
        
        // Start loader animation
        gsap.to(overlay.querySelector('.transition-loader'), {
            rotation: 360,
            duration: 1,
            ease: 'none',
            repeat: -1
        });
        
        // Navigate after a short delay to show the animation
        setTimeout(() => {
            window.location.href = url;
        }, 500);
    }
    
    createTransitionOverlay() {
        const overlay = document.createElement('div');
        overlay.innerHTML = `
            <div class="transition-content">
                <div class="transition-loader"></div>
                <div class="transition-text">Loading...</div>
            </div>
        `;
        
        overlay.style.cssText = `
            position: fixed;
            top: 0px;
            left: 0px;
            width: 100%;
            height: 100%;
            background: var(--background);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .transition-content {
                text-align: center;
                color: var(--primary);
            }
            
            .transition-loader {
                width: 40px;
                height: 40px;
                border: 3px solid var(--border);
                border-top: 3px solid var(--primary);
                border-radius: 50%;
                margin: 0 auto 1rem;
            }
            
            .transition-text {
                font-size: 1rem;
                font-weight: 500;
                color: var(--primary);
            }
        `;
        document.head.appendChild(style);
        
        return overlay;
    }
    
    setupPageEntrance() {
        // Animate page entrance on load
        window.addEventListener('load', () => {
            this.animatePageEntrance();
        });
    }
    
    animatePageEntrance() {
        if (typeof gsap === 'undefined') return;
        
        const tl = gsap.timeline();
        
        tl
            .from('.page-content', {
                opacity: 0,
                scale: 1.05,
                duration: 0.8,
                ease: 'power3.out'
            })
            .from('.nav-bar', {
                y: -100,
                opacity: 0,
                duration: 0.6,
                ease: 'power3.out'
            }, '-=0.6')
            .from('.back-home', {
                x: -50,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out'
            }, '-=0.4');
    }
}

// Advanced Hover Effects Controller
class AdvancedHoverEffectsController {
    constructor() {
        this.activeHovers = new Map();
        this.hoverTimelines = new Map();
        
        this.init();
    }
    
    init() {
        if (typeof gsap === 'undefined') return;
        
        this.setupButtonHovers();
        this.setupCardHovers();
        this.setupImageHovers();
        this.setupNavigationHovers();
        this.setupSocialLinkHovers();
    }
    
    setupButtonHovers() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(btn => {
            const hoverTl = gsap.timeline({ paused: true });
            
            hoverTl
                .to(btn, {
                    scale: 1.05,
                    y: -3,
                    duration: 0.3,
                    ease: 'back.out(1.7)'
                });
            
            const btnText = btn.querySelector('.btn-text');
            if (btnText) {
                hoverTl.to(btnText, {
                    x: 5,
                    duration: 0.2,
                    ease: 'power2.out'
                }, 0);
            }
            
            this.hoverTimelines.set(btn, hoverTl);
            
            btn.addEventListener('mouseenter', () => hoverTl.play());
            btn.addEventListener('mouseleave', () => hoverTl.reverse());
        });
    }
    
    setupCardHovers() {
        const cards = document.querySelectorAll('.card, .skill-card, .experience-card, .project-card, .certificate-card');
        
        cards.forEach(card => {
            const hoverTl = gsap.timeline({ paused: true });
            
            hoverTl.to(card, {
                y: -10,
                scale: 1.02,
                duration: 0.4,
                ease: 'power2.out'
            });
            
            const cardTitle = card.querySelector('.card-title, .skill-name, .project-title');
            if (cardTitle) {
                hoverTl.to(cardTitle, {
                    color: 'var(--primary)',
                    duration: 0.2,
                    ease: 'power2.out'
                }, 0);
            }
            
            this.hoverTimelines.set(card, hoverTl);
            
            card.addEventListener('mouseenter', () => hoverTl.play());
            card.addEventListener('mouseleave', () => hoverTl.reverse());
        });
    }
    
    setupImageHovers() {
        const imageContainers = document.querySelectorAll('.project-image-container, .certificate-image-container');
        
        imageContainers.forEach(container => {
            const image = container.querySelector('img');
            const overlay = container.querySelector('.project-overlay, .certificate-overlay');
            
            if (image && overlay) {
                const hoverTl = gsap.timeline({ paused: true });
                
                hoverTl
                    .to(image, {
                        scale: 1.1,
                        duration: 0.4,
                        ease: 'power2.out'
                    })
                    .to(overlay, {
                        opacity: 1,
                        duration: 0.3,
                        ease: 'power2.out'
                    }, 0);
                
                this.hoverTimelines.set(container, hoverTl);
                
                container.addEventListener('mouseenter', () => hoverTl.play());
                container.addEventListener('mouseleave', () => hoverTl.reverse());
            }
        });
    }
    
    setupNavigationHovers() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const hoverTl = gsap.timeline({ paused: true });
            
            hoverTl.to(link, {
                scale: 1.1,
                color: 'var(--primary)',
                duration: 0.2,
                ease: 'power2.out'
            });
            
            this.hoverTimelines.set(link, hoverTl);
            
            link.addEventListener('mouseenter', () => hoverTl.play());
            link.addEventListener('mouseleave', () => hoverTl.reverse());
        });
    }
    
    setupSocialLinkHovers() {
        const socialLinks = document.querySelectorAll('.social-link');
        
        socialLinks.forEach(link => {
            const hoverTl = gsap.timeline({ paused: true });
            
            hoverTl.to(link, {
                scale: 1.1,
                y: -2,
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
            
            const linkImg = link.querySelector('img');
            if (linkImg) {
                hoverTl.to(linkImg, {
                    rotation: 360,
                    duration: 0.5,
                    ease: 'power2.out'
                }, 0);
            }
            
            this.hoverTimelines.set(link, hoverTl);
            
            link.addEventListener('mouseenter', () => hoverTl.play());
            link.addEventListener('mouseleave', () => hoverTl.reverse());
        });
    }
    
    // Cleanup method
    destroy() {
        this.hoverTimelines.forEach(timeline => timeline.kill());
        this.hoverTimelines.clear();
        this.activeHovers.clear();
    }
}

// Initialize advanced animation controllers
let advancedAnimationController, enhancedPageTransitionController, advancedHoverEffectsController;

document.addEventListener('DOMContentLoaded', function() {
    if (typeof gsap !== 'undefined') {
        // Initialize advanced controllers
        advancedAnimationController = new AdvancedAnimationController();
        enhancedPageTransitionController = new EnhancedPageTransitionController();
        advancedHoverEffectsController = new AdvancedHoverEffectsController();
        
        // Make controllers globally available
        window.advancedAnimationController = advancedAnimationController;
        window.enhancedPageTransitionController = enhancedPageTransitionController;
        window.advancedHoverEffectsController = advancedHoverEffectsController;
        
        console.log('Advanced GSAP animation controllers initialized');
    } else {
        console.warn('GSAP not loaded, using CSS fallbacks');
    }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is hidden
        if (advancedAnimationController) {
            gsap.globalTimeline.pause();
        }
    } else {
        // Resume animations when page is visible
        if (advancedAnimationController) {
            gsap.globalTimeline.resume();
        }
    }
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (advancedAnimationController) {
        advancedAnimationController.destroy();
    }
    if (advancedHoverEffectsController) {
        advancedHoverEffectsController.destroy();
    }
});