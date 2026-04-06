document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.getElementById("nav");
  const header = document.getElementById("siteHeader");
  const navLinks = document.querySelectorAll(".nav-links a");
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      nav.classList.toggle("active");
      document.body.classList.toggle("menu-open");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        document.body.classList.remove("menu-open");
      });
    });

    document.addEventListener("click", (event) => {
      const clickedInsideNav = nav.contains(event.target);
      const clickedMenu = menuBtn.contains(event.target);

      if (!clickedInsideNav && !clickedMenu && nav.classList.contains("active")) {
        nav.classList.remove("active");
        document.body.classList.remove("menu-open");
      }
    });
  }

  if (header) {
    const onScroll = () => {
      if (window.scrollY > 20) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
  }

  const revealElements = document.querySelectorAll(
    ".card, .hero-card, .pricing-box, .disclaimer, .cta-band, .contact-panel, .form-card, .stat-card, .timeline-item"
  );

  revealElements.forEach((el) => el.classList.add("reveal"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealElements.forEach((el) => observer.observe(el));

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name")?.value.trim() || "";
      const phone = document.getElementById("phone")?.value.trim() || "";
      const email = document.getElementById("email")?.value.trim() || "";
      const interest = document.getElementById("interest")?.value.trim() || "";
      const message = document.getElementById("message")?.value.trim() || "";

      const phoneRegex = /^[0-9+\-\s]{10,15}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !phone || !email || !interest) {
        setMessage("Please fill in all required fields.", "#c93636");
        return;
      }

      if (!phoneRegex.test(phone)) {
        setMessage("Please enter a valid phone number.", "#c93636");
        return;
      }

      if (!emailRegex.test(email)) {
        setMessage("Please enter a valid email address.", "#c93636");
        return;
      }

      const whatsappNumber = "919999999999";
      const text =
        `Hi Hospera, I want to enquire about admission.%0A%0A` +
        `Name: ${encodeURIComponent(name)}%0A` +
        `Phone: ${encodeURIComponent(phone)}%0A` +
        `Email: ${encodeURIComponent(email)}%0A` +
        `Interested In: ${encodeURIComponent(interest)}%0A` +
        `Message: ${encodeURIComponent(message)}`;

      setMessage("Thank you! Redirecting to WhatsApp...", "#18a957");

      setTimeout(() => {
        window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
        form.reset();
      }, 800);
    });
  }

  function setMessage(message, color) {
    if (!formMessage) return;
    formMessage.textContent = message;
    formMessage.style.color = color;
  }
});
