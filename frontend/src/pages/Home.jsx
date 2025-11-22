import { Link } from 'react-router-dom'
import { Camera, Brain, Shield } from 'lucide-react'
import './Home.css'

function Home() {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h1 className="hero-title">🛡️ Nutri-Guard</h1>
        <p className="hero-subtitle">Your Personal AI Health Scanner</p>
        <Link to="/scan" className="cta-button">
          Start Scanning
        </Link>
      </div>

      <div className="how-it-works">
        <h2 className="section-title">How it Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-icon">
              <Camera size={32} />
            </div>
            <h3>1. Snap Photo</h3>
            <p>Take a picture of your food</p>
          </div>
          <div className="step">
            <div className="step-icon">
              <Brain size={32} />
            </div>
            <h3>2. AI Analysis</h3>
            <p>Our AI identifies and analyzes nutrition</p>
          </div>
          <div className="step">
            <div className="step-icon">
              <Shield size={32} />
            </div>
            <h3>3. Get Safety Score</h3>
            <p>Receive instant health recommendations</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

