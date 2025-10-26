
import React from "react";
import { FaBullseye, FaPuzzlePiece, FaFire } from "react-icons/fa";

const cardGradient = "bg-gradient-to-br from-primary/10 via-bg to-primary/5";
const iconBg = "rounded-full p-4 mb-4 shadow-lg bg-primary/10";

export default function GuidingPrinciples() {
  return (
    <section className="max-w-6xl mx-auto py-20 px-4">
      <h2 className="text-5xl font-bold text-center mb-12 text-primary drop-shadow-lg tracking-tight">Our Guiding Principles</h2>
      <div className="grid md:grid-cols-3 gap-10">
        {/* Measurable Impact, Fast */}
        <div className={`transition-transform hover:-translate-y-2 hover:shadow-2xl ${cardGradient} rounded-2xl shadow-lg p-10 flex flex-col items-center border border-primary/20`}>
          <div className={iconBg}>
            <FaBullseye className="text-primary text-5xl" />
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-primary text-center">Measurable Impact, Fast</h3>
          <ul className="text-ink space-y-3 text-left text-lg">
            <li><span className="font-extrabold text-primary text-lg">Pilot-First Approach</span> – Validate AI use cases in 2-4 weeks before full-scale deployment.</li>
            <li><span className="font-extrabold text-primary text-lg">ROI-Driven Execution</span> – Ensure AI investments deliver clear cost savings and efficiency gains.</li>
            <li><span className="font-extrabold text-primary text-lg">Proven Methodologies</span> – Use structured, repeatable frameworks to reduce risk & scale success.</li>
          </ul>
        </div>
        {/* Customized Fit */}
        <div className={`transition-transform hover:-translate-y-2 hover:shadow-2xl ${cardGradient} rounded-2xl shadow-lg p-10 flex flex-col items-center border border-primary/20`}>
          <div className={iconBg}>
            <FaPuzzlePiece className="text-primary text-5xl" />
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-primary text-center">Customized Fit</h3>
          <ul className="text-ink space-y-3 text-left text-lg">
            <li><span className="font-extrabold text-primary text-lg">Best-in-Class AI</span> – Expertise in LLMs, AI agents, automation, and predictive analytics.</li>
            <li><span className="font-extrabold text-primary text-lg">Risk-Calibrated Solutions</span> – Deploy low-risk, proven AI or explore cutting-edge innovations.</li>
            <li><span className="font-extrabold text-primary text-lg">Seamless Integration</span> – AI solutions fit into your workflows with minimal disruption.</li>
          </ul>
        </div>
        {/* Flexibility, Always */}
        <div className={`transition-transform hover:-translate-y-2 hover:shadow-2xl ${cardGradient} rounded-2xl shadow-lg p-10 flex flex-col items-center border border-primary/20`}>
          <div className={iconBg}>
            <FaFire className="text-primary text-5xl" />
          </div>
          <h3 className="text-2xl font-semibold mb-4 text-primary text-center">Flexibility, Always</h3>
          <ul className="text-ink space-y-3 text-left text-lg">
            <li><span className="font-extrabold text-primary text-lg">Custom Engagements</span> – Choose advisory, full implementation, or ongoing AI support.</li>
            <li><span className="font-extrabold text-primary text-lg">Tailored Pricing</span> – Flexible pricing models to fit your business needs.</li>
            <li><span className="font-extrabold text-primary text-lg">Optimized Development</span> – Balance budget, risk, and speed without compromising quality.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
