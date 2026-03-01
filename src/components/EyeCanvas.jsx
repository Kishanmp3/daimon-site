import { useRef, useEffect } from 'react'
import '../styles/eye.css'

const DIFF_LINES = [
  '+ added login endpoint',
  '- removed hardcoded key',
  '● session closed — 1h 23m',
  '+ bcrypt password hashing',
  '~ refactored auth middleware',
  '+ JWT token generation',
  '- legacy oauth removed',
  '● session started — my-app',
  '+ database connection pooling',
  '~ updated route handlers',
  '- console.log cleanup',
  '+ error boundary component',
  '● watching 847 files...',
  '+ null check in validator',
  '~ renamed user to profile',
  '- dead code removed',
  '+ rate limiting middleware',
  '● files changed: 12',
  '+ cache layer added',
  '~ api/routes.go refactored',
]

export default function EyeCanvas() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const stateRef = useRef({
    particles: [],
    blinking: false,
    blinkProgress: 0,
    pulseT: 0,
    scattered: false,
    scatterTimeout: null,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    // Eye geometry
    const getEyeParams = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      const cx = w / 2
      const cy = h / 2
      const rx = Math.min(w * 0.38, 200)
      const ry = rx * 0.4
      return { cx, cy, rx, ry }
    }

    // Generate particles along the eye outline
    const N = 120
    const state = stateRef.current

    const initParticles = () => {
      const { cx, cy, rx, ry } = getEyeParams()
      state.particles = []
      for (let i = 0; i < N; i++) {
        // Distribute along eye outline using parametric form
        const t = (i / N) * Math.PI * 2
        // Eye shape: use sin-based lens shape
        const lx = rx * Math.cos(t)
        const ly = ry * Math.sin(t) * Math.abs(Math.cos(t / 2)) * 2
        state.particles.push({
          baseX: cx + lx,
          baseY: cy + ly,
          x: cx + lx,
          y: cy + ly,
          vx: 0,
          vy: 0,
          t,
          drift: Math.random() * Math.PI * 2,
          driftSpeed: 0.003 + Math.random() * 0.005,
          lineIndex: Math.floor(Math.random() * DIFF_LINES.length),
          opacity: 0.25 + Math.random() * 0.45,
          scattered: false,
          scatterVx: 0,
          scatterVy: 0,
        })
      }
    }
    initParticles()
    window.addEventListener('resize', initParticles)

    // Mouse tracking relative to canvas
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
    // Also track globally (eye reacts to mouse anywhere on page)
    const handleGlobalMouse = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
    window.addEventListener('mousemove', handleGlobalMouse)

    // Click: blink
    const handleClick = () => {
      if (!state.blinking) {
        state.blinking = true
        state.blinkProgress = 0
      }
    }
    canvas.addEventListener('click', handleClick)

    let lastTime = 0

    const draw = (timestamp) => {
      const dt = Math.min(timestamp - lastTime, 50)
      lastTime = timestamp
      const { cx, cy, rx, ry } = getEyeParams()
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight

      ctx.clearRect(0, 0, w, h)

      state.pulseT += 0.02

      // Mouse distance from eye center
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const distToEye = Math.hypot(mx - cx, my - cy)

      // Scatter trigger
      const SCATTER_DIST = 200
      const shouldScatter = distToEye < SCATTER_DIST

      // Update blink
      let blinkScale = 1
      if (state.blinking) {
        state.blinkProgress += 0.07
        if (state.blinkProgress < 1) {
          blinkScale = Math.abs(Math.cos(state.blinkProgress * Math.PI))
          blinkScale = Math.max(blinkScale, 0.02)
        } else {
          state.blinking = false
          state.blinkProgress = 0
        }
      }

      // Draw eye outline (glow)
      ctx.save()
      ctx.translate(cx, cy)
      ctx.scale(1, blinkScale)
      ctx.beginPath()
      for (let a = 0; a < Math.PI * 2; a += 0.02) {
        const lx = rx * Math.cos(a)
        const ly = ry * Math.sin(a) * Math.abs(Math.cos(a / 2)) * 2
        if (a === 0) ctx.moveTo(lx, ly)
        else ctx.lineTo(lx, ly)
      }
      ctx.closePath()
      ctx.strokeStyle = 'rgba(245,158,11,0.08)'
      ctx.lineWidth = 1
      ctx.stroke()
      ctx.restore()

      // Draw diff-text particles
      ctx.save()
      ctx.translate(cx, cy)
      ctx.scale(1, blinkScale)
      ctx.font = '9px JetBrains Mono, monospace'

      state.particles.forEach((p, i) => {
        // Drift slowly along the eye outline
        p.t += p.driftSpeed

        const lx = rx * Math.cos(p.t)
        const ly = ry * Math.sin(p.t) * Math.abs(Math.cos(p.t / 2)) * 2
        p.baseX = lx
        p.baseY = ly

        // Scatter away from mouse
        if (shouldScatter) {
          const dx = p.x - (mx - cx)
          const dy = p.y - (my - cy)
          const d = Math.hypot(dx, dy)
          if (d < 120) {
            const force = (120 - d) / 120 * 4
            p.vx += (dx / d) * force
            p.vy += (dy / d) * force
          }
        }

        // Spring back to base
        const spring = 0.04
        p.vx += (p.baseX - p.x) * spring
        p.vy += (p.baseY - p.y) * spring
        p.vx *= 0.82
        p.vy *= 0.82
        p.x += p.vx
        p.y += p.vy

        const line = DIFF_LINES[p.lineIndex % DIFF_LINES.length]
        const isPlus = line.startsWith('+')
        const isMinus = line.startsWith('-')
        const isDot = line.startsWith('●')

        let color
        if (isPlus) color = `rgba(245,158,11,${p.opacity})`
        else if (isMinus) color = `rgba(113,113,122,${p.opacity * 0.7})`
        else if (isDot) color = `rgba(245,158,11,${p.opacity * 0.6})`
        else color = `rgba(255,255,255,${p.opacity * 0.5})`

        ctx.fillStyle = color
        ctx.fillText(line, p.x, p.y)
      })
      ctx.restore()

      // Pupil follows mouse
      const MAX_PUPIL_OFFSET = rx * 0.28
      let pDx = mx - cx
      let pDy = my - cy
      const pDist = Math.hypot(pDx, pDy)
      if (pDist > MAX_PUPIL_OFFSET) {
        pDx = (pDx / pDist) * MAX_PUPIL_OFFSET
        pDy = (pDy / pDist) * MAX_PUPIL_OFFSET
      }

      const pulseR = 10 + Math.sin(state.pulseT) * 2.5

      // Pupil glow
      ctx.save()
      ctx.translate(cx + pDx, cy + pDy * blinkScale)
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, pulseR * 3)
      grad.addColorStop(0, 'rgba(245,158,11,0.5)')
      grad.addColorStop(0.5, 'rgba(245,158,11,0.15)')
      grad.addColorStop(1, 'rgba(245,158,11,0)')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(0, 0, pulseR * 3, 0, Math.PI * 2)
      ctx.fill()

      // Pupil core
      ctx.beginPath()
      ctx.arc(0, 0, pulseR, 0, Math.PI * 2)
      ctx.fillStyle = '#F59E0B'
      ctx.fill()

      // Pupil highlight
      ctx.beginPath()
      ctx.arc(-pulseR * 0.3, -pulseR * 0.3, pulseR * 0.25, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255,255,255,0.4)'
      ctx.fill()
      ctx.restore()

      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('resize', initParticles)
      window.removeEventListener('mousemove', handleGlobalMouse)
      canvas.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div className="eye-wrapper">
      <canvas ref={canvasRef} className="eye-canvas" />
      <p className="eye-hint">click the eye</p>
    </div>
  )
}
