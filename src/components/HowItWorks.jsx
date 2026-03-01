import '../styles/howitworks.css'

const steps = [
  {
    cmd: 'daimon haunt',
    desc: 'Point daimon at your project once. It registers silently in the background and starts watching.',
    num: '01',
  },
  {
    cmd: 'Code normally',
    desc: 'daimon watches silently — no timers to start, no journals to fill, no friction whatsoever.',
    num: '02',
  },
  {
    cmd: 'daimon recall',
    desc: 'See exactly what you built, in plain English, powered by Claude. No noise, just signal.',
    num: '03',
  },
]

export default function HowItWorks() {
  return (
    <section className="how-section">
      <div className="how-inner">
        <p className="section-label">HOW IT WORKS</p>
        <h2 className="section-title">Three commands. Zero friction.</h2>
        <div className="steps-row">
          {steps.map((s) => (
            <div key={s.num} className="step-card">
              <span className="step-num">{s.num}</span>
              <code className="step-cmd">{s.cmd}</code>
              <p className="step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
