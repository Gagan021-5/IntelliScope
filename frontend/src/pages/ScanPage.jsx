import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Upload, Loader2, CheckCircle, AlertCircle, XCircle } from "lucide-react";

const STORAGE_KEY = "nutriGuard_healthCondition";

function ScanPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [condition, setCondition] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setCondition(saved);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setError(null);
    setResult(null);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleScan = async () => {
    if (!selectedFile) return setError("Please select an image file");
    if (!condition) return setError("Please set your health condition first");

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);
      formData.append("condition", condition);

      const res = await axios.post("http://localhost:3000/analyze", formData);

      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to analyze food");
    } finally {
      setLoading(false);
    }
  };

  const TrafficIcon = {
    green: <CheckCircle className="icon" />,
    yellow: <AlertCircle className="icon" />,
    red: <XCircle className="icon" />,
  };

  return (
    <div className="scan-page">
      <div className="scan-container">

        <header className="scan-header">
          <h1>Scan Food</h1>
          <p className="scan-subtitle">Upload a photo to analyze nutritional safety</p>

          {condition ? (
            <div className="condition-badge">Condition: {condition}</div>
          ) : (
            <div className="condition-warning">
              ⚠️ Please set your condition in <Link to="/profile">My Profile</Link>
            </div>
          )}
        </header>

        <div className="form-section">
          {/* Upload Area */}
          <div className="form-group">
            <label htmlFor="file-upload">Food Photo</label>
            <div className="file-upload-area">
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
              />

              {preview ? (
                <div className="preview-container">
                  <img src={preview} alt="Preview" className="preview-image" />
                  <p className="file-name">{selectedFile?.name}</p>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <Upload className="upload-icon" />
                  <p>Click to upload or drag and drop</p>
                  <p className="upload-hint">PNG, JPG, GIF up to 10MB</p>
                </div>
              )}
            </div>
          </div>

          {/* Scan Button */}
          <button
            onClick={handleScan}
            disabled={loading || !selectedFile || !condition}
            className="scan-button"
          >
            {loading ? (
              <>
                <Loader2 className="spinner" /> Scanning...
              </>
            ) : (
              "Scan Food"
            )}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="error-message">
            <AlertCircle className="error-icon" />
            <p>{error}</p>
          </div>
        )}

        {/* Result */}
        {result && (
          <div className={`result-card traffic-${result.traffic_light}`}>
            <div className="result-header">
              {TrafficIcon[result.traffic_light]}
              <h2 className="verdict-title">{result.verdict_title}</h2>
            </div>

            <div className="result-content">
              <div className="food-name">
                <strong>Food:</strong> {result.food_name}
              </div>

              <div className="reason">
                <strong>Reason:</strong>
                <p>{result.reason}</p>
              </div>

              {result.suggestion && (
                <div className="suggestion">
                  <strong>Suggestion:</strong>
                  <p>{result.suggestion}</p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default ScanPage;
