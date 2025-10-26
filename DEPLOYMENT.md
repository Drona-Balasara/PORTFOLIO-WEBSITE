# Deployment Guide

## Quick Deployment Options

### 1. GitHub Pages (Recommended)
```bash
# Push to GitHub
git add .
git commit -m "Deploy portfolio"
git push origin main

# Enable Pages in repository settings
# Site will be live at: https://username.github.io/repository-name
```

### 2. Netlify Drag & Drop
1. Zip the entire project folder
2. Go to [netlify.com](https://netlify.com)
3. Drag zip file to deploy area
4. Site goes live instantly with custom URL

### 3. Netlify Git Integration
1. Connect GitHub repository
2. Build settings: Leave empty
3. Publish directory: `/` (root)
4. Auto-deploy on git push

## File Checklist Before Deployment

### Required Files
- ✅ All HTML pages (index.html, about.html, etc.)
- ✅ CSS files (style.css, responsive.css, animations.css)
- ✅ JavaScript files (main.js, gsap-animations.js, etc.)
- ✅ Assets folder with images and icons
- ✅ README.md documentation

### Optional Files
- 📄 netlify.toml (for Netlify optimization)
- 📄 .github/workflows/deploy.yml (for GitHub Actions)
- 📄 robots.txt (for SEO)
- 📄 sitemap.xml (for search engines)

## Performance Verification

### Before Deployment
1. Test all pages locally
2. Verify responsive design on mobile
3. Check all animations work smoothly
4. Test form validation
5. Verify all links work

### After Deployment
1. Run Lighthouse audit (aim for 90+ scores)
2. Test on multiple devices and browsers
3. Verify HTTPS is working
4. Check loading speed
5. Test accessibility features

## Troubleshooting

### Common Issues
- **404 errors**: Check file paths are relative
- **HTTPS mixed content**: Ensure all resources use HTTPS
- **Slow loading**: Optimize images and check CDN links
- **Mobile issues**: Verify viewport meta tag

### Debug Steps
1. Check browser console for errors
2. Verify network tab for failed requests
3. Test with different browsers
4. Use mobile device testing tools