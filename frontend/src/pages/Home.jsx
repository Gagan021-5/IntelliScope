import { Link } from 'react-router-dom'
import { Camera, Brain, Shield } from 'lucide-react'
import { motion } from 'framer-motion'

function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  const stepVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.3
      }
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center py-10 px-5">
      <motion.div 
        className="text-center max-w-[600px] mb-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 drop-shadow-lg"
          variants={itemVariants}
        >
          🛡️ NutriVigil
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 font-normal drop-shadow-md"
          variants={itemVariants}
        >
          Your Personal AI Health Scanner
        </motion.p>
        <motion.div variants={itemVariants}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/scan" className="inline-block px-12 py-4 bg-white text-[#667eea] text-lg font-semibold rounded-xl shadow-2xl no-underline transition-all duration-300 hover:shadow-3xl hover:-translate-y-1 active:translate-y-0">
              Start Scanning
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div 
        className="max-w-[900px] w-full bg-white/98 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-white/30 relative overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.h2 
          className="text-center text-3xl md:text-4xl font-bold text-gray-900 mb-10 bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          How it Works
        </motion.h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="text-center p-8 rounded-2xl bg-gray-50 transition-all duration-300 cursor-pointer border-2 border-transparent hover:bg-white hover:-translate-y-2 hover:shadow-xl hover:border-[#667eea]/30"
            variants={stepVariants}
            whileHover="hover"
          >
            <motion.div 
              className="w-16 h-16 mx-auto mb-5 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-2xl flex items-center justify-center text-white shadow-lg"
              whileHover={{ rotate: 5, scale: 1.1 }}
            >
              <Camera size={32} />
            </motion.div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">1. Snap Photo</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Take a picture of your food</p>
          </motion.div>
          <motion.div 
            className="text-center p-8 rounded-2xl bg-gray-50 transition-all duration-300 cursor-pointer border-2 border-transparent hover:bg-white hover:-translate-y-2 hover:shadow-xl hover:border-[#667eea]/30"
            variants={stepVariants}
            whileHover="hover"
          >
            <motion.div 
              className="w-16 h-16 mx-auto mb-5 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-2xl flex items-center justify-center text-white shadow-lg"
              whileHover={{ rotate: 5, scale: 1.1 }}
            >
              <Brain size={32} />
            </motion.div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">2. AI Analysis</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Our AI identifies and analyzes nutrition</p>
          </motion.div>
          <motion.div 
            className="text-center p-8 rounded-2xl bg-gray-50 transition-all duration-300 cursor-pointer border-2 border-transparent hover:bg-white hover:-translate-y-2 hover:shadow-xl hover:border-[#667eea]/30"
            variants={stepVariants}
            whileHover="hover"
          >
            <motion.div 
              className="w-16 h-16 mx-auto mb-5 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-2xl flex items-center justify-center text-white shadow-lg"
              whileHover={{ rotate: 5, scale: 1.1 }}
            >
              <Shield size={32} />
            </motion.div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">3. Get Safety Score</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Receive instant health recommendations</p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Home


