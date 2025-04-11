// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Form elements
    const form = document.querySelector(".signup-form");
    const nameInput = document.querySelector('.form-input[placeholder="Nome"]');
    const emailInput = document.querySelector('.form-input[placeholder="Email"]');
    const passwordInput = document.querySelector(
      '.form-input[placeholder="Password"]',
    );
    const checkbox = document.querySelector(".checkbox");
    const termsLabel = document.querySelector(".terms-label");
    const submitButton = document.querySelector(".submit-button");
  
    // Mobile menu elements
    const menuButton = document
      .querySelector(".menu-icon")
      .closest(".icon-button");
  
    // Form validation
    function validateEmail(email) {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
  
    function validateForm() {
      let isValid = true;
  
      // Reset error states
      nameInput.classList.remove("input-error");
      emailInput.classList.remove("input-error");
      passwordInput.classList.remove("input-error");
      checkbox.classList.remove("checkbox-error");
  
      // Validate name
      if (!nameInput.value.trim()) {
        nameInput.classList.add("input-error");
        isValid = false;
      }
  
      // Validate email
      if (!validateEmail(emailInput.value.trim())) {
        emailInput.classList.add("input-error");
        isValid = false;
      }
  
      // Validate password (at least 6 characters)
      if (passwordInput.value.length < 6) {
        passwordInput.classList.add("input-error");
        isValid = false;
      }
  
      // Validate terms checkbox
      if (!checkbox.classList.contains("checked")) {
        checkbox.classList.add("checkbox-error");
        isValid = false;
      }
  
      return isValid;
    }
  
    // Toggle checkbox state
    checkbox.addEventListener("click", function () {
      this.classList.toggle("checked");
      if (this.classList.contains("checkbox-error")) {
        this.classList.remove("checkbox-error");
      }
    });
  
    termsLabel.addEventListener("click", function () {
      checkbox.classList.toggle("checked");
      if (checkbox.classList.contains("checkbox-error")) {
        checkbox.classList.remove("checkbox-error");
      }
    });
  
    // Form submission
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      if (validateForm()) {
        // Show success message
        const successMessage = document.createElement("div");
        successMessage.className = "success-message";
        successMessage.textContent = "Inscrição realizada com sucesso!";
  
        // Insert after form
        form.parentNode.insertBefore(successMessage, form.nextSibling);
  
        // Hide form
        form.style.display = "none";
  
        // Simulate redirect after 3 seconds
        setTimeout(function () {
          successMessage.textContent = "Redirecionando...";
          // In a real application, you would redirect to another page
          // window.location.href = 'dashboard.html';
        }, 3000);
      }
    });
  
    // Input field focus/blur effects
    const inputFields = document.querySelectorAll(".form-input");
  
    inputFields.forEach((input) => {
      // Remove error class on input
      input.addEventListener("input", function () {
        this.classList.remove("input-error");
      });
  
      // Add focus class
      input.addEventListener("focus", function () {
        this.classList.add("input-focus");
      });
  
      // Remove focus class
      input.addEventListener("blur", function () {
        this.classList.remove("input-focus");
      });
    });
  
    // Mobile menu toggle (simplified version)
    menuButton.addEventListener("click", function () {
      // In a real application, this would toggle a mobile menu
      this.classList.toggle("menu-active");
      alert("Menu mobile seria aberto aqui");
    });
  
    // Button hover effect
    submitButton.addEventListener("mouseenter", function () {
      this.classList.add("button-hover");
    });
  
    submitButton.addEventListener("mouseleave", function () {
      this.classList.remove("button-hover");
    });
  
    // Add some animation to the page load
    document.querySelector(".container").classList.add("fade-in");
  });
  