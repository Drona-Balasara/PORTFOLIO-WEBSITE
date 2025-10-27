// ===== ASSET MANAGEMENT SYSTEM =====

class AssetManager {
    constructor() {
        this.assets = {
            images: {
                profile: {
                    main: 'assets/images/profile/profile-photo.jpg',
                    mainRetina: 'assets/images/profile/profile-photo@2x.jpg',
                    background: 'assets/images/profile/profile-background.jpg'
                },
                projects: {
                    hybridAI: 'assets/images/projects/hybrid-ai-translator.jpg',
                    alumnet: 'assets/images/projects/alumnet.jpg',
                    revivePeace: 'assets/images/projects/revive-peace.jpg',
                    productTrust: 'assets/images/projects/product-trust-analyzer.jpg'
                },
                certificates: {
                    pythonFramework: 'assets/images/certificates/python-framework.jpg',
                    videoEditing: 'assets/images/certificates/video-editing.jpg',
                    aiTools: 'assets/images/certificates/ai-tools.jpg',
                    ieeeEmbs: 'assets/images/certificates/ieee-embs.jpg',
                    itFair: 'assets/images/certificates/it-fair.jpg'
                }
            },
            icons: {
                social: {
                    github: 'assets/icons/github.svg',
                    linkedin: 'assets/icons/linkedin.svg',
                    twitter: 'assets/icons/twitter.svg',
                    instagram: 'assets/icons/instagram.svg'
                },
                ui: {
                    email: 'assets/icons/email.svg',
                    download: 'assets/icons/download.svg'
                }
            },
            documents: {
                resume: 'assets/documents/resume.pdf'
            }
        };
        
        this.fallbacks = {
            profileImage: this.generateProfilePlaceholder(),
            projectImage: this.generateProjectPlaceholder(),
            certificateImage: this.generateCertificatePlaceholder()
        };
        
        this.loadedAssets = new Set();
        this.failedAssets = new Set();
        
        this.init();
    }
    
    init() {
        this.setupImageLazyLoading();
        this.setupImageErrorHandling();
        this.preloadCriticalAssets();
        this.setupAssetOptimization();
    }
    
    // Generate CSS-based placeholders
    generateProfilePlaceholder() {
        return `data:image/svg+xml,${encodeURIComponent(`
            <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#00c2a8;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#00a693;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <rect width="400" height="400" fill="url(#grad)"/>
                <circle cx="200" cy="160" r="60" fill="rgba(255,255,255,0.3)"/>
                <rect x="140" y="240" width="120" height="80" rx="10" fill="rgba(255,255,255,0.3)"/>
                <text x="200" y="350" text-anchor="middle" fill="white" font-family="Arial" font-size="16">Profile Photo</text>
            </svg>
        `)}`;
    }
    
    generateProjectPlaceholder() {
        return `data:image/svg+xml,${encodeURIComponent(`
            <svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="projGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#2a2a2a;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <rect width="600" height="400" fill="url(#projGrad)"/>
                <rect x="50" y="50" width="500" height="300" rx="10" fill="rgba(0,194,168,0.1)" stroke="#00c2a8" stroke-width="2"/>
                <circle cx="300" cy="200" r="40" fill="rgba(0,194,168,0.3)"/>
                <text x="300" y="280" text-anchor="middle" fill="#00c2a8" font-family="Arial" font-size="18">Project Screenshot</text>
            </svg>
        `)}`;
    }
    
    generateCertificatePlaceholder() {
        return `data:image/svg+xml,${encodeURIComponent(`
            <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="certGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#f8fafc;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#e2e8f0;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <rect width="800" height="600" fill="url(#certGrad)" stroke="#00c2a8" stroke-width="4"/>
                <rect x="50" y="50" width="700" height="500" fill="none" stroke="#00c2a8" stroke-width="2"/>
                <text x="400" y="150" text-anchor="middle" fill="#00c2a8" font-family="Arial" font-size="32" font-weight="bold">CERTIFICATE</text>
                <text x="400" y="200" text-anchor="middle" fill="#64748b" font-family="Arial" font-size="18">of Achievement</text>
                <text x="400" y="300" text-anchor="middle" fill="#1e293b" font-family="Arial" font-size="24">Balasara Drona Prakash</text>
                <text x="400" y="400" text-anchor="middle" fill="#64748b" font-family="Arial" font-size="16">Professional Development</text>
            </svg>
        `)}`;
    }
    
    setupImageLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        imageObserver.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '50px'
            });
            
            // Observe all images with data-src
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for older browsers
            document.querySelectorAll('img[data-src]').forEach(img => {
                this.loadImage(img);
            });
        }
    }
    
    loadImage(img) {
        const src = img.dataset.src;
        if (!src) return;
        
        // Create a new image to test loading
        const testImg = new Image();
        
        testImg.onload = () => {
            img.src = src;
            img.classList.add('loaded');
            this.loadedAssets.add(src);
            
            // Remove data-src to prevent reloading
            img.removeAttribute('data-src');
        };
        
        testImg.onerror = () => {
            this.handleImageError(img, src);
        };
        
        testImg.src = src;
    }
    
    handleImageError(img, src) {
        this.failedAssets.add(src);
        
        // Determine appropriate fallback based on image type
        let fallbackSrc;
        
        if (src.includes('profile')) {
            fallbackSrc = this.fallbacks.profileImage;
        } else if (src.includes('projects')) {
            fallbackSrc = this.fallbacks.projectImage;
        } else if (src.includes('certificates')) {
            fallbackSrc = this.fallbacks.certificateImage;
        } else {
            // Generic fallback
            fallbackSrc = this.generateGenericPlaceholder(img.width || 400, img.height || 300);
        }
        
        img.src = fallbackSrc;
        img.classList.add('loaded', 'fallback');
        img.removeAttribute('data-src');
        
        console.warn(`Failed to load image: ${src}, using fallback`);
    }
    
    generateGenericPlaceholder(width = 400, height = 300) {
        return `data:image/svg+xml,${encodeURIComponent(`
            <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
                <rect width="${width}" height="${height}" fill="#f1f5f9"/>
                <text x="${width/2}" y="${height/2}" text-anchor="middle" fill="#64748b" font-family="Arial" font-size="16">Image Not Available</text>
            </svg>
        `)}`;
    }
    
    setupImageErrorHandling() {
        // Global error handler for images
        document.addEventListener('error', (e) => {
            if (e.target.tagName === 'IMG') {
                this.handleImageError(e.target, e.target.src);
            }
        }, true);
    }
    
    preloadCriticalAssets() {
        const criticalAssets = [
            this.assets.images.profile.main,
            this.assets.icons.social.github,
            this.assets.icons.social.linkedin,
            this.assets.icons.ui.email,
            this.assets.icons.ui.download
        ];
        
        criticalAssets.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
    
    setupAssetOptimization() {
        // Setup responsive images based on device pixel ratio
        if (window.devicePixelRatio > 1) {
            this.setupRetinaImages();
        }
        
        // Setup WebP support detection
        this.detectWebPSupport().then(supported => {
            if (supported) {
                this.enableWebPImages();
            }
        });
    }
    
    setupRetinaImages() {
        document.querySelectorAll('img[data-src]').forEach(img => {
            const src = img.dataset.src;
            if (src && src.includes('profile')) {
                // Use retina version for profile images
                const retinaSrc = src.replace('.jpg', '@2x.jpg');
                img.dataset.src = retinaSrc;
            }
        });
    }
    
    async detectWebPSupport() {
        return new Promise((resolve) => {
            const webP = new Image();
            webP.onload = webP.onerror = () => {
                resolve(webP.height === 2);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }
    
    enableWebPImages() {
        document.documentElement.classList.add('webp-supported');
        
        // Convert image sources to WebP where available
        document.querySelectorAll('img[data-src]').forEach(img => {
            const src = img.dataset.src;
            if (src && (src.endsWith('.jpg') || src.endsWith('.png'))) {
                const webpSrc = src.replace(/\.(jpg|png)$/, '.webp');
                img.dataset.src = webpSrc;
                img.dataset.fallback = src; // Keep original as fallback
            }
        });
    }
    
    // Public methods
    getAssetUrl(category, subcategory, asset) {
        try {
            return this.assets[category][subcategory][asset];
        } catch (e) {
            console.warn(`Asset not found: ${category}.${subcategory}.${asset}`);
            return null;
        }
    }
    
    preloadAsset(url) {
        if (this.loadedAssets.has(url)) return Promise.resolve();
        
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                this.loadedAssets.add(url);
                resolve();
            };
            img.onerror = reject;
            img.src = url;
        });
    }
    
    getLoadedAssets() {
        return Array.from(this.loadedAssets);
    }
    
    getFailedAssets() {
        return Array.from(this.failedAssets);
    }
    
    // Resume download handler
    downloadResume() {
        const resumeUrl = this.assets.documents.resume;
        
        // Check if resume exists
        fetch(resumeUrl, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    // Resume exists, trigger download
                    const link = document.createElement('a');
                    link.href = resumeUrl;
                    link.download = 'Balasara_Drona_Prakash_Resume.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    // Track download
                    if (window.gtag) {
                        gtag('event', 'download', {
                            event_category: 'Resume',
                            event_label: 'PDF Download'
                        });
                    }
                } else {
                    throw new Error('Resume not found');
                }
            })
            .catch(() => {
                // Show coming soon message
                if (window.accessibilityManager) {
                    window.accessibilityManager.announce('Resume download will be available soon');
                }
                
                alert('Resume download will be available soon. Please check back later or contact me directly.');
            });
    }
}

// Content Management System
class ContentManager {
    constructor() {
        this.content = {
            personal: {
                name: 'Balasara Drona Prakash',
                title: 'Full Stack Developer & AI Enthusiast',
                email: 'work.dronabalasara@gmail.com',
                phone: '+91 9737216061',
                location: 'Gujarat, India',
                bio: 'Passionate full-stack developer with expertise in modern web technologies and artificial intelligence. Currently pursuing B.Tech in Computer Engineering with a focus on innovative solutions and cutting-edge technology.',
                social: {
                    github: 'https://github.com/Drona-Balasara',
                    linkedin: 'https://linkedin.com/in/drona-balasara',
                    twitter: 'https://twitter.com/drona_balasara',
                    instagram: 'https://instagram.com/drona.balasara'
                }
            },
            skills: {
                frontend: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Vue.js'],
                backend: ['Python', 'Node.js', 'PHP', 'Express.js'],
                database: ['MongoDB', 'MySQL', 'PostgreSQL'],
                tools: ['Git', 'Docker', 'VS Code', 'Figma'],
                ai: ['TensorFlow', 'PyTorch', 'OpenCV', 'NLP']
            },
            projects: [
                {
                    id: 'hybrid-ai-translator',
                    title: 'Hybrid AI Translator',
                    description: 'Advanced real-time translation system combining machine learning with computer vision.',
                    technologies: ['Python', 'Kivy', 'PyTorch', 'OpenCV', 'TensorFlow'],
                    github: 'https://github.com/Drona-Balasara/hybrid-ai-translator',
                    demo: '#',
                    featured: true
                },
                {
                    id: 'alumnet',
                    title: 'ALUMNET',
                    description: 'Comprehensive alumni networking platform for graduates and professionals.',
                    technologies: ['React', 'Context API', 'JavaScript', 'Node.js', 'MongoDB'],
                    github: 'https://github.com/Drona-Balasara/alumnet',
                    demo: '#',
                    featured: true
                }
            ]
        };
        
        this.init();
    }
    
    init() {
        this.populateContent();
        this.setupDynamicContent();
    }
    
    populateContent() {
        // Update page titles and meta descriptions
        this.updateMetaContent();
        
        // Populate personal information
        this.populatePersonalInfo();
        
        // Update social links
        this.updateSocialLinks();
    }
    
    updateMetaContent() {
        document.title = `${this.content.personal.name} - ${this.content.personal.title}`;
        
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.content = this.content.personal.bio;
        }
    }
    
    populatePersonalInfo() {
        // Update contact information
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            link.href = `mailto:${this.content.personal.email}`;
            if (link.textContent.includes('@') || link.textContent === '') {
                link.textContent = this.content.personal.email;
            }
        });
        
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(link => {
            link.href = `tel:${this.content.personal.phone}`;
            if (link.textContent.includes('+') || link.textContent === '') {
                link.textContent = this.content.personal.phone;
            }
        });
    }
    
    updateSocialLinks() {
        Object.entries(this.content.personal.social).forEach(([platform, url]) => {
            const links = document.querySelectorAll(`a[href*="${platform}"]`);
            links.forEach(link => {
                link.href = url;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
            });
        });
    }
    
    setupDynamicContent() {
        // Setup content that changes based on time/context
        this.updateAvailabilityStatus();
        this.updateCurrentYear();
    }
    
    updateAvailabilityStatus() {
        const statusElements = document.querySelectorAll('.status-text');
        statusElements.forEach(element => {
            element.textContent = 'Available for new projects';
        });
    }
    
    updateCurrentYear() {
        const yearElements = document.querySelectorAll('.current-year');
        const currentYear = new Date().getFullYear();
        yearElements.forEach(element => {
            element.textContent = currentYear;
        });
    }
    
    // Public methods
    getContent(category, key = null) {
        if (key) {
            return this.content[category]?.[key];
        }
        return this.content[category];
    }
    
    updateContent(category, key, value) {
        if (this.content[category]) {
            this.content[category][key] = value;
            this.populateContent();
        }
    }
}

// Initialize asset and content management
document.addEventListener('DOMContentLoaded', function() {
    // Initialize asset manager
    window.assetManager = new AssetManager();
    
    // Initialize content manager
    window.contentManager = new ContentManager();
    
    // Setup resume download functionality
    const resumeButtons = document.querySelectorAll('.btn-resume, .download-resume');
    resumeButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            window.assetManager.downloadResume();
        });
    });
    
    // Log asset loading status
    setTimeout(() => {
        console.log('Loaded assets:', window.assetManager.getLoadedAssets().length);
        console.log('Failed assets:', window.assetManager.getFailedAssets().length);
    }, 3000);
});