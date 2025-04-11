// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Mobile menu toggle
    initMobileMenu();
  
    // Smooth scrolling for navigation links
    initSmoothScrolling();
  
    // Gallery functionality
    initGallery();
  
    // Form validation
    initFormValidation();
  
    // Animation effects
    initAnimations();
  });
  
  /**
   * Initialize mobile menu functionality
   */
  function initMobileMenu() {
    const menuIcon = document.querySelector(".menu-icon");
    const navLinks = document.querySelector(".footer-nav");
  
    // Clone navigation for mobile menu
    if (menuIcon && navLinks) {
      const mobileNav = document.createElement("div");
      mobileNav.className = "mobile-nav";
      mobileNav.innerHTML = navLinks.innerHTML;
      document.querySelector(".main-header").appendChild(mobileNav);
  
      // Initially hide the mobile menu
      mobileNav.style.display = "none";
  
      // Toggle mobile menu on click
      menuIcon.addEventListener("click", function () {
        if (mobileNav.style.display === "none") {
          mobileNav.style.display = "block";
          mobileNav.style.position = "absolute";
          mobileNav.style.top = "64px";
          mobileNav.style.left = "0";
          mobileNav.style.width = "100%";
          mobileNav.style.backgroundColor = "#ECEFED";
          mobileNav.style.padding = "20px";
          mobileNav.style.zIndex = "100";
          mobileNav.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        } else {
          mobileNav.style.display = "none";
        }
      });
  
      // Close menu when clicking outside
      document.addEventListener("click", function (event) {
        if (!mobileNav.contains(event.target) && event.target !== menuIcon) {
          mobileNav.style.display = "none";
        }
      });
    }
  }
  
  /**
   * Initialize smooth scrolling for navigation links
   */
  function initSmoothScrolling() {
    // Get all links that have hash references
    const links = document.querySelectorAll('a[href^="#"]');
  
    links.forEach((link) => {
      link.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
  
        // Skip if it's just "#"
        if (href === "#") return;
  
        const targetElement = document.querySelector(href);
  
        if (targetElement) {
          e.preventDefault();
  
          // Smooth scroll to the element
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }
  
  /**
   * Initialize gallery functionality
   */
  function initGallery() {
    const galleryImages = document.querySelectorAll(".gallery-image");
    const gallerySection = document.querySelector(".gallery-section");
  
    if (galleryImages.length > 0 && gallerySection) {
      // Create gallery navigation
      const galleryNav = document.createElement("div");
      galleryNav.className = "gallery-navigation";
      galleryNav.style.display = "flex";
      galleryNav.style.justifyContent = "center";
      galleryNav.style.gap = "10px";
      galleryNav.style.marginTop = "20px";
  
      // Create dots for each image
      galleryImages.forEach((image, index) => {
        const dot = document.createElement("span");
        dot.className = "gallery-dot";
        dot.style.width = "10px";
        dot.style.height = "10px";
        dot.style.borderRadius = "50%";
        dot.style.backgroundColor = index === 0 ? "#456452" : "#C7CBBD";
        dot.style.cursor = "pointer";
  
        dot.addEventListener("click", () => {
          // Hide all images
          galleryImages.forEach((img) => {
            img.style.display = "none";
          });
  
          // Show selected image
          galleryImages[index].style.display = "block";
  
          // Update dots
          document.querySelectorAll(".gallery-dot").forEach((d, i) => {
            d.style.backgroundColor = i === index ? "#456452" : "#C7CBBD";
          });
        });
  
        galleryNav.appendChild(dot);
      });
  
      // Add navigation to gallery section
      gallerySection.appendChild(galleryNav);
  
      // Initially hide all images except the first one
      galleryImages.forEach((image, index) => {
        if (index !== 0) {
          image.style.display = "none";
        }
      });
    }
  }
  
  /**
   * Initialize form validation
   */
  function initFormValidation() {
    const bookingButton = document.querySelector(".booking-button");
  
    if (bookingButton) {
      bookingButton.addEventListener("click", function () {
        // Create a simple modal for booking
        const modal = document.createElement("div");
        modal.className = "booking-modal";
        modal.style.position = "fixed";
        modal.style.top = "0";
        modal.style.left = "0";
        modal.style.width = "100%";
        modal.style.height = "100%";
        modal.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        modal.style.display = "flex";
        modal.style.justifyContent = "center";
        modal.style.alignItems = "center";
        modal.style.zIndex = "1000";
  
        // Create modal content
        const modalContent = document.createElement("div");
        modalContent.className = "modal-content";
        modalContent.style.backgroundColor = "#ECEFED";
        modalContent.style.padding = "30px";
        modalContent.style.borderRadius = "8px";
        modalContent.style.maxWidth = "400px";
        modalContent.style.width = "90%";
  
        // Add form title
        const formTitle = document.createElement("h3");
        formTitle.textContent = "Reservar Experiência";
        formTitle.style.fontFamily =
          "Poppins, -apple-system, Roboto, Helvetica, sans-serif";
        formTitle.style.fontSize = "24px";
        formTitle.style.color = "#456452";
        formTitle.style.marginBottom = "20px";
  
        // Create a simple form
        const form = document.createElement("form");
        form.innerHTML = `
                  <div style="margin-bottom: 15px;">
                      <label for="name" style="display: block; margin-bottom: 5px; color: #456452;">Nome</label>
                      <input type="text" id="name" required style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #C7CBBD;">
                  </div>
                  <div style="margin-bottom: 15px;">
                      <label for="email" style="display: block; margin-bottom: 5px; color: #456452;">Email</label>
                      <input type="email" id="email" required style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #C7CBBD;">
                  </div>
                  <div style="margin-bottom: 15px;">
                      <label for="experience" style="display: block; margin-bottom: 5px; color: #456452;">Experiência</label>
                      <select id="experience" required style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #C7CBBD;">
                          <option value="">Selecione uma experiência</option>
                          <option value="workshop">Workshop Cultural</option>
                          <option value="ecotour">Eco Tour</option>
                          <option value="local">Experiência Local</option>
                      </select>
                  </div>
                  <div style="margin-bottom: 15px;">
                      <label for="date" style="display: block; margin-bottom: 5px; color: #456452;">Data</label>
                      <input type="date" id="date" required style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #C7CBBD;">
                  </div>
                  <button type="submit" style="background-color: #C7CBBD; color: #533924; border: none; padding: 10px 16px; border-radius: 6px; cursor: pointer; font-family: 'Lato', sans-serif; font-weight: 500;">Confirmar Reserva</button>
                  <button type="button" class="cancel-button" style="background-color: transparent; color: #456452; border: 1px solid #456452; padding: 10px 16px; border-radius: 6px; cursor: pointer; font-family: 'Lato', sans-serif; font-weight: 500; margin-left: 10px;">Cancelar</button>
              `;
  
        // Add form submission handler
        form.addEventListener("submit", function (e) {
          e.preventDefault();
  
          // Simple validation
          const name = document.getElementById("name").value;
          const email = document.getElementById("email").value;
          const experience = document.getElementById("experience").value;
          const date = document.getElementById("date").value;
  
          if (!name || !email || !experience || !date) {
            alert("Por favor, preencha todos os campos.");
            return;
          }
  
          // Show success message
          modalContent.innerHTML = `
                      <h3 style="font-family: 'Poppins', sans-serif; font-size: 24px; color: #456452; margin-bottom: 20px;">Reserva Confirmada!</h3>
                      <p style="font-family: 'Lato', sans-serif; color: #456452; margin-bottom: 20px;">Obrigado, ${name}! Sua reserva para ${document.getElementById("experience").options[document.getElementById("experience").selectedIndex].text} em ${date} foi confirmada.</p>
                      <p style="font-family: 'Lato', sans-serif; color: #456452; margin-bottom: 20px;">Enviamos um email para ${email} com os detalhes da sua reserva.</p>
                      <button type="button" class="close-button" style="background-color: #C7CBBD; color: #533924; border: none; padding: 10px 16px; border-radius: 6px; cursor: pointer; font-family: 'Lato', sans-serif; font-weight: 500;">Fechar</button>
                  `;
  
          // Add close button handler
          modalContent
            .querySelector(".close-button")
            .addEventListener("click", function () {
              document.body.removeChild(modal);
            });
        });
  
        // Add cancel button handler
        modalContent.appendChild(formTitle);
        modalContent.appendChild(form);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
  
        // Close modal when clicking cancel
        form
          .querySelector(".cancel-button")
          .addEventListener("click", function () {
            document.body.removeChild(modal);
          });
  
        // Close modal when clicking outside
        modal.addEventListener("click", function (e) {
          if (e.target === modal) {
            document.body.removeChild(modal);
          }
        });
      });
    }
  
    // Add functionality to help button
    const helpButton = document.querySelector(".help-button");
    if (helpButton) {
      helpButton.addEventListener("click", function () {
        alert(
          "Nossa equipe de suporte está disponível para ajudar! Entre em contato pelo email: suporte@greenculture.com",
        );
      });
    }
  
    // Add functionality to CTA button
    const ctaButton = document.querySelector(".cta-button");
    if (ctaButton) {
      ctaButton.addEventListener("click", function () {
        window.location.href = "#booking-section";
      });
    }
  }
  
  /**
   * Initialize animations for better user experience
   */
  function initAnimations() {
    // Fade in elements as they come into view
    const fadeElements = document.querySelectorAll(
      ".experience-card, .gallery-image, .testimonial-content, .benefits-container",
    );
  
    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add fade-in class when element is in view
            entry.target.classList.add("fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      },
    );
  
    // Observe each element
    fadeElements.forEach((element) => {
      // Set initial opacity
      element.style.opacity = "0";
      element.style.transition = "opacity 0.5s ease-in-out";
  
      // Add custom class for the animation
      element.classList.add("animate-on-scroll");
  
      // Start observing
      observer.observe(element);
    });
  
    // Define the fade-in animation
    const style = document.createElement("style");
    style.textContent = `
          .animate-on-scroll {
              opacity: 0;
              transform: translateY(20px);
              transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
          }
  
          .fade-in {
              opacity: 1 !important;
              transform: translateY(0) !important;
          }
      `;
    document.head.appendChild(style);
  }
  