// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Form validation
  setupFormValidation();

  // Mobile menu toggle
  setupMobileMenu();

  // Smooth scrolling for navigation links
  setupSmoothScrolling();
});

/**
 * Sets up form validation for the testimonial form
 */
function setupFormValidation() {
  const testimonialForm = document.querySelector(".testimonial-form");
  const messageField = document.getElementById("message");
  const termsCheckbox = document.getElementById("terms");

  if (testimonialForm) {
    testimonialForm.addEventListener("submit", function (event) {
      // Prevent default form submission
      event.preventDefault();

      // Reset previous error states
      resetFormErrors();

      // Validate form fields
      let isValid = true;

      // Validate message field
      if (!messageField.value.trim()) {
        showError(messageField, "Por favor, digite sua mensagem");
        isValid = false;
      }

      // Validate terms checkbox
      if (!termsCheckbox.checked) {
        showError(termsCheckbox, "Você deve aceitar os termos");
        isValid = false;
      }

      // If form is valid, submit it
      if (isValid) {
        showSuccessMessage(testimonialForm);
        // In a real application, you would submit the form data here
        // For demo purposes, we'll just reset the form after a delay
        setTimeout(() => {
          testimonialForm.reset();
          removeSuccessMessage();
        }, 3000);
      }
    });
  }
}

/**
 * Shows an error message for a form field
 * @param {HTMLElement} element - The form element with error
 * @param {string} message - The error message to display
 */
function showError(element, message) {
  // Create error message element
  const errorElement = document.createElement("div");
  errorElement.className = "error-message";
  errorElement.textContent = message;
  errorElement.style.color = "#e74c3c";
  errorElement.style.fontSize = "14px";
  errorElement.style.marginTop = "5px";

  // Add error class to the element
  element.classList.add("error");
  element.style.borderColor = "#e74c3c";

  // Insert error message after the element or its label
  if (element.type === "checkbox") {
    const parent = element.closest(".form-checkbox");
    parent.appendChild(errorElement);
  } else {
    element.parentNode.appendChild(errorElement);
  }
}

/**
 * Resets all form error states
 */
function resetFormErrors() {
  // Remove all error messages
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((error) => error.remove());

  // Remove error class from all elements
  const errorElements = document.querySelectorAll(".error");
  errorElements.forEach((element) => {
    element.classList.remove("error");
    element.style.borderColor = "";
  });
}

/**
 * Shows a success message after form submission
 * @param {HTMLElement} form - The form element
 */
function showSuccessMessage(form) {
  // Remove any existing success message
  removeSuccessMessage();

  // Create success message
  const successMessage = document.createElement("div");
  successMessage.className = "success-message";
  successMessage.textContent = "Obrigado pelo seu testemunho!";
  successMessage.style.backgroundColor = "#2ecc71";
  successMessage.style.color = "white";
  successMessage.style.padding = "10px";
  successMessage.style.borderRadius = "6px";
  successMessage.style.marginTop = "20px";
  successMessage.style.textAlign = "center";

  // Add success message after the form
  form.parentNode.insertBefore(successMessage, form.nextSibling);
}

/**
 * Removes the success message
 */
function removeSuccessMessage() {
  const successMessage = document.querySelector(".success-message");
  if (successMessage) {
    successMessage.remove();
  }
}

/**
 * Sets up mobile menu toggle functionality
 */
function setupMobileMenu() {
  const menuIcon = document.querySelector(".menu-icon");

  // Create mobile menu if it doesn't exist
  if (!document.querySelector(".mobile-menu")) {
    createMobileMenu();
  }

  const mobileMenu = document.querySelector(".mobile-menu");

  if (menuIcon && mobileMenu) {
    menuIcon.addEventListener("click", function () {
      // Toggle mobile menu visibility
      if (mobileMenu.classList.contains("active")) {
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "";
      } else {
        mobileMenu.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
      }
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
      if (
        mobileMenu.classList.contains("active") &&
        !mobileMenu.contains(event.target) &&
        event.target !== menuIcon
      ) {
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }
}

/**
 * Creates the mobile menu structure
 */
function createMobileMenu() {
  // Create mobile menu container
  const mobileMenu = document.createElement("div");
  mobileMenu.className = "mobile-menu";

  // Style the mobile menu
  mobileMenu.style.position = "fixed";
  mobileMenu.style.top = "0";
  mobileMenu.style.right = "-100%";
  mobileMenu.style.width = "80%";
  mobileMenu.style.height = "100vh";
  mobileMenu.style.backgroundColor = "#456452";
  mobileMenu.style.zIndex = "1000";
  mobileMenu.style.transition = "right 0.3s ease-in-out";
  mobileMenu.style.padding = "60px 20px 20px";
  mobileMenu.style.boxShadow = "-5px 0 15px rgba(0, 0, 0, 0.1)";

  // Add close button
  const closeButton = document.createElement("button");
  closeButton.className = "close-menu";
  closeButton.innerHTML = "&times;";
  closeButton.style.position = "absolute";
  closeButton.style.top = "20px";
  closeButton.style.right = "20px";
  closeButton.style.background = "none";
  closeButton.style.border = "none";
  closeButton.style.fontSize = "24px";
  closeButton.style.color = "white";
  closeButton.style.cursor = "pointer";

  // Add navigation links
  const navLinks = document.createElement("nav");
  navLinks.className = "mobile-nav";
  navLinks.style.display = "flex";
  navLinks.style.flexDirection = "column";
  navLinks.style.gap = "20px";

  // Add the same links as in the footer
  const links = [
    { text: "Sobre", href: "#" },
    { text: "Contactos", href: "#" },
  ];

  links.forEach((link) => {
    const a = document.createElement("a");
    a.href = link.href;
    a.textContent = link.text;
    a.style.color = "white";
    a.style.textDecoration = "none";
    a.style.fontSize = "18px";
    a.style.padding = "10px 0";
    a.style.borderBottom = "1px solid rgba(255, 255, 255, 0.1)";
    navLinks.appendChild(a);
  });

  // Add event listener to close button
  closeButton.addEventListener("click", function () {
    mobileMenu.classList.remove("active");
    document.body.style.overflow = "";
  });

  // Append elements to mobile menu
  mobileMenu.appendChild(closeButton);
  mobileMenu.appendChild(navLinks);

  // Add CSS for active state
  const style = document.createElement("style");
  style.textContent = `
    .mobile-menu.active {
      right: 0;
    }
  `;
  document.head.appendChild(style);

  // Append mobile menu to body
  document.body.appendChild(mobileMenu);
}

/**
 * Sets up smooth scrolling for navigation links
 */
function setupSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      // Only process if the href is a valid ID selector
      if (targetId !== "#") {
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          e.preventDefault();

          // Close mobile menu if open
          const mobileMenu = document.querySelector(".mobile-menu");
          if (mobileMenu && mobileMenu.classList.contains("active")) {
            mobileMenu.classList.remove("active");
            document.body.style.overflow = "";
          }

          // Smooth scroll to target
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });
}

/**
 * Adds animation effects to elements when they come into view
 */
function setupScrollAnimations() {
  // Get all elements to animate
  const animateElements = document.querySelectorAll(
    ".contact-column, .testimonial-content, .footer-links",
  );

  // Create Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  // Add initial styles for animations
  const style = document.createElement("style");
  style.textContent = `
    .contact-column, .testimonial-content, .footer-links {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }

    .contact-column.animate, .testimonial-content.animate, .footer-links.animate {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  // Observe each element
  animateElements.forEach((element) => {
    observer.observe(element);
  });
}

// Initialize scroll animations
setupScrollAnimations();
