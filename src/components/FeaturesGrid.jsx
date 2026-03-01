import '../styles/features.css'

const features = [
  {
    title: 'Zero friction',
    desc: 'No timers. No manual logging. No dashboards to open. Just code — daimon handles the rest.',
    icon: '◈',
  },
  {
    title: 'AI summaries',
    desc: 'Plain English descriptions of what you built each session. Not file names — what actually changed.',
    icon: '✦',
  },
  {
    title: 'Local first',
    desc: 'Everything stored in SQLite on your machine. No cloud sync, no accounts, no subscriptions.',
    icon: '▣',
  },
  {
    title: 'Beautiful dashboard',
    desc: 'daimon vision opens a local web UI with session timelines, file heatmaps, and full diff browsing.',
    icon: '◉',
  },
]

export default function FeaturesGrid() {
  return (
    <section className="features-section">
      <div className="features-inner">
        <p className="section-label">FEATURES</p>
        <h2 className="section-title">Everything you need. Nothing you don't.</h2>
        <div className="features-grid">
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <span className="feature-icon">{f.icon}</span>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
