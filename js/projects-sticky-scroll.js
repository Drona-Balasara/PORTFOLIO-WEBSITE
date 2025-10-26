// Projects data for sticky scroll reveal
const projectsData = [
    {
        title: "Hybrid AI Translator",
        description: "Advanced real-time translation system combining machine learning with computer vision. Features neural network optimization, multi-language support, and intuitive GUI built with Python and Kivy framework. This project showcases the power of AI in breaking language barriers and making communication more accessible globally.",
        features: [
            "Real-time text translation with 95% accuracy",
            "Computer vision integration for image text recognition",
            "Support for 20+ languages including regional dialects",
            "Offline mode with cached translations",
            "Custom neural network training pipeline",
            "Voice-to-text translation capabilities"
        ],
        technologies: ["Python", "Kivy", "PyTorch", "OpenCV", "TensorFlow", "NumPy"],
        visual: `
            <div class="project-visual">
                <div class="project-visual-icon">🤖</div>
                <div class="project-visual-title">AI Translation</div>
                <div class="project-visual-subtitle">Neural Network Powered</div>
            </div>
        `
    },
    {
        title: "ALUMNET",
        description: "Comprehensive alumni networking platform designed to connect graduates, facilitate mentorship, and enable professional growth. Built with React and modern web technologies for seamless user experience. The platform serves as a bridge between alumni and current students, fostering a strong community network.",
        features: [
            "Real-time messaging and networking system",
            "Event management and RSVP functionality",
            "Professional profile management",
            "AI-powered mentorship matching algorithm",
            "Integrated job board and career opportunities",
            "Alumni directory with advanced search filters"
        ],
        technologies: ["React", "Context API", "JavaScript", "Node.js", "MongoDB", "Socket.io"],
        visual: `
            <div class="project-visual">
                <div class="project-visual-icon">🎓</div>
                <div class="project-visual-title">Alumni Network</div>
                <div class="project-visual-subtitle">Connect & Grow</div>
            </div>
        `
    },
    {
        title: "Revive Peace",
        description: "Mental health awareness platform promoting wellness and community support. Features interactive resources, guided meditation, and peer support networks to help individuals on their mental health journey. This project addresses the growing need for accessible mental health resources in our digital age.",
        features: [
            "Interactive mental health assessments",
            "Guided meditation and mindfulness exercises",
            "Anonymous peer support forums",
            "Comprehensive resource library with expert content",
            "Progress tracking and personalized wellness goals",
            "Crisis intervention and emergency resources"
        ],
        technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "Bootstrap"],
        visual: `
            <div class="project-visual">
                <div class="project-visual-icon">🧘</div>
                <div class="project-visual-title">Mental Wellness</div>
                <div class="project-visual-subtitle">Peace & Support</div>
            </div>
        `
    },
    {
        title: "Product Trust Analyzer",
        description: "AI-powered product review analysis tool that helps consumers make informed purchasing decisions. Analyzes sentiment, authenticity, and key product features from thousands of reviews. This tool combats fake reviews and provides genuine insights to help consumers shop with confidence.",
        features: [
            "Advanced sentiment analysis of product reviews",
            "Machine learning-based fake review detection",
            "Automated feature extraction and ranking",
            "Multi-platform price comparison engine",
            "Comprehensive trust score calculation",
            "Real-time market trend analysis"
        ],
        technologies: ["PHP", "JavaScript", "JSON", "Python", "NLP", "API Integration"],
        visual: `
            <div class="project-visual">
                <div class="project-visual-icon">📊</div>
                <div class="project-visual-title">Trust Analysis</div>
                <div class="project-visual-subtitle">Smart Shopping</div>
            </div>
        `
    }
];

// Initialize sticky scroll reveal when DOM is loaded
function initProjectsStickyScroll() {
    const container = document.getElementById('sticky-projects-container');
    if (container && window.StickyScrollReveal) {
        new StickyScrollReveal('sticky-projects-container', {
            content: projectsData,
            height: '35rem'
        });
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the projects page
    if (window.location.pathname.includes('projects.html') || document.body.classList.contains('page-projects')) {
        initProjectsStickyScroll();
    }
});