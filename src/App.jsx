import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Docs from './pages/Docs.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/docs" element={<Docs />} />
    </Routes>
  )
}
