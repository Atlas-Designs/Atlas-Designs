(function () {
  const header = document.getElementById("siteHeader");
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  document.querySelectorAll("#year").forEach((yearEl) => {
    yearEl.textContent = String(new Date().getFullYear());
  });

  const pageKey = (() => {
    const path = window.location.pathname.toLowerCase();
    if (path.endsWith("services.html")) return "services";
    if (path.endsWith("contact.html")) return "contact";
    return "index";
  })();

  document.querySelectorAll(".nav-link").forEach((link) => {
    if (link.getAttribute("data-page") === pageKey) {
      link.classList.add("active");
    }
  });

  const syncHeader = () => {
    if (!header) return;
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  syncHeader();
  window.addEventListener("scroll", syncHeader);

  menuToggle?.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    mainNav?.classList.toggle("open");
  });

  mainNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });

  const revealElements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -30px 0px" }
  );

  revealElements.forEach((el) => observer.observe(el));

  const typedText = document.getElementById("typedText");
  const typedWords = [
    "perform beautifully.",
    "rank clearly.",
    "load quickly.",
    "feel premium."
  ];

  if (typedText) {
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const loop = () => {
      const current = typedWords[wordIndex];

      if (!deleting) {
        charIndex += 1;
        typedText.textContent = current.slice(0, charIndex);
        if (charIndex >= current.length) {
          deleting = true;
          window.setTimeout(loop, 1000);
          return;
        }
      } else {
        charIndex -= 1;
        typedText.textContent = current.slice(0, Math.max(charIndex, 0));
        if (charIndex <= 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % typedWords.length;
        }
      }

      window.setTimeout(loop, deleting ? 40 : 80);
    };

    window.setTimeout(loop, 850);
  }

  document.querySelectorAll(".tilt-lite").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      const rotateX = y * -5;
      const rotateY = x * 5;
      card.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    });
  });

  const filterButtons = document.querySelectorAll(".filter-btn");
  const serviceCards = document.querySelectorAll(".service-item");

  if (filterButtons.length && serviceCards.length) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter || "all";

        serviceCards.forEach((card) => {
          const category = card.dataset.category;
          const show = filter === "all" || category === filter;
          card.classList.toggle("hidden", !show);
        });
      });
    });
  }

  document.querySelectorAll(".faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".faq-item");
      if (!item) return;

      const answer = item.querySelector(".faq-answer");
      const isOpen = item.classList.contains("open");

      document.querySelectorAll(".faq-item").forEach((faq) => {
        faq.classList.remove("open");
        faq.querySelector(".faq-question")?.setAttribute("aria-expanded", "false");
        const panel = faq.querySelector(".faq-answer");
        if (panel) panel.style.maxHeight = "0px";
      });

      if (!isOpen) {
        item.classList.add("open");
        button.setAttribute("aria-expanded", "true");
        if (answer) answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });

  const messageField = document.getElementById("messageField");
  const charCounter = document.getElementById("charCounter");

  if (messageField && charCounter) {
    const syncCount = () => {
      charCounter.textContent = `${messageField.value.length} / 500`;
    };
    messageField.addEventListener("input", syncCount);
    syncCount();
  }
})();
