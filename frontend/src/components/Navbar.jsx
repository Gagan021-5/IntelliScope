import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

function Navbar() {
  const location = useLocation()

  return (
    <motion.nav 
      className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-white/20 transition-all duration-300 hover:shadow-xl"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#667eea] to-[#764ba2] no-underline">
            🛡️ NutriVigil
          </Link>
        </motion.div>
        <div className="flex gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/" 
              className={`text-[15px] font-medium px-4 py-2 rounded-lg transition-all duration-300 no-underline ${
                location.pathname === '/' 
                  ? 'text-[#667eea] bg-[#f5f5ff] font-semibold' 
                  : 'text-gray-600 hover:text-[#667eea] hover:bg-[#f5f5ff]'
              }`}
            >
              Home
            </Link>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/profile" 
              className={`text-[15px] font-medium px-4 py-2 rounded-lg transition-all duration-300 no-underline ${
                location.pathname === '/profile' 
                  ? 'text-[#667eea] bg-[#f5f5ff] font-semibold' 
                  : 'text-gray-600 hover:text-[#667eea] hover:bg-[#f5f5ff]'
              }`}
            >
              My Profile
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar


