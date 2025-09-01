AOS.init({
  duration: 700,
  once: true,
  offset: 50,
});

window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => (preloader.style.display = "none"), 750);
    }, 1000);
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const cursorDot = document.getElementById("cursor-dot");
  const cursorOutline = document.getElementById("cursor-outline");
  window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    cursorOutline.animate(
      {
        left: `${posX}px`,
        top: `${posY}px`,
      },
      { duration: 500, fill: "forwards" }
    );
  });

  const interactiveElements = document.querySelectorAll(
    'a, button, input[type="submit"], .faq-question, .card-hover'
  );
  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursorOutline.classList.add("hover");
    });
    el.addEventListener("mouseleave", () => {
      cursorOutline.classList.remove("hover");
    });
  });

  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function () {
      const isExpanded =
        mobileMenuButton.getAttribute("aria-expanded") === "true";
      mobileMenuButton.setAttribute("aria-expanded", !isExpanded);
      mobileMenu.classList.toggle("hidden");
    });
  }

  const cards = document.querySelectorAll(".spotlight-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  const yearSpan = document.getElementById("copyright-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const icon = item.querySelector(".faq-icon");
    question.addEventListener("click", () => {
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          const otherAnswer = otherItem.querySelector(".faq-answer");
          const otherIcon = otherItem.querySelector(".faq-icon");
          otherAnswer.style.maxHeight = null;
          otherIcon.classList.remove("rotate-180");
        }
      });
      if (answer.style.maxHeight) {
        answer.style.maxHeight = null;
        icon.classList.remove("rotate-180");
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px";
        icon.classList.add("rotate-180");
      }
    });
  });

  const animatedNumbers = document.querySelectorAll(".animated-number");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = +el.getAttribute("data-target");
          let current = 0;
          const duration = 2000;
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = target / steps;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              clearInterval(timer);
              el.textContent = Math.floor(target);
            } else {
              el.textContent = Math.floor(current);
            }
          }, stepTime);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  animatedNumbers.forEach((number) => {
    observer.observe(number);
  });

  const cookieBanner = document.getElementById("cookie-banner");
  const acceptButton = document.getElementById("accept-cookies");
  if (!localStorage.getItem("cookiesAccepted")) {
    setTimeout(() => {
      cookieBanner.classList.remove("hidden");
      cookieBanner.classList.add("block");
    }, 1500);
  }
  acceptButton.addEventListener("click", () => {
    cookieBanner.style.display = "none";
    localStorage.setItem("cookiesAccepted", "true");
  });

  const header = document.querySelector("header");
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add(
        "bg-dark/90",
        "backdrop-blur-lg",
        "border-b",
        "border-gray-800",
        "shadow-lg"
      );
    } else {
      header.classList.remove(
        "bg-dark/90",
        "backdrop-blur-lg",
        "border-b",
        "border-gray-800",
        "shadow-lg"
      );
    }
  };
  window.addEventListener("scroll", handleScroll);
});
