// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Profile image loading
const profileImg = document.getElementById('profileImage');
profileImg.onerror = function() {
    // If image fails to load, create a placeholder
    this.style.display = 'none';
    const container = this.parentElement;
    container.innerHTML = `
        <div style="width: 100%; height: 500px; background: var(--accent-gray); display: flex; align-items: center; justify-content: center; font-size: 4rem; color: var(--white);">
            KM
        </div>
    `;
};

// CV Download functionality
const downloadButtons = ['downloadCV', 'downloadCVFooter'];
downloadButtons.forEach(buttonId => {
    document.getElementById(buttonId).addEventListener('click', function(e) {
        e.preventDefault();
        // Create a temporary link to download the CV
        const link = document.createElement('a');
        link.href = 'Kamva_Maqinana_CV.pdf';
        link.download = 'Kamva_Maqinana_CV.pdf';
        link.click();
    });
});

// Chat Widget Functionality
const chatToggle = document.getElementById('chatToggle');
const chatBox = document.getElementById('chatBox');
const closeChat = document.getElementById('closeChat');
const chatInput = document.getElementById('chatInput');
const sendMessage = document.getElementById('sendMessage');
const chatMessages = document.getElementById('chatMessages');

chatToggle.addEventListener('click', () => {
    chatBox.classList.toggle('active');
    if (chatBox.classList.contains('active')) {
        chatInput.focus();
    }
});

closeChat.addEventListener('click', () => {
    chatBox.classList.remove('active');
});

// AI Chat Bot responses
const responses = {
    skills: [
        "Kamva is proficient in C#, JavaScript, SQL, HTML, CSS, and Python. He specializes in ASP.NET Core, Entity Framework, and React.",
        "His technical skills include full-stack development with .NET technologies, React frontend development, and SQL Server database management."
    ],
    projects: [
        "Kamva has built a Medical Practice Web Application with ASP.NET Core REST APIs and React frontend. He also created this portfolio website using React, JavaScript, HTML, and CSS.",
        "His main project is the Medical Practice Management System, which you can view at https://soit-iis.mandela.ac.za/GRP-03-25. It features a REST API backend and React frontend."
    ],
    education: [
        "Kamva completed his Diploma in Information Technology (Software Development) in February 2026.",
        "He also holds certifications in CCNA: Introduction to Networks and Cybersecurity."
    ],
    experience: [
        "Kamva is a graduate software developer with strong experience in building full-stack web applications using C#, .NET, ASP.NET Core, and React.",
        "He has hands-on experience with database-driven systems, RESTful APIs, and implementing the Software Development Life Cycle (SDLC)."
    ],
    contact: [
        "You can reach Kamva at kmaqinana08@gmail.com or call him at +27 73 913 4658.",
        "Connect with Kamva on LinkedIn: https://www.linkedin.com/in/kamva-maqinana-977933378/ or check out his GitHub: https://github.com/kamvaMaq"
    ],
    default: [
        "I can help you learn more about Kamva's skills, projects, education, or experience. What would you like to know?",
        "Feel free to ask me about Kamva's technical skills, project portfolio, educational background, or how to get in touch with him.",
        "I'm here to answer questions about Kamva's software development experience, certifications, or any of his projects. What interests you?"
    ]
};

function getResponse(message) {
    message = message.toLowerCase();
    
    if (message.includes('skill') || message.includes('technology') || message.includes('language')) {
        return responses.skills[Math.floor(Math.random() * responses.skills.length)];
    } else if (message.includes('project') || message.includes('portfolio') || message.includes('work')) {
        return responses.projects[Math.floor(Math.random() * responses.projects.length)];
    } else if (message.includes('education') || message.includes('study') || message.includes('degree') || message.includes('diploma')) {
        return responses.education[Math.floor(Math.random() * responses.education.length)];
    } else if (message.includes('experience') || message.includes('background')) {
        return responses.experience[Math.floor(Math.random() * responses.experience.length)];
    } else if (message.includes('contact') || message.includes('email') || message.includes('phone') || message.includes('reach')) {
        return responses.contact[Math.floor(Math.random() * responses.contact.length)];
    } else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return "Hello! I'm here to help you learn more about Kamva. Feel free to ask about his skills, projects, education, or experience.";
    } else if (message.includes('thank')) {
        return "You're welcome! Is there anything else you'd like to know about Kamva?";
    } else {
        return responses.default[Math.floor(Math.random() * responses.default.length)];
    }
}

function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleSendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        addMessage(message, true);
        chatInput.value = '';
        
        // Simulate typing delay
        setTimeout(() => {
            const response = getResponse(message);
            addMessage(response);
        }, 500);
    }
}

sendMessage.addEventListener('click', handleSendMessage);

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards and other elements
document.querySelectorAll('.project-card, .education-item, .cert-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});