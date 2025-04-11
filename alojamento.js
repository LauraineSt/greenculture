// DOM Elements
const header = document.querySelector(".header");
const menuButton = document.querySelector(".header__menu-button");
const mobileMenu = document.querySelector(".header__nav");
const accommodationCards = document.querySelectorAll(".accommodation-card");
const testimonialContainer = document.querySelector(".testimonials__grid");

// State
let isMenuOpen = false;

// Mobile Menu Toggle
function toggleMobileMenu() {
  isMenuOpen = !isMenuOpen;
  menuButton.setAttribute("aria-expanded", isMenuOpen);
  mobileMenu.classList.toggle("header__nav--active");

  // Accessibility
  if (isMenuOpen) {
    menuButton.setAttribute("aria-label", "Close menu");
  } else {
    menuButton.setAttribute("aria-label", "Open menu");
  }
}

// Smooth Scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Lazy Loading Images
function lazyLoadImages() {
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add("loaded");
          observer.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }
}

// Accommodation Card Interaction
function initAccommodationCards() {
  accommodationCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("accommodation-card--hover");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("accommodation-card--hover");
    });

    // Accessibility - Make cards focusable
    card.setAttribute("tabindex", "0");

    // Handle keyboard interaction
    card.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const link = card.querySelector(".accommodation-card__cta");
        if (link) link.click();
      }
    });
  });
}

// Testimonial Slider
class TestimonialSlider {
  constructor(container) {
    this.container = container;
    this.testimonials = container.children;
    this.currentIndex = 0;
    this.isAnimating = false;

    this.init();
  }

  init() {
    if (this.testimonials.length <= 1) return;

    // Create navigation
    this.createNavigation();

    // Auto advance
    this.startAutoAdvance();

    // Pause on hover/focus
    this.container.addEventListener("mouseenter", () =>
      this.pauseAutoAdvance(),
    );
    this.container.addEventListener("mouseleave", () =>
      this.startAutoAdvance(),
    );
    this.container.addEventListener("focusin", () => this.pauseAutoAdvance());
    this.container.addEventListener("focusout", () => this.startAutoAdvance());
  }

  createNavigation() {
    const nav = document.createElement("div");
    nav.className = "testimonials__nav";

    // Previous button
    const prevButton = document.createElement("button");
    prevButton.className = "testimonials__nav-button";
    prevButton.setAttribute("aria-label", "Previous testimonial");
    prevButton.addEventListener("click", () => this.previous());

    // Next button
    const nextButton = document.createElement("button");
    nextButton.className = "testimonials__nav-button";
    nextButton.setAttribute("aria-label", "Next testimonial");
    nextButton.addEventListener("click", () => this.next());

    nav.appendChild(prevButton);
    nav.appendChild(nextButton);
    this.container.parentNode.appendChild(nav);
  }

  next() {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
    this.updateSlide();
  }

  previous() {
    if (this.isAnimating) return;

    this.isAnimating = true;
    this.currentIndex =
      (this.currentIndex - 1 + this.testimonials.length) %
      this.testimonials.length;
    this.updateSlide();
  }

  updateSlide() {
    const offset = -this.currentIndex * 100;
    this.container.style.transform = `translateX(${offset}%)`;

    setTimeout(() => {
      this.isAnimating = false;
    }, 400); // Match transition duration in CSS
  }

  startAutoAdvance() {
    this.autoAdvanceInterval = setInterval(() => this.next(), 5000);
  }

  pauseAutoAdvance() {
    clearInterval(this.autoAdvanceInterval);
  }
}

// Scroll-based Animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".animate-on-scroll");

  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach((element) => observer.observe(element));
}

// Form Validation (if needed)
function initFormValidation() {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const isValid = validateForm(form);
      if (isValid) {
        // Handle form submission
        submitForm(form);
      }
    });
  });
}

function validateForm(form) {
  let isValid = true;
  const inputs = form.querySelectorAll("input, select, textarea");

  inputs.forEach((input) => {
    if (input.hasAttribute("required") && !input.value.trim()) {
      isValid = false;
      showError(input, "This field is required");
    } else if (
      input.type === "email" &&
      input.value &&
      !isValidEmail(input.value)
    ) {
      isValid = false;
      showError(input, "Please enter a valid email address");
    }
  });

  return isValid;
}

function showError(input, message) {
  const errorElement = input.nextElementSibling?.classList.contains(
    "error-message",
  )
    ? input.nextElementSibling
    : document.createElement("span");

  errorElement.className = "error-message";
  errorElement.textContent = message;

  if (!input.nextElementSibling?.classList.contains("error-message")) {
    input.parentNode.insertBefore(errorElement, input.nextSibling);
  }

  input.classList.add("has-error");
  input.setAttribute("aria-invalid", "true");
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Initialize everything
document.addEventListener("DOMContentLoaded", () => {
  // Initialize mobile menu
  menuButton.addEventListener("click", toggleMobileMenu);

  // Initialize smooth scroll
  initSmoothScroll();

  // Initialize lazy loading
  lazyLoadImages();

  // Initialize accommodation cards
  initAccommodationCards();

  // Initialize testimonial slider if container exists
  if (testimonialContainer) {
    new TestimonialSlider(testimonialContainer);
  }

  // Initialize scroll animations
  initScrollAnimations();

  // Initialize form validation
  initFormValidation();
});

// Handle scroll events
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // Add/remove header shadow
  if (currentScroll > 50) {
    header.classList.add("header--scrolled");
  } else {
    header.classList.remove("header--scrolled");
  }

  // Hide/show header on scroll
  if (currentScroll > lastScroll && currentScroll > 100) {
    header.classList.add("header--hidden");
  } else {
    header.classList.remove("header--hidden");
  }

  lastScroll = currentScroll;
});
// Utility functions for common operations

// Debounce function to limit rate of execution
export function debounce(func, wait) {
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
  
  // Throttle function to ensure function is called at most once in specified time
  export function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }
  
  // Get viewport dimensions
  export function getViewportSize() {
    return {
      width: window.innerWidth || document.documentElement.clientWidth,
      height: window.innerHeight || document.documentElement.clientHeight,
    };
  }
  
  // Check if element is in viewport
  export function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Format date
  export function formatDate(date) {
    return new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  }
  
  // Generate unique ID
  export function generateUID() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
  
  // Parse URL parameters
  export function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const result = {};
    for (const [key, value] of params) {
      result[key] = value;
    }
    return result;
  }
  
  // Local storage wrapper
  export const storage = {
    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.error("Error saving to localStorage:", e);
      }
    },
  
    get(key) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
      } catch (e) {
        console.error("Error reading from localStorage:", e);
        return null;
      }
    },
  
    remove(key) {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.error("Error removing from localStorage:", e);
      }
    },
  };
  
  // Cookie utilities
  export const cookies = {
    set(name, value, days) {
      const expires = new Date(Date.now() + days * 864e5).toUTCString();
      document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
    },
  
    get(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2)
        return decodeURIComponent(parts.pop().split(";").shift());
    },
  
    remove(name) {
      this.set(name, "", -1);
    },
  };
  
  // Accessibility helpers
  export const a11y = {
    announceMessage(message) {
      let announcer = document.getElementById("a11y-announcer");
      if (!announcer) {
        announcer = document.createElement("div");
        announcer.id = "a11y-announcer";
        announcer.setAttribute("aria-live", "polite");
        announcer.setAttribute("aria-atomic", "true");
        announcer.style.position = "absolute";
        announcer.style.left = "-9999px";
        announcer.style.height = "1px";
        announcer.style.width = "1px";
        announcer.style.overflow = "hidden";
        document.body.appendChild(announcer);
      }
      announcer.textContent = message;
    },
  
    focusable(element) {
      element.setAttribute("tabindex", "0");
      return element;
    },
  
    trapFocus(element) {
      const focusableElements = element.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];
  
      element.addEventListener("keydown", function (e) {
        const isTabPressed = e.key === "Tab";
  
        if (!isTabPressed) return;
  
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
          }
        }
      });
    },
  };
  
  // Animation helpers
  export const animate = {
    fadeIn(element, duration = 400) {
      element.style.opacity = 0;
      element.style.display = "block";
  
      let start = null;
      function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
  
        element.style.opacity = Math.min(progress / duration, 1);
  
        if (progress < duration) {
          window.requestAnimationFrame(step);
        }
      }
      window.requestAnimationFrame(step);
    },
  
    fadeOut(element, duration = 400) {
      let start = null;
      function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
  
        element.style.opacity = 1 - Math.min(progress / duration, 1);
  
        if (progress < duration) {
          window.requestAnimationFrame(step);
        } else {
          element.style.display = "none";
        }
      }
      window.requestAnimationFrame(step);
    },
  
    slideDown(element, duration = 400) {
      element.style.display = "block";
      const height = element.scrollHeight;
      element.style.height = "0px";
      element.style.overflow = "hidden";
      element.style.transition = `height ${duration}ms ease`;
  
      setTimeout(() => {
        element.style.height = height + "px";
      }, 5);
  
      setTimeout(() => {
        element.style.height = "";
        element.style.overflow = "";
        element.style.transition = "";
      }, duration);
    },
  
    slideUp(element, duration = 400) {
      element.style.height = element.scrollHeight + "px";
      element.style.overflow = "hidden";
      element.style.transition = `height ${duration}ms ease`;
  
      setTimeout(() => {
        element.style.height = "0px";
      }, 5);
  
      setTimeout(() => {
        element.style.display = "none";
        element.style.height = "";
        element.style.overflow = "";
        element.style.transition = "";
      }, duration);
    },
  };
  