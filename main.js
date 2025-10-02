// js/main.js
class PortfolioGenerator {
    constructor() {
        this.currentStep = 1;
        this.selectedTemplate = '';
        this.skills = [];
        this.projects = [];
        this.profilePhoto = '';
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.addProject(); // Add initial project
    }

    bindEvents() {
        // Template selection
        document.querySelectorAll('.template-card').forEach(card => {
            card.addEventListener('click', (e) => this.selectTemplate(e));
        });

        // Skill input enter key
        document.getElementById('skillInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addSkill();
            }
        });

        // Photo upload
        document.getElementById('photo').addEventListener('change', (e) => this.previewImage(e.target));
    }

    selectTemplate(e) {
        const card = e.currentTarget;
        
        // Remove selection from all cards
        document.querySelectorAll('.template-card').forEach(c => c.classList.remove('selected'));
        
        // Select clicked card
        card.classList.add('selected');
        this.selectedTemplate = card.getAttribute('data-template');
        document.getElementById('template-next').disabled = false;
        
        // Add animation
        card.style.animation = 'pulse 0.3s ease';
        setTimeout(() => {
            card.style.animation = '';
        }, 300);
    }

    nextStep() {
        if (this.currentStep < 5) {
            // Validate current step
            if (this.currentStep === 2 && !this.validatePersonalInfo()) {
                return;
            }
            
            // Hide current step
            document.getElementById(`step${this.currentStep}`).classList.remove('active');
            document.querySelector(`.step-item[data-step="${this.currentStep}"]`).classList.add('completed');
            
            // Show next step
            this.currentStep++;
            document.getElementById(`step${this.currentStep}`).classList.add('active');
            document.querySelector(`.step-item[data-step="${this.currentStep}"]`).classList.add('active');
            
            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Show success message for completed step
            this.showStepCompleteMessage();
        }
    }

    prevStep() {
        if (this.currentStep > 1) {
            // Hide current step
            document.getElementById(`step${this.currentStep}`).classList.remove('active');
            document.querySelector(`.step-item[data-step="${this.currentStep}"]`).classList.remove('active');
            
            // Show previous step
            this.currentStep--;
            document.getElementById(`step${this.currentStep}`).classList.add('active');
            document.querySelector(`.step-item[data-step="${this.currentStep + 1}"]`).classList.remove('completed');
            
            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    validatePersonalInfo() {
        const name = document.getElementById('fullName').value.trim();
        const title = document.getElementById('title').value.trim();
        const about = document.getElementById('about').value.trim();
        
        if (!name || !title || !about) {
            this.showErrorMessage('Please fill in all required fields (Name, Title, and About Me)');
            return false;
        }
        return true;
    }

    showStepCompleteMessage() {
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.innerHTML = `
            <i class="fas fa-check-circle"></i>
            Step ${this.currentStep - 1} completed successfully!
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    showErrorMessage(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-message error';
        toast.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            ${message}
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 5000);
    }

    previewImage(input) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.profilePhoto = e.target.result;
                document.getElementById('photo-preview').innerHTML = 
                    `<img src="${e.target.result}" alt="Profile Preview" class="img-fluid rounded-circle">`;
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    addSkill() {
        const skillInput = document.getElementById('skillInput');
        const skillLevel = document.getElementById('skillLevel');
        
        if (skillInput.value.trim()) {
            const skill = {
                name: skillInput.value.trim(),
                level: skillLevel.value
            };
            
            // Check for duplicates
            if (this.skills.some(s => s.name.toLowerCase() === skill.name.toLowerCase())) {
                this.showErrorMessage('This skill already exists!');
                return;
            }
            
            this.skills.push(skill);
            this.updateSkillsDisplay();
            skillInput.value = '';
            skillInput.focus();
        }
    }

    updateSkillsDisplay() {
        const skillsList = document.getElementById('skillsList');
        skillsList.innerHTML = this.skills.map((skill, index) => 
            `<span class="skill-tag" data-index="${index}">
                ${skill.name} (${skill.level})
                <i class="fas fa-times" onclick="portfolioGen.removeSkill(${index})"></i>
            </span>`
        ).join('');
    }

    removeSkill(index) {
        this.skills.splice(index, 1);
        this.updateSkillsDisplay();
    }

    addProject() {
        const projectIndex = this.projects.length;
        const projectHtml = `
            <div class="project-card" id="project-${projectIndex}">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5 class="mb-0">Project ${projectIndex + 1}</h5>
                    <button class="btn btn-outline-danger btn-sm" onclick="portfolioGen.removeProject(${projectIndex})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Project Name *</label>
                        <input type="text" class="form-control" id="projectName-${projectIndex}" placeholder="My Awesome Project" required>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Technologies Used</label>
                        <input type="text" class="form-control" id="projectTech-${projectIndex}" placeholder="React, Node.js, MongoDB">
                    </div>
                    <div class="col-12 mb-3">
                        <label class="form-label">Description *</label>
                        <textarea class="form-control" id="projectDesc-${projectIndex}" rows="3" placeholder="Describe what this project does and your role in it..." required></textarea>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Live Demo URL</label>
                        <input type="url" class="form-control" id="projectLive-${projectIndex}" placeholder="https://yourproject.com">
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">Source Code URL</label>
                        <input type="url" class="form-control" id="projectSource-${projectIndex}" placeholder="https://github.com/yourusername/project">
                    </div>
                    <div class="col-12 mb-3">
                        <label class="form-label">Project Image (Optional)</label>
                        <input type="file" class="form-control" id="projectImage-${projectIndex}" accept="image/*" onchange="portfolioGen.previewProjectImage(${projectIndex}, this)">
                        <div id="projectImagePreview-${projectIndex}" class="mt-2"></div>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('projectsList').insertAdjacentHTML('beforeend', projectHtml);
        this.projects.push({});
        
        // Scroll to new project
        setTimeout(() => {
            document.getElementById(`project-${projectIndex}`).scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 100);
    }

    removeProject(index) {
        const projectElement = document.getElementById(`project-${index}`);
        if (projectElement) {
            projectElement.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                projectElement.remove();
                this.projects.splice(index, 1);
                this.reorderProjects();
            }, 300);
        }
    }

    reorderProjects() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            card.id = `project-${index}`;
            card.querySelector('h5').textContent = `Project ${index + 1}`;
            
            // Update all input IDs and onclick handlers
            card.querySelectorAll('input, textarea').forEach(input => {
                const oldId = input.id;
                const fieldName = oldId.split('-')[0];
                input.id = `${fieldName}-${index}`;
            });
            
            card.querySelector('.btn-outline-danger').onclick = () => this.removeProject(index);
        });
    }

    previewProjectImage(projectIndex, input) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById(`projectImagePreview-${projectIndex}`).innerHTML = 
                    `<img src="${e.target.result}" alt="Project Preview" style="max-width: 200px; max-height: 150px; object-fit: cover; border-radius: 8px;">`;
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    collectProjectData() {
        const projectData = [];
        this.projects.forEach((_, index) => {
            const nameElement = document.getElementById(`projectName-${index}`);
            const techElement = document.getElementById(`projectTech-${index}`);
            const descElement = document.getElementById(`projectDesc-${index}`);
            const liveElement = document.getElementById(`projectLive-${index}`);
            const sourceElement = document.getElementById(`projectSource-${index}`);
            const imageElement = document.getElementById(`projectImage-${index}`);
            
            if (nameElement && nameElement.value.trim()) {
                const project = {
                    name: nameElement.value.trim(),
                    tech: techElement ? techElement.value.trim() : '',
                    desc: descElement ? descElement.value.trim() : '',
                    live: liveElement ? liveElement.value.trim() : '',
                    source: sourceElement ? sourceElement.value.trim() : '',
                    image: imageElement && imageElement.files[0] ? 
                        URL.createObjectURL(imageElement.files[0]) : ''
                };
                projectData.push(project);
            }
        });
        return projectData;
    }

    collectPortfolioData() {
        const projectData = this.collectProjectData();
        
        return {
            template: this.selectedTemplate,
            name: document.getElementById('fullName').value.trim(),
            title: document.getElementById('title').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            location: document.getElementById('location').value.trim(),
            website: document.getElementById('website').value.trim(),
            about: document.getElementById('about').value.trim(),
            photo: this.profilePhoto,
            skills: this.skills,
            projects: projectData,
            linkedin: document.getElementById('linkedin').value.trim(),
            github: document.getElementById('github').value.trim(),
            twitter: document.getElementById('twitter').value.trim(),
            includeResume: document.getElementById('includeResume').checked,
            includeContact: document.getElementById('includeContact').checked,
            includeBlog: document.getElementById('includeBlog').checked
        };
    }

    previewPortfolio() {
        const portfolioData = this.collectPortfolioData();
        
        if (!this.validatePortfolioData(portfolioData)) {
            return;
        }
        
        const html = window.TemplateGenerator.generatePortfolioHTML(portfolioData);
        
        // Create blob URL for preview
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        document.getElementById('previewFrame').src = url;
        new bootstrap.Modal(document.getElementById('previewModal')).show();
    }

    validatePortfolioData(data) {
        if (!data.name || !data.title || !data.about) {
            this.showErrorMessage('Please fill in all required personal information');
            return false;
        }
        
        if (data.projects.length === 0) {
            this.showErrorMessage('Please add at least one project');
            return false;
        }
        
        return true;
    }

    async generatePortfolio() {
        const portfolioData = this.collectPortfolioData();
        
        if (!this.validatePortfolioData(portfolioData)) {
            return;
        }
        
        // Show loading state
        document.getElementById('generate-buttons').style.display = 'none';
        document.getElementById('loading').style.display = 'block';
        
        try {
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate processing time
            
            const zip = new JSZip();
            
            // Generate HTML
            const html = window.TemplateGenerator.generatePortfolioHTML(portfolioData);
            zip.file("index.html", html);
            
            // Generate CSS
            const css = window.TemplateGenerator.generateCSS(this.selectedTemplate);
            zip.file("assets/css/style.css", css);
            
            // Generate JavaScript
            const js = window.TemplateGenerator.generateJS();
            zip.file("assets/js/script.js", js);
            
            // Add README
            const readme = this.generateReadme(portfolioData);
            zip.file("README.md", readme);
            
            // Add additional assets if needed
            zip.file("assets/css/bootstrap.min.css", "/* Bootstrap CSS will be loaded from CDN */");
            zip.file("assets/js/bootstrap.bundle.min.js", "/* Bootstrap JS will be loaded from CDN */");
            
            // Generate and download zip
            const content = await zip.generateAsync({type:"blob"});
            this.downloadFile(content, `${portfolioData.name.replace(/\s+/g, '-').toLowerCase()}-portfolio.zip`);
            
            // Show success state
            document.getElementById('loading').style.display = 'none';
            document.getElementById('success').style.display = 'block';
            
            setTimeout(() => {
                document.getElementById('success').style.display = 'none';
                document.getElementById('generate-buttons').style.display = 'block';
            }, 3000);
            
        } catch (error) {
            console.error('Error generating portfolio:', error);
            this.showErrorMessage('An error occurred while generating your portfolio. Please try again.');
            
            document.getElementById('loading').style.display = 'none';
            document.getElementById('generate-buttons').style.display = 'block';
        }
    }

    generateReadme(data) {
        return `# ${data.name}'s Portfolio

This portfolio was generated using the Dynamic Portfolio Generator.

## About
${data.about}

## Features
- Responsive design that works on all devices
- Modern ${data.template} template
- Interactive animations and smooth scrolling
- Contact form${data.includeContact ? ' (enabled)' : ' (disabled)'}
- Skills showcase with ${data.skills.length} technologies
- ${data.projects.length} featured projects

## How to Deploy

### Option 1: Simple Web Hosting
1. Extract all files from the ZIP
2. Upload the contents to your web hosting provider
3. Your portfolio will be live!

### Option 2: GitHub Pages
1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to Settings → Pages
4. Select "Deploy from a branch" and choose "main"
5. Your portfolio will be available at https://yourusername.github.io/repository-name

### Option 3: Netlify (Recommended)
1. Go to [Netlify](https://www.netlify.com/)
2. Drag and drop the extracted folder onto their deploy interface
3. Your portfolio will be live instantly with a custom URL

### Option 4: Vercel
1. Go to [Vercel](https://vercel.com/)
2. Import your project from GitHub or upload directly
3. Deploy with one click

## Customization
- Edit \`index.html\` to modify content
- Customize colors and styles in \`assets/css/style.css\`
- Add functionality in \`assets/js/script.js\`

## Technologies Used
- HTML5, CSS3, JavaScript
- Bootstrap 5 for responsive design
- Font Awesome for icons
- AOS (Animate On Scroll) for animations

## Contact
- Email: ${data.email || 'Not provided'}
- Phone: ${data.phone || 'Not provided'}
- Location: ${data.location || 'Not provided'}
${data.linkedin ? `- LinkedIn: ${data.linkedin}` : ''}
${data.github ? `- GitHub: ${data.github}` : ''}
${data.twitter ? `- Twitter: ${data.twitter}` : ''}

---

Generated with ❤️ by Dynamic Portfolio Generator
`;
    }

    downloadFile(blob, filename) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    }
}

// Global functions for onclick handlers
function nextStep() {
    portfolioGen.nextStep();
}

function prevStep() {
    portfolioGen.prevStep();
}

function addSkill() {
    portfolioGen.addSkill();
}

function addProject() {
    portfolioGen.addProject();
}

function previewPortfolio() {
    portfolioGen.previewPortfolio();
}

function generatePortfolio() {
    portfolioGen.generatePortfolio();
}

function previewImage(input) {
    portfolioGen.previewImage(input);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.portfolioGen = new PortfolioGenerator();
});

// Add toast message styles dynamically
const toastStyles = `
<style>
.toast-message {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--success-color);
    color: white;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 10000;
    animation: slideInRight 0.3s ease;
    max-width: 300px;
}

.toast-message.error {
    background: var(--danger-color);
}

.toast-message i {
    margin-right: 8px;
}

@keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(-100%); opacity: 0; }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', toastStyles);