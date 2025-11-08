import { motion } from "framer-motion";
import DailyLearnBit from "../components/DailyLearnBit";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center text-center px-6 md:px-16 py-12 bg-gradient-to-b from-slate-900 to-black text-white"
    >
      <h1 className="text-5xl md:text-6xl font-bold mb-4">
        🧠 Welcome to IntelliScope
      </h1>
      <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-2xl">
        Your all-in-one learning hub: explore trending knowledge, AI-powered
        summaries, and daily insights — all in one place, no login required.
      </p>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl text-left">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-gray-800 cursor-pointer p-6 rounded-2xl shadow-lg"
        >
          <h3 className="text-xl font-bold mb-2">Trending Topics</h3>
          <p className="text-gray-300 text-sm">
            Stay updated with the most popular articles on Wikipedia every day.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-gray-800 p-6 cursor-pointer rounded-2xl shadow-lg"
        >
          <h3 className="text-xl font-bold mb-2">AI Summaries</h3>
          <p className="text-gray-300 text-sm">
            Get simple, student-friendly explanations for any topic in real
            time.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-gray-800 p-6  cursor-pointer  rounded-2xl shadow-lg"
        >
          <h3 className="text-xl font-bold mb-2">Listen & Save</h3>
          <p className="text-gray-300 text-sm">
            Read, listen, and bookmark your favorite topics without creating an
            account.
          </p>
        </motion.div>
      </section>

      <section id="daily-bite" className="w-full max-w-3xl mb-16">
        <DailyLearnBit />
      </section>

      <p className="text-gray-500 text-sm max-w-xl">
        IntelliScope centralizes knowledge from Wikipedia and AI tools into a
        single, interactive experience — making learning smarter, faster, and
        more engaging.
      </p>
    </motion.div>
  );
};

export default Home;
