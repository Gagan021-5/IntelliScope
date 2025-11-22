import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HEALTH_CONDITIONS = [
  "Diabetes",
  "Hypertension",
  "Heart Disease",
  "Kidney Disease",
  "High Cholesterol",
  "Celiac Disease",
  "Lactose Intolerance",
  "None",
];

const STORAGE_KEY = "nutriguard";

function Profile() {
  const [condition, setCondition] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedCondition = localStorage.getItem(STORAGE_KEY);
    if (savedCondition) {
      setCondition(savedCondition);
    }
  }, []);

  // Save to localStorage whenever condition changes
  useEffect(() => {
    if (condition) {
      localStorage.setItem(STORAGE_KEY, condition);
      setSaved(true);
      // Show saved indicator briefly
      const timer = setTimeout(() => setSaved(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [condition]);

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-10 px-5">
      <motion.div
        className="w-full max-w-[600px] bg-white/98 backdrop-blur-xl rounded-3xl shadow-2xl p-12 border border-white/30"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.header
          className="text-center mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#667eea] to-[#764ba2] mb-2">
            My Profile
          </h1>
          <p className="text-gray-600 text-sm">
            Manage your health condition settings
          </p>
        </motion.header>

        <motion.div
          className="flex flex-col gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className="flex flex-col gap-2"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <label
              htmlFor="condition"
              className="font-semibold text-gray-900 text-sm"
            >
              Health Condition
            </label>
            <motion.select
              id="condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl text-base bg-white text-gray-900 cursor-pointer transition-all duration-300 hover:border-[#667eea] hover:-translate-y-0.5 focus:outline-none focus:border-[#667eea] focus:ring-4 focus:ring-[#667eea]/10 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23667eea%22%20d%3D%22M6%209L1%204h10z%22/%3E%3C/svg%3E')] bg-no-repeat bg-[right_1rem_center] pr-12"
              whileFocus={{ scale: 1.02 }}
            >
              <option value="">Select a condition...</option>
              {HEALTH_CONDITIONS.map((cond) => (
                <option key={cond} value={cond}>
                  {cond}
                </option>
              ))}
            </motion.select>
            <AnimatePresence>
              {saved && condition && (
                <motion.p
                  className="text-green-500 text-xs font-medium mt-1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  ✓ Saved automatically
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="p-6 bg-[#f5f5ff] rounded-xl border-l-4 border-[#667eea] transition-all duration-300"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.02, x: 1 }}
          >
            <h3 className="text-base font-semibold text-gray-900 mb-2">
              Why set your condition?
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed m-0">
              By selecting your health condition, Nutri-Guard can provide
              personalized recommendations when you scan food. Your condition is
              saved locally on your device and will be used for all future
              scans.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Profile;
