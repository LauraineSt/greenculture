// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    try {
      // Initialize all functionality
      initMobileMenu();
      initSmoothScroll();
      initAnimations();
      initButtonEffects();
    } catch (error) {
      console.error("Error initializing page functionality:", error);
    }
  });
  
  /**
   * Mobile Menu Toggle Functionality
   */
  function initMobileMenu() {
    try {
      const menuIcon = document.querySelector(".menu-icon");
      const navLinks = document.querySelector(".footer-nav");
  
      // Clone the footer navigation for the mobile menu
      if (menuIcon && navLinks) {
        const mobileNav = document.createElement("nav");
        mobileNav.className = "mobile-nav";
        mobileNav.innerHTML = navLinks.innerHTML;
        document.querySelector(".main-header").appendChild(mobileNav);
  
        // Initially hide the mobile menu
        mobileNav.style.display = "none";
  
        // Toggle mobile menu when menu icon is clicked
        menuIcon.addEventListener("click", function () {
          if (mobileNav.style.display === "none") {
            mobileNav.style.display = "block";
            menuIcon.classList.add("active");
          } else {
            mobileNav.style.display = "none";
            menuIcon.classList.remove("active");
          }
        });
  
        // Close menu when clicking outside
        document.addEventListener("click", function (event) {
          if (
            !event.target.closest(".mobile-nav") &&
            !event.target.closest(".menu-icon")
          ) {
            mobileNav.style.display = "none";
            menuIcon.classList.remove("active");
          }
        });
      }
    } catch (error) {
      console.error("Error initializing mobile menu:", error);
    }
  }
  
  /**
   * Smooth Scrolling for Navigation Links
   */
  function initSmoothScroll() {
    try {
      const links = document.querySelectorAll('a[href^="#"]');
  
      links.forEach((link) => {
        link.addEventListener("click", function (e) {
          e.preventDefault();
  
          const targetId = this.getAttribute("href");
          if (targetId === "#") return;
  
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            // Smooth scroll to target
            window.scrollTo({
              top: targetElement.offsetTop - 70, // Offset for header
              behavior: "smooth",
            });
  
            // Close mobile menu if open
            const mobileNav = document.querySelector(".mobile-nav");
            if (mobileNav) {
              mobileNav.style.display = "none";
              document.querySelector(".menu-icon").classList.remove("active");
            }
          }
        });
      });
    } catch (error) {
      console.error("Error initializing smooth scroll:", error);
    }
  }
  
  /**
   * Animations for Content Sections
   */
  function initAnimations() {
    try {
      // Add animation classes to elements
      const sections = document.querySelectorAll("section");
      sections.forEach((section) => {
        section.classList.add("animate-on-scroll");
      });
  
      const cards = document.querySelectorAll(".option-card");
      cards.forEach((card, index) => {
        card.classList.add("animate-on-scroll");
        card.style.transitionDelay = `${index * 0.2}s`;
      });
  
      // Simple animation on scroll without using Intersection Observer
      function checkScroll() {
        const elements = document.querySelectorAll(".animate-on-scroll");
        elements.forEach((element) => {
          const elementTop = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
  
          if (elementTop < windowHeight * 0.9) {
            element.classList.add("animate");
          }
        });
      }
  
      // Initial check
      checkScroll();
  
      // Check on scroll
      window.addEventListener("scroll", checkScroll);
    } catch (error) {
      console.error("Error initializing animations:", error);
    }
  }
  
  /**
   * Button Hover and Click Effects
   */
  function initButtonEffects() {
    try {
      const buttons = document.querySelectorAll(".cta-button");
  
      buttons.forEach((button) => {
        // Add hover effect
        button.addEventListener("mouseenter", function () {
          this.style.backgroundColor = "#b8bfaa";
          this.style.transform = "translateY(-2px)";
          this.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
        });
  
        button.addEventListener("mouseleave", function () {
          this.style.backgroundColor = "";
          this.style.transform = "";
          this.style.boxShadow = "";
        });
  
        // Add click effect
        button.addEventListener("click", function () {
          this.style.transform = "translateY(1px)";
          this.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
  
          // Reset after click animation
          setTimeout(() => {
            this.style.transform = "";
            this.style.boxShadow = "";
          }, 200);
  
          // Show a simple confirmation message
          const message = document.createElement("div");
          message.className = "confirmation-message";
          message.textContent = "Obrigado pelo seu interesse!";
          message.style.position = "fixed";
          message.style.top = "20px";
          message.style.left = "50%";
          message.style.transform = "translateX(-50%)";
          message.style.backgroundColor = "#456452";
          message.style.color = "white";
          message.style.padding = "10px 20px";
          message.style.borderRadius = "4px";
          message.style.zIndex = "1000";
  
          document.body.appendChild(message);
  
          // Remove the message after 3 seconds
          setTimeout(() => {
            message.style.opacity = "0";
            message.style.transition = "opacity 0.5s ease";
  
            setTimeout(() => {
              document.body.removeChild(message);
            }, 500);
          }, 3000);
        });
      });
    } catch (error) {
      console.error("Error initializing button effects:", error);
    }
  }
  
  /**
   * Parallax Effect for Hero Section
   */
  function initParallaxEffect() {
    try {
      const heroSection = document.querySelector(".hero-section");
      const heroImage = document.querySelector(".hero-image");
  
      if (heroSection && heroImage) {
        window.addEventListener("scroll", function () {
          const scrollPosition = window.pageYOffset;
          const speed = 0.5;
  
          // Apply parallax effect only if the section is in view
          if (scrollPosition < heroSection.offsetHeight) {
            heroImage.style.transform = `translateY(${scrollPosition * speed}px)`;
          }
        });
      }
    } catch (error) {
      console.error("Error initializing parallax effect:", error);
    }
  }
  
  // Initialize parallax effect
  initParallaxEffect();
  