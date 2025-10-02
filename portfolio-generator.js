// js/portfolio-generator.js
// This module handles the portfolio generation and file packaging
class PortfolioPackager {
    constructor() {
        this.zip = null;
    }

    async createPackage(portfolioData) {
        this.zip = new JSZip();
        
        // Create folder structure
        const assetsFolder = this.zip.folder("assets");
        const cssFolder = assetsFolder.folder("css");
        const jsFolder = assetsFolder.folder("js");
        const imagesFolder = assetsFolder.folder("images");
        
        // Generate and add files
        await this.addHTMLFile(portfolioData);
        await this.addCSSFiles(portfolioData, cssFolder);
        await this.addJSFiles(jsFolder);
        await this.addImageFiles(portfolioData, imagesFolder);
        await this.addDocumentation(portfolioData);
        
        return this.zip;
    }

    async addHTMLFile(data) {
        const html = window.TemplateGenerator.generatePortfolioHTML(data);
        this.zip.file("index.html", html);
    }

    async addCSSFiles(data, cssFolder) {
        const mainCSS = window.TemplateGenerator.generateCSS(data.template);
        cssFolder.file("style.css", mainCSS);
        
        // Add responsive CSS
        const responsiveCSS = this.generateResponsiveCSS();
        cssFolder.file("responsive.css", responsiveCSS);
    }

    async addJSFiles(jsFolder) {
        const mainJS = window.TemplateGenerator.generateJS();
        jsFolder.file("script.js", mainJS);
        
        // Add utility JS
        const utilsJS = this.generateUtilsJS();
        jsFolder.file("utils.js", utilsJS);
    }

    async addImageFiles(data, imagesFolder) {
        // Add profile photo if available
        if (data.photo) {
            const photoBlob = await this.dataURLToBlob(data.photo);
            imagesFolder.file("profile.jpg", photoBlob, { binary: true });
        }
        
        // Add project images if available
        for (let i = 0; i < data.projects.length; i++) {
            const project = data.projects[i];
            if (project.image) {
                try {
                    const projectBlob = await this.dataURLToBlob(project.image);
                    imagesFolder.file(`project-${i + 1}.jpg`, projectBlob, { binary: true });
                } catch (error) {
                    console.warn(`Could not add image for project ${i + 1}:`, error);
                }
            }
        }
    }

    async addDocumentation(data) {
        const readme = this.generateReadme(data);
        this.zip.file("README.md", readme);
        
        const deployGuide = this.generateDeployGuide();
        this.zip.file("DEPLOY.md", deployGuide);
        
        const license = this.generateLicense(data);
        this.zip.file("LICENSE", license);
        
        const gitignore = this.generateGitignore();
        this.zip.file(".gitignore", gitignore);
    }

    async dataURLToBlob(dataURL) {
        const response = await fetch(dataURL);
        return await response.blob();
    }

    generateResponsiveCSS() {
        return `
/* Responsive Enhancements */

/* Extra Small Devices (Phones, less than 576px) */
@media (max-width: 575.98px) {
    .hero-title {
        font-size: 1.8rem;
    }
    
    .hero-subtitle {
        font-size: 1.1rem;
    }
    
    .hero-buttons .btn {
        display: block;
        width: 100%;
        margin: 0 0 10px 0 !important;
    }
    
    .skill-item {
        font-size: 0.85rem;
        padding: 8px 16px;
    }
    
    .project-card {
        margin-bottom: 1.5rem;
    }
}

/* Small Devices (Landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
    .hero-title {
        font-size: 2.2rem;
    }
    
    .container {
        max-width: 540px;
    }
}

/* Medium Devices (Tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
    .hero-title {
        font-size: 2.8rem;
    }
    
    .section-padding {
        padding: 70px 0;
    }
}

/* Large Devices (Desktops, 992px and up) */
@media (min-width: 992px) {
    .hero-content {
        padding-right: 2rem;
    }
}

/* Extra Large Devices (Large desktops, 1200px and up) */
@media (min-width: 1200px) {
    .container {
        max-width: 1140px;
    }
}

/* Print Styles */
@media print {
    .navbar,
    .back-to-top,
    .scroll-indicator {
        display: none;
    }
    
    body {
        background: white;
        color: black;
    }
    
    .hero-section {
        background: white;
        color: black;
        page-break-after: always;
    }
    
    .section-padding {
        padding: 30px 0;
    }
}

/* High Resolution Displays */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .hero-photo,
    .project-image img {
        image-rendering: -webkit-optimize-contrast;
    }
}

/* Landscape Orientation */
@media (orientation: landscape) and (max-height: 500px) {
    .hero-section {
        min-height: auto;
        padding: 100px 0 50px;
    }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
    /* Add dark mode styles here if needed */
}
`;
    }

    generateUtilsJS() {
        return `
// Utility Functions

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Phone validation
function validatePhone(phone) {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return re.test(String(phone));
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Get scroll position
function getScrollPosition() {
    return {
        x: window.pageXOffset || document.documentElement.scrollLeft,
        y: window.pageYOffset || document.documentElement.scrollTop
    };
}

// Smooth scroll to element
function scrollToElement(selector, offset = 70) {
    const element = document.querySelector(selector);
    if (element) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
            top: elementPosition - offset,
            behavior: 'smooth'
        });
    }
}

// Check if element is in viewport
function isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 - offset &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Copy to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        return navigator.clipboard.writeText(text);
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return Promise.resolve();
        } catch (err) {
            document.body.removeChild(textArea);
            return Promise.reject(err);
        }
    }
}

// Local storage helper
const storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            return false;
        }
    },
    
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return defaultValue;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    },
    
    clear: () => {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Error clearing localStorage:', error);
            return false;
        }
    }
};

// Format date
function formatDate(date, format = 'YYYY-MM-DD') {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    
    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day);
}

// Export utilities
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateEmail,
        validatePhone,
        debounce,
        throttle,
        getScrollPosition,
        scrollToElement,
        isInViewport,
        copyToClipboard,
        storage,
        formatDate
    };
}
`;
    }

    generateReadme(data) {
        return `# ${data.name}'s Portfolio

Welcome to my personal portfolio website! This site showcases my skills, projects, and professional experience.

## 📋 Table of Contents
- [About](#about)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Customization](#customization)
- [Contact](#contact)
- [License](#license)

## 👨‍💻 About

${data.about}

**Template Used:** ${data.template.charAt(0).toUpperCase() + data.template.slice(1)}

## ✨ Features

- 📱 Fully responsive design
- 🎨 Modern ${data.template} template
- ⚡ Fast loading and optimized performance
- 🎭 Smooth animations and transitions
- 📧 Working contact form${data.includeContact ? '' : ' (disabled)'}
- 🌐 SEO optimized
- ♿ Accessible (WCAG compliant)
- 🔍 Cross-browser compatible

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox and Grid
- **JavaScript (ES6+)** - Interactive functionality
- **Bootstrap 5** - Responsive framework
- **Font Awesome** - Icon library
- **AOS (Animate On Scroll)** - Scroll animations

### Skills Showcased
${data.skills.map(skill => `- ${skill.name} (${skill.level})`).join('\n')}

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A text editor (VS Code, Sublime Text, etc.) for customization

### Installation

1. Extract the ZIP file to your desired location
2. Open \`index.html\` in your web browser
3. That's it! Your portfolio is ready to view

## 📦 Deployment

See [DEPLOY.md](DEPLOY.md) for detailed deployment instructions for various platforms:

- GitHub Pages
- Netlify
- Vercel
- Traditional Web Hosting

## 🎨 Customization

### Changing Colors

Edit \`assets/css/style.css\` and modify the CSS variables:

\`\`\`css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
}
\`\`\`

### Adding More Sections

1. Add a new section in \`index.html\`:

\`\`\`html
<section id="new-section" class="section-padding">
    <!-- Your content here -->
</section>
\`\`\`

2. Add a navigation link:

\`\`\`html
<li class="nav-item">
    <a class="nav-link" href="#new-section">New Section</a>
</li>
\`\`\`

### Updating Content

- **Personal Info**: Edit the hero section in \`index.html\`
- **Skills**: Update the skills section
- **Projects**: Modify the projects section
- **Images**: Replace files in \`assets/images/\`

## 📂 Project Structure

\`\`\`
portfolio/
├── index.html              # Main HTML file
├── README.md              # This file
├── DEPLOY.md              # Deployment guide
├── LICENSE                # License information
├── .gitignore            # Git ignore file
└── assets/
    ├── css/
    │   ├── style.css     # Main stylesheet
    │   └── responsive.css # Responsive styles
    ├── js/
    │   ├── script.js     # Main JavaScript
    │   └── utils.js      # Utility functions
    └── images/
        ├── profile.jpg    # Profile photo
        └── project-*.jpg  # Project images
\`\`\`

## 📧 Contact

- **Email:** ${data.email || 'Not provided'}
- **Phone:** ${data.phone || 'Not provided'}
- **Location:** ${data.location || 'Not provided'}
${data.linkedin ? `- **LinkedIn:** ${data.linkedin}` : ''}
${data.github ? `- **GitHub:** ${data.github}` : ''}
${data.twitter ? `- **Twitter:** ${data.twitter}` : ''}

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Portfolio generated with [Dynamic Portfolio Generator](https://github.com)
- Icons provided by [Font Awesome](https://fontawesome.com/)
- Animations powered by [AOS](https://michalsnik.github.io/aos/)
- Framework by [Bootstrap](https://getbootstrap.com/)

---

**Made with ❤️ by ${data.name}**

*Last Updated: ${new Date().toLocaleDateString()}*
`;
    }

    generateDeployGuide() {
        return `# Deployment Guide 🚀

This guide will help you deploy your portfolio to various hosting platforms.

## Quick Links
- [GitHub Pages](#github-pages)
- [Netlify](#netlify)
- [Vercel](#vercel)
- [Traditional Hosting](#traditional-hosting)

---

## GitHub Pages

### Method 1: Using GitHub Desktop (Easiest)

1. Install [GitHub Desktop](https://desktop.github.com/)
2. Create a new repository:
   - Name it: \`your-username.github.io\`
   - Make it public
3. Add your portfolio files to the repository
4. Commit and push to GitHub
5. Visit: \`https://your-username.github.io\`

### Method 2: Using Git Command Line

\`\`\`bash
# Initialize git repository
git init

# Add files
git add .

# Commit
git commit -m "Initial commit"

# Add remote
git remote add origin https://github.com/your-username/your-username.github.io.git

# Push to GitHub
git branch -M main
git push -u origin main
\`\`\`

6. Go to repository Settings → Pages
7. Select "Deploy from a branch"
8. Choose "main" branch
9. Click Save
10. Your site will be live at \`https://your-username.github.io\`

### Custom Domain

1. Purchase a domain from a registrar (GoDaddy, Namecheap, etc.)
2. In your GitHub repository, add a file named \`CNAME\` with your domain
3. Configure DNS records at your registrar:
   - Type: A Record
   - Host: @
   - Value: 185.199.108.153
   - Add additional A records for:
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153

---

## Netlify

### Method 1: Drag and Drop (Easiest)

1. Go to [Netlify](https://www.netlify.com/)
2. Sign up for a free account
3. Click "Add new site" → "Deploy manually"
4. Drag your portfolio folder onto the upload area
5. Your site will be live instantly with a random URL
6. Optional: Click "Domain settings" to customize your URL

### Method 2: GitHub Integration

1. Push your code to GitHub
2. Go to [Netlify](https://www.netlify.com/)
3. Click "Add new site" → "Import from Git"
4. Connect your GitHub account
5. Select your repository
6. Configure build settings (leave default for static sites):
   - Build command: (leave empty)
   - Publish directory: \`/\`
7. Click "Deploy site"
8. Your site will auto-deploy on every GitHub push

### Custom Domain on Netlify

1. Go to Site settings → Domain management
2. Click "Add custom domain"
3. Follow the DNS configuration instructions

---

## Vercel

### Deployment Steps

1. Go to [Vercel](https://vercel.com/)
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Configure:
   - Framework Preset: Other
   - Root Directory: ./
   - Build Command: (leave empty)
   - Output Directory: (leave empty)
6. Click "Deploy"
7. Your site will be live with auto-deployments

### Custom Domain on Vercel

1. Go to project Settings → Domains
2. Add your custom domain
3. Configure DNS as instructed

---

## Traditional Web Hosting

### Using cPanel (Most Common)

1. Log in to your cPanel
2. Go to "File Manager"
3. Navigate to \`public_html\` directory
4. Click "Upload"
5. Select all your portfolio files
6. Upload the files
7. Your site will be live at your domain

### Using FTP

1. Download an FTP client ([FileZilla](https://filezilla-project.org/))
2. Get FTP credentials from your hosting provider
3. Connect to your server
4. Navigate to \`public_html\` or \`www\` directory
5. Upload all portfolio files
6. Your site is now live

---

## Performance Optimization

### Before Deploying

1. **Optimize Images**
   - Use tools like [TinyPNG](https://tinypng.com/)
   - Compress images to reduce file size
   - Recommended max size: 500KB per image

2. **Minify Code** (Optional)
   - Use online minifiers for CSS/JS
   - This reduces file sizes for faster loading

3. **Enable Caching**
   - Add this to your \`.htaccess\` file:

\`\`\`apache
# Enable browser caching
<IfModule mod_expires.c>
ExpiresActive On
ExpiresByType image/jpg "access plus 1 year"
ExpiresByType image/jpeg "access plus 1 year"
ExpiresByType image/gif "access plus 1 year"
ExpiresByType image/png "access plus 1 year"
ExpiresByType text/css "access plus 1 month"
ExpiresByType application/javascript "access plus 1 month"
</IfModule>
\`\`\`

---

## SSL/HTTPS Setup

### GitHub Pages
- Free HTTPS is automatic

### Netlify
- Free HTTPS is automatic

### Vercel
- Free HTTPS is automatic

### Traditional Hosting
1. Purchase SSL certificate or use free Let's Encrypt
2. Install through cPanel or contact hosting support
3. Force HTTPS by adding to \`.htaccess\`:

\`\`\`apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST%}/$1 [R=301,L]
\`\`\`

---

## Testing Your Deployment

After deployment, test your site:

1. ✅ All pages load correctly
2. ✅ Images display properly
3. ✅ Navigation works smoothly
4. ✅ Forms submit (if applicable)
5. ✅ Mobile responsiveness
6. ✅ Different browsers (Chrome, Firefox, Safari, Edge)
7. ✅ Page speed (use [PageSpeed Insights](https://pagespeed.web.dev/))

---

## Troubleshooting

### Common Issues

**Problem:** Images not loading
- **Solution:** Check image paths are relative (no leading \`/\`)

**Problem:** 404 Error
- **Solution:** Ensure \`index.html\` is in the root directory

**Problem:** Styles not applying
- **Solution:** Check CSS file path in \`index.html\`

**Problem:** Site not updating
- **Solution:** Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)

---

## Need Help?

- 📧 Contact your hosting provider
- 💬 Check platform-specific documentation
- 🔍 Search for solutions on Stack Overflow
- 📚 Refer to the README.md file

---

**Good luck with your deployment! 🎉**
`;
    }

    generateLicense(data) {
        return `MIT License

Copyright (c) ${new Date().getFullYear()} ${data.name}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;
    }

    generateGitignore() {
        return `# Operating System Files
.DS_Store
Thumbs.db
desktop.ini

# IDE Files
.vscode/
.idea/
*.swp
*.swo
*~

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Dependency directories
node_modules/
bower_components/

# Build outputs
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Temporary files
*.tmp
*.temp
`;
    }
}

// Make PortfolioPackager available globally
window.PortfolioPackager = PortfolioPackager;