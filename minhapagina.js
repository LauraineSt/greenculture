/**
 * GreenCulture App JavaScript
 * Provides interactive functionality for the mobile app interface
 */

document.addEventListener("DOMContentLoaded", function () {
    // Initialize all components
    initSearchBar();
    initMobileMenu();
    initLazyLoading();
    initSmoothScrolling();
  });
  
  /**
   * Search Bar Functionality
   * Handles search input interactions and submission
   */
  function initSearchBar() {
    const searchBar = document.querySelector(".search-bar");
    const searchPlaceholder = document.querySelector(".search-placeholder");
  
    if (!searchBar || !searchPlaceholder) return;
  
    // Convert the search bar to an interactive element
    searchBar.addEventListener("click", function () {
      // Create input element if it doesn't exist
      if (!document.querySelector(".search-input")) {
        const searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.className = "search-input";
        searchInput.placeholder = "Viaja connosco";
        searchInput.setAttribute("aria-label", "Pesquisar destinos");
  
        // Replace placeholder with input
        searchPlaceholder.style.display = "none";
        searchBar.appendChild(searchInput);
  
        // Focus the input
        searchInput.focus();
  
        // Handle search submission
        searchInput.addEventListener("keypress", function (e) {
          if (e.key === "Enter") {
            handleSearch(searchInput.value);
          }
        });
      }
    });
  
    // Handle clicks outside the search bar
    document.addEventListener("click", function (event) {
      const searchInput = document.querySelector(".search-input");
      if (searchInput && !searchBar.contains(event.target)) {
        // If input is empty, restore placeholder
        if (searchInput.value.trim() === "") {
          searchPlaceholder.style.display = "";
          searchInput.remove();
        }
      }
    });
  }
  
  /**
   * Handle search submission
   * @param {string} query - The search query
   */
  function handleSearch(query) {
    if (!query || query.trim() === "") return;
  
    console.log("Searching for:", query);
    // Here you would typically make an API call or redirect to search results
    // For demo purposes, we'll show an alert
    alert(`Pesquisando por: ${query}`);
  }
  
  /**
   * Mobile Menu Functionality
   * Toggles the mobile navigation menu
   */
  function initMobileMenu() {
    const menuButton = document.querySelector('.icon-button[aria-label="Menu"]');
  
    if (!menuButton) return;
  
    // Create mobile menu if it doesn't exist
    if (!document.querySelector(".mobile-menu")) {
      const mobileMenu = document.createElement("div");
      mobileMenu.className = "mobile-menu";
      mobileMenu.setAttribute("aria-hidden", "true");
  
      // Add menu items
      mobileMenu.innerHTML = `
              <div class="mobile-menu-container">
                  <button class="close-menu" aria-label="Fechar menu">×</button>
                  <nav class="mobile-nav">
                      <a href="#" class="mobile-nav-link">Início</a>
                      <a href="#" class="mobile-nav-link">Destinos</a>
                      <a href="#" class="mobile-nav-link">Viagens recentes</a>
                      <a href="#" class="mobile-nav-link">Sobre nós</a>
                      <a href="#" class="mobile-nav-link">Contactos</a>
                  </nav>
              </div>
          `;
  
      document.body.appendChild(mobileMenu);
  
      // Style the mobile menu
      const style = document.createElement("style");
      style.textContent = `
              .mobile-menu {
                  position: fixed;
                  top: 0;
                  right: -280px;
                  width: 280px;
                  height: 100%;
                  background-color: #456452;
                  z-index: 1000;
                  transition: right 0.3s ease;
                  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
              }
              .mobile-menu.active {
                  right: 0;
              }
              .mobile-menu-container {
                  padding: 20px;
                  display: flex;
                  flex-direction: column;
                  height: 100%;
              }
              .close-menu {
                  align-self: flex-end;
                  background: none;
                  border: none;
                  color: white;
                  font-size: 24px;
                  cursor: pointer;
                  margin-bottom: 20px;
              }
              .mobile-nav {
                  display: flex;
                  flex-direction: column;
                  gap: 20px;
              }
              .mobile-nav-link {
                  color: white;
                  text-decoration: none;
                  font-size: 18px;
                  padding: 10px 0;
                  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
              }
              .overlay {
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background-color: rgba(0, 0, 0, 0.5);
                  z-index: 999;
                  display: none;
              }
              .overlay.active {
                  display: block;
              }
          `;
      document.head.appendChild(style);
  
      // Create overlay
      const overlay = document.createElement("div");
      overlay.className = "overlay";
      document.body.appendChild(overlay);
  
      // Toggle menu on button click
      menuButton.addEventListener("click", function () {
        const mobileMenu = document.querySelector(".mobile-menu");
        const overlay = document.querySelector(".overlay");
  
        mobileMenu.classList.add("active");
        mobileMenu.setAttribute("aria-hidden", "false");
        overlay.classList.add("active");
  
        // Prevent body scrolling when menu is open
        document.body.style.overflow = "hidden";
      });
  
      // Close menu when clicking the close button
      document.querySelector(".close-menu").addEventListener("click", closeMenu);
  
      // Close menu when clicking the overlay
      overlay.addEventListener("click", closeMenu);
  
      // Close menu when pressing Escape key
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
          closeMenu();
        }
      });
    }
  }
  
  /**
   * Close the mobile menu
   */
  function closeMenu() {
    const mobileMenu = document.querySelector(".mobile-menu");
    const overlay = document.querySelector(".overlay");
  
    if (mobileMenu && overlay) {
      mobileMenu.classList.remove("active");
      mobileMenu.setAttribute("aria-hidden", "true");
      overlay.classList.remove("active");
  
      // Restore body scrolling
      document.body.style.overflow = "";
    }
  }
  
  /**
   * Lazy Loading for Images
   * Loads images only when they are about to enter the viewport
   */
  function initLazyLoading() {
    // Check if IntersectionObserver is supported
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              const src = img.getAttribute("src");
  
              // Only process images with placeholder URLs
              if (src && src.startsWith("URL_")) {
                // In a real implementation, you would replace the placeholder
                // with the actual image URL. For this demo, we'll just log it.
                console.log(`Loading image: ${src}`);
  
                // Simulate image loading with a visual effect
                img.style.transition = "opacity 0.3s ease";
                img.style.opacity = "0.7";
  
                setTimeout(() => {
                  img.style.opacity = "1";
                }, 500);
              }
  
              // Stop observing the image after it's loaded
              observer.unobserve(img);
            }
          });
        },
        {
          rootMargin: "50px 0px",
          threshold: 0.1,
        },
      );
  
      // Observe all images
      document.querySelectorAll("img").forEach((img) => {
        imageObserver.observe(img);
      });
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      console.log(
        "IntersectionObserver not supported. All images loaded immediately.",
      );
    }
  }
  
  /**
   * Smooth Scrolling for Navigation Links
   */
  function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
  
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
  
        const targetElement = document.querySelector(targetId);
  
        if (targetElement) {
          // Close mobile menu if open
          closeMenu();
  
          // Smooth scroll to target
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }
  
  /**
   * Add animation effects to elements
   * Animates elements as they enter the viewport
   */
  function initAnimations() {
    // Check if IntersectionObserver is supported
    if ("IntersectionObserver" in window) {
      const animationObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate");
            }
          });
        },
        {
          threshold: 0.1,
        },
      );
  
      // Add animation classes to elements
      const animateElements = document.querySelectorAll(
        ".about-content, .trip-card, .testimonial-content",
      );
  
      animateElements.forEach((el) => {
        el.classList.add("animate-on-scroll");
        animationObserver.observe(el);
      });
  
      // Add animation styles
      const style = document.createElement("style");
      style.textContent = `
              .animate-on-scroll {
                  opacity: 0;
                  transform: translateY(20px);
                  transition: opacity 0.6s ease, transform 0.6s ease;
              }
              .animate-on-scroll.animate {
                  opacity: 1;
                  transform: translateY(0);
              }
          `;
      document.head.appendChild(style);
    }
  }
  
  // Initialize animations after a short delay
  setTimeout(initAnimations, 500);
  