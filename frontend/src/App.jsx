import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Profile from './pages/Profile'
import ScanPage from './pages/ScanPage'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/scan" element={<ScanPage />} />
      </Routes>
    </div>
  )
}

export default App
