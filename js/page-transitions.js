// ===== PAGE TRANSITION SYSTEM =====

// Page transition configuration
const transitionConfig = {
    duration: 0.8,
    ease: "power2.inOut",
    overlayColor: "rgba(0, 194, 168, 0.9)"
};

// Create transition overlay
function createTransitionOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'page-transition-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${transitionConfig.overlayColor};
        z-index: 9999;
        opacity: 0;
        visibility: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
        transition: all ${transitionConfig.duration}s ${transitionConfig.ease};
    `;
    
    // Add loading animation
    overlay.innerHTML = `
        <div class="transition-loader">
            <div class="loader-ring"></div>
            <div class="loader-text">Loading...</div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    return overlay;
}

// Add transition loader styles
function addTransitionStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .transition-loader {
            text-align: center;
            color: white;
        }
        
        .loader-ring {
            width: 60px;
            height: 60px;
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            margin: 0 auto 20px;
            animation: spin 1s linear infinite;
        }
        
        .loader-text {
            font-size: 18px;
            font-weight: 500;
            letter-spacing: 2px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        /* Page entrance animation */
        .page-enter {
            opacity: 0;
            transform: translateY(30px);
        }
        
        .page-enter-active {
            opacity: 1;
            transform: translateY(0);
            transition: all ${transitionConfig.duration}s ${transitionConfig.ease};
        }
        
        /* Page exit animation */
        .page-exit {
            opacity: 1;
            transform: translateY(0);
        }
        
        .page-exit-active {
            opacity: 0;
            transform: translateY(-30px);
            transition: all ${transitionConfig.duration * 0.6}s ${transitionConfig.ease};
        }
    `;
    document.head.appendChild(style);
}

// Initialize page transitions
function initPageTransitions() {
    addTransitionStyles();
    const overlay = createTransitionOverlay();
    
    // Handle all navigation links
    const navLinks = document.querySelectorAll('a[href$=".html"], a[href="index.html"], a[href="/"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetUrl = this.getAttribute('href');
            
            // Don't transition if it's the same page
            if (targetUrl === window.location.pathname || 
                (targetUrl === 'index.html' && window.location.pathname === '/')) {
                return;
            }
            
            transitionToPage(targetUrl, overlay);
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(e) {
        if (e.state && e.state.url) {
            transitionToPage(e.state.url, overlay, false);
        }
    });
    
    // Add current page to history
    history.replaceState({ url: window.location.pathname }, '', window.location.pathname);
}

// Transition to new page
function transitionToPage(url, overlay, addToHistory = true) {
    // Start exit animation
    const pageContent = document.querySelector('.page-content') || document.body;
    pageContent.classList.add('page-exit');
    
    // Show overlay
    overlay.style.visibility = 'visible';
    overlay.style.opacity = '1';
    
    // Wait for exit animation, then navigate
    setTimeout(() => {
        if (addToHistory) {
            history.pushState({ url: url }, '', url);
        }
        window.location.href = url;
    }, transitionConfig.duration * 600); // 60% of duration for exit
}

// Page entrance animation
function initPageEntrance() {
    const pageContent = document.querySelector('.page-content') || document.body;
    
    // Set initial state
    pageContent.classList.add('page-enter');
    
    // Trigger entrance animation
    requestAnimationFrame(() => {
        pageContent.classList.add('page-enter-active');
        pageContent.classList.remove('page-enter');
    });
    
    // Clean up classes after animation
    setTimeout(() => {
        pageContent.classList.remove('page-enter-active');
    }, transitionConfig.duration * 1000);
}

// GSAP-enhanced transitions (if GSAP is available)
function initGSAPTransitions() {
    if (typeof gsap === 'undefined') return;
    
    // Override default transitions with GSAP
    const navLinks = document.querySelectorAll('a[href$=".html"], a[href="index.html"], a[href="/"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetUrl = this.getAttribute('href');
            
            // Don't transition if it's the same page
            if (targetUrl === window.location.pathname || 
                (targetUrl === 'index.html' && window.location.pathname === '/')) {
                return;
            }
            
            gsapTransitionToPage(targetUrl);
        });
    });
}

// GSAP page transition
function gsapTransitionToPage(url) {
    const tl = gsap.timeline();
    const pageContent = document.querySelector('.page-content') || document.body;
    
    // Create transition overlay with GSAP
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${transitionConfig.overlayColor};
        z-index: 9999;
        transform: scaleY(0);
        transform-origin: bottom;
    `;
    document.body.appendChild(overlay);
    
    // Animate overlay in and page out
    tl.to(overlay, {
        scaleY: 1,
        duration: transitionConfig.duration * 0.5,
        ease: transitionConfig.ease
    })
    .to(pageContent, {
        opacity: 0,
        y: -30,
        duration: transitionConfig.duration * 0.3,
        ease: transitionConfig.ease
    }, "-=0.2")
    .call(() => {
        history.pushState({ url: url }, '', url);
        window.location.href = url;
    });
}

// GSAP page entrance
function initGSAPEntrance() {
    if (typeof gsap === 'undefined') return;
    
    const pageContent = document.querySelector('.page-content') || document.body;
    
    // Set initial state
    gsap.set(pageContent, { opacity: 0, y: 30 });
    
    // Animate in
    gsap.to(pageContent, {
        opacity: 1,
        y: 0,
        duration: transitionConfig.duration,
        ease: transitionConfig.ease,
        delay: 0.2
    });
}

// Smooth scroll for same-page navigation
function initSmoothPageScroll() {
    const samePageLinks = document.querySelectorAll('a[href^="#"]');
    
    samePageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                if (typeof gsap !== 'undefined') {
                    gsap.to(window, {
                        scrollTo: { y: offsetTop },
                        duration: 1,
                        ease: "power2.inOut"
                    });
                } else {
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Back to home button functionality
function initBackToHome() {
    const backButtons = document.querySelectorAll('.btn-back');
    
    backButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (typeof gsap !== 'undefined') {
                gsapTransitionToPage('index.html');
            } else {
                const overlay = document.getElementById('page-transition-overlay') || createTransitionOverlay();
                transitionToPage('index.html', overlay);
            }
        });
    });
}

// Preload pages for faster transitions
function preloadPages() {
    const pages = ['about.html', 'skills.html', 'experience.html', 'projects.html', 'certificates.html', 'contact.html'];
    
    pages.forEach(page => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        document.head.appendChild(link);
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    // Skip transitions on certificates page to prevent loading issues
    if (window.location.pathname.includes('certificates.html') || document.body.classList.contains('page-certificates')) {
        // Just ensure page is visible
        document.body.style.opacity = '1';
        document.body.style.visibility = 'visible';
        const pageContent = document.querySelector('.page-content');
        if (pageContent) {
            pageContent.style.opacity = '1';
            pageContent.style.visibility = 'visible';
            pageContent.style.transform = 'none';
        }
        return;
    }
    
    // Initialize transitions
    if (typeof gsap !== 'undefined') {
        initGSAPTransitions();
        initGSAPEntrance();
    } else {
        initPageTransitions();
        initPageEntrance();
    }
    
    initSmoothPageScroll();
    initBackToHome();
    preloadPages();
});

// Handle page visibility for better performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when page is hidden
        if (typeof gsap !== 'undefined') {
            gsap.globalTimeline.pause();
        }
    } else {
        // Resume animations when page is visible
        if (typeof gsap !== 'undefined') {
            gsap.globalTimeline.resume();
        }
    }
});