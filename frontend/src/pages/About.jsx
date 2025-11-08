import { motion } from "framer-motion";

const About = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
    className="flex flex-col items-center text-center p-8"
  >
    <h1 className="text-4xl font-bold mb-4">About IntelliScope</h1>
    <p className="text-gray-400 max-w-2xl leading-relaxed">
      IntelliScope is your intelligent knowledge companion — fetching trending
      Wikipedia data, simplifying it using AI, and helping you learn faster.
    </p>
  </motion.div>
);

export default About;
