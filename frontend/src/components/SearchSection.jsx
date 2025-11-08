import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

const SearchSection = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return alert("Please enter a valid term!");
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3000/user/search", { query });
      setResult(response.data);
    } catch (err) {
      console.error("Error processing query:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl text-center mt-10">
      <form
        onSubmit={handleSearch}
        className="flex bg-gray-800 rounded-full overflow-hidden shadow-lg"
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search any topic..."
          className="flex-grow px-4 py-3 bg-transparent outline-none text-white"
        />
        <button
          disabled={loading}
          type="submit"
          className="px-5 bg-indigo-600 hover:bg-indigo-700 transition"
        >
          <FaSearch />
        </button>
      </form>
          {/* result */}
      {result && (
        <div className="mt-8 bg-gray-800 p-6 rounded-2xl shadow-lg text-left">
          <h2 className="text-2xl font-semibold mb-2">{result.title}</h2>
          <p className="text-gray-300 leading-relaxed">{result.ai_summary}</p>
          {result.link && (
            <a
              href={result.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline mt-3 inline-block"
            >
              Read more ↗
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchSection;
