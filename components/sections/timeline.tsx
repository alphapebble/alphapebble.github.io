export function TimelineSection() {
  const timeline = [
    {
      period: "DAYS 1—30",
      title: "De-risk & Decide",
      description:
        "Launch experiments that provide data-backed answers to your riskiest assumptions.",
      aos: "slide-right",
    },
    {
      period: "DAYS 31—60",
      title: "Workflow MVP Live",
      description:
        "A thin slice of your product is live and in front of real users, generating feedback.",
      aos: "slide-up",
    },
    {
      period: "DAYS 61—90",
      title: "Harden & Handoff",
      description:
        "The MVP is optimized for run-cost and security, with clean documentation for your team to take over.",
      aos: "slide-left",
    },
  ];
  return (
    <section id="timeline" className="py-16">
      <div className="mb-12 text-center">
        <h2
          className="text-center text-3xl font-bold md:text-4xl"
          data-aos="fade-down"
          data-aos-duration="800"
        >
          <span className="emoji-heading">📅</span> The 30—60—90 Promise
        </h2>
        <p
          className="text-muted mx-auto mt-3 max-w-3xl text-center text-lg"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          A clear timeline for tangible results. No ambiguity, just progress.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {timeline.map((item, index) => (
          <div
            key={item.title}
            data-aos={item.aos}
            data-aos-delay={100 * (index + 1)}
            className="glass rounded-xl p-7"
          >
            <div className="text-primary text-sm font-semibold">
              {item.period}
            </div>
            <div className="mt-2 text-lg font-semibold">{item.title}</div>
            <p className="text-muted mt-1 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
