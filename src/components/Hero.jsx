import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import EyeCanvas from './EyeCanvas.jsx'
import '../styles/hero.css'

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button className="copy-btn-hero" onClick={copy} aria-label="Copy">
      {copied ? '✓' : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="9" y="9" width="13" height="13" rx="0" ry="0"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
      )}
    </button>
  )
}

export default function Hero() {
  const installCmd = 'curl -fsSL https://raw.githubusercontent.com/Kishanmp3/daimon/main/install.sh | sh'

  return (
    <section className="hero">
      <div className="hero-inner">
        {/* Left column */}
        <div className="hero-left">
          <p className="hero-label">THE SPIRIT THAT WATCHES YOUR CODE</p>
          <h1 className="hero-title">daimon</h1>
          <p className="hero-sub">
            WakaTime tells you how long you coded.<br />
            Daimon tells you what you built.
          </p>
          <div className="hero-buttons">
            <a href="#install" className="btn-primary">
              curl install →
            </a>
            <a
              href="https://github.com/Kishanmp3/daimon"
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              View on GitHub →
            </a>
          </div>
          <div className="install-block">
            <code className="install-cmd">{installCmd}</code>
            <CopyButton text={installCmd} />
          </div>
          <p className="social-proof">Built for developers who ship.</p>
        </div>

        {/* Right column — animated eye */}
        <div className="hero-right">
          <EyeCanvas />
        </div>
      </div>
    </section>
  )
}
