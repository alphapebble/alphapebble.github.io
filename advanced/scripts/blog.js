const posts = [
  {
    id: 1,
    title: "Can AI Agents Build MVPs? Our LangChain & CrewAI Experiments",
    date: "May 2, 2025",
    author: "Alex Johnson",
    category: "AI/ML",
    tags: ["LangChain", "CrewAI", "MVP"],
    image:
      "https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070&auto=format&fit=crop",
    excerpt:
      "We tested lightweight agent loops to automate onboarding, research, and recommendation flows. What worked, what didn't — and what's next.",
    readingTime: 8,
    featured: true,
    fullContent: `<p class="lead text-xl text-text-primary">We put AI agents to the test. Can they really handle the complex, nuanced task of building a Minimum Viable Product? We used LangChain and CrewAI to find out.</p><p>This is where the full article about AI agents would go...</p>`,
  },
  {
    id: 2,
    title: "After the MVP: Slashing Cloud Costs & Securing Growth",
    date: "April 10, 2025",
    author: "Maria Garcia",
    category: "Scale-Stage",
    tags: ["FinOps", "AWS", "Security"],
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2232&auto=format&fit=crop",
    excerpt:
      "How startups can streamline cloud spend and get audit-ready without hiring full-time engineers.",
    readingTime: 6,
    featured: false,
    fullContent: `
            <p class="lead text-xl text-text-primary">You've built your MVP and found product-market fit. Congratulations, that's the hardest part. But with growth comes new, expensive challenges. Here's how to tackle them without hiring full-time specialists.</p>
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" alt="Dashboard with charts" class="my-8 rounded-lg">
            <h2>The Two Silent Killers: Cloud Bills and Security Audits</h2>
            <p>As your user base grows, so does your infrastructure. Your monthly AWS or Vercel bill starts to climb. At the same time, potential investors or enterprise clients start asking tough questions about your security posture. These two areas, FinOps (Financial Operations) and SecOps (Security Operations), become critical.</p>
            <blockquote>"Most early-stage startups overspend on cloud by at least 25% due to unoptimized resources. It's like leaving the lights on in an empty skyscraper."</blockquote>
            <h3>Our Approach to FinOps</h3>
            <p>We believe in lean infrastructure. Our process involves:</p>
            <ul>
                <li><strong>Resource Auditing:</strong> Identifying idle databases, oversized servers, and unused services.</li>
                <li><strong>Architecture Review:</strong> Recommending cost-effective alternatives like serverless functions where appropriate.</li>
                <li><strong>Budget Alerting:</strong> Setting up automated alerts to prevent surprise bills.</li>
            </ul>
            <p>By focusing on these key areas, we can often reduce a startup's cloud spend significantly within a few weeks, freeing up precious capital for growth.</p>
        `,
  },
  {
    id: 3,
    title: "Tech Due Diligence for Investors & Founders",
    date: "April 15, 2025",
    author: "Alex Johnson",
    category: "Due Diligence",
    tags: ["Investors", "Startups", "Audit"],
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
    excerpt:
      "Auditing codebases, infrastructure, and scalability before committing to a deal. A one-week teardown.",
    readingTime: 5,
    featured: false,
  },
  {
    id: 4,
    title: "The 7-Day MVP: From Napkin Sketch to User Feedback",
    date: "June 15, 2025",
    author: "Maria Garcia",
    category: "Strategy",
    tags: ["Validation", "Prototyping"],
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
    excerpt:
      "Speed is a startup's greatest advantage. Here's our playbook for turning an idea into a testable product in just one week.",
    readingTime: 7,
    featured: false,
  },
];

document.addEventListener("DOMContentLoaded", function () {
  const escapeHTML = (str = "") =>
    String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  if (document.getElementById("blog-posts")) {
    const blogGrid = document.getElementById("blog-grid");
    const searchInput = document.getElementById("search-input");
    const categoryFilters = document.getElementById("category-filters");
    const noResultsMessage = document.getElementById("no-results");

    if (!blogGrid || !searchInput || !categoryFilters || !noResultsMessage) {
      console.warn(
        "Required DOM elements missing: blog-grid / search-input / category-filters / no-results"
      );
      return;
    }

    function renderPosts(postList) {
      noResultsMessage.classList.toggle("hidden", postList.length > 0);
      if (postList.length === 0) {
        blogGrid.innerHTML = "";
        if (window.AOS) AOS.refresh();
        return;
      }
      const html = postList
        .map((post, index) => {
          const cardClasses = [
            "block",
            "bg-background-alt",
            "rounded-xl",
            "border",
            post.featured ? "border-2 border-primary" : "border-gray-800",
            "overflow-hidden",
            "transition-all",
            "duration-300",
            "hover:-translate-y-2",
            "hover:shadow-2xl",
            post.featured
              ? "hover:shadow-primary/20"
              : "hover:border-primary/50",
            "spotlight-card",
          ].join(" ");
          return `
          <a href="post.html?id=${post.id}"
             class="${cardClasses}"
             data-aos="fade-up"
             data-aos-delay="${index * 100}">
              <img src="${escapeHTML(post.image)}" alt="${escapeHTML(
            post.title
          )}" class="w-full h-48 object-cover" />
            <div class="p-6 flex flex-col justify-between min-h-[220px]">
              <div>
                <span class="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
                  ${escapeHTML(post.category)}
                </span>
                <h3 class="text-xl font-bold mb-3 text-text-primary leading-tight">
                  ${escapeHTML(post.title)}
                </h3>
                <p class="text-text-secondary text-sm">
                  ${escapeHTML(post.excerpt)}
                </p>
              </div>
              <div class="text-text-secondary text-xs mt-6 pt-4 border-t border-gray-700 flex justify-between items-center">
                <span>By ${escapeHTML(post.author)}</span>
                <span>${
                  post.readingTime
                    ? `${escapeHTML(String(post.readingTime))} min read`
                    : escapeHTML(post.date)
                }</span>
              </div>
            </div>
          </a>
        `;
        })
        .join("");

      blogGrid.innerHTML = html;
      if (window.AOS && typeof window.AOS.refresh === "function") {
        AOS.refresh();
      }
    }

    // Build category buttons
    function renderCategories() {
      const categories = ["All", ...new Set(posts.map((p) => p.category))];
      categoryFilters.innerHTML = categories
        .map((cat, i) => {
          const isAll = cat === "All";
          const activeClass = isAll
            ? "bg-primary text-white"
            : "bg-background-alt hover:bg-primary/50";
          return `<button class="category-btn px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeClass}" data-category="${escapeHTML(
            cat
          )}">${escapeHTML(cat)}</button>`;
        })
        .join("");
    }

    // Debounce helper
    function debounce(fn, wait = 200) {
      let t;
      return (...args) => {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
      };
    }

    function filterAndSearch() {
      const searchTerm = searchInput.value.trim().toLowerCase();
      const activeCategoryBtn = document.querySelector(
        ".category-btn.bg-primary"
      );
      const activeCategory = activeCategoryBtn
        ? activeCategoryBtn.dataset.category
        : "All";

      let filteredPosts = posts.slice();

      if (activeCategory && activeCategory !== "All") {
        filteredPosts = filteredPosts.filter(
          (post) => post.category === activeCategory
        );
      }

      if (searchTerm) {
        filteredPosts = filteredPosts.filter((post) => {
          const inTitle = post.title.toLowerCase().includes(searchTerm);
          const inExcerpt = post.excerpt.toLowerCase().includes(searchTerm);
          const inTags =
            post.tags &&
            post.tags.some((t) => t.toLowerCase().includes(searchTerm));
          return inTitle || inExcerpt || inTags;
        });
      }

      renderPosts(filteredPosts);
    }

    // --- EVENT LISTENERS ---
    const debouncedFilter = debounce(filterAndSearch, 200);
    searchInput.addEventListener("input", debouncedFilter);

    categoryFilters.addEventListener("click", (e) => {
      const btn = e.target.closest(".category-btn");
      if (!btn) return;

      document.querySelectorAll(".category-btn").forEach((b) => {
        b.classList.remove("bg-primary", "text-white");
        b.classList.add("bg-background-alt", "hover:bg-primary/50");
      });

      btn.classList.add("bg-primary", "text-white");
      btn.classList.remove("bg-background-alt", "hover:bg-primary/50");

      filterAndSearch();
    });

    // --- INITIAL RENDER ---
    renderCategories();
    renderPosts(posts);
  }

  if (document.getElementById("blog-body")) {
    const postContent = document.getElementById("post-content");
    const postNotFound = document.getElementById("post-not-found");

    const params = new URLSearchParams(window.location.search);
    const postId = parseInt(params.get("id"), 10);
    const post = posts.find((p) => p.id === postId);

    if (!post) {
      document.title = "Article Not Found | AlphaPebble";
      postContent.classList.add("hidden");
      postNotFound.classList.remove("hidden");
      return;
    }

    // Update page title
    document.title = `${post.title} | AlphaPebble`;

    // Populate header
    document.getElementById("post-title").textContent = post.title;
    document.getElementById("post-category").textContent = post.category;

    // Meta info in one line (author • date • reading time)
    const metaEl = document.getElementById("post-meta");
    metaEl.textContent = `${post.author} • ${post.date} • ${
      post.readingTime ? post.readingTime + " min read" : ""
    }`;

    // Body content with fallback
    const postBodyEl = document.getElementById("post-body");
    if (post.fullContent && post.fullContent.trim() !== "") {
      postBodyEl.innerHTML = post.fullContent;
    } else if (post.excerpt && post.excerpt.trim() !== "") {
      postBodyEl.innerHTML = `<p class="lead text-xl text-text-primary">${post.excerpt}</p>`;
    } else {
      postBodyEl.innerHTML = `<p class="lead text-xl text-text-primary">Full article content is not available.</p>`;
    }
  }
});
