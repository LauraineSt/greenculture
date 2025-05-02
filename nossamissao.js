document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const menuButton = document.querySelector(".mobile-menu");
  const mobileNav = document.createElement("div");
  mobileNav.className = "mobile-nav";

  // Criação da estrutura do menu
  const menuContent = document.createElement("div");
  menuContent.className = "mobile-nav-content";

  const closeButton = document.createElement("div");
  closeButton.className = "mobile-nav-close";
  closeButton.textContent = "×";

  const nav = document.createElement("nav");
  nav.className = "mobile-nav-links";

  // Seus itens de menu
  const menuItems = [
    { text: "Início", href: "Index.html" },
    { text: "Sobre Nós", href: "nossamissao.html" },
    { text: "Alojamentos", href: "alojamento.html" },
    { text: "Experiências", href: "experiencias.html" },
    { text: "Parceiros", href: "parceiros.html" },
    { text: "Transportes", href: "transportes.html" },
    { text: "Contactos", href: "contactos.html" },
  ];

  menuItems.forEach((item) => {
    const link = document.createElement("a");
    link.href = item.href;
    link.textContent = item.text;
    link.className = "mobile-nav-link";
    nav.appendChild(link);
  });

  menuContent.appendChild(closeButton);
  menuContent.appendChild(nav);
  mobileNav.appendChild(menuContent);
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
  background-color: #ecefed; /* fundo claro */
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
  color: #456452; /* texto verde */
  cursor: pointer;
  background: none;
  border: none;
}

.mobile-nav-links {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
}

.mobile-nav-links a {
  color: #456452; /* links verdes */
  text-decoration: none;
  font-size: 18px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(69, 100, 82, 0.1); /* linha mais suave em verde */
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
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
  closeButton.addEventListener("click", closeMobileMenu);
  overlay.addEventListener("click", closeMobileMenu);

  function closeMobileMenu() {
    mobileNav.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Close mobile menu when clicking on a link
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // Smooth scrolling for anchor links (if needed)
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

  // IDs para seções (se você quiser manter isso)
  const idMap = {
    ".mission-section": "mission",
    ".about-section": "about",
    ".features-section": "features",
    ".sustainability-section": "sustainability",
    ".partners-title": "partners",
  };

  for (const selector in idMap) {
    const el = document.querySelector(selector);
    if (el) el.id = idMap[selector];
  }

  // Animações ao rolar
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".mission-content, .about-text, .about-image, .features-header, .feature-item, .sustainability-content, .partners-grid"
    );

    elements.forEach((element) => {
      if (
        !element.classList.contains("animation-ready") &&
        !element.classList.contains("animated")
      ) {
        element.classList.add("animation-ready");
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      }

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

  window.addEventListener("scroll", animateOnScroll);
  window.addEventListener("load", animateOnScroll);
  animateOnScroll();
});
