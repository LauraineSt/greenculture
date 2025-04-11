// Wait for the DOM to be fully loaded before executing scripts
document.addEventListener("DOMContentLoaded", function () {
    // Initialize all components
    initMobileMenu();
    initSmoothScroll();
    initPropertyImageEffects();
    initScrollAnimations();
  });
  
  /**
   * Mobile Menu Toggle
   * Shows/hides the navigation menu when clicking the menu icon on mobile
   */
  function initMobileMenu() {
    const menuButton = document.querySelector('.icon-button[aria-label="Menu"]');
  
    // Since there's no mobile menu in the current HTML, let's create a simple one
    if (menuButton) {
      // Create mobile menu if it doesn't exist
      if (!document.querySelector(".mobile-menu")) {
        const mobileMenu = document.createElement("nav");
        mobileMenu.className = "mobile-menu";
        mobileMenu.setAttribute("aria-hidden", "true");
  
        // Add menu items - using the same links as in the footer
        mobileMenu.innerHTML = `
          <div class="mobile-menu-container">
            <a href="#" class="mobile-menu-link">Sobre</a>
            <a href="#" class="mobile-menu-link">Contactos</a>
            <a href="#" class="mobile-menu-link">Nossos Parceiros</a>
            <a href="#" class="mobile-menu-link">Serviços</a>
          </div>
        `;
  
        // Add styles for the mobile menu
        const style = document.createElement("style");
        style.textContent = `
          .mobile-menu {
            position: fixed;
            top: 64px;
            left: 0;
            width: 100%;
            background-color: #ecefed;
            transform: translateY(-100%);
            transition: transform 0.3s ease-in-out;
            z-index: 100;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .mobile-menu.active {
            transform: translateY(0);
          }
          .mobile-menu-container {
            display: flex;
            flex-direction: column;
            padding: 16px 20px;
          }
          .mobile-menu-link {
            padding: 12px 0;
            color: #456452;
            font-family: 'Lato', sans-serif;
            font-size: 16px;
            font-weight: 500;
            border-bottom: 1px solid rgba(69, 100, 82, 0.1);
          }
          .mobile-menu-link:last-child {
            border-bottom: none;
          }
        `;
  
        document.head.appendChild(style);
        document.body.insertBefore(mobileMenu, document.querySelector("main"));
  
        // Toggle menu on click
        menuButton.addEventListener("click", function () {
          mobileMenu.classList.toggle("active");
          const isActive = mobileMenu.classList.contains("active");
          mobileMenu.setAttribute("aria-hidden", !isActive);
          menuButton.setAttribute("aria-expanded", isActive);
        });
  
        // Close menu when clicking outside
        document.addEventListener("click", function (event) {
          if (
            !mobileMenu.contains(event.target) &&
            !menuButton.contains(event.target) &&
            mobileMenu.classList.contains("active")
          ) {
            mobileMenu.classList.remove("active");
            mobileMenu.setAttribute("aria-hidden", "true");
            menuButton.setAttribute("aria-expanded", "false");
          }
        });
      }
    }
  }
  
  /**
   * Smooth Scrolling
   * Implements smooth scrolling when clicking on navigation links
   */
  function initSmoothScroll() {
    // Select all links that point to an ID on the page
    const links = document.querySelectorAll('a[href^="#"]');
  
    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        // Only if the href is not just "#"
        if (this.getAttribute("href") !== "#") {
          e.preventDefault();
  
          const targetId = this.getAttribute("href");
          const targetElement = document.querySelector(targetId);
  
          if (targetElement) {
            // Smooth scroll to element
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
  
            // Update URL but without scrolling
            history.pushState(null, null, targetId);
          }
        }
      });
    });
  }
  
  /**
   * Property Image Effects
   * Adds subtle animations for property images on hover
   */
  function initPropertyImageEffects() {
    const propertyImages = document.querySelectorAll(".property-image");
  
    propertyImages.forEach((image) => {
      // Add hover effect styles
      const style = document.createElement("style");
      style.textContent = `
        .property-image {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .property-image:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }
      `;
      document.head.appendChild(style);
  
      // Add loading animation
      image.style.opacity = "0";
      image.style.transition = "opacity 0.5s ease";
  
      // Show image when loaded
      if (image.complete) {
        image.style.opacity = "1";
      } else {
        image.addEventListener("load", function () {
          image.style.opacity = "1";
        });
      }
    });
  
    // Add click effect for property cards
    const propertyCards = document.querySelectorAll(".property-card");
    propertyCards.forEach((card) => {
      const link = card.querySelector(".property-link");
      if (link) {
        card.style.cursor = "pointer";
        card.addEventListener("click", function (e) {
          // Don't trigger if clicking on the link directly
          if (e.target !== link && !link.contains(e.target)) {
            link.click();
          }
        });
      }
    });
  }
  
  /**
   * Scroll Animations
   * Animates elements as they come into view while scrolling
   */
  function initScrollAnimations() {
    // Elements to animate on scroll
    const animatedElements = [
      ...document.querySelectorAll(".feature-card"),
      ...document.querySelectorAll(".property-card"),
      ...document.querySelectorAll(".section-title"),
      ...document.querySelectorAll(".hero-title"),
    ];
  
    // Add animation styles
    const style = document.createElement("style");
    style.textContent = `
      .animate-on-scroll {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
      }
      .animate-on-scroll.animated {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
  
    // Add animation class to elements
    animatedElements.forEach((element) => {
      element.classList.add("animate-on-scroll");
    });
  
    // Check if elements are in viewport and animate them
    function checkAnimations() {
      animatedElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150; // How many pixels from the viewport edge to start animation
  
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add("animated");
        }
      });
    }
  
    // Run on scroll
    window.addEventListener("scroll", checkAnimations);
  
    // Run once on page load
    checkAnimations();
  }
  
  /**
   * Partner Logo Animation
   * Adds subtle animations for partner logos
   */
  function initPartnerLogoEffects() {
    const partnerLogos = document.querySelectorAll(".partner-logo");
  
    // Add hover effect styles
    const style = document.createElement("style");
    style.textContent = `
      .partner-logo {
        transition: transform 0.3s ease, opacity 0.3s ease;
        opacity: 0.8;
      }
      .partner-logo:hover {
        transform: scale(1.05);
        opacity: 1;
      }
    `;
    document.head.appendChild(style);
  
    // Add click event to partner logos (for future functionality)
    partnerLogos.forEach((logo) => {
      logo.style.cursor = "pointer";
      logo.addEventListener("click", function () {
        // Placeholder for future functionality
        console.log("Partner logo clicked:", this.alt);
      });
    });
  }
  
  // Initialize partner logo effects
  initPartnerLogoEffects();
  