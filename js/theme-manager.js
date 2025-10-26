// ===== THEME MANAGEMENT SYSTEM =====

class ThemeManager {
    constructor() {
        this.currentTheme = 'dark'; // Default theme
        this.themeToggle = null;
        this.themeIcon = null;
        
        this.init();
    }
    
    init() {
        this.loadSavedTheme();
        this.setupThemeToggle();
        this.applyTheme(this.currentTheme);
        this.bindEvents();
    }
    
    loadSavedTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
            this.currentTheme = savedTheme;
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.currentTheme = prefersDark ? 'dark' : 'light';
        }
    }
    
    setupThemeToggle() {
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = this.themeToggle?.querySelector('.theme-icon');
        
        if (!this.themeToggle) {
            console.warn('Theme toggle button not found');
            return;
        }
    }
    
    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        
        // Update icon
        if (this.themeIcon) {
            this.themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
        
        // Save to localStorage
        localStorage.setItem('portfolio-theme', theme);
        
        // Animate theme change
        this.animateThemeChange();
    }
    
    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(newTheme);
    }
    
    animateThemeChange() {
        // Add transition class to body for smooth theme change
        document.body.classList.add('theme-transitioning');
        
        // GSAP animation if available
        if (typeof gsap !== 'undefined') {
            gsap.to(document.body, {
                duration: 0.3,
                ease: "power2.inOut",
                onComplete: () => {
                    document.body.classList.remove('theme-transitioning');
                }
            });
        } else {
            // Fallback CSS transition
            setTimeout(() => {
                document.body.classList.remove('theme-transitioning');
            }, 300);
        }
    }
    
    bindEvents() {
        // Theme toggle click
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
        
        // Keyboard shortcut (Ctrl/Cmd + Shift + T)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            // Only auto-switch if user hasn't manually set a preference
            const savedTheme = localStorage.getItem('portfolio-theme');
            if (!savedTheme) {
                this.applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    
    // Public method to get current theme
    getCurrentTheme() {
        return this.currentTheme;
    }
    
    // Public method to set theme programmatically
    setTheme(theme) {
        if (theme === 'light' || theme === 'dark') {
            this.applyTheme(theme);
        }
    }
}

// Add CSS for theme transitions
function addThemeTransitionStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Theme transition styles */
        .theme-transitioning,
        .theme-transitioning *,
        .theme-transitioning *::before,
        .theme-transitioning *::after {
            transition: background-color 0.3s ease, 
                       color 0.3s ease, 
                       border-color 0.3s ease, 
                       box-shadow 0.3s ease !important;
        }
        
        /* Smooth theme toggle button animation */
        .theme-toggle {
            position: relative;
            overflow: hidden;
        }
        
        .theme-toggle::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: var(--primary);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: all 0.4s ease;
            z-index: -1;
        }
        
        .theme-toggle:hover::before {
            width: 100%;
            height: 100%;
        }
        
        .theme-icon {
            display: inline-block;
            transition: transform 0.3s ease;
        }
        
        .theme-toggle:hover .theme-icon {
            transform: rotate(180deg) scale(1.1);
        }
        
        /* Theme-specific animations */
        [data-theme="light"] {
            --theme-transition: all 0.3s ease;
        }
        
        [data-theme="dark"] {
            --theme-transition: all 0.3s ease;
        }
        
        /* Glow effect for dark theme */
        [data-theme="dark"] .neon-glow {
            animation: neonPulse 2s ease-in-out infinite alternate;
        }
        
        @keyframes neonPulse {
            from {
                box-shadow: var(--shadow-glow);
            }
            to {
                box-shadow: var(--shadow-glow-strong);
            }
        }
        
        /* Light theme specific styles */
        [data-theme="light"] .hero-canvas {
            opacity: 0.3;
        }
        
        [data-theme="light"] .geometric-shape {
            border-color: rgba(0, 194, 168, 0.4);
        }
        
        [data-theme="light"] .morphing-blob {
            opacity: 0.05;
        }
    `;
    document.head.appendChild(style);
}

// Enhanced theme manager with GSAP animations
class GSAPThemeManager extends ThemeManager {
    animateThemeChange() {
        if (typeof gsap === 'undefined') {
            super.animateThemeChange();
            return;
        }
        
        // Create a smooth transition overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${this.currentTheme === 'dark' ? '#ffffff' : '#0a0a0a'};
            z-index: 10000;
            pointer-events: none;
            opacity: 0;
        `;
        document.body.appendChild(overlay);
        
        // Animate the transition
        const tl = gsap.timeline({
            onComplete: () => {
                overlay.remove();
            }
        });
        
        tl.to(overlay, {
            opacity: 0.8,
            duration: 0.15,
            ease: "power2.inOut"
        })
        .to(overlay, {
            opacity: 0,
            duration: 0.15,
            ease: "power2.inOut"
        });
        
        // Animate theme toggle button
        if (this.themeToggle) {
            gsap.to(this.themeToggle, {
                scale: 0.9,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut"
            });
        }
    }
}

// Initialize theme manager
let themeManager;

document.addEventListener('DOMContentLoaded', function() {
    addThemeTransitionStyles();
    
    // Use GSAP version if available
    if (typeof gsap !== 'undefined') {
        themeManager = new GSAPThemeManager();
    } else {
        themeManager = new ThemeManager();
    }
    
    // Make theme manager globally accessible
    window.themeManager = themeManager;
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ThemeManager, GSAPThemeManager };
}