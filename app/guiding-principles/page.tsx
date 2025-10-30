"use client";

import { ModalButton } from "@/components/ui/modal-button";

// import { FaBullseye, FaFire, FaPuzzlePiece } from "react-icons/fa6";

export default function GuidingPrinciplesPage() {
  const cardGradients = [
    "bg-gradient-to-br from-primary/10 via-bg to-primary/5 border-l-4 border-primary/30",
    "bg-gradient-to-br from-secondary/10 via-bg to-secondary/5 border-l-4 border-secondary/30",
    "bg-gradient-to-br from-accent/10 via-bg to-accent/5 border-l-4 border-accent/30",
  ];
  const iconBg = "rounded-full p-4 mb-4 shadow-lg bg-primary/10";

  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="text-primary mb-12 text-center text-5xl font-bold tracking-tight drop-shadow-lg">
        Our Guiding Principles
      </h2>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        {/* Measurable Impact, Fast */}
        <div
          className={`group focus-within:ring-primary/30 focus-within:ring-4 ${cardGradients[0]} flex flex-col items-center rounded-2xl border p-10 shadow-lg transition-shadow duration-200`}
          tabIndex={0}
          aria-label="Measurable Impact, Fast"
        >
          <div className={iconBg} aria-label="Bullseye icon">
            {/* <FaBullseye className="text-primary text-5xl" /> */}
          </div>
          <h3 className="text-primary mb-4 text-center text-2xl font-semibold">
            Measurable Impact, Fast
          </h3>
          <ul className="text-ink space-y-3 text-left text-lg">
            <li>
              <span
                className="text-primary text-lg font-extrabold"
                title="Quick validation of AI use cases"
              >
                Pilot-First Approach
              </span>{" "}
              – Validate AI use cases in 2-4 weeks before full-scale deployment.
            </li>
            <li>
              <span
                className="text-primary text-lg font-extrabold"
                title="Return on investment focus"
              >
                ROI-Driven Execution
              </span>{" "}
              – Ensure AI investments deliver clear cost savings and efficiency
              gains.
            </li>
            <li>
              <span
                className="text-primary text-lg font-extrabold"
                title="Structured frameworks"
              >
                Proven Methodologies
              </span>{" "}
              – Use structured, repeatable frameworks to reduce risk & scale
              success.
            </li>
          </ul>
          <span className="sr-only">End of Measurable Impact, Fast card</span>
        </div>
        {/* Customized Fit */}
        <div
          className={`group focus-within:ring-secondary/30 focus-within:ring-4 ${cardGradients[1]} flex flex-col items-center rounded-2xl border p-10 shadow-lg transition-shadow duration-200`}
          tabIndex={0}
          aria-label="Customized Fit"
        >
          <div className={iconBg} aria-label="Puzzle piece icon">
            {/* <FaPuzzlePiece className="text-secondary text-5xl" /> */}
          </div>
          <h3 className="text-secondary mb-4 text-center text-2xl font-semibold">
            Customized Fit
          </h3>
          <ul className="text-ink space-y-3 text-left text-lg">
            <li>
              <span
                className="text-secondary text-lg font-extrabold"
                title="Expertise in advanced AI"
              >
                Best-in-Class AI
              </span>{" "}
              – Expertise in LLMs, AI agents, automation, and predictive
              analytics.
            </li>
            <li>
              <span
                className="text-secondary text-lg font-extrabold"
                title="Low-risk and innovative solutions"
              >
                Risk-Calibrated Solutions
              </span>{" "}
              – Deploy low-risk, proven AI or explore cutting-edge innovations.
            </li>
            <li>
              <span
                className="text-secondary text-lg font-extrabold"
                title="Easy integration"
              >
                Seamless Integration
              </span>{" "}
              – AI solutions fit into your workflows with minimal disruption.
            </li>
          </ul>
          <span className="sr-only">End of Customized Fit card</span>
        </div>
        {/* Flexibility, Always */}
        <div
          className={`group focus-within:ring-accent/30 focus-within:ring-4 ${cardGradients[2]} flex flex-col items-center rounded-2xl border p-10 shadow-lg transition-shadow duration-200`}
          tabIndex={0}
          aria-label="Flexibility, Always"
        >
          <div className={iconBg} aria-label="Fire icon">
            {/* <FaFire className="text-accent text-5xl" /> */}
          </div>
          <h3 className="text-accent mb-4 text-center text-2xl font-semibold">
            Flexibility, Always
          </h3>
          <ul className="text-ink space-y-3 text-left text-lg">
            <li>
              <span
                className="text-accent text-lg font-extrabold"
                title="Choose your engagement"
              >
                Custom Engagements
              </span>{" "}
              – Choose advisory, full implementation, or ongoing AI support.
            </li>
            <li>
              <span
                className="text-accent text-lg font-extrabold"
                title="Flexible pricing"
              >
                Tailored Pricing
              </span>{" "}
              – Flexible pricing models to fit your business needs.
            </li>
            <li>
              <span
                className="text-accent text-lg font-extrabold"
                title="Optimized development"
              >
                Optimized Development
              </span>{" "}
              – Balance budget, risk, and speed without compromising quality.
            </li>
          </ul>
          <span className="sr-only">End of Flexibility, Always card</span>
        </div>
      </div>
      <div className="mt-12 flex justify-center">
        <ModalButton> Learn More / Contact Us</ModalButton>
      </div>
    </section>
  );
}
