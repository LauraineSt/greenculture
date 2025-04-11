// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize mobile menu
  initMobileMenu();

  // Initialize testimonial slider
  initTestimonialSlider();
});

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", function () {
      mobileNav.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    });
  }
}

/**
 * Initialize testimonial slider functionality
 */
function initTestimonialSlider() {
  const container = document.querySelector(".testimonials-container");
  const cards = document.querySelectorAll(".testimonial-card");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const dotsContainer = document.querySelector(".slider-dots");

  if (!container || !cards.length || !prevBtn || !nextBtn || !dotsContainer) {
    return;
  }

  let currentIndex = 0;
  const totalCards = cards.length;

  // Create dots
  for (let i = 0; i < totalCards; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) {
      dot.classList.add("active");
    }
    dot.addEventListener("click", () => {
      goToSlide(i);
    });
    dotsContainer.appendChild(dot);
  }

  // Set initial position
  updateSliderPosition();

  // Add event listeners for buttons
  prevBtn.addEventListener("click", () => {
    goToSlide(currentIndex - 1);
  });

  nextBtn.addEventListener("click", () => {
    goToSlide(currentIndex + 1);
  });

  // Add touch swipe functionality
  let touchStartX = 0;
  let touchEndX = 0;

  container.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  container.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;

    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left - next slide
      goToSlide(currentIndex + 1);
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right - previous slide
      goToSlide(currentIndex - 1);
    }
  }

  /**
   * Go to a specific slide
   * @param {number} index - The index of the slide to go to
   */
  function goToSlide(index) {
    // Handle wrapping
    if (index < 0) {
      index = totalCards - 1;
    } else if (index >= totalCards) {
      index = 0;
    }

    currentIndex = index;
    updateSliderPosition();
  }

  /**
   * Update the slider position based on the current index
   */
  function updateSliderPosition() {
    // Get the number of cards to show based on screen width
    let cardsToShow = 1;
    if (window.innerWidth >= 1024) {
      cardsToShow = 3;
    } else if (window.innerWidth >= 768) {
      cardsToShow = 2;
    }

    // Calculate the percentage to translate
    const translatePercentage = -(currentIndex * (100 / cardsToShow));

    // Apply the transform
    cards.forEach((card) => {
      card.style.transform = `translateX(${translatePercentage}%)`;
    });

    // Update active dot
    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentIndex);
    });
  }

  // Handle window resize
  window.addEventListener("resize", () => {
    updateSliderPosition();
  });
}
