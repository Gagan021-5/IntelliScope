import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Upload, Loader2, CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "nutriguard";

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
    green: <CheckCircle className="w-8 h-8 flex-shrink-0 text-green-500" />,
    yellow: <AlertCircle className="w-8 h-8 flex-shrink-0 text-yellow-500" />,
    red: <XCircle className="w-8 h-8 flex-shrink-0 text-red-500" />,
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-10 px-5">
      <motion.div 
        className="w-full max-w-[600px] bg-white/98 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/30"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.header 
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#667eea] to-[#764ba2] mb-2">Scan Food</h1>
          <p className="text-gray-600 text-sm mb-4">Upload a photo to analyze nutritional safety</p>

          <AnimatePresence mode="wait">
            {condition ? (
              <motion.div 
                key="badge"
                className="inline-block px-5 py-2 bg-gradient-to-r from-green-50 to-emerald-50 text-green-600 rounded-full text-xs font-semibold mt-3 shadow-md"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                Condition: {condition}
              </motion.div>
            ) : (
              <motion.div 
                key="warning"
                className="inline-block px-5 py-2 bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-600 rounded-full text-xs mt-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                ⚠️ Please set your condition in <Link to="/profile" className="text-[#667eea] underline font-semibold">My Profile</Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        <motion.div 
          className="flex flex-col gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Upload Area */}
          <motion.div 
            className="flex flex-col gap-2"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <label htmlFor="file-upload" className="font-semibold text-gray-900 text-sm">Food Photo</label>
            <motion.div 
              className="relative border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center bg-gray-50 transition-all duration-300 cursor-pointer overflow-hidden group hover:border-[#667eea] hover:bg-[#f5f5ff] hover:-translate-y-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <input
                type="file"
                id="file-upload"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
              />

              <AnimatePresence mode="wait">
                {preview ? (
                  <motion.div 
                    key="preview"
                    className="flex flex-col items-center gap-3 relative z-0"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.img 
                      src={preview} 
                      alt="Preview" 
                      className="max-w-full max-h-[250px] rounded-2xl object-contain shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    />
                    <p className="text-gray-600 text-xs break-all font-medium">{selectedFile?.name}</p>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="placeholder"
                    className="flex flex-col items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Upload className="w-12 h-12 text-gray-400 mb-3" />
                    </motion.div>
                    <p className="text-gray-600 text-sm font-medium">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Scan Button */}
          <motion.button
            onClick={handleScan}
            disabled={loading || !selectedFile || !condition}
            className="w-full py-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-2xl text-base font-semibold cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
            whileHover={{ scale: loading || !selectedFile || !condition ? 1 : 1.05 }}
            whileTap={{ scale: loading || !selectedFile || !condition ? 1 : 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {loading ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="w-5 h-5" />
                </motion.div>
                Scanning...
              </>
            ) : (
              "Scan Food"
            )}
          </motion.button>
        </motion.div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div 
              className="mt-6 p-4 bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 rounded-2xl flex items-center gap-3 text-red-600"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence>
          {result && (
            <motion.div 
              className={`mt-6 p-7 rounded-2xl shadow-lg transition-transform duration-300 hover:-translate-y-1 ${
                result.traffic_light === 'green' 
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300' 
                  : result.traffic_light === 'yellow'
                  ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300'
                  : 'bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-300'
              }`}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ duration: 0.5, type: "spring" }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="flex items-center gap-3 mb-5 pb-4 border-b-2 border-black/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                  {TrafficIcon[result.traffic_light]}
                </motion.div>
                <h2 className="text-xl font-bold text-gray-900">{result.verdict_title}</h2>
              </motion.div>

              <motion.div 
                className="flex flex-col gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.div 
                  className="text-base font-semibold"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <strong className="block mb-1 text-gray-900 font-semibold text-[15px]">Food:</strong>
                  <span className="text-gray-700">{result.food_name}</span>
                </motion.div>

                <motion.div 
                  className="pt-4 border-t border-black/10"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <strong className="block mb-1 text-gray-900 font-semibold text-[15px]">Reason:</strong>
                  <p className="text-gray-600 m-0 text-sm leading-relaxed">{result.reason}</p>
                </motion.div>

                {result.suggestion && (
                  <motion.div 
                    className="pt-4 border-t border-black/10"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <strong className="block mb-1 text-gray-900 font-semibold text-[15px]">Suggestion:</strong>
                    <p className="text-gray-600 m-0 text-sm leading-relaxed">{result.suggestion}</p>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
}

export default ScanPage;
