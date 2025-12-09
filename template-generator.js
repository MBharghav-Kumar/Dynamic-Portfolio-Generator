// template-generator.js
class TemplateGenerator {
    static generatePortfolioHTML(data) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.name} - ${data.title}</title>
    <meta name="description" content="${data.about.substring(0, 160)}">
    <meta name="keywords" content="${data.skills.map(s => s.name).join(', ')}, portfolio, ${data.title}">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="${data.name} - ${data.title}">
    <meta property="og:description" content="${data.about.substring(0, 160)}">
    <meta property="og:type" content="website">
    
    <!-- External Libraries -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css" rel="stylesheet">
    
    <!-- Custom Styles -->
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body data-bs-spy="scroll" data-bs-target="#navbar" data-bs-offset="70">
    
    <!-- Navigation -->
    <nav id="navbar" class="navbar navbar-expand-lg navbar-dark fixed-top">
        <div class="container">
            <a class="navbar-brand fw-bold" href="#home">
                ${data.name}
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#home">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#about">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#skills">Skills</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#projects">Projects</a>
                    </li>
                    ${data.includeContact ? '<li class="nav-item"><a class="nav-link" href="#contact">Contact</a></li>' : ''}
                </ul>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero-section d-flex align-items-center min-vh-100">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6" data-aos="fade-right">
                    <div class="hero-content">
                        <h1 class="hero-title">
                            Hello, I'm <span class="text-primary">${data.name}</span>
                        </h1>
                        <h2 class="hero-subtitle">${data.title}</h2>
                        
                        
                        <div class="hero-buttons mt-4">
                            <a href="#projects" class="btn btn-primary btn-lg me-3">
                                <i class="fas fa-eye me-2"></i>View My Work
                            </a>
                            ${data.includeContact ? 
                                '<a href="#contact" class="btn btn-outline-light btn-lg"><i class="fas fa-envelope me-2"></i>Get In Touch</a>' : 
                                (data.email ? `<a href="mailto:${data.email}" class="btn btn-outline-light btn-lg"><i class="fas fa-envelope me-2"></i>Email Me</a>` : '')
                            }
                        </div>
                        
                        ${this.generateSocialLinks(data)}
                    </div>
                </div>
                <div class="col-lg-6" data-aos="fade-left" data-aos-delay="200">
                    ${data.photo ? 
                        `<div class="hero-image text-center">
                            <img src="${data.photo}" alt="${data.name}" class="img-fluid hero-photo">
                        </div>` : 
                        `<div class="hero-placeholder">
                            <i class="fas fa-user-circle"></i>
                        </div>`
                    }
                </div>
            </div>
        </div>
        
        <!-- Scroll indicator -->
        <div class="scroll-indicator">
            <a href="#about" class="scroll-link">
                <i class="fas fa-chevron-down"></i>
            </a>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="section-padding">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center mb-5" data-aos="fade-up">
                    <h2 class="section-title">About Me</h2>
                    <div class="section-divider"></div>
                </div>
            </div>
            <div class="row align-items-center">
                <div class="col-lg-8 mx-auto" data-aos="fade-up" data-aos-delay="200">
                    <div class="about-content">
                        <p class="about-text">${data.about}</p>
                        
                        <div class="row mt-4 justify-content-center">
                            ${data.email ? `
                                <div class="col-md-6 mb-3">
                                    <div class="info-item">
                                        <i class="fas fa-envelope text-primary"></i>
                                        <div>
                                         <strong>Email:</strong> 
                                         <a href="mailto:${data.email}">${data.email}</a>
                                        </div>
                                    </div>
                                </div>
                            ` : ''}
                            
                            ${data.phone ? `
                                <div class="col-md-6 mb-3">
                                    <div class="info-item">
                                        <i class="fas fa-phone text-primary"></i>
                                        <div>
                                           <strong>Phone:</strong> 
                                           <a href="tel:${data.phone}">${data.phone}</a>
                                        </div>
                                    </div>
                                </div>
                            ` : ''}
                            
                            ${data.location ? `
                                <div class="col-md-6 mb-3">
                                    <div class="info-item">
                                        <i class="fas fa-map-marker-alt text-primary"></i>
                                        <div>
                                          <strong>Location:</strong> ${data.location}
                                        </div>
                                    </div>
                                </div>
                            ` : ''}
                            
                            ${data.website ? `
                                <div class="col-md-6 mb-3">
                                    <div class="info-item">
                                        <i class="fas fa-globe text-primary"></i>
                                        <div>
                                          <strong>Website:</strong> 
                                          <a href="${data.website}" target="_blank">${data.website}</a>
                                        </div>
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                        
                        ${data.includeResume ? `
                            <div class="text-center mt-4">
                                <a href="#" class="btn btn-outline-primary">
                                    <i class="fas fa-download me-2"></i>Download Resume
                                </a>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="section-padding bg-light">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center mb-5" data-aos="fade-up">
                    <h2 class="section-title">Skills & Technologies</h2>
                    <div class="section-divider"></div>
                    <p class="section-subtitle">Technologies I work with</p>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-10 mx-auto" data-aos="fade-up" data-aos-delay="200">
                    <div class="skills-container">
                        ${data.skills.map((skill, index) => `
                            <div class="skill-item" data-aos="zoom-in" data-aos-delay="${(index + 1) * 100}">
                                <span class="skill-name">${skill.name}</span>
                                <span class="skill-level">${skill.level}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="section-padding">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center mb-5" data-aos="fade-up">
                    <h2 class="section-title">Featured Projects</h2>
                    <div class="section-divider"></div>
                    <p class="section-subtitle">Here are some of my recent works</p>
                </div>
            </div>
            <div class="row">
                ${data.projects.map((project, index) => `
                    <div class="col-lg-4 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="${(index + 1) * 100}">
                        <div class="project-card h-100">
                            ${project.image ? 
                                `<div class="project-image">
                                    <img src="${project.image}" alt="${project.name}" class="img-fluid">
                                    <div class="project-overlay">
                                        <div class="project-links">
                                            ${project.live ? 
                                                `<a href="${project.live}" target="_blank" class="btn btn-light btn-sm me-2">
                                                    <i class="fas fa-external-link-alt"></i>
                                                </a>` : ''
                                            }
                                            ${project.source ? 
                                                `<a href="${project.source}" target="_blank" class="btn btn-light btn-sm">
                                                    <i class="fab fa-github"></i>
                                                </a>` : ''
                                            }
                                        </div>
                                    </div>
                                </div>` : 
                                `<div class="project-placeholder">
                                    <i class="fas fa-code"></i>
                                </div>`
                            }
                            
                            <div class="project-content">
                                <h5 class="project-title">${project.name}</h5>
                                ${project.tech ? `<p class="project-tech">${project.tech}</p>` : ''}
                                <p class="project-description">${project.desc}</p>
                                
                                <div class="project-actions">
                                    ${project.live ? 
                                        `<a href="${project.live}" target="_blank" class="btn btn-primary btn-sm me-2">
                                            <i class="fas fa-eye me-1"></i>Live Demo
                                        </a>` : ''
                                    }
                                    ${project.source ? 
                                        `<a href="${project.source}" target="_blank" class="btn btn-outline-primary btn-sm">
                                            <i class="fab fa-github me-1"></i>Code
                                        </a>` : ''
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>

    ${data.includeContact ? this.generateContactSection(data) : ''}

    <!-- Footer -->
    <footer class="footer bg-dark text-white py-4">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-md-6">
                    <p class="mb-0">&copy; ${new Date().getFullYear()} ${data.name}. All rights reserved.</p>
                </div>
                <div class="col-md-6">
                    ${this.generateSocialLinks(data, 'footer')}
                </div>
            </div>
        </div>
    </footer>

    <!-- Back to Top Button -->
    <button id="backToTop" class="back-to-top" aria-label="Back to top">
        <i class="fas fa-chevron-up"></i>
    </button>

    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
    <script src="assets/js/script.js"></script>
</body>
</html>`;
    }

    static generateSocialLinks(data, context = 'hero') {
        const links = [];
        if (data.linkedin) links.push(`<a href="${data.linkedin}" target="_blank" aria-label="LinkedIn"><i class="fab fa-linkedin"></i></a>`);
        if (data.github) links.push(`<a href="${data.github}" target="_blank" aria-label="GitHub"><i class="fab fa-github"></i></a>`);
        if (data.twitter) links.push(`<a href="${data.twitter}" target="_blank" aria-label="Twitter"><i class="fab fa-twitter"></i></a>`);

        if (links.length === 0) return '';

        const className = context === 'footer' ? 'footer-social text-end' : 'social-links mt-4';
        return `<div class="${className}">${links.join('')}</div>`;
    }

    static generateContactSection(data) {
        return `
    <!-- Contact Section -->
    <section id="contact" class="section-padding bg-dark text-white">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center mb-5" data-aos="fade-up">
                    <h2 class="section-title text-white">Get In Touch</h2>
                    <div class="section-divider"></div>
                    <p class="section-subtitle">Feel free to reach out for collaborations or just a friendly hello!</p>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-8 mx-auto" data-aos="fade-up" data-aos-delay="200">
                    <form class="contact-form" id="contactForm">
                        <div class="row">
                            <div class="col-md-6 mb-3">
                                <label for="contactName" class="form-label">Your Name</label>
                                <input type="text" class="form-control" id="contactName" name="name" required>
                            </div>
                            <div class="col-md-6 mb-3">
                                <label for="contactEmail" class="form-label">Your Email</label>
                                <input type="email" class="form-control" id="contactEmail" name="email" required>
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="contactSubject" class="form-label">Subject</label>
                            <input type="text" class="form-control" id="contactSubject" name="subject" required>
                        </div>
                        <div class="mb-3">
                            <label for="contactMessage" class="form-label">Message</label>
                            <textarea class="form-control" id="contactMessage" name="message" rows="5" required></textarea>
                        </div>
                        <div class="text-center">
                            <button type="submit" class="btn btn-primary btn-lg">
                                <i class="fas fa-paper-plane me-2"></i>Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>`;
    }

    static generateCSS(template) {
        const baseCSS = `
/* Base Styles */
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
    --dark-color: #2c3e50;
    --light-color: #ecf0f1;
    --text-color: #333;
    --text-light: #666;
    --text-white: #ffffff;
    --bg-light: #f8f9fa;
    --bg-dark: #212529;
    --border-color: #dee2e6;
    --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 30px rgba(0, 0, 0, 0.15);
    --transition: all 0.3s ease;
    --border-radius: 8px;
    --border-radius-lg: 15px;
}


#about {
  padding-top: 40px;
  padding-bottom : 80px;
  background: #f5f5f5;
  color: #222;
  min-height: 100vh;
  display : flex;
  flex-direction: column;
  justify-content : center;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: var(--text-color);
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
}

section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 0;
  position: relative;
  z-index: 1;
  scroll-margin-top: 80px;
}

.section-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: var(--dark-color);
    position: relative;
}

.section-subtitle {
    font-size: 1.1rem;
    color: var(--text-light);
    max-width: 600px;
    margin: 0 auto;
    position: relative;
}

.section-divider {
    width: 80px;
    height: 4px;
    background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
    margin: 0 auto 2rem;
    border-radius: 2px;
}

/* Utilities */
.section-padding {
    padding: 100px 80px;
    min-height: 170vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

/* Navigation */
.navbar {
    background: rgba(0, 0, 0, 0.9) !important;
    backdrop-filter: blur(10px);
    transition: var(--transition);
    padding: 1rem 0;
    z-index: 100;
}

.navbar.scrolled {
    background: rgba(0, 0, 0, 0.95) !important;
    box-shadow: var(--shadow);
}

.navbar-brand {
    font-size: 1.5rem;
    font-weight: 700;
}

.nav-link {
    font-weight: 500;
    color: rgba(255, 255, 255, 0.8) !important;
    transition: var(--transition);
    position: relative;
}

.nav-link:hover,
.nav-link.active {
    color: var(--primary-color) !important;
}

.nav-link::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 50%;
    background: var(--primary-color);
    transition: var(--transition);
}

.nav-link:hover::after,
.nav-link.active::after {
    width: 100%;
    left: 0;
}

/* Hero Section */
.hero-section {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: var(--text-white);
    position: relative;
    overflow: hidden;
    min-height: 80vh;
    display: flex;
    align-items: center;
}

.hero-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 1;
}

.hero-section .container {
    position: relative;
    z-index: 2;
}

.hero-title {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    animation: fadeInUp 1s ease;
}

.hero-subtitle {
    font-size: 1.8rem;
    font-weight: 300;
    margin-bottom: 1.5rem;
    animation: fadeInUp 1s ease 0.2s both;
}

.hero-description {
    font-size: 1.2rem;
    line-height: 1.7;
    margin-bottom: 2rem;
    animation: fadeInUp 1s ease 0.4s both;
    opacity: 0.9;
}

.hero-buttons {
    animation: fadeInUp 1s ease 0.6s both;
}

.hero-photo {
    max-width: 350px;
    width: 100%;
    height: 350px;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    animation: fadeInUp 1s ease 0.8s both;
    border: 5px solid rgba(255, 255, 255, 0.1);
}

.hero-placeholder {
    text-align: center;
    color: rgba(255, 255, 255, 0.3);
    animation: fadeInUp 1s ease 0.8s both;
}

.hero-placeholder i {
    font-size: 15rem;
}

.social-links {
    display: flex;
    gap: 1rem;
}

.social-links a,
.footer-social a {
    display: inline-flex;
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: var(--text-white);
    text-decoration: none;
    transition: var(--transition);
}

.social-links a:hover,
.footer-social a:hover {
    background: var(--primary-color);
    transform: translateY(-3px);
    box-shadow: var(--shadow);
}

.footer-social {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
}

.scroll-indicator {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
}

.scroll-link {
    display: inline-block;
    color: var(--text-white);
    font-size: 1.5rem;
    animation: bounce 2s infinite;
    text-decoration: none;
}

.about-content {
    text-align: center;
    width: 100%;
}

.about-text {
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--text-light);
    margin-bottom: 2rem;
    text-align: center;
}

.info-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 0.75rem;
    background: rgba(102, 126, 234, 0.05);
    border-radius: 8px;
    transition: var(--transition);
    text-align: left;
}

.info-item:hover {
    background: rgba(102, 126, 234, 0.1);
    transform: translateX(5px);
}

.info-item i {
    font-size: 1.2rem;
    min-width: 24px;
    margin-top: 2px;
}

.info-item div {
    flex: 1;
    word-break: break-word;
}

.info-item strong {
    display: block;
    margin-bottom: 0.25rem;
    color: var(--dark-color);
}

.info-item a {
    color: var(--primary-color);
    text-decoration: none;
}

.info-item a:hover {
    text-decoration: underline;
}

/* Skills Section */
#skills {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 80px;
}

.skills-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    align-items: center;
}

.skill-item {
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    color: var(--text-white);
    padding: 12px 24px;
    border-radius: 50px;
    font-weight: 500;
    transition: var(--transition);
    position: relative;
    overflow: hidden;
}

.skill-item::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: var(--transition);
}

.skill-item:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-lg);
}

.skill-item:hover::before {
    left: 100%;
}

.skill-name {
    margin-right: 8px;
}

.skill-level {
    font-size: 0.9rem;
    opacity: 0.8;
}

/* Projects Section */
#projects {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 80px;
}

.project-card {
    background: var(--text-white);
    border-radius: var(--border-radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow);
    transition: var(--transition);
    border: 1px solid var(--border-color);
}

.project-card:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-lg);
}

.project-image {
    position: relative;
    overflow: hidden;
    height: 200px;
}

.project-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: var(--transition);
}

.project-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: var(--transition);
}

.project-card:hover .project-overlay {
    opacity: 1;
}

.project-card:hover .project-image img {
    transform: scale(1.1);
}

.project-placeholder {
    height: 200px;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-white);
    font-size: 3rem;
}

.project-content {
    padding: 1.5rem;
}

.project-title {
    color: var(--dark-color);
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.project-tech {
    color: var(--primary-color);
    font-weight: 500;
    font-size: 0.9rem;
    margin-bottom: 1rem;
}

.project-description {
    color: var(--text-light);
    margin-bottom: 1.5rem;
    line-height: 1.6;
}

.project-actions .btn {
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
}

/* Contact Form */
#contact {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 40px;
    padding-bottom: 80px;
}

.contact-form .form-control {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--border-radius);
    padding: 12px 16px;
    color: var(--text-white);
    transition: var(--transition);
}

.contact-form .form-control::placeholder {
    color: rgba(255, 255, 255, 0.6);}

.contact-form .form-control:focus {
    background: rgba(255, 255, 255, 0.15);
    border-color: var(--primary-color);
    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
    color: var(--text-white);
}

.contact-form .form-label {
    color: var(--text-white);
    font-weight: 500;
}

/* Footer */
.footer {
    padding: 2rem 0;
}

/* Back to Top Button */
.back-to-top {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: var(--text-white);
    border: none;
    border-radius: 50%;
    font-size: 1.2rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: var(--transition);
    z-index: 1000;
}

.back-to-top.visible {
    opacity: 1;
    visibility: visible;
}

.back-to-top:hover {
    background: var(--secondary-color);
    transform: translateY(-3px);
}

/* Animations */
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

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}

/* Responsive Design */
@media (max-width: 992px) {
    .hero-title {
        font-size: 3rem;
    }
    
    .hero-subtitle {
        font-size: 1.5rem;
    }
    
    .section-title {
        font-size: 2rem;
    }
}

@media (max-width: 768px) {
    .hero-title {
        font-size: 2.5rem;
    }
    
    .hero-subtitle {
        font-size: 1.3rem;
    }
    
    .hero-photo {
        max-width: 250px;
        height: 250px;
    }
    
    .hero-placeholder i {
        font-size: 10rem;
    }
    
    .section-padding {
        padding: 60px 0;
    }
    
    .social-links {
        justify-content: center;
        margin-top: 2rem !important;
    }
    
    .footer-social {
        justify-content: center !important;
        margin-top: 1rem;
    }
}

@media (max-width: 576px) {
    .hero-title {
        font-size: 2rem;
    }
    
    .hero-description {
        font-size: 1rem;
    }
    
    .btn-lg {
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
    }
    
    .section-title {
        font-size: 1.8rem;
    }
    
    .back-to-top {
        bottom: 20px;
        right: 20px;
        width: 45px;
        height: 45px;
    }
}
`;

        // Template-specific styles
        const templateStyles = {
            modern: `
/* Modern Template */
.hero-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.navbar {
    background: rgba(102, 126, 234, 0.95) !important;
}
`,
            minimalist: `
/* Minimalist Template */
:root {
    --primary-color: #2c3e50;
    --secondary-color: #34495e;
    --accent-color: #3498db;
}

.hero-section {
    background: linear-gradient(135deg, #ecf0f1 0%, #bdc3c7 100%);
    color: var(--dark-color);
}

.hero-section::before {
    background: rgba(255, 255, 255, 0.1);
}

.hero-description {
    color: var(--dark-color);
    opacity: 0.8;
}

.navbar {
    background: rgba(44, 62, 80, 0.95) !important;
}

.skill-item {
    background: var(--dark-color);
}

.social-links a,
.footer-social a {
    background: rgba(44, 62, 80, 0.1);
    color: var(--dark-color);
}

.social-links a:hover,
.footer-social a:hover {
    background: var(--primary-color);
    color: var(--text-white);
}
`,
            creative: `
/* Creative Template */
:root {
    --primary-color: #f093fb;
    --secondary-color: #f5576c;
    --accent-color: #4facfe;
}

.hero-section {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.navbar {
    background: rgba(240, 147, 251, 0.95) !important;
}

.skill-item {
    background: linear-gradient(45deg, #f093fb, #f5576c);
}
`,
            dark: `
/* Dark Template */
:root {
    --primary-color: #bb86fc;
    --secondary-color: #3700b3;
    --accent-color: #03dac6;
    --dark-color: #121212;
    --text-color: #ffffff;
    --text-light: #b3b3b3;
    --bg-light: #1e1e1e;
}

body {
    background: var(--dark-color);
    color: var(--text-color);
}

.hero-section {
    background: linear-gradient(135deg, #434343 0%, #000000 100%);
}

.navbar {
    background: rgba(18, 18, 18, 0.95) !important;
}

.section-title {
    color: var(--text-color);
}

.project-card {
    background: #1e1e1e;
    color: var(--text-color);
    border-color: #333;
}

.project-title {
    color: var(--text-color);
}

#about {
    background: #1a1a1a;
}

#skills.bg-light {
    background: #1e1e1e !important;
}
`,

          // NEW TEMPLATES START HERE
          gradient: `
/* Gradient Template */
:root {
    --primary-color: #667eea;
    --secondary-color: #f093fb;
    --accent-color: #764ba2;
}

.hero-section {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
}

.navbar {
    background: linear-gradient(90deg, rgba(102, 126, 234, 0.95), rgba(240, 147, 251, 0.95)) !important;
}

.skill-item {
    background: linear-gradient(45deg, #667eea, #f093fb);
}

.project-placeholder {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
}
`,

        neon: `
/* Neon Template */
:root {
    --primary-color: #00f260;
    --secondary-color: #0575e6;
    --accent-color: #ff006e;
    --dark-color: #0a0e27;
    --text-color: #ffffff;
}

body {
    background: #0a0e27;
    color: var(--text-color);
}

.hero-section {
    background: linear-gradient(135deg, #00f260 0%, #0575e6 50%, #ff006e 100%);
    box-shadow: 0 0 50px rgba(0, 242, 96, 0.3);
}

.navbar {
    background: rgba(10, 14, 39, 0.95) !important;
    border-bottom: 2px solid rgba(0, 242, 96, 0.3);
}

.section-title {
    color: var(--text-color);
    text-shadow: 0 0 20px rgba(0, 242, 96, 0.5);
}

.skill-item {
    background: linear-gradient(45deg, #00f260, #0575e6);
    box-shadow: 0 0 20px rgba(0, 242, 96, 0.3);
}

.skill-item:hover {
    box-shadow: 0 0 30px rgba(0, 242, 96, 0.6);
}

.project-card {
    background: #1a1f3a;
    color: var(--text-color);
    border: 2px solid rgba(0, 242, 96, 0.2);
}

.project-card:hover {
    border-color: rgba(0, 242, 96, 0.5);
    box-shadow: 0 0 30px rgba(0, 242, 96, 0.3);
}

.project-title {
    color: var(--primary-color);
}

#about {
    background: #0f1428;
}

#skills.bg-light {
    background: #1a1f3a !important;
}

.btn-primary {
    background: linear-gradient(45deg, #00f260, #0575e6);
    border: none;
    box-shadow: 0 0 20px rgba(0, 242, 96, 0.3);
}

.btn-primary:hover {
    box-shadow: 0 0 30px rgba(0, 242, 96, 0.5);
}
`,
        ocean: `
/* Ocean Template */
:root {
    --primary-color: #2e3192;
    --secondary-color: #1bffff;
    --accent-color: #4a90e2;
}

.hero-section {
    background: linear-gradient(135deg, #2e3192 0%, #1bffff 100%);
}

.navbar {
    background: rgba(46, 49, 146, 0.95) !important;
}

.skill-item {
    background: linear-gradient(45deg, #2e3192, #1bffff);
}

.section-divider {
    background: linear-gradient(45deg, #2e3192, #1bffff);
}
`,

        sunset: `
/* Sunset Template */
:root {
    --primary-color: #ff6b6b;
    --secondary-color: #feca57;
    --accent-color: #ee5a6f;
}

.hero-section {
    background: linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #ee5a6f 100%);
}

.navbar {
    background: rgba(255, 107, 107, 0.95) !important;
}

.skill-item {
    background: linear-gradient(45deg, #ff6b6b, #feca57);
}

.project-placeholder {
    background: linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #ee5a6f 100%);
}
`,

        forest: `
/* Forest Template */
:root {
    --primary-color: #134e5e;
    --secondary-color: #71b280;
    --accent-color: #2ecc71;
}

.hero-section {
    background: linear-gradient(135deg, #134e5e 0%, #71b280 100%);
}

.navbar {
    background: rgba(19, 78, 94, 0.95) !important;
}

.skill-item {
    background: linear-gradient(45deg, #134e5e, #71b280);
}

.section-divider {
    background: linear-gradient(45deg, #134e5e, #71b280);
}
`,

        royal: `
/* Royal Template */
:root {
    --primary-color: #4a148c;
    --secondary-color: #9c27b0;
    --accent-color: #ffd700;
}

.hero-section {
    background: linear-gradient(135deg, #4a148c 0%, #9c27b0 50%, #ffd700 100%);
}

.navbar {
    background: rgba(74, 20, 140, 0.95) !important;
}

.skill-item {
    background: linear-gradient(45deg, #4a148c, #9c27b0);
}

.project-placeholder {
    background: linear-gradient(135deg, #4a148c 0%, #9c27b0 50%, #ffd700 100%);
}

.btn-primary {
    background: linear-gradient(45deg, #4a148c, #ffd700);
}
`,

        monochrome: `
/* Monochrome Template */
:root {
    --primary-color: #000000;
    --secondary-color: #434343;
    --accent-color: #ffffff;
    --text-color: #000000;
}

.hero-section {
    background: linear-gradient(135deg, #000000 0%, #434343 50%, #ffffff 100%);
    color: var(--text-color);
}

.hero-section::before {
    background: rgba(255, 255, 255, 0.1);
}

.navbar {
    background: rgba(0, 0, 0, 0.95) !important;
}

.skill-item {
    background: linear-gradient(45deg, #000000, #434343);
    color: white;
}

.project-card {
    border: 2px solid #000;
}

.project-card:hover {
    border-color: #434343;
}

#about {
    background: #f5f5f5;
}

#skills.bg-light {
    background: #e0e0e0 !important;
}
`,

        pastel: `
/* Pastel Template */
:root {
    --primary-color: #ffeaa7;
    --secondary-color: #fab1a0;
    --accent-color: #dfe6e9;
    --text-color: #2d3436;
}

.hero-section {
    background: linear-gradient(135deg, #ffeaa7 0%, #dfe6e9 50%, #fab1a0 100%);
    color: var(--text-color);
}

.hero-section::before {
    background: rgba(255, 255, 255, 0.2);
}

.navbar {
    background: rgba(255, 234, 167, 0.95) !important;
}

.nav-link {
    color: rgba(45, 52, 54, 0.8) !important;
}

.nav-link:hover,
.nav-link.active {
    color: var(--text-color) !important;
}

.skill-item {
    background: linear-gradient(45deg, #ffeaa7, #fab1a0);
    color: var(--text-color);
}

.section-title {
    color: var(--text-color);
}

.social-links a,
.footer-social a {
    background: rgba(45, 52, 54, 0.1);
    color: var(--text-color);
}

.social-links a:hover,
.footer-social a:hover {
    background: var(--primary-color);
}

#about {
    background: #fef9e7;
}

#skills.bg-light {
    background: #fce4ec !important;
}
`    


        };

        return baseCSS + (templateStyles[template] || templateStyles.modern);
    }

    static generateJS() {
        return `
// Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            backToTopBtn.classList.add('visible');
        } else {
            navbar.classList.remove('scrolled');
            backToTopBtn.classList.remove('visible');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                //Update URL without scrolling
                history.pushState(null, null, this.getAttribute('href'));
            }
        });
    });

    // Back to top button
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNavigation() {
        let scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields.', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Message sent successfully! I will get back to you soon.', 'success');
            this.reset();
        });
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = \`notification notification-\${type}\`;
        notification.innerHTML = \`
            <i class="fas fa-\${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>\${message}</span>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        \`;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    // Project card hover effects
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(2deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
        });
    });

    // Skill items animation on scroll
    const skillItems = document.querySelectorAll('.skill-item');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    skillItems.forEach(item => {
        skillObserver.observe(item);
    });

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after page load
        setTimeout(typeWriter, 1000);
    }

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroSection.style.transform = \`translateY(\${parallax}px)\`;
        });
    }

    // Console message
    console.log('%c🚀 Portfolio loaded successfully!', 'color: #667eea; font-size: 16px; font-weight: bold;');
    console.log('%cMade with ❤️ using Dynamic Portfolio Generator', 'color: #666; font-size: 12px;');
});

// Add notification styles
const notificationStyles = \`
<style>
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 8px;
    padding: 16px 20px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 10000;
    animation: slideInRight 0.3s ease;
    max-width: 400px;
    border-left: 4px solid;
}

.notification-success {
    border-left-color: #28a745;
    color: #155724;
}

.notification-error {
    border-left-color: #dc3545;
    color: #721c24;
}

.notification-info {
    border-left-color: #17a2b8;
    color: #0c5460;
}

.notification-close {
    background: none;
    border: none;
    font-size: 14px;
    cursor: pointer;
    opacity: 0.6;
    margin-left: auto;
}

.notification-close:hover {
    opacity: 1;
}

@keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@media (max-width: 768px) {
    .notification {
        left: 20px;
        right: 20px;
        max-width: none;
    }
}
</style>
\`;

document.head.insertAdjacentHTML('beforeend', notificationStyles);
`;
    }
}

// Make TemplateGenerator available globally
window.TemplateGenerator = TemplateGenerator;  