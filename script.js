document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Theme toggle functionality
    const themeSwitch = document.getElementById('theme-switch');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const htmlElement = document.documentElement;
    
    // Check for saved theme or prefered scheme
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        htmlElement.setAttribute('data-theme', 'dark');
        themeSwitch.checked = true;
    }
    
    // Theme switcher
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Populate personal information
    const personalInfo = portfolioData.personalInfo;
    document.getElementById('hero-name').textContent = personalInfo.fullName;
    document.getElementById('hero-title').textContent = personalInfo.title;
    document.getElementById('hero-desc').textContent = personalInfo.shortDesc;
    document.getElementById('about-desc').textContent = personalInfo.aboutDesc;
    document.getElementById('education').textContent = personalInfo.education;
    document.getElementById('experience').textContent = personalInfo.experience;
    document.getElementById('location').textContent = personalInfo.location;
    document.getElementById('footer-name').textContent = personalInfo.fullName;
    
    // Populate skills
    const skillsContainer = document.getElementById('skills-container');
    portfolioData.skills.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        skillCard.innerHTML = `
            <div class="skill-icon">
                <i class="${skill.icon}"></i>
            </div>
            <div class="skill-name">${skill.name}</div>
            <div class="skill-level">
                <div class="skill-level-bar" style="width: ${skill.level}%"></div>
            </div>
        `;
        skillsContainer.appendChild(skillCard);
    });
    
    // Populate projects
    const projectsGrid = document.getElementById('projects-grid');
    portfolioData.projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.demoLink}" class="project-link" target="_blank">
                        <i class="fas fa-external-link-alt"></i> Demo
                    </a>
                    <a href="${project.codeLink}" class="project-link" target="_blank">
                        <i class="fab fa-github"></i> Code
                    </a>
                </div>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
    
    // Populate contact info
    const contactInfoList = document.getElementById('contact-info-list');
    contactInfoList.innerHTML = `
        <li><i class="fas fa-envelope"></i> ${personalInfo.email}</li>
        <li><i class="fas fa-phone"></i> ${personalInfo.phone}</li>
        <li><i class="fas fa-map-marker-alt"></i> ${personalInfo.address}</li>
    `;
    
    // Set social media links
    const social = portfolioData.socialMedia;
    document.getElementById('social-linkedin').href = social.linkedin;
    document.getElementById('social-github').href = social.github;
    document.getElementById('social-twitter').href = social.twitter;
    document.getElementById('social-instagram').href = social.instagram;
    
    // Form validation
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !message) {
            showAlert('Harap isi semua kolom!', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showAlert('Email tidak valid!', 'error');
            return;
        }
        
        // Form submission logic would go here
        showAlert(`Terima kasih, ${name}! Pesan Anda telah terkirim.`, 'success');
        contactForm.reset();
    });
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });
    
    // Scroll animations
    function animateOnScroll() {
        const elements = document.querySelectorAll('.skill-card, .project-card');
        elements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                el.classList.add('visible');
            }
        });
    }
    
    // Initial check
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Helper function for email validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Show alert function
    function showAlert(message, type) {
        // Remove any existing alerts
        const existingAlert = document.querySelector('.custom-alert');
        if (existingAlert) existingAlert.remove();
        
        const alert = document.createElement('div');
        alert.className = `custom-alert ${type}`;
        alert.textContent = message;
        document.body.appendChild(alert);
    }
});