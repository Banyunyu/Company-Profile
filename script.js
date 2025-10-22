// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Model cards animation on scroll
function animateOnScroll() {
    const modelCards = document.querySelectorAll('.model-card');
    
    modelCards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (cardPosition < screenPosition) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for model cards
document.addEventListener('DOMContentLoaded', function() {
    const modelCards = document.querySelectorAll('.model-card');
    modelCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Trigger animation after a short delay
    setTimeout(animateOnScroll, 300);
});

window.addEventListener('scroll', animateOnScroll);

// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        alert('Harap isi semua field yang diperlukan.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Harap masukkan alamat email yang valid.');
        return;
    }
    
    // In a real application, you would send the form data to a server here
    // For this example, we'll just show a success message
    alert(`Terima kasih, ${name}! Pesan Anda telah berhasil dikirim. Kami akan menghubungi Anda segera.`);
    
    // Reset form
    this.reset();
});

// Counter animation for racing stats
function animateCounters() {
    const counters = document.querySelectorAll('.racing-stats h3');
    const speed = 200; // The lower the slower
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText.replace('+', '');
            
            // Check if target is reached
            if (count < target) {
                // Add inc to count and output in counter
                counter.innerText = Math.ceil(count + (target / speed)) + (counter.innerText.includes('+') ? '+' : '');
                // Call function every ms
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target + (counter.innerText.includes('+') ? '+' : '');
            }
        };
        
        updateCount();
    });
}

// Initialize counters when the racing section is in view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Set data-target attributes for counters
            document.querySelectorAll('.racing-stats h3')[0].setAttribute('data-target', '16');
            document.querySelectorAll('.racing-stats h3')[1].setAttribute('data-target', '15');
            document.querySelectorAll('.racing-stats h3')[2].setAttribute('data-target', '240');
            
            // Start counter animation
            animateCounters();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe the racing section
const racingSection = document.getElementById('racing');
if (racingSection) {
    observer.observe(racingSection);
}

// Initialize AOS (Animation On Scroll) for other elements
document.addEventListener('DOMContentLoaded', function() {
    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        sectionObserver.observe(section);
    });
});