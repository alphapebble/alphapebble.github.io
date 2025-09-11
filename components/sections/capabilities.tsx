export function CapabilitiesSection() {
  const capabilities = [
    {
      title: "🧪 MVP Experiments",
      description:
        "Clickable prototypes in days, not months. We help you validate core assumptions before you invest significant capital.",
    },
    {
      title: "⚡ Workflow MVPs",
      description:
        "Thin-slice prototypes that actually do the work—powered by code, automation, or AI to handle real tasks for real users.",
    },
    {
      title: "📊 Product & Tech Due Diligence",
      description:
        "A one-week teardown for investors or acquirers: product, code, infra, scalability, and risks—delivered with a clear scorecard.",
    },
    {
      title: "🔧 Growth-Stage Support",
      description:
        "For when you have traction. We help you optimize run-costs, improve security posture, and prepare for audits like SOC 2.",
    },
  ];
  return (
    <section id="capabilities" className="py-16">
      <div className="mb-12 text-center">
        <h2
          className="text-3xl font-bold md:text-4xl"
          data-aos="fade-down"
          data-aos-duration="800"
        >
          <span className="emoji-heading">✨</span> We Don&apos;t Offer
          Services. We Build Possibilities.
        </h2>
        <p
          className="text-muted mx-auto mt-3 max-w-3xl text-lg"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Everything we do is designed to reduce your time to insight and
          deliver a reusable outcome you can scale.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {capabilities.map((item, index) => (
          <div
            key={item.title}
            data-aos="flip-left"
            data-aos-delay={100 * (index + 1)}
            className="glass rounded-2xl p-7"
          >
            <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
            <p className="text-muted">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
