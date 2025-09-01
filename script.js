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
  gsap.registerPlugin(ScrollTrigger);

  const progressBar = document.getElementById("reading-progress-bar");
  if (progressBar) {
    const checkScrollability = () => {
      if (document.body.scrollHeight > window.innerHeight) {
        window.addEventListener("scroll", () => {
          const scrollHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
          const scrolled = window.scrollY;
          const progress = (scrolled / scrollHeight) * 100;
          progressBar.style.transform = `scaleX(${progress / 100})`;
        });
      } else {
        progressBar.style.display = "none";
      }
    };
    checkScrollability();
    window.addEventListener("resize", checkScrollability);
  }

  const themeToggleBtn = document.getElementById("theme-toggle");
  const sunIcon = document.getElementById("theme-icon-sun");
  const moonIcon = document.getElementById("theme-icon-moon");
  const applyTheme = (theme) => {
    if (theme === "light") {
      document.documentElement.classList.add("light");
      sunIcon.classList.remove("hidden");
      moonIcon.classList.add("hidden");
    } else {
      document.documentElement.classList.remove("light");
      sunIcon.classList.add("hidden");
      moonIcon.classList.remove("hidden");
    }
  };
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  let currentTheme = savedTheme ? savedTheme : prefersDark ? "dark" : "light";
  applyTheme(currentTheme);
  themeToggleBtn.addEventListener("click", () => {
    currentTheme = document.documentElement.classList.contains("light")
      ? "dark"
      : "light";
    localStorage.setItem("theme", currentTheme);
    applyTheme(currentTheme);
  });

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

  const timeline = document.querySelector(".timeline-container");
  if (timeline) {
    const line = timeline.querySelector(".timeline-line");
    const steps = timeline.querySelectorAll(".timeline-step");

    // Initially hide all steps
    gsap.set(steps, { autoAlpha: 0, y: 50 });

    // Create a timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: timeline,
        start: "top center",
        end: "bottom center",
        scrub: 1, // Smoothly animates with scroll
      },
    });

    // Animate the line drawing itself
    tl.to(line, {
      scaleY: 1,
      duration: 1,
      ease: "power1.inOut",
      transformOrigin: "top",
    });

    // Animate each step fading in
    steps.forEach((step, index) => {
      tl.to(
        step,
        {
          autoAlpha: 1, // Fades in and becomes interactive
          y: 0,
          duration: 0.5,
          ease: "power1.out",
        },
        index * 0.2 // Stagger the start time of each step's animation
      );
    });
  }

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
  const calcSteps = document.querySelectorAll(".calc-step");
  const nextBtn = document.getElementById("calc-next");
  const prevBtn = document.getElementById("calc-prev");
  const progressText = document.getElementById("calc-progress");
  const estimateText = document.getElementById("calc-estimate");
  let currentStep = 1;
  const totalSteps = calcSteps.length;

  const updateView = () => {
    calcSteps.forEach((step) => {
      step.classList.toggle(
        "active",
        parseInt(step.dataset.step) === currentStep
      );
      step.classList.toggle(
        "hidden",
        parseInt(step.dataset.step) !== currentStep
      );
    });
    progressText.textContent = `Step ${currentStep} of ${totalSteps}`;
    prevBtn.disabled = currentStep === 1;
    prevBtn.style.opacity = currentStep === 1 ? "0.5" : "1";
    nextBtn.textContent =
      currentStep === totalSteps - 1 ? "See Estimate" : "Next";
    if (currentStep === totalSteps) {
      nextBtn.classList.add("hidden");
      prevBtn.textContent = "Restart";
      progressText.textContent = "Completed";
      calculateEstimate();
    } else {
      nextBtn.classList.remove("hidden");
      prevBtn.textContent = "Previous";
    }
  };

  const modal = document.getElementById("exit-modal");
  const overlay = document.getElementById("exit-modal-overlay");
  const closeBtn = document.getElementById("exit-modal-close");
  let modalTriggered = false;

  const showModal = () => {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    setTimeout(() => {
      modal.style.opacity = "1";
      modal.style.transform = "translate(-50%, -50%) scale(1)";
    }, 10);
  };

  const hideModal = () => {
    modal.style.opacity = "0";
    modal.style.transform = "translate(-50%, -50%) scale(0.95)";
    setTimeout(() => {
      modal.classList.add("hidden");
      overlay.classList.add("hidden");
    }, 300);
  };

  document.addEventListener("mouseout", (e) => {
    if (e.clientY <= 0 && !modalTriggered) {
      modalTriggered = true;
      showModal();
    }
  });
  closeBtn.addEventListener("click", hideModal);
  overlay.addEventListener("click", hideModal);

  const calculateEstimate = () => {
    const goalValue = parseInt(
      document.querySelector('input[name="goal"]:checked')?.value || "0"
    );
    const aiValue = parseInt(
      document.querySelector('input[name="ai"]:checked')?.value || "0"
    );
    const total = goalValue + aiValue;
    const lowerBound = total * 0.8;
    const upperBound = total * 1.2;
    estimateText.textContent = `$${lowerBound.toLocaleString()} - $${upperBound.toLocaleString()}`;
  };
  nextBtn.addEventListener("click", () => {
    if (currentStep < totalSteps) currentStep++;
    updateView();
  });
  prevBtn.addEventListener("click", () => {
    if (currentStep > 1) {
      currentStep--;
    } else if (currentStep === totalSteps) {
      // Restart logic
      currentStep = 1;
    }
    updateView();
  });
  updateView();

  window.addEventListener("scroll", handleScroll);
});
