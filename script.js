document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const navLinks = document.querySelectorAll(".main-nav a");
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      mainNav.classList.toggle("active");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("active");
      });
    });
  }

  const revealElements = document.querySelectorAll(
    ".trust-card, .audience-card, .feature-card, .role-card, .process-card, .program-card, .pricing-box, .disclaimer-box, .founder-box, .seo-content > div, .contact-form, .contact-item"
  );

  revealElements.forEach((el) => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const email = document.getElementById("email").value.trim();
      const interest = document.getElementById("interest").value.trim();
      const message = document.getElementById("message").value.trim();

      const phoneRegex = /^[0-9+\-\s]{10,15}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !phone || !email || !interest) {
        showMessage("Please fill in all required fields.", "#b42318");
        return;
      }

      if (!phoneRegex.test(phone)) {
        showMessage("Please enter a valid phone number.", "#b42318");
        return;
      }

      if (!emailRegex.test(email)) {
        showMessage("Please enter a valid email address.", "#b42318");
        return;
      }

      const whatsappNumber = "919999999999";
      const whatsappText = `Hi Hospera, I want to enquire about admission.%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AEmail: ${encodeURIComponent(email)}%0AInterested In: ${encodeURIComponent(interest)}%0AMessage: ${encodeURIComponent(message)}`;

      showMessage("Thank you! Redirecting you to WhatsApp...", "#0f9d58");

      setTimeout(() => {
        window.open(`https://wa.me/${whatsappNumber}?text=${whatsappText}`, "_blank");
        contactForm.reset();
      }, 900);
    });
  }

  function showMessage(message, color) {
    if (!formMessage) return;
    formMessage.textContent = message;
    formMessage.style.color = color;
  }

  const today = new Date();
  const year = today.getFullYear();
  const footerText = document.querySelector(".footer-bottom p");

  if (footerText) {
    footerText.textContent = `© ${year} Hospera - Institute of Hospitality. All rights reserved.`;
  }
});
