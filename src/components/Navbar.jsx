import { Link } from 'react-router-dom'
import '../styles/navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">daimon</Link>
        <div className="navbar-right">
          <Link to="/docs" className="nav-link">Docs</Link>
          <a
            href="https://github.com/Kishanmp3/daimon"
            target="_blank"
            rel="noreferrer"
            className="nav-github"
          >
            GitHub →
          </a>
        </div>
      </div>
    </nav>
  )
}
