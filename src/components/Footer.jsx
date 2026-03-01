import { Link } from 'react-router-dom'
import '../styles/footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <Link to="/" className="footer-logo">daimon</Link>
        <p className="footer-tagline">The spirit that watches your code</p>
        <a
          href="https://github.com/Kishanmp3/daimon"
          target="_blank"
          rel="noreferrer"
          className="footer-github"
        >
          GitHub →
        </a>
      </div>
    </footer>
  )
}
