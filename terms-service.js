// Mobile menu functionality
const menuIcon = document.querySelector(".menu-icon");
const mobileNav = document.querySelector(".footer-nav");

function toggleMobileMenu() {
  mobileNav.classList.toggle("active");
  const isExpanded = menuIcon.getAttribute("aria-expanded") === "true";
  menuIcon.setAttribute("aria-expanded", !isExpanded);
}

menuIcon.addEventListener("click", toggleMobileMenu);
menuIcon.addEventListener("keypress", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    toggleMobileMenu();
  }
});

// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Keyboard navigation for social links
const socialLinks = document.querySelectorAll(".social-links a");
socialLinks.forEach((link, index) => {
  link.addEventListener("keydown", (e) => {
    let targetLink;

    switch (e.key) {
      case "ArrowRight":
        targetLink = socialLinks[index + 1] || socialLinks[0];
        break;
      case "ArrowLeft":
        targetLink =
          socialLinks[index - 1] || socialLinks[socialLinks.length - 1];
        break;
    }

    if (targetLink) {
      e.preventDefault();
      targetLink.focus();
    }
  });
});

// Add skip to main content link
const skipLink = document.createElement("a");
skipLink.href = "#main";
skipLink.className = "skip-link";
skipLink.textContent = "Skip to main content";
document.body.insertBefore(skipLink, document.body.firstChild);

// Handle focus management
function handleFirstTab(e) {
  if (e.key === "Tab") {
    document.body.classList.add("user-is-tabbing");
    window.removeEventListener("keydown", handleFirstTab);
  }
}

window.addEventListener("keydown", handleFirstTab);

// Add ARIA attributes dynamically
function initializeAccessibility() {
  const nav = document.querySelector(".footer-nav");
  nav.setAttribute("role", "navigation");
  nav.setAttribute("aria-label", "Footer navigation");

  const socialNav = document.querySelector(".social-links");
  socialNav.setAttribute("role", "navigation");
  socialNav.setAttribute("aria-label", "Social media links");

  menuIcon.setAttribute("role", "button");
  menuIcon.setAttribute("aria-expanded", "false");
  menuIcon.setAttribute("aria-label", "Toggle mobile menu");
}

// Initialize accessibility features when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeAccessibility);

// Handle print functionality
window.addEventListener("beforeprint", () => {
  // Expand all sections before printing
  document.querySelectorAll(".terms-text").forEach((section) => {
    section.style.display = "block";
  });
});

// Add support for high contrast mode
function checkHighContrast() {
  if (window.matchMedia("(forced-colors: active)").matches) {
    document.documentElement.classList.add("high-contrast");
  }
}

window.matchMedia("(forced-colors: active)").addListener(checkHighContrast);
checkHighContrast();

// Error handling for images
document.querySelectorAll("img").forEach((img) => {
  img.addEventListener("error", function () {
    this.style.display = "none";
    const fallback = document.createElement("span");
    fallback.className = "image-fallback";
    fallback.setAttribute("role", "img");
    fallback.setAttribute("aria-label", this.alt);
    this.parentNode.insertBefore(fallback, this);
  });
});
