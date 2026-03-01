import { useState } from 'react'
import '../styles/install.css'

const macCmd = 'curl -fsSL https://raw.githubusercontent.com/Kishanmp3/daimon/main/install.sh | sh'
const winCmd = 'irm https://raw.githubusercontent.com/Kishanmp3/daimon/main/install.ps1 | iex'

function CopyBlock({ label, cmd }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(cmd)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="install-block-row">
      <span className="install-os">{label}</span>
      <div className="install-code-row">
        <code className="install-code">{cmd}</code>
        <button className="install-copy" onClick={copy}>
          {copied ? '✓ copied' : 'copy'}
        </button>
      </div>
    </div>
  )
}

export default function InstallSection() {
  return (
    <section className="install-section" id="install">
      <div className="install-inner">
        <p className="section-label">INSTALL</p>
        <h2 className="section-title">Start in 30 seconds</h2>
        <div className="install-blocks">
          <CopyBlock label="Mac / Linux" cmd={macCmd} />
          <CopyBlock label="Windows (PowerShell)" cmd={winCmd} />
        </div>
        <p className="install-note">
          Requires an Anthropic API key —{' '}
          <a href="https://console.anthropic.com" target="_blank" rel="noreferrer" className="install-link">
            get one free at console.anthropic.com
          </a>
        </p>
      </div>
    </section>
  )
}
