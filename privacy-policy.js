// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Menu functionality
    const menuIcon = document.querySelector(".menu-icon");
    const navLinks = document.querySelector(".footer-nav");
    let isMenuOpen = false;
  
    // Toggle menu on click
    menuIcon.addEventListener("click", function (e) {
      e.preventDefault();
      toggleMenu();
    });
  
    // Toggle menu on keyboard enter/space
    menuIcon.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleMenu();
      }
    });
  
    function toggleMenu() {
      isMenuOpen = !isMenuOpen;
      menuIcon.setAttribute("aria-expanded", isMenuOpen);
      navLinks.style.display = isMenuOpen ? "block" : "none";
    }
  
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
  
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          });
        }
      });
    });
  
    // Add keyboard navigation for social links
    const socialLinks = document.querySelectorAll(".social-links a");
    socialLinks.forEach((link) => {
      // Add hover and focus states
      link.addEventListener("mouseenter", function () {
        this.style.opacity = "0.8";
      });
  
      link.addEventListener("mouseleave", function () {
        this.style.opacity = "1";
      });
  
      // Ensure proper focus handling
      link.addEventListener("focus", function () {
        this.style.outline = "2px solid #fff";
        this.style.outlineOffset = "2px";
      });
  
      link.addEventListener("blur", function () {
        this.style.outline = "none";
      });
    });
  
    // Add accessibility attributes
    menuIcon.setAttribute("role", "button");
    menuIcon.setAttribute("aria-label", "Toggle menu");
    menuIcon.setAttribute("aria-expanded", "false");
    menuIcon.setAttribute("tabindex", "0");
  
    // Error handling for images
    document.querySelectorAll("img").forEach((img) => {
      img.addEventListener("error", function () {
        this.style.display = "none";
        console.error(`Failed to load image: ${this.src}`);
      });
    });
  
    // Initialize any dynamic content
    function initializeDynamicContent() {
      // Add current year to copyright if needed
      const copyrightElement = document.querySelector(".copyright");
      if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.textContent = copyrightElement.textContent.replace(
          "2025",
          currentYear,
        );
      }
    }
  
    initializeDynamicContent();
  });
  