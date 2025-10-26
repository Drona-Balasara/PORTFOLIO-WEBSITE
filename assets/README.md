# Assets Directory Structure

This directory contains all the static assets for the portfolio website.

## Directory Structure

```
assets/
├── images/
│   ├── profile/
│   │   ├── profile-photo.jpg          # Main profile photo (400x400px)
│   │   ├── profile-photo@2x.jpg       # High-res profile photo (800x800px)
│   │   └── profile-background.jpg     # Background image for about section
│   ├── projects/
│   │   ├── hybrid-ai-translator.jpg   # Project screenshot (600x400px)
│   │   ├── alumnet.jpg                # Project screenshot (600x400px)
│   │   ├── revive-peace.jpg           # Project screenshot (600x400px)
│   │   └── product-trust-analyzer.jpg # Project screenshot (600x400px)
│   ├── certificates/
│   │   ├── python-framework.jpg       # Certificate image (800x600px)
│   │   ├── video-editing.jpg          # Certificate image (800x600px)
│   │   ├── ai-tools.jpg               # Certificate image (800x600px)
│   │   ├── ieee-embs.jpg              # Certificate image (800x600px)
│   │   └── it-fair.jpg                # Certificate image (800x600px)
│   └── backgrounds/
│       ├── hero-bg.jpg                # Hero section background
│       ├── section-bg.jpg             # Section backgrounds
│       └── pattern-overlay.png        # Decorative patterns
├── icons/
│   ├── social/
│   │   ├── github.svg                 # GitHub icon
│   │   ├── linkedin.svg               # LinkedIn icon
│   │   ├── twitter.svg                # Twitter icon
│   │   └── instagram.svg              # Instagram icon
│   ├── tech/
│   │   ├── html5.svg                  # HTML5 icon
│   │   ├── css3.svg                   # CSS3 icon
│   │   ├── javascript.svg             # JavaScript icon
│   │   ├── react.svg                  # React icon
│   │   ├── python.svg                 # Python icon
│   │   ├── nodejs.svg                 # Node.js icon
│   │   └── git.svg                    # Git icon
│   └── ui/
│       ├── email.svg                  # Email icon
│       ├── phone.svg                  # Phone icon
│       ├── location.svg               # Location icon
│       └── download.svg               # Download icon
├── documents/
│   └── resume.pdf                     # Resume/CV file
└── fonts/
    └── custom/                        # Custom fonts (if any)
```

## Image Specifications

### Profile Images
- **Format**: JPG/PNG
- **Size**: 400x400px (1x), 800x800px (2x for retina)
- **Quality**: High quality, optimized for web
- **Background**: Transparent or solid color

### Project Screenshots
- **Format**: JPG/PNG
- **Size**: 600x400px (3:2 aspect ratio)
- **Quality**: High quality showing project interface
- **Content**: Clear view of project features

### Certificate Images
- **Format**: JPG/PNG
- **Size**: 800x600px (4:3 aspect ratio)
- **Quality**: High resolution, readable text
- **Content**: Full certificate with clear text

### Icons
- **Format**: SVG (preferred) or PNG
- **Size**: Scalable (SVG) or 24x24px, 48x48px (PNG)
- **Style**: Consistent with design theme
- **Color**: Monochrome or brand colors

## Optimization Guidelines

1. **Image Compression**
   - Use tools like TinyPNG or ImageOptim
   - Target file sizes: <100KB for photos, <50KB for graphics
   - Maintain visual quality while reducing file size

2. **Responsive Images**
   - Provide multiple sizes for different screen densities
   - Use WebP format where supported (with fallbacks)
   - Implement lazy loading for better performance

3. **SVG Icons**
   - Optimize SVG files to remove unnecessary metadata
   - Use consistent viewBox dimensions
   - Ensure accessibility with proper titles and descriptions

4. **File Naming**
   - Use descriptive, lowercase names
   - Separate words with hyphens
   - Include size indicators (@2x, @3x) for retina images

## Content Guidelines

### Profile Photo
- Professional appearance
- Good lighting and composition
- Neutral or branded background
- High resolution and sharp focus

### Project Screenshots
- Show key features and interface
- Use actual project content (not placeholder)
- Consistent styling across all screenshots
- Include mobile views if applicable

### Certificates
- Scan or export at high resolution
- Ensure all text is readable
- Include official seals/signatures
- Crop to remove unnecessary whitespace

## Accessibility

- Provide meaningful alt text for all images
- Ensure sufficient color contrast in graphics
- Use descriptive file names
- Include text alternatives for important visual information

## Performance

- Optimize all images for web delivery
- Use appropriate formats (JPEG for photos, PNG for graphics, SVG for icons)
- Implement lazy loading for images below the fold
- Consider using a CDN for faster delivery

## Legal Considerations

- Ensure you have rights to use all images
- Credit sources where required
- Respect copyright and licensing terms
- Use royalty-free or properly licensed content