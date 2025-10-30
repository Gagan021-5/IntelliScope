import { FaSearch } from "react-icons/fa";
import { useState } from "react";

function App() {
  const[query, setquery] = useState("");
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white flex flex-col items-center p-8">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-6">🧠 IntelliScope</h1>
      <p className="text-gray-400 mb-8 text-center max-w-xl">
        Instantly find summarized knowledge from verified sources like Wikipedia, Dictionary, and Facts API.
      </p>

      {/* Search Bar */}
      <form className="flex w-full max-w-xl bg-gray-800 rounded-full overflow-hidden shadow-lg">
        <input
          type="text"
          placeholder="Search any topic..."
          className="flex-grow px-4 py-3 bg-transparent outline-none text-white"
        />
        <button
          type="submit"
          className="px-5 bg-indigo-600 hover:bg-indigo-700 transition"
        >
          <FaSearch />
        </button>
      </form>

      {/* Static Example Result */}
      <div className="mt-10 w-full max-w-2xl bg-gray-800 p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-3">Artificial Intelligence</h2>
        <p className="text-gray-300 leading-relaxed">
          Artificial Intelligence (AI) refers to the simulation of human intelligence 
          in machines that are programmed to think, reason, and learn. AI is applied 
          across industries for automation, predictions, and problem-solving.
        </p>
        <a
          href="https://en.wikipedia.org/wiki/Artificial_intelligence"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 hover:underline mt-3 inline-block"
        >
          Read more ↗
        </a>
      </div>
    </div>
  );
}

export default App;
