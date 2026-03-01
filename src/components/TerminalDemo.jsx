import { useEffect, useRef, useState } from 'react'
import '../styles/terminal.css'

const SCRIPT = [
  { type: 'cmd', text: '$ daimon haunt', delay: 400 },
  { type: 'out', text: '→ Daimon is haunting my-app. It will follow your work silently.', delay: 80 },
  { type: 'blank', text: '', delay: 40 },
  { type: 'accent', text: '● session started — my-app', delay: 60 },
  { type: 'dim', text: '  watching 847 files...', delay: 60 },
  { type: 'blank', text: '', delay: 600 },
  { type: 'accent', text: '● session closed — 1h 23m', delay: 60 },
  { type: 'dim', text: '  files changed: auth/login.js, api/routes.go, components/LoginForm.jsx', delay: 60 },
  { type: 'blank', text: '', delay: 40 },
  { type: 'bullet', text: '  ✦ Built JWT authentication endpoint with bcrypt password hashing', delay: 60 },
  { type: 'bullet', text: '  ✦ Wired login form to backend, added error handling', delay: 60 },
  { type: 'bullet', text: '  ✦ Fixed null check bug in token validation middleware', delay: 60 },
  { type: 'blank', text: '', delay: 200 },
  { type: 'cmd', text: '$ daimon recall', delay: 400 },
]

export default function TerminalDemo() {
  const [lines, setLines] = useState([])
  const timeoutRef = useRef(null)

  useEffect(() => {
    // Start loop
    let lineIdx = 0
    let charIdx = 0
    let rendered = []

    const step = () => {
      if (lineIdx >= SCRIPT.length) {
        // Loop after pause
        timeoutRef.current = setTimeout(() => {
          lineIdx = 0
          charIdx = 0
          rendered = []
          setLines([])
          step()
        }, 2500)
        return
      }

      const entry = SCRIPT[lineIdx]

      if (entry.type === 'cmd' && charIdx < entry.text.length) {
        // Type character by character
        charIdx++
        const partial = entry.text.slice(0, charIdx)
        setLines([...rendered, { ...entry, text: partial, cursor: true }])
        timeoutRef.current = setTimeout(step, 65 + Math.random() * 60)
      } else {
        // Line complete, move to next
        rendered = [...rendered, { ...entry, cursor: false }]
        setLines([...rendered])
        lineIdx++
        charIdx = 0
        timeoutRef.current = setTimeout(step, entry.delay + (entry.type === 'blank' ? 0 : 40))
      }
    }

    timeoutRef.current = setTimeout(step, 600)
    return () => clearTimeout(timeoutRef.current)
  }, [])

  const getClass = (type) => {
    switch (type) {
      case 'cmd': return 'term-cmd'
      case 'out': return 'term-out'
      case 'accent': return 'term-accent'
      case 'dim': return 'term-dim'
      case 'bullet': return 'term-bullet'
      default: return 'term-blank'
    }
  }

  return (
    <section className="terminal-section">
      <div className="terminal-card">
        <div className="terminal-titlebar">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
          <span className="terminal-title">daimon — terminal</span>
        </div>
        <div className="terminal-body">
          {lines.map((line, i) => (
            <div key={i} className={`term-line ${getClass(line.type)}`}>
              {line.text}
              {line.cursor && <span className="cursor" />}
            </div>
          ))}
          {lines.length > 0 && lines[lines.length - 1].type === 'cmd' && !lines[lines.length - 1].cursor && (
            <div className="term-line term-cmd"><span className="cursor" /></div>
          )}
        </div>
      </div>
    </section>
  )
}
