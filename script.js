document.addEventListener("DOMContentLoaded", () => {
  const siteHeader = document.getElementById("siteHeader");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const revealItems = document.querySelectorAll(".reveal");
  const parallaxLayers = document.querySelectorAll(".parallax-layer");
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  const copyrightText = document.getElementById("copyrightText");

  const updateHeader = () => {
    if (!siteHeader) return;
    siteHeader.classList.toggle("scrolled", window.scrollY > 16);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader);

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("menu-open", isOpen);
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        document.body.classList.remove("menu-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Node)) return;

      const clickedInsideMenu = navMenu.contains(target);
      const clickedToggle = navToggle.contains(target);

      if (!clickedInsideMenu && !clickedToggle && navMenu.classList.contains("open")) {
        navMenu.classList.remove("open");
        document.body.classList.remove("menu-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (revealItems.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index * 60, 280)}ms`;
      observer.observe(item);
    });
  }

  if (parallaxLayers.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let ticking = false;

    const updateParallax = () => {
      const scrollY = window.scrollY;

      parallaxLayers.forEach((layer) => {
        const speed = Number(layer.getAttribute("data-speed")) || 0.16;
        const y = Math.round(scrollY * speed);
        layer.style.setProperty("--parallax-y", `${y}px`);
      });

      ticking = false;
    };

    const requestTick = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", requestTick, { passive: true });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("name")?.value.trim() || "";
      const phone = document.getElementById("phone")?.value.trim() || "";
      const email = document.getElementById("email")?.value.trim() || "";
      const interest = document.getElementById("interest")?.value.trim() || "";
      const message = document.getElementById("message")?.value.trim() || "";

      const phoneRegex = /^[0-9+\-\s]{10,15}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !phone || !email || !interest) {
        showMessage("Please fill in all required fields.", "#c2410c");
        return;
      }

      if (!phoneRegex.test(phone)) {
        showMessage("Please enter a valid phone number.", "#c2410c");
        return;
      }

      if (!emailRegex.test(email)) {
        showMessage("Please enter a valid email address.", "#c2410c");
        return;
      }

      const whatsappNumber = "919999999999";
      const details = [
        "Hi Hospera, I want to enquire about the hospitality course.",
        "",
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Interested In: ${interest}`,
        `Message: ${message || "Not provided"}`
      ].join("\n");

      showMessage("Thank you! Redirecting to WhatsApp...", "#15803d");

      setTimeout(() => {
        const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(details)}`;
        window.open(url, "_blank", "noopener");
        contactForm.reset();
      }, 700);
    });
  }

  function showMessage(message, color) {
    if (!formMessage) return;
    formMessage.textContent = message;
    formMessage.style.color = color;
  }

  if (copyrightText) {
    copyrightText.textContent = `(c) ${new Date().getFullYear()} Hospera. All rights reserved.`;
  }
});
