/* ============================================
   BIONT - Main JavaScript
   Technology-Driven Education Platform
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all modules
  initHeader();
  initMobileMenu();
  initScrollAnimations();
  initCourseFilter();
  initBlogFilter();
  initCurriculum();
  initSmoothScroll();
  initNewsletterForm();
});

/* ============================================
   Header Scroll Effect
   ============================================ */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  
  let lastScrollY = window.scrollY;
  let ticking = false;
  
  function updateHeader() {
    const scrollY = window.scrollY;
    
    // Add scrolled class for shadow effect
    if (scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    
    lastScrollY = scrollY;
    ticking = false;
  }
  
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });
}

/* ============================================
   Mobile Menu Toggle
   ============================================ */
function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.nav');
  const body = document.body;
  
  if (!toggle || !nav) return;
  
  toggle.addEventListener('click', function() {
    toggle.classList.toggle('active');
    nav.classList.toggle('active');
    body.classList.toggle('menu-open');
  });
  
  // Close menu when clicking on a nav link
  const navLinks = nav.querySelectorAll('.nav__link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      toggle.classList.remove('active');
      nav.classList.remove('active');
      body.classList.remove('menu-open');
    });
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      toggle.classList.remove('active');
      nav.classList.remove('active');
      body.classList.remove('menu-open');
    }
  });
}

/* ============================================
   Scroll Animations
   ============================================ */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');
  if (!animatedElements.length) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

/* ============================================
   Course Filter
   ============================================ */
function initCourseFilter() {
  const filterContainer = document.querySelector('.course-filter');
  if (!filterContainer) return;
  
  const filterButtons = filterContainer.querySelectorAll('.course-filter__btn');
  const courseCards = document.querySelectorAll('.course-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Get filter value
      const filter = this.dataset.filter;
      
      // Filter courses
      courseCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          card.classList.add('animate-fadeInUp');
        } else {
          card.style.display = 'none';
          card.classList.remove('animate-fadeInUp');
        }
      });
    });
  });
}

/* ============================================
   Blog Filter
   ============================================ */
function initBlogFilter() {
  const filterContainer = document.querySelector('.blog-filter');
  if (!filterContainer) return;
  
  const filterButtons = filterContainer.querySelectorAll('.course-filter__btn');
  const blogCards = document.querySelectorAll('.blog-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Get filter value
      const filter = this.dataset.filter;
      
      // Filter blog posts
      blogCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          card.classList.add('animate-fadeInUp');
        } else {
          card.style.display = 'none';
          card.classList.remove('animate-fadeInUp');
        }
      });
    });
  });
}

/* ============================================
   Course Curriculum Accordion
   ============================================ */
function initCurriculum() {
  const modules = document.querySelectorAll('.curriculum__module');
  if (!modules.length) return;
  
  modules.forEach(module => {
    const header = module.querySelector('.curriculum__module-header');
    
    header.addEventListener('click', function() {
      // Close other modules
      modules.forEach(m => {
        if (m !== module) {
          m.classList.remove('active');
        }
      });
      
      // Toggle current module
      module.classList.toggle('active');
    });
  });
  
  // Open first module by default
  if (modules.length > 0) {
    modules[0].classList.add('active');
  }
}

/* ============================================
   Smooth Scroll for Anchor Links
   ============================================ */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (!target) return;
      
      e.preventDefault();
      
      const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

/* ============================================
   Newsletter Form
   ============================================ */
function initNewsletterForm() {
  const forms = document.querySelectorAll('.footer__newsletter-form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const input = form.querySelector('.footer__newsletter-input');
      const email = input.value.trim();
      
      if (!email || !isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
      }
      
      // Simulate form submission
      input.disabled = true;
      
      setTimeout(() => {
        showNotification('Thank you for subscribing!', 'success');
        input.value = '';
        input.disabled = false;
      }, 1000);
    });
  });
}

/* ============================================
   Utility Functions
   ============================================ */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existing = document.querySelector('.notification');
  if (existing) {
    existing.remove();
  }
  
  // Create notification
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.innerHTML = `
    <span class="notification__message">${message}</span>
    <button class="notification__close">&times;</button>
  `;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    padding: 16px 24px;
    background-color: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    color: white;
    border-radius: 8px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 1000;
    animation: slideInRight 0.3s ease-out;
  `;
  
  document.body.appendChild(notification);
  
  // Close button
  const closeBtn = notification.querySelector('.notification__close');
  closeBtn.style.cssText = `
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    padding: 0;
    line-height: 1;
  `;
  
  closeBtn.addEventListener('click', () => {
    notification.remove();
  });
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
}

/* ============================================
   Search Functionality
   ============================================ */
function initSearch() {
  const searchInput = document.querySelector('.search-input');
  if (!searchInput) return;
  
  const searchableItems = document.querySelectorAll('[data-searchable]');
  
  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase().trim();
    
    if (!query) {
      searchableItems.forEach(item => {
        item.style.display = '';
      });
      return;
    }
    
    searchableItems.forEach(item => {
      const text = item.textContent.toLowerCase();
      if (text.includes(query)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

/* ============================================
   Progress Tracking (for logged in users)
   ============================================ */
function initProgressTracking() {
  // This would integrate with a backend in production
  const progressBars = document.querySelectorAll('.progress-bar');
  
  progressBars.forEach(bar => {
    const progress = parseInt(bar.dataset.progress) || 0;
    const fill = bar.querySelector('.progress-bar__fill');
    
    if (fill) {
      setTimeout(() => {
        fill.style.width = `${progress}%`;
      }, 300);
    }
  });
}

/* ============================================
   Lazy Loading Images
   ============================================ */
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  if (!lazyImages.length) return;
  
  const imageObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => {
    imageObserver.observe(img);
  });
}

/* ============================================
   Tab Navigation
   ============================================ */
function initTabs() {
  const tabContainers = document.querySelectorAll('.tabs');
  
  tabContainers.forEach(container => {
    const tabs = container.querySelectorAll('.tab');
    const panels = container.querySelectorAll('.tab-panel');
    
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', function() {
        // Remove active from all tabs and panels
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        
        // Add active to clicked tab and corresponding panel
        tab.classList.add('active');
        panels[index]?.classList.add('active');
      });
    });
  });
}

/* ============================================
   Modal Functionality
   ============================================ */
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Close on backdrop click
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal(modalId);
    }
  });
  
  // Close on escape key
  document.addEventListener('keydown', function handleEscape(e) {
    if (e.key === 'Escape') {
      closeModal(modalId);
      document.removeEventListener('keydown', handleEscape);
    }
  });
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

/* ============================================
   Export functions for global access
   ============================================ */
window.Biont = {
  openModal,
  closeModal,
  showNotification
};
