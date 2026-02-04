// Global Horizon Website JavaScript
// Last updated: 2026-02-03
// Purpose: Handles interactive elements and dynamic content

document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Dynamic header background on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(255,255,255,0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.backgroundColor = 'transparent';
            header.style.boxShadow = 'none';
        }
    });

    // Testimonial carousel (basic implementation)
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    const testimonials = [
        {
            quote: '"Global Horizon transformed my international career move. Their support was exceptional!"',
            name: 'Sarah Chen',
            title: 'Tech Professional',
            image: 'client1.jpg'
        },
        {
            quote: '"The cultural training and relocation support exceeded all my expectations!"',
            name: 'Miguel Rodriguez',
            title: 'Marketing Director',
            image: 'client2.jpg'
        }
    ];

    let currentTestimonial = 0;

    function updateTestimonial() {
        const testimonial = testimonials[currentTestimonial];
        testimonialCarousel.innerHTML = `
            <div class="testimonial">
                <p>"${testimonial.quote}"</p>
                <div class="client-info">
                    <img src="${testimonial.image}" alt="${testimonial.name}">
                    <span>- ${testimonial.name}, ${testimonial.title}</span>
                </div>
            </div>
        `;
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    }

    // Initial testimonial load
    if (testimonialCarousel) {
        updateTestimonial();
        // Rotate testimonials every 5 seconds
        setInterval(updateTestimonial, 5000);
    }

    // Contact form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your inquiry! We will get back to you soon.');
            contactForm.reset();
        });
    }
});