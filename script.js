document.addEventListener("DOMContentLoaded", () => {
  const siteHeader = document.getElementById("siteHeader");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const revealItems = document.querySelectorAll(".reveal");
  const parallaxLayers = document.querySelectorAll(".parallax-layer");
  const contactForm = document.getElementById("contactForm");
  const applyForm = document.getElementById("applyForm");
  const formMessage = document.getElementById("formMessage");
  const applyFormMessage = document.getElementById("applyFormMessage");
  const copyrightText = document.getElementById("copyrightText");

  const phoneRegex = /^[0-9+\-\s]{10,15}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

      const name = getFieldValue(contactForm, "full_name");
      const phone = getFieldValue(contactForm, "phone");
      const email = getFieldValue(contactForm, "email");
      const enquiryType = getFieldValue(contactForm, "enquiry_type");
      const preferredTime = getFieldValue(contactForm, "preferred_time");
      const message = getFieldValue(contactForm, "message");

      if (!name || !phone || !enquiryType) {
        showMessage(formMessage, "Please fill in all required fields.", "#c2410c");
        return;
      }

      if (!phoneRegex.test(phone)) {
        showMessage(formMessage, "Please enter a valid phone number.", "#c2410c");
        return;
      }

      if (email && !emailRegex.test(email)) {
        showMessage(formMessage, "Please enter a valid email address.", "#c2410c");
        return;
      }

      const details = [
        "Hi Hospera, I have a contact enquiry.",
        "",
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email || "Not provided"}`,
        `Enquiry Type: ${enquiryType}`,
        `Preferred Call Time: ${preferredTime || "Any time"}`,
        `Message: ${message || "Not provided"}`
      ].join("\n");

      showMessage(formMessage, "Thank you! Redirecting to WhatsApp...", "#15803d");
      openWhatsApp(details, contactForm);
    });
  }

  if (applyForm) {
    applyForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const studentName = getFieldValue(applyForm, "student_name");
      const phone = getFieldValue(applyForm, "phone");
      const email = getFieldValue(applyForm, "email");
      const city = getFieldValue(applyForm, "current_city");
      const qualification = getFieldValue(applyForm, "qualification");
      const program = getFieldValue(applyForm, "program_interest");
      const batch = getFieldValue(applyForm, "preferred_batch");
      const studyMode = getFieldValue(applyForm, "study_mode");
      const notes = getFieldValue(applyForm, "notes");
      const consent = applyForm.querySelector('input[name="consent"]');

      if (!studentName || !phone || !email || !city || !qualification || !program || !batch) {
        showMessage(applyFormMessage, "Please fill in all required fields.", "#c2410c");
        return;
      }

      if (!phoneRegex.test(phone)) {
        showMessage(applyFormMessage, "Please enter a valid phone number.", "#c2410c");
        return;
      }

      if (!emailRegex.test(email)) {
        showMessage(applyFormMessage, "Please enter a valid email address.", "#c2410c");
        return;
      }

      if (!consent || !consent.checked) {
        showMessage(applyFormMessage, "Please accept the contact consent to continue.", "#c2410c");
        return;
      }

      const details = [
        "Hi Hospera, I want to apply for the hospitality course.",
        "",
        `Student Name: ${studentName}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Current City: ${city}`,
        `Highest Qualification: ${qualification}`,
        `Program Interest: ${program}`,
        `Preferred Batch: ${batch}`,
        `Preferred Study Mode: ${studyMode || "Not specified"}`,
        `Additional Notes: ${notes || "Not provided"}`
      ].join("\n");

      showMessage(applyFormMessage, "Application captured. Redirecting to WhatsApp...", "#15803d");
      openWhatsApp(details, applyForm);
    });
  }

  function getFieldValue(form, name) {
    const field = form.querySelector(`[name="${name}"]`);
    if (!field) return "";
    return field.value.trim();
  }

  function openWhatsApp(details, form) {
    const whatsappNumber = "919999999999";
    setTimeout(() => {
      const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(details)}`;
      window.open(url, "_blank", "noopener");
      form.reset();
    }, 700);
  }

  function showMessage(target, message, color) {
    if (!target) return;
    target.textContent = message;
    target.style.color = color;
  }

  if (copyrightText) {
    copyrightText.textContent = `(c) ${new Date().getFullYear()} Hospera. All rights reserved.`;
  }
});
