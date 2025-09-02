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
    let scrollListener = null;
    const updateProgress = () => {
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = window.scrollY;
      const progress = scrollHeight > 0 ? scrolled / scrollHeight : 0;
      progressBar.style.transform = `scaleX(${progress})`;
    };

    const checkScrollability = () => {
      if (scrollListener) {
        window.removeEventListener("scroll", scrollListener);
      }
      if (document.body.scrollHeight > window.innerHeight) {
        progressBar.style.display = "block";
        updateProgress();
        scrollListener = updateProgress;
        window.addEventListener("scroll", scrollListener, { passive: true });
      } else {
        progressBar.style.display = "none";
      }
    };
    setTimeout(checkScrollability, 100);
    window.addEventListener("resize", checkScrollability);
  }

  const themeToggleBtn = document.getElementById("theme-toggle");
  const sunIcon = document.getElementById("theme-icon-sun");
  const moonIcon = document.getElementById("theme-icon-moon");

  if (themeToggleBtn && sunIcon && moonIcon) {
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
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    let currentTheme = savedTheme ? savedTheme : prefersDark ? "dark" : "light";
    applyTheme(currentTheme);
    themeToggleBtn.addEventListener("click", () => {
      currentTheme = document.documentElement.classList.contains("light")
        ? "dark"
        : "light";
      localStorage.setItem("theme", currentTheme);
      applyTheme(currentTheme);
    });
  }

  const cursorDot = document.getElementById("cursor-dot");
  const cursorOutline = document.getElementById("cursor-outline");
  if (cursorDot && cursorOutline) {
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
  }

  const timeline = document.querySelector(".timeline-container");
  if (timeline) {
    const line = timeline.querySelector(".timeline-line");
    const steps = timeline.querySelectorAll(".timeline-step");

    if (line && steps.length > 0) {
      gsap.set(steps, { autoAlpha: 0, y: 50 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: timeline,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      });

      tl.to(line, {
        scaleY: 1,
        duration: 1,
        ease: "power1.inOut",
        transformOrigin: "top",
      });

      steps.forEach((step, index) => {
        tl.to(
          step,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power1.out",
          },
          index * 0.2
        );
      });
    }
  }

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
    if (question && answer && icon) {
      question.addEventListener("click", () => {
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            const otherAnswer = otherItem.querySelector(".faq-answer");
            const otherIcon = otherItem.querySelector(".faq-icon");
            if (otherAnswer && otherIcon) {
              otherAnswer.style.maxHeight = null;
              otherIcon.classList.remove("rotate-180");
            }
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
    }
  });

  const animatedNumbers = document.querySelectorAll(".animated-number");
  if (animatedNumbers.length > 0) {
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
  }

  const cookieBanner = document.getElementById("cookie-banner");
  const acceptButton = document.getElementById("accept-cookies");
  if (
    cookieBanner &&
    acceptButton &&
    !localStorage.getItem("cookiesAccepted")
  ) {
    setTimeout(() => {
      cookieBanner.classList.remove("hidden");
      cookieBanner.classList.add("block");
    }, 1500);
    acceptButton.addEventListener("click", () => {
      cookieBanner.style.display = "none";
      localStorage.setItem("cookiesAccepted", "true");
    });
  }

  const header = document.querySelector("header");
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
  }

  const calcSteps = document.querySelectorAll(".calc-step");
  const nextBtn = document.getElementById("calc-next");
  const prevBtn = document.getElementById("calc-prev");
  const progressText = document.getElementById("calc-progress");
  const estimateText = document.getElementById("calc-estimate");
  if (
    calcSteps.length > 0 &&
    nextBtn &&
    prevBtn &&
    progressText &&
    estimateText
  ) {
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
        currentStep = 1;
      }
      updateView();
    });
    updateView();
  }

  const modal = document.getElementById("exit-modal");
  const overlay = document.getElementById("exit-modal-overlay");
  const closeBtn = document.getElementById("exit-modal-close");

  if (modal && overlay && closeBtn) {
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
  }

  const chatbotToggle = document.getElementById("chatbot-toggle");
  const chatbotWindow = document.getElementById("chatbot-window");
  const chatbotMessages = document.getElementById("chatbot-messages");
  const chatbotInput = document.getElementById("chatbot-input");
  const chatbotSendBtn = document.getElementById("chatbot-send");
  const chatbotIconOpen = document.getElementById("chatbot-icon-open");
  const chatbotIconClose = document.getElementById("chatbot-icon-close");
  let isChatbotOpen = false;
  const toggleChatbot = () => {
    isChatbotOpen = !isChatbotOpen;
    if (isChatbotOpen) {
      chatbotWindow.classList.remove("hidden");
      chatbotIconOpen.classList.add("hidden");
      chatbotIconClose.classList.remove("hidden");
      setTimeout(() => {
        chatbotWindow.style.transform = "scaleY(1)";
        chatbotWindow.style.opacity = "1";
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Scroll to bottom
      }, 10);
    } else {
      chatbotWindow.style.transform = "scaleY(0)";
      chatbotWindow.style.opacity = "0";
      chatbotIconOpen.classList.remove("hidden");
      chatbotIconClose.classList.add("hidden");
      setTimeout(() => {
        chatbotWindow.classList.add("hidden");
      }, 300);
    }
  };
  const addMessage = (text, sender) => {
    const messageDiv = document.createElement("div");
    messageDiv.className = `flex ${
      sender === "user" ? "justify-end" : "justify-start"
    }`;
    messageDiv.innerHTML = `
            <div class="${
              sender === "user" ? "bg-accent" : "bg-gray-700"
            } text-white p-3 rounded-lg max-w-[80%]">
                ${text}
            </div>
        `;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Auto scroll
  };
  const sendUserMessage = () => {
    const userText = chatbotInput.value.trim();
    if (userText) {
      addMessage(userText, "user");
      chatbotInput.value = "";

      // Simulate AI typing for a moment
      const typingIndicator = document.createElement("div");
      typingIndicator.className = "flex justify-start";
      typingIndicator.innerHTML =
        '<div class="bg-gray-700 text-white p-3 rounded-lg max-w-[80%] flex items-center"><span class="h-2 w-2 bg-white rounded-full animate-bounce mr-1"></span><span class="h-2 w-2 bg-white rounded-full animate-bounce delay-100 mr-1"></span><span class="h-2 w-2 bg-white rounded-full animate-bounce delay-200"></span></div>';
      chatbotMessages.appendChild(typingIndicator);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

      // --- REAL AI INTEGRATION POINT ---
      // Here you would send userText to your backend API
      // The API would then call an LLM (OpenAI, Gemini, etc.)
      // Example of a simulated response:
      setTimeout(() => {
        chatbotMessages.removeChild(typingIndicator); // Remove typing indicator
        let aiResponse =
          "I'm sorry, I'm just a demo AI and can't process complex queries yet. But AlphaPebble specializes in building real AI agents! You can learn more in our 'From Idea to Impact' section.";
        if (userText.toLowerCase().includes("mvp")) {
          aiResponse =
            "AlphaPebble focuses on rapid MVP development, often delivering a working prototype in 1-2 weeks. Check out our 'How We Work' section!";
        } else if (userText.toLowerCase().includes("contact")) {
          aiResponse =
            "You can reach us through the contact form on this page or email us at hello@alphapebble.com.";
        } else if (userText.toLowerCase().includes("pricing")) {
          aiResponse =
            "Our MVP experiments typically start around $5,000. You can get a quick estimate using our 'Scope Your Experiment' calculator!";
        } else if (userText.toLowerCase().includes("punr")) {
          aiResponse =
            "AlphaPebble operates globally, but we're proud to have roots in Pune, Maharashtra, India. We serve clients worldwide!";
        }
        addMessage(aiResponse, "ai");
      }, 1500);
    }
  };
  chatbotToggle.addEventListener("click", toggleChatbot);
  chatbotSendBtn.addEventListener("click", sendUserMessage);
  chatbotInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendUserMessage();
    }
  });

  const cashBalanceEl = document.getElementById("cash-balance");
  const revenueEl = document.getElementById("monthly-revenue");
  const costsEl = document.getElementById("monthly-costs");
  const revenueValueEl = document.getElementById("revenue-value");
  const costsValueEl = document.getElementById("costs-value");
  const runwayResultEl = document.getElementById("runway-result");
  const burnResultEl = document.getElementById("burn-result");
  const runwayMessageEl = document.getElementById("runway-message");

  const calculateRunway = () => {
    const cash = parseFloat(cashBalanceEl.value) || 0;
    const revenue = parseFloat(revenueEl.value) || 0;
    const costs = parseFloat(costsEl.value) || 0;
    revenueValueEl.textContent = revenue.toLocaleString();
    costsValueEl.textContent = costs.toLocaleString();

    const netBurn = costs - revenue;

    if (netBurn > 0) {
      const runwayMonths = cash / netBurn;
      runwayResultEl.textContent = runwayMonths.toFixed(1) + " Months";
      burnResultEl.textContent = `-$${netBurn.toLocaleString()}`;
      burnResultEl.classList.remove("text-green-400");
      burnResultEl.classList.add("text-red-400");
      runwayMessageEl.textContent =
        "You are currently burning cash. Keep an eye on your runway!";
    } else if (netBurn <= 0) {
      runwayResultEl.textContent = "Infinite ∞";
      burnResultEl.textContent = `+$${Math.abs(netBurn).toLocaleString()}`;
      burnResultEl.classList.remove("text-red-400");
      burnResultEl.classList.add("text-green-400");
      runwayMessageEl.textContent =
        "Congratulations! You are default alive (profitable or breaking even).";
    }
  };

  if (cashBalanceEl) {
    [cashBalanceEl, revenueEl, costsEl].forEach((el) => {
      el.addEventListener("input", calculateRunway);
    });
    calculateRunway();
  }

  const checkUrlForPackage = () => {
    const params = new URLSearchParams(window.location.search);
    const package = params.get("package");
    if (package) {
      const messageTextarea = document.getElementById("message");
      const formattedPackage = package.replace(/([A-Z])/g, " $1").trim(); // 'AIKickstarter' -> 'AI Kickstarter'
      if (messageTextarea) {
        messageTextarea.value = `Hi, I'm interested in learning more about the "${formattedPackage}" package.`;
      }
    }
  };
  checkUrlForPackage();
});
