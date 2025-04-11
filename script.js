// Wait for the DOM to be fully loaded before executing JavaScript
document.addEventListener("DOMContentLoaded", function () {
    // Initialize all components
    initMobileMenu();
    initSmoothScroll();
    initButtonEffects();
    initLazyLoading();
    initScrollAnimations();
  });
  
  /**
   * Mobile Menu Functionality
   * Creates a slide-out menu when the menu icon is clicked
   */
  function initMobileMenu() {
    const menuIcon = document.querySelector(".menu-icon");
    const body = document.body;
  
    // Create mobile menu overlay if it doesn't exist
    if (!document.querySelector(".mobile-menu-overlay")) {
      const overlay = document.createElement("div");
      overlay.className = "mobile-menu-overlay";
  
      const menuContent = document.createElement("div");
      menuContent.className = "mobile-menu-content";
  
      // Create close button
      const closeButton = document.createElement("button");
      closeButton.className = "mobile-menu-close";
      closeButton.innerHTML = "&times;";
      closeButton.setAttribute("aria-label", "Close menu");
  
      // Create navigation links
      const nav = document.createElement("nav");
      nav.className = "mobile-nav";
  
      // Add menu items - these should match your site structure
      const menuItems = [
        { text: "Início", href: "#" },
        { text: "Destinos", href: "#" },
        { text: "Sobre Nós", href: "#" },
        { text: "Blog", href: "#" },
        { text: "Contactos", href: "#" },
      ];
  
      menuItems.forEach((item) => {
        const link = document.createElement("a");
        link.href = item.href;
        link.textContent = item.text;
        link.className = "mobile-nav-link";
        nav.appendChild(link);
      });
  
      // Assemble the menu
      menuContent.appendChild(closeButton);
      menuContent.appendChild(nav);
      overlay.appendChild(menuContent);
      body.appendChild(overlay);
  
      // Add event listener to close button
      closeButton.addEventListener("click", function () {
        overlay.classList.remove("active");
        body.classList.remove("menu-open");
      });
  
      // Close menu when clicking outside
      overlay.addEventListener("click", function (e) {
        if (e.target === overlay) {
          overlay.classList.remove("active");
          body.classList.remove("menu-open");
        }
      });
  
      // Close menu when pressing Escape key
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && overlay.classList.contains("active")) {
          overlay.classList.remove("active");
          body.classList.remove("menu-open");
        }
      });
    }
  
    // Toggle menu when clicking menu icon
    const overlay = document.querySelector(".mobile-menu-overlay");
    menuIcon.addEventListener("click", function () {
      overlay.classList.toggle("active");
      body.classList.toggle("menu-open");
    });
  }
  
  /**
   * Smooth Scrolling
   * Implements smooth scrolling for navigation links
   */
  function initSmoothScroll() {
    // Select all links that have hash (#) in their href
    const links = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        // Prevent default anchor click behavior
        e.preventDefault();
  
        // Get the target element
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
  
        if (targetElement) {
          // Scroll smoothly to the target
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
  
          // Close mobile menu if open
          const overlay = document.querySelector(".mobile-menu-overlay");
          if (overlay && overlay.classList.contains("active")) {
            overlay.classList.remove("active");
            document.body.classList.remove("menu-open");
          }
  
          // Update URL without page jump
          history.pushState(null, null, targetId);
        }
      });
    });
  }
  
  /**
   * Button Effects
   * Adds subtle hover and click animations for buttons
   */
  function initButtonEffects() {
    const buttons = document.querySelectorAll(
      ".primary-button, .secondary-button",
    );
  
    buttons.forEach((button) => {
      // Add ripple effect on click
      button.addEventListener("click", function (e) {
        // Create ripple element
        const ripple = document.createElement("span");
        ripple.className = "ripple-effect";
        this.appendChild(ripple);
  
        // Position the ripple
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
  
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
  
        // Remove ripple after animation completes
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }
  
  /**
   * Lazy Loading
   * Implements lazy loading for images to improve performance
   */
  function initLazyLoading() {
    // Check if browser supports Intersection Observer
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              const src = img.getAttribute("data-src");
  
              if (src) {
                img.src = src;
                img.classList.add("loaded");
                observer.unobserve(img);
              }
            }
          });
        },
        {
          rootMargin: "50px 0px",
          threshold: 0.01,
        },
      );
  
      // Target all images that should be lazy loaded
      document.querySelectorAll("img[data-src]").forEach((img) => {
        imageObserver.observe(img);
      });
    } else {
      // Fallback for browsers that don't support Intersection Observer
      document.querySelectorAll("img[data-src]").forEach((img) => {
        img.src = img.getAttribute("data-src");
      });
    }
  }
  
  /**
   * Scroll Animations
   * Adds fade-in animations to elements as they enter the viewport
   */
  function initScrollAnimations() {
    // Check if browser supports Intersection Observer
    if ("IntersectionObserver" in window) {
      const animationObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-in");
              animationObserver.unobserve(entry.target);
            }
          });
        },
        {
          rootMargin: "0px",
          threshold: 0.1,
        },
      );
  
      // Target elements to animate
      const animateElements = document.querySelectorAll(
        ".feature-card, .destination-card, .blog-card, .promo-content",
      );
  
      animateElements.forEach((element) => {
        element.classList.add("animate-element");
        animationObserver.observe(element);
      });
    }
  }
  
  /**
   * Testimonial Carousel (if needed in the future)
   * Creates a simple carousel for testimonials
   */
  function initTestimonialCarousel() {
    // This is a placeholder for future implementation
    // Can be used if testimonials are added to the site
    console.log("Testimonial carousel ready for implementation");
  }
  