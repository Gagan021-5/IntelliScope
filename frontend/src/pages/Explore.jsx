import { motion } from "framer-motion";
import SearchSection from "../components/SearchSection";

const Explore = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center text-center p-8"
    >
      <h1 className="text-4xl font-bold mb-4">Explore Knowledge</h1>
      <p className="text-gray-400 mb-8 max-w-lg">
        Search for any topic and get AI-powered explanations instantly.
      </p>

      <SearchSection />
    </motion.div>
  );
};

export default Explore;
