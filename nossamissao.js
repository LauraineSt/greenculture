document.addEventListener("DOMContentLoaded", function () {
    // Mobile menu toggle
    const menuButton = document.querySelector(".mobile-menu");
    const mobileNav = document.createElement("div");
    mobileNav.className = "mobile-nav";
    mobileNav.innerHTML = `
      <div class="mobile-nav-content">
        <div class="mobile-nav-close">×</div>
        <nav class="mobile-nav-links">
          <a href="#mission">Nossa missão</a>
          <a href="#about">Sobre nós</a>
          <a href="#features">Conexão</a>
          <a href="#sustainability">Sustentabilidade</a>
          <a href="#partners">Parceiros</a>
        </nav>
      </div>
    `;
    document.body.appendChild(mobileNav);
  
    // Add styles for mobile nav
    const style = document.createElement("style");
    style.textContent = `
      .mobile-nav {
        position: fixed;
        top: 0;
        right: -100%;
        width: 80%;
        height: 100vh;
        background-color: #456452;
        z-index: 1000;
        transition: right 0.3s ease;
      }
      .mobile-nav.active {
        right: 0;
      }
      .mobile-nav-content {
        padding: 60px 20px 20px;
        display: flex;
        flex-direction: column;
        height: 100%;
      }
      .mobile-nav-close {
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 30px;
        color: white;
        cursor: pointer;
      }
      .mobile-nav-links {
        display: flex;
        flex-direction: column;
        gap: 20px;
        margin-top: 40px;
      }
      .mobile-nav-links a {
        color: white;
        text-decoration: none;
        font-size: 18px;
        padding: 10px 0;
        border-bottom: 1px solid rgba(255,255,255,0.1);
      }
      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0,0,0,0.5);
        z-index: 999;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease;
      }
      .overlay.active {
        opacity: 1;
        visibility: visible;
      }
    `;
    document.head.appendChild(style);
  
    // Create overlay
    const overlay = document.createElement("div");
    overlay.className = "overlay";
    document.body.appendChild(overlay);
  
    // Toggle mobile menu
    menuButton.addEventListener("click", function () {
      mobileNav.classList.add("active");
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  
    // Close mobile menu
    const closeButton = document.querySelector(".mobile-nav-close");
    closeButton.addEventListener("click", closeMobileMenu);
    overlay.addEventListener("click", closeMobileMenu);
  
    function closeMobileMenu() {
      mobileNav.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    }
  
    // Close mobile menu when clicking on a link
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-links a");
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });
  
    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
  
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: "smooth",
          });
        }
      });
    });
  
    // Add IDs to sections for navigation
    document.querySelector(".mission-section").id = "mission";
    document.querySelector(".about-section").id = "about";
    document.querySelector(".features-section").id = "features";
    document.querySelector(".sustainability-section").id = "sustainability";
    document.querySelector(".partners-title").id = "partners";
  
    // Make CTA buttons work with smooth scrolling
    const ctaButtons = document.querySelectorAll(".cta-button");
    ctaButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Default behavior: scroll to sustainability section
        const targetSection = document.querySelector("#sustainability");
        window.scrollTo({
          top: targetSection.offsetTop - 70,
          behavior: "smooth",
        });
      });
    });
  
    // Simple animation for elements as they enter viewport
    const animateOnScroll = function () {
      const elements = document.querySelectorAll(
        ".mission-content, .about-text, .about-image, .features-header, .feature-item, .sustainability-content, .partners-grid",
      );
  
      elements.forEach((element) => {
        // Add animation-ready class to all elements
        if (
          !element.classList.contains("animation-ready") &&
          !element.classList.contains("animated")
        ) {
          element.classList.add("animation-ready");
          element.style.opacity = "0";
          element.style.transform = "translateY(20px)";
          element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        }
  
        // Check if element is in viewport
        const position = element.getBoundingClientRect();
        if (
          position.top < window.innerHeight - 100 &&
          !element.classList.contains("animated")
        ) {
          element.classList.add("animated");
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
        }
      });
    };
  
    // Run animation check on load and scroll
    window.addEventListener("scroll", animateOnScroll);
    window.addEventListener("load", animateOnScroll);
  
    // Initialize animations
    animateOnScroll();
  });
  