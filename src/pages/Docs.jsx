import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/docs.css'

const sections = [
  {
    group: 'Getting Started',
    items: [
      { id: 'installation', label: 'Installation' },
      { id: 'first-time-setup', label: 'First time setup' },
    ],
  },
  {
    group: 'Commands',
    items: [
      { id: 'cmd-summon', label: 'daimon summon' },
      { id: 'cmd-haunt', label: 'daimon haunt' },
      { id: 'cmd-recall', label: 'daimon recall' },
      { id: 'cmd-manifest', label: 'daimon manifest' },
      { id: 'cmd-oracle', label: 'daimon oracle' },
      { id: 'cmd-vision', label: 'daimon vision' },
      { id: 'cmd-status', label: 'daimon status' },
      { id: 'cmd-end', label: 'daimon end' },
    ],
  },
  {
    group: 'How it works',
    items: [
      { id: 'session-detection', label: 'Session detection' },
      { id: 'shadow-diffing', label: 'Shadow diffing' },
      { id: 'ai-summaries', label: 'AI summaries' },
    ],
  },
  {
    group: '',
    items: [{ id: 'faq', label: 'FAQ' }],
  },
]

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button className="copy-btn" onClick={copy}>
      {copied ? '✓' : 'copy'}
    </button>
  )
}

function CodeBlock({ code, lang }) {
  return (
    <div className="code-block">
      <div className="code-block-header">
        <span className="code-lang">{lang}</span>
        <CopyButton text={code} />
      </div>
      <pre><code>{code}</code></pre>
    </div>
  )
}

export default function Docs() {
  const [active, setActive] = useState('installation')

  useEffect(() => {
    const handleScroll = () => {
      const ids = sections.flatMap(s => s.items.map(i => i.id))
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i])
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(ids[i])
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActive(id)
    }
  }

  return (
    <div className="docs-layout">
      <aside className="docs-sidebar">
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo">daimon</Link>
          <span className="sidebar-subtitle">docs</span>
        </div>
        <nav className="sidebar-nav">
          {sections.map((section) => (
            <div key={section.group || 'misc'} className="nav-group">
              {section.group && <span className="nav-group-label">{section.group}</span>}
              {section.items.map((item) => (
                <button
                  key={item.id}
                  className={`nav-item ${active === item.id ? 'active' : ''}`}
                  onClick={() => scrollTo(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      <main className="docs-content">
        <div className="docs-inner">

          {/* Installation */}
          <section id="installation" className="doc-section">
            <h1>Installation</h1>
            <p>Install daimon with a single command. No dependencies required.</p>

            <h3>Mac / Linux</h3>
            <CodeBlock
              lang="bash"
              code={`curl -fsSL https://raw.githubusercontent.com/Kishanmp3/daimon/main/install.sh | sh`}
            />

            <h3>Windows (PowerShell)</h3>
            <CodeBlock
              lang="powershell"
              code={`irm https://raw.githubusercontent.com/Kishanmp3/daimon/main/install.ps1 | iex`}
            />

            <div className="doc-note">
              <span className="note-label">Note</span>
              Requires an Anthropic API key. Get one free at{' '}
              <a href="https://console.anthropic.com" target="_blank" rel="noreferrer" className="doc-link">
                console.anthropic.com
              </a>
            </div>
          </section>

          {/* First time setup */}
          <section id="first-time-setup" className="doc-section">
            <h2>First time setup</h2>
            <p>
              After installation, run <code>daimon summon</code> once. It will prompt you for your
              Anthropic API key, then register daimon as a startup process so it runs silently
              in the background — you never need to run it again.
            </p>
            <CodeBlock lang="bash" code={`daimon summon`} />
            <div className="example-output">
              <div className="output-line"><span className="amber">?</span> Enter your Anthropic API key: sk-ant-...</div>
              <div className="output-line"><span className="amber">✓</span> API key saved</div>
              <div className="output-line"><span className="amber">✓</span> Daemon registered as startup process</div>
              <div className="output-line dim">  daimon will now start automatically on login</div>
            </div>
          </section>

          {/* Commands */}
          <section id="cmd-summon" className="doc-section">
            <h2><span className="cmd-prefix">daimon</span> summon</h2>
            <p>Initialize daimon for the first time. Stores your Anthropic API key securely and registers the background daemon as a startup process.</p>
            <CodeBlock lang="bash" code={`daimon summon`} />
            <p className="doc-note-inline">Only needs to be run once after installation.</p>
          </section>

          <section id="cmd-haunt" className="doc-section">
            <h2><span className="cmd-prefix">daimon</span> haunt</h2>
            <p>Tell daimon to begin watching a project. Point it at any directory — daimon will silently track file changes, git activity, and session timing.</p>
            <CodeBlock lang="bash" code={`daimon haunt [path]`} />
            <div className="example-output">
              <div className="output-line"><span className="amber">→</span> Daimon is haunting my-app. It will follow your work silently.</div>
              <div className="output-line"> </div>
              <div className="output-line"><span className="amber">●</span> session started — my-app</div>
              <div className="output-line dim">  watching 847 files...</div>
            </div>
            <div className="doc-note">
              <span className="note-label">Note</span>
              If <code>path</code> is omitted, daimon haunts the current working directory.
            </div>
          </section>

          <section id="cmd-recall" className="doc-section">
            <h2><span className="cmd-prefix">daimon</span> recall</h2>
            <p>Summarize your last session. daimon sends the session diff to the Anthropic API and returns a plain-English breakdown of what you built.</p>
            <CodeBlock lang="bash" code={`daimon recall [--session <id>]`} />
            <div className="example-output">
              <div className="output-line"><span className="amber">●</span> session closed — 1h 23m</div>
              <div className="output-line dim">  files changed: auth/login.js, api/routes.go, components/LoginForm.jsx</div>
              <div className="output-line"> </div>
              <div className="output-line"><span className="amber">✦</span> Built JWT authentication endpoint with bcrypt password hashing</div>
              <div className="output-line"><span className="amber">✦</span> Wired login form to backend, added error handling</div>
              <div className="output-line"><span className="amber">✦</span> Fixed null check bug in token validation middleware</div>
            </div>
          </section>

          <section id="cmd-manifest" className="doc-section">
            <h2><span className="cmd-prefix">daimon</span> manifest</h2>
            <p>View all recorded sessions for a project. Displays a list of sessions with timestamps, duration, and a one-line summary of each.</p>
            <CodeBlock lang="bash" code={`daimon manifest [project]`} />
            <div className="example-output">
              <div className="output-line"><span className="amber">◆</span> my-app — 12 sessions</div>
              <div className="output-line"> </div>
              <div className="output-line dim">  2024-01-15  1h 23m  JWT auth + login form</div>
              <div className="output-line dim">  2024-01-14  2h 07m  API route scaffolding</div>
              <div className="output-line dim">  2024-01-13  0h 45m  Database schema migrations</div>
            </div>
          </section>

          <section id="cmd-oracle" className="doc-section">
            <h2><span className="cmd-prefix">daimon</span> oracle</h2>
            <p>Ask a natural language question about your own codebase history. daimon searches across all sessions and answers using your recorded diffs and summaries.</p>
            <CodeBlock lang="bash" code={`daimon oracle "<question>"`} />
            <div className="example-output">
              <div className="output-line"><span className="amber">$</span> daimon oracle &quot;when did I add authentication?&quot;</div>
              <div className="output-line"> </div>
              <div className="output-line"><span className="amber">◆</span> Jan 15, 2024 — session 7 (1h 23m)</div>
              <div className="output-line dim">  You built JWT authentication with bcrypt in auth/login.js and</div>
              <div className="output-line dim">  wired it to a React login form in components/LoginForm.jsx.</div>
            </div>
          </section>

          <section id="cmd-vision" className="doc-section">
            <h2><span className="cmd-prefix">daimon</span> vision</h2>
            <p>Opens the local daimon dashboard in your browser — a web UI with session history, timeline charts, file heatmaps, and full diff browsing. Everything runs locally, nothing leaves your machine.</p>
            <CodeBlock lang="bash" code={`daimon vision`} />
            <div className="example-output">
              <div className="output-line"><span className="amber">→</span> Opening daimon vision at http://localhost:7777</div>
            </div>
          </section>

          <section id="cmd-status" className="doc-section">
            <h2><span className="cmd-prefix">daimon</span> status</h2>
            <p>Check whether the daimon daemon is running and which projects are currently being watched.</p>
            <CodeBlock lang="bash" code={`daimon status`} />
            <div className="example-output">
              <div className="output-line"><span className="amber">●</span> daemon running (pid 4821)</div>
              <div className="output-line"> </div>
              <div className="output-line dim">  haunting: my-app, side-project</div>
              <div className="output-line dim">  idle: old-project</div>
            </div>
          </section>

          <section id="cmd-end" className="doc-section">
            <h2><span className="cmd-prefix">daimon</span> end</h2>
            <p>Manually close the current session for a project. daimon will finalize the diff, generate a summary, and save it to local storage. Sessions also close automatically when you stop coding for 30 minutes.</p>
            <CodeBlock lang="bash" code={`daimon end [project]`} />
          </section>

          {/* How it works */}
          <section id="session-detection" className="doc-section">
            <h2>Session detection</h2>
            <p>
              daimon detects coding sessions automatically. When it sees file activity in a watched
              directory, a session begins. When activity stops for 30 consecutive minutes, the session
              closes and is saved.
            </p>
            <p>
              File watching is powered by <a className="doc-link" href="https://github.com/fsnotify/fsnotify" target="_blank" rel="noreferrer">fsnotify</a> —
              a cross-platform filesystem notification library that uses native OS APIs (inotify on Linux,
              FSEvents on macOS, ReadDirectoryChangesW on Windows). Zero polling, zero battery drain.
            </p>
            <div className="doc-note">
              <span className="note-label">Note</span>
              daimon respects <code>.gitignore</code> — node_modules, build artifacts, and generated files
              are never tracked.
            </div>
          </section>

          <section id="shadow-diffing" className="doc-section">
            <h2>Shadow diffing</h2>
            <p>
              daimon maintains a "shadow" git repository for each watched project — a hidden clone that
              it uses purely for diffing. At session close, daimon computes the diff between the shadow
              at session start and the current state of your files.
            </p>
            <p>
              This approach works even if you don't commit during a session, never touches your actual
              git history, and produces accurate, file-level diffs regardless of your workflow.
            </p>
          </section>

          <section id="ai-summaries" className="doc-section">
            <h2>AI summaries</h2>
            <p>
              When you run <code>daimon recall</code>, the session diff is sent to the Anthropic API
              with a structured prompt. Claude reads the diff and returns a plain-English summary of
              what changed — not just file names, but what was built, fixed, or removed.
            </p>
            <p>
              Only the diff text is sent — never your full source files. A typical session diff is
              a few kilobytes, costing fractions of a cent in API tokens.
            </p>
          </section>

          {/* FAQ */}
          <section id="faq" className="doc-section">
            <h2>FAQ</h2>

            <div className="faq-item">
              <h3>Does it send my code to the cloud?</h3>
              <p>
                Only the diff is sent — and only when you explicitly run <code>daimon recall</code>.
                The diff goes to the Anthropic API for summarization. Your full source code never
                leaves your machine.
              </p>
            </div>

            <div className="faq-item">
              <h3>How much does it cost?</h3>
              <p>
                Fractions of a cent per session. A typical 1-2 hour session produces a diff of a few
                kilobytes. At current Anthropic API pricing, summarizing that costs roughly $0.001–$0.005.
              </p>
            </div>

            <div className="faq-item">
              <h3>Does it work with any language?</h3>
              <p>
                Yes. daimon is language-agnostic — it watches file changes and produces git diffs,
                which work for any text-based file. The AI summaries are also language-agnostic since
                Claude can read and understand code in any language.
              </p>
            </div>

            <div className="faq-item">
              <h3>Where is my data stored?</h3>
              <p>
                All session data is stored in a SQLite database at <code>~/.daimon/sessions.db</code>.
                Nothing is synced to any cloud service. You own your data completely.
              </p>
            </div>

            <div className="faq-item">
              <h3>Does it slow down my machine?</h3>
              <p>
                No. The background daemon uses native OS filesystem notifications (not polling) and
                idles at essentially zero CPU. Memory footprint is under 20MB.
              </p>
            </div>

            <div className="faq-item">
              <h3>Can I use it without an Anthropic API key?</h3>
              <p>
                Partially. Session tracking, diffing, and the vision dashboard all work locally
                without an API key. The <code>daimon recall</code> and <code>daimon oracle</code> commands
                require an API key since they call Claude.
              </p>
            </div>
          </section>

        </div>
      </main>
    </div>
  )
}
