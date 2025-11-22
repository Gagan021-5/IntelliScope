import { useState, useEffect } from 'react'

const HEALTH_CONDITIONS = [
  'Diabetes',
  'Hypertension',
  'Heart Disease',
  'Kidney Disease',
  'High Cholesterol',
  'Celiac Disease',
  'Lactose Intolerance',
  'None'
]

const STORAGE_KEY = 'nutriGuard_healthCondition'

function Profile() {
  const [condition, setCondition] = useState('')
  const [saved, setSaved] = useState(false)

  // Load condition from localStorage on mount
  useEffect(() => {
    const savedCondition = localStorage.getItem(STORAGE_KEY)
    if (savedCondition) {
      setCondition(savedCondition)
    }
  }, [])

  // Save to localStorage whenever condition changes
  useEffect(() => {
    if (condition) {
      localStorage.setItem(STORAGE_KEY, condition)
      setSaved(true)
      // Show saved indicator briefly
      const timer = setTimeout(() => setSaved(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [condition])

  return (
    <div className="profile-page">
      <div className="profile-container">
        <header className="profile-header">
          <h1>My Profile</h1>
          <p className="profile-subtitle">Manage your health condition settings</p>
        </header>

        <div className="profile-content">
          <div className="form-group">
            <label htmlFor="condition">Health Condition</label>
            <select
              id="condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="select-input"
            >
              <option value="">Select a condition...</option>
              {HEALTH_CONDITIONS.map((cond) => (
                <option key={cond} value={cond}>
                  {cond}
                </option>
              ))}
            </select>
            {saved && condition && (
              <p className="saved-indicator">✓ Saved automatically</p>
            )}
          </div>

          <div className="info-box">
            <h3>Why set your condition?</h3>
            <p>
              By selecting your health condition, Nutri-Guard can provide personalized 
              recommendations when you scan food. Your condition is saved locally on your 
              device and will be used for all future scans.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

