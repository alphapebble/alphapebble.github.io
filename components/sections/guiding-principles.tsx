
import React from "react";
import { FaBullseye, FaPuzzlePiece, FaFire } from "react-icons/fa";
// ...existing code...
export default function GuidingPrinciples() {
  const cardGradients = [
    "bg-gradient-to-br from-primary/10 via-bg to-primary/5 border-l-4 border-primary/30",
    "bg-gradient-to-br from-secondary/10 via-bg to-secondary/5 border-l-4 border-secondary/30",
    "bg-gradient-to-br from-accent/10 via-bg to-accent/5 border-l-4 border-accent/30",
  ];
  const iconBg = "rounded-full p-4 mb-4 shadow-lg bg-primary/10";

  // ...existing code...
  return (
    <section className="max-w-6xl mx-auto py-20 px-4">
      <h2 className="text-5xl font-bold text-center mb-12 text-primary drop-shadow-lg tracking-tight">Our Guiding Principles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Measurable Impact, Fast */}
        <div
          className={`group focus-within:ring-4 focus-within:ring-primary/30 ${cardGradients[0]} rounded-2xl shadow-lg p-10 flex flex-col items-center border transition-shadow duration-200`}
          tabIndex={0}
          aria-label="Measurable Impact, Fast"
        >
          <div className={iconBg} aria-label="Bullseye icon">
            <FaBullseye className="text-primary text-5xl" />
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-primary text-center">Measurable Impact, Fast</h3>
          <ul className="text-ink space-y-3 text-left text-lg">
            <li>
              <span className="font-extrabold text-primary text-lg" title="Quick validation of AI use cases">Pilot-First Approach</span> – Validate AI use cases in 2-4 weeks before full-scale deployment.
            </li>
            <li>
              <span className="font-extrabold text-primary text-lg" title="Return on investment focus">ROI-Driven Execution</span> – Ensure AI investments deliver clear cost savings and efficiency gains.
            </li>
            <li>
              <span className="font-extrabold text-primary text-lg" title="Structured frameworks">Proven Methodologies</span> – Use structured, repeatable frameworks to reduce risk & scale success.
            </li>
          </ul>
          <span className="sr-only">End of Measurable Impact, Fast card</span>
        </div>
        {/* Customized Fit */}
        <div
          className={`group focus-within:ring-4 focus-within:ring-secondary/30 ${cardGradients[1]} rounded-2xl shadow-lg p-10 flex flex-col items-center border transition-shadow duration-200`}
          tabIndex={0}
          aria-label="Customized Fit"
        >
          <div className={iconBg} aria-label="Puzzle piece icon">
            <FaPuzzlePiece className="text-secondary text-5xl" />
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-secondary text-center">Customized Fit</h3>
          <ul className="text-ink space-y-3 text-left text-lg">
            <li>
              <span className="font-extrabold text-secondary text-lg" title="Expertise in advanced AI">Best-in-Class AI</span> – Expertise in LLMs, AI agents, automation, and predictive analytics.
            </li>
            <li>
              <span className="font-extrabold text-secondary text-lg" title="Low-risk and innovative solutions">Risk-Calibrated Solutions</span> – Deploy low-risk, proven AI or explore cutting-edge innovations.
            </li>
            <li>
              <span className="font-extrabold text-secondary text-lg" title="Easy integration">Seamless Integration</span> – AI solutions fit into your workflows with minimal disruption.
            </li>
          </ul>
          <span className="sr-only">End of Customized Fit card</span>
        </div>
        {/* Flexibility, Always */}
        <div
          className={`group focus-within:ring-4 focus-within:ring-accent/30 ${cardGradients[2]} rounded-2xl shadow-lg p-10 flex flex-col items-center border transition-shadow duration-200`}
          tabIndex={0}
          aria-label="Flexibility, Always"
        >
          <div className={iconBg} aria-label="Fire icon">
            <FaFire className="text-accent text-5xl" />
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-accent text-center">Flexibility, Always</h3>
          <ul className="text-ink space-y-3 text-left text-lg">
            <li>
              <span className="font-extrabold text-accent text-lg" title="Choose your engagement">Custom Engagements</span> – Choose advisory, full implementation, or ongoing AI support.
            </li>
            <li>
              <span className="font-extrabold text-accent text-lg" title="Flexible pricing">Tailored Pricing</span> – Flexible pricing models to fit your business needs.
            </li>
            <li>
              <span className="font-extrabold text-accent text-lg" title="Optimized development">Optimized Development</span> – Balance budget, risk, and speed without compromising quality.
            </li>
          </ul>
          <span className="sr-only">End of Flexibility, Always card</span>
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <a
          href="https://cal.com/alphapebble/15min"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-primary text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-primary/80 focus:outline-none focus:ring-4 focus:ring-primary/30 transition-colors duration-200 text-xl"
          aria-label="Book a call with AlphaPebble"
        >
          Learn More / Contact Us
        </a>
      </div>
    </section>
  );
}
