document.addEventListener("DOMContentLoaded", function () {
    // Get form elements
    const form = document.getElementById("registration-form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const destinationInput = document.getElementById("destination");
    const departureDateInput = document.getElementById("departure-date");
    const returnDateInput = document.getElementById("return-date");
    const termsCheckbox = document.getElementById("terms");
  
    // Set min date for date inputs (today)
    const today = new Date().toISOString().split("T")[0];
    departureDateInput.setAttribute("min", today);
    returnDateInput.setAttribute("min", today);
  
    // Format date inputs to show placeholder when empty
    const dateInputs = [departureDateInput, returnDateInput];
  
    dateInputs.forEach((input) => {
      // Show placeholder when input is empty
      input.addEventListener("focus", function (e) {
        if (!this.value) {
          this.type = "date";
        }
      });
  
      input.addEventListener("blur", function (e) {
        if (!this.value) {
          this.type = "text";
        }
      });
    });
  
    // Validate departure date is before return date
    returnDateInput.addEventListener("change", function () {
      const departureDate = new Date(departureDateInput.value);
      const returnDate = new Date(this.value);
  
      if (returnDate < departureDate) {
        showError(this, "A data de regresso deve ser posterior à data de ida");
      } else {
        clearError(this);
      }
    });
  
    // Email validation
    emailInput.addEventListener("blur", function () {
      if (this.value && !isValidEmail(this.value)) {
        showError(this, "Por favor, insira um email válido");
      } else {
        clearError(this);
      }
    });
  
    // Form submission
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      // Validate all fields
      let isValid = true;
  
      // Required fields validation
      const requiredFields = [
        nameInput,
        emailInput,
        destinationInput,
        departureDateInput,
        returnDateInput,
      ];
      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          showError(field, "Este campo é obrigatório");
          isValid = false;
        } else {
          clearError(field);
        }
      });
  
      // Email validation
      if (emailInput.value && !isValidEmail(emailInput.value)) {
        showError(emailInput, "Por favor, insira um email válido");
        isValid = false;
      }
  
      // Date validation
      if (departureDateInput.value && returnDateInput.value) {
        const departureDate = new Date(departureDateInput.value);
        const returnDate = new Date(returnDateInput.value);
  
        if (returnDate < departureDate) {
          showError(
            returnDateInput,
            "A data de regresso deve ser posterior à data de ida",
          );
          isValid = false;
        }
      }
  
      // Terms checkbox validation
      if (!termsCheckbox.checked) {
        alert("Por favor, aceite os termos para continuar");
        isValid = false;
      }
  
      // If form is valid, submit
      if (isValid) {
        // In a real application, you would send the form data to a server here
        alert("Formulário enviado com sucesso!");
        form.reset();
      }
    });
  
    // Helper functions
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  
    function showError(input, message) {
      // Clear any existing error
      clearError(input);
  
      // Add error class to input
      input.classList.add("error");
  
      // Create error message element
      const errorElement = document.createElement("div");
      errorElement.className = "error-message";
      errorElement.textContent = message;
  
      // Insert error message after input
      input.parentNode.insertBefore(errorElement, input.nextSibling);
    }
  
    function clearError(input) {
      // Remove error class from input
      input.classList.remove("error");
  
      // Remove any existing error message
      const nextSibling = input.nextSibling;
      if (nextSibling && nextSibling.className === "error-message") {
        nextSibling.remove();
      }
    }
  
    // Menu button functionality
    const menuButton = document.querySelector(
      '.header-button[aria-label="Menu"]',
    );
    menuButton.addEventListener("click", function () {
      alert("Menu functionality would be implemented here");
    });
  
    // Search button functionality
    const searchButton = document.querySelector(
      '.header-button[aria-label="Search"]',
    );
    searchButton.addEventListener("click", function () {
      alert("Search functionality would be implemented here");
    });
  });
  