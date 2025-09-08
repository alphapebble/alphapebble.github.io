document.addEventListener("DOMContentLoaded", function () {
  // Initialize AOS (Animate On Scroll)
  const initAOS = () => {
    if (typeof AOS !== "undefined") {
      try {
        AOS.init({
          duration: 700,
          once: true,
          offset: 50,
        });
      } catch (error) {
        console.warn("AOS initialization failed:", error);
      }
    } else {
      setTimeout(initAOS, 100);
    }
  };

  requestAnimationFrame(initAOS);

  // --- Custom Cursor ---
  const cursor = document.querySelector(".cursor");
  const cursorDot = document.querySelector(".cursor-dot");

  let mouseX = 0,
    mouseY = 0;
  let cursorX = 0,
    cursorY = 0;
  let dotX = 0,
    dotY = 0;

  // Interactive background
  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    document.documentElement.style.setProperty("--mouse-x", `${x}%`);
    document.documentElement.style.setProperty("--mouse-y", `${y}%`);
  });

  // Smooth cursor animation
  function animateCursor() {
    // Cursor follows with slight delay
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;

    // Dot follows more closely
    dotX += (mouseX - dotX) * 0.3;
    dotY += (mouseY - dotY) * 0.3;

    // center using actual element dimensions
    const cHalfW = cursor.offsetWidth / 2;
    const cHalfH = cursor.offsetHeight / 2;
    const dHalfW = cursorDot.offsetWidth / 2;
    const dHalfH = cursorDot.offsetHeight / 2;

    cursor.style.left = cursorX - cHalfW + "px";
    cursor.style.top = cursorY - cHalfH + "px";

    cursorDot.style.left = dotX - dHalfW + "px";
    cursorDot.style.top = dotY - dHalfH + "px";

    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Cursor hover effects
  const interactiveElements = document.querySelectorAll(
    "a, button, .interactive-hover, .glass, .pill, .btn-primary, .btn-ghost"
  );
  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
    });
  });

  // --- Scroll Progress Indicator ---
  const scrollIndicator = document.querySelector(".scroll-indicator");
  function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) {
      scrollIndicator.style.transform = "scaleX(0)";
      return;
    }
    const scrollPercent = scrollTop / docHeight;
    scrollIndicator.style.transform = `scaleX(${scrollPercent})`;
  }

  // --- Mobile Menu Logic ---
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const openIcon = document.getElementById("menu-icon-open");
  const closeIcon = document.getElementById("menu-icon-close");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      const isExpanded =
        mobileMenuButton.getAttribute("aria-expanded") === "true";
      mobileMenuButton.setAttribute("aria-expanded", !isExpanded);
      mobileMenu.classList.toggle("hidden");
      openIcon.classList.toggle("hidden");
      closeIcon.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
      if (
        !mobileMenuButton.contains(e.target) &&
        !mobileMenu.contains(e.target)
      ) {
        mobileMenu.classList.add("hidden");
        openIcon.classList.remove("hidden");
        closeIcon.classList.add("hidden");
        mobileMenuButton.setAttribute("aria-expanded", "false");
      }
    });

    // Close mobile menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        openIcon.classList.remove("hidden");
        closeIcon.classList.add("hidden");
        mobileMenuButton.setAttribute("aria-expanded", String(!isExpanded));
      });
    });
  }

  // --- Modal Logic ---
  const modal = document.getElementById("bookingModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const openModalBtns = document.querySelectorAll(".js-open-modal");
  const calendlyUrl = "https://calendly.com/your-username"; // Replace with actual Calendly URL

  const openModal = () => {
    const iframe = modal.querySelector("iframe");
    const loadingText = modal.querySelector("p");

    if (iframe.src !== calendlyUrl) {
      iframe.src = calendlyUrl;
      iframe.addEventListener(
        "load",
        () => {
          if (loadingText) loadingText.style.display = "none";
        },
        { once: true }
      );
    }
    modal.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    const iframe = modal.querySelector("iframe");
    if (iframe) {
      iframe.src = "";
    }
    modal.classList.remove("is-open");
    document.body.style.overflow = "auto";
  };

  openModalBtns.forEach((btn) => btn.addEventListener("click", openModal));

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeModal);
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }

  // Close modal with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("is-open")) {
      closeModal();
    }
  });

  // --- Smooth Scrolling for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href === "#") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      e.preventDefault();
      const headerHeight = document.querySelector("header").offsetHeight;
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        20;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // --- Form Handling ---
  const subscribeForm = document.querySelector('form[name="subscribe"]');
  if (subscribeForm) {
    subscribeForm.addEventListener("submit", function (e) {
      const emailInput = this.querySelector('input[name="email"]');
      if (!validateEmail(emailInput.value)) {
        e.preventDefault();
        alert("Please enter a valid email address.");
        return;
      }
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = "Subscribing...";
      submitBtn.disabled = true;

      // Re-enable after 2 seconds (Netlify will handle the actual submission)
      setTimeout(() => {
        submitBtn.textContent = "Subscribed!";
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          this.reset();
        }, 1500);
      }, 1000);
    });
  }

  // --- Header Background on Scroll ---
  const header = document.querySelector("header");
  function updateHeaderBackground() {
    if (window.scrollY > 50) {
      header.style.background = "rgba(11, 18, 32, 0.95)";
    } else {
      header.style.background = "rgba(11, 18, 32, 0.8)";
    }
  }

  // --- Emoji Animation on Hover ---
  document.querySelectorAll(".emoji-heading").forEach((emoji) => {
    emoji.addEventListener("mouseenter", () => {
      emoji.style.animationPlayState = "running";
    });
  });

  // --- Performance: Throttle scroll events ---
  let scrollTimeout = null;

  function throttledScrollHandler() {
    if (scrollTimeout) return;
    scrollTimeout = setTimeout(() => {
      updateScrollProgress();
      updateHeaderBackground();
      scrollTimeout = null;
    }, 16); // ~60fps
  }
  window.removeEventListener("scroll", updateScrollProgress);
  window.removeEventListener("scroll", updateHeaderBackground);
  window.addEventListener("scroll", throttledScrollHandler, {
    passive: true,
  });

  // --- Loading Animation for Interactive Elements ---
  document.querySelectorAll(".btn-primary, .btn-ghost").forEach((button) => {
    button.addEventListener("click", function () {
      if (!this.classList.contains("js-open-modal")) {
        const originalText = this.innerHTML;
        this.innerHTML = '<div class="loading-spinner mx-auto"></div>';
        setTimeout(() => {
          this.innerHTML = originalText;
        }, 1500);
      }
    });
  });

  // --- Enhanced Accessibility ---
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-navigation");
    }
  });
  document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-navigation");
  });

  const yearEl = document.getElementById("siteYear");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Function to load project and blog previews onto the homepage
  const loadHomepagePreviews = async () => {
    try {
      // --- Load Projects ---
      const projectsGrid = document.getElementById("projects-preview-grid");
      const projectsResponse = await fetch("projects.json");
      const allProjects = await projectsResponse.json();
      const projectsToShow = allProjects.slice(0, 3); // Get the first 3 projects

      let projectsHTML = "";
      projectsToShow.forEach((project, index) => {
        const outcomeSnippet =
          project.outcome.paragraphs[0].substring(0, 120) + "...";

        projectsHTML += `
    <a href="project-context.html?slug=${
      project.slug
    }" class="block glass rounded-2xl p-7 interactive-hover h-full flex flex-col" data-aos="flip-left" data-aos-delay="${
          (index + 1) * 100
        }">

      <div class="flex-grow">
        <span class="text-sm font-semibold text-primary">${project.category.toUpperCase()}</span>
        <h3 class="text-xl font-semibold mt-2">${project.title} ${
          project.clientName
        }</h3>

        <p class="text-muted text-sm mt-3">
          <strong class="text-ink">Challenge:</strong> ${project.tagline}
        </p>
        <p class="text-muted text-sm mt-3">
          <strong class="text-ink">Outcome:</strong> ${outcomeSnippet}
        </p>
      </div>

      <div class="mt-4 flex flex-wrap items-center gap-2">
        ${project.stats
          .slice(0, 3)
          .map((stat) => `<span class="pill text-xs">${stat.value}</span>`)
          .join("")}
      </div>
    </a>`;
      });
      projectsGrid.innerHTML = projectsHTML;

      // --- Load Blog Posts ---
      const blogsGrid = document.getElementById("blogs-preview-grid");
      const blogsResponse = await fetch("blog.json");
      const allBlogs = await blogsResponse.json();
      const blogsToShow = allBlogs.slice(0, 3); // Get the first 3 blog posts

      let blogsHTML = "";
      blogsToShow.forEach((post, index) => {
        const icons = {
          "Data Science": "📊",
          "AI Strategy": "🤖",
          MVP: "🏗️",
          Validation: "🧪",
        };
        const icon = icons[post.tags[0]] || "🔬";

        blogsHTML += `
          <a href="blog-context.html?slug=${
            post.slug
          }" class="block glass rounded-2xl p-7 interactive-hover h-full" data-aos="slide-up" data-aos-delay="${
          (index + 1) * 100
        }">
            <div class="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
              <span class="text-2xl">${icon}</span>
            </div>
            <h3 class="text-xl font-semibold">${post.title}</h3>
            <p class="text-sm text-muted mt-3">${post.subtitle}</p>
            <div class="mt-4 flex items-center gap-2">
              ${post.tags
                .map((tag) => `<span class="pill text-xs">${tag}</span>`)
                .join("")}
            </div>
          </a>`;
      });
      blogsGrid.innerHTML = blogsHTML;

      // --- Refresh Animations ---
      // Give the DOM a moment to update, then refresh AOS
      setTimeout(() => {
        if (typeof AOS !== "undefined") {
          AOS.refresh();
        }
      }, 100);
    } catch (error) {
      console.error("Failed to load homepage previews:", error);
      // Optionally display an error message in the grids
      document.getElementById("projects-preview-grid").innerHTML =
        '<p class="text-muted">Could not load projects.</p>';
      document.getElementById("blogs-preview-grid").innerHTML =
        '<p class="text-muted">Could not load blog posts.</p>';
    }
  };

  // Run the function
  loadHomepagePreviews();
});
