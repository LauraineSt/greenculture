// Mobile menu functionality
const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector(".mobile-menu");

function toggleMenu() {
  const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", !isExpanded);

  if (!isExpanded) {
    mobileMenu?.classList.add("is-active");
    document.body.style.overflow = "hidden";
  } else {
    mobileMenu?.classList.remove("is-active");
    document.body.style.overflow = "";
  }
}

menuButton?.addEventListener("click", toggleMenu);

// Smooth scroll for navigation links
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

// Intersection Observer for animations
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Animate sections on scroll
const animatedElements = document.querySelectorAll(
  ".hero-section, .feature-item, .impact-section, .option-card",
);
animatedElements.forEach((element) => {
  observer.observe(element);
});

// Lazy loading images
function lazyLoadImages() {
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ("loading" in HTMLImageElement.prototype) {
    images.forEach((img) => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
    });
  } else {
    // Fallback for browsers that don't support native lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          observer.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }
}

// Initialize lazy loading
document.addEventListener("DOMContentLoaded", lazyLoadImages);

// Handle CTA button interactions
const ctaButton = document.querySelector(".cta-button");
ctaButton?.addEventListener("click", () => {
  // Add analytics tracking
  if (typeof gtag === "function") {
    gtag("event", "click", {
      event_category: "CTA",
      event_label: "Saber mais",
    });
  }

  // Navigate to more information page
  window.location.href = "/saiba-mais";
});

// Enhance accessibility for keyboard navigation
function handleFirstTab(e) {
  if (e.key === "Tab") {
    document.body.classList.add("user-is-tabbing");
    window.removeEventListener("keydown", handleFirstTab);
  }
}

window.addEventListener("keydown", handleFirstTab);

// Add focus styles for interactive elements
const interactiveElements = document.querySelectorAll(
  'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])',
);
interactiveElements.forEach((element) => {
  element.addEventListener("focus", () => {
    element.classList.add("focus-visible");
  });

  element.addEventListener("blur", () => {
    element.classList.remove("focus-visible");
  });
});

// Handle social media share buttons
const socialLinks = document.querySelectorAll(".social-link");
socialLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    let shareUrl;

    switch (link.getAttribute("aria-label")) {
      case "Siga-nos no Facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "Siga-nos no Twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case "Siga-nos no LinkedIn":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "share-dialog", "width=600,height=400");
  });
});

// Add error handling for images
function handleImageError(img) {
  img.addEventListener("error", () => {
    img.src = "/path-to-fallback-image.jpg";
    img.alt = "Imagem não disponível";
  });
}

document.querySelectorAll("img").forEach(handleImageError);

// Performance monitoring
function reportPerformanceMetrics() {
  if ("performance" in window) {
    const paint = performance.getEntriesByType("paint");
    const navigation = performance.getEntriesByType("navigation");

    console.info("Performance metrics:", {
      firstPaint: paint.find((p) => p.name === "first-paint")?.startTime,
      firstContentfulPaint: paint.find(
        (p) => p.name === "first-contentful-paint",
      )?.startTime,
      domComplete: navigation[0]?.domComplete,
    });
  }
}

// Initialize performance monitoring
window.addEventListener("load", reportPerformanceMetrics);
