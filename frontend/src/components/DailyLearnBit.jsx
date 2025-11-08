import { useEffect, useState } from "react";
import axios from "axios";
import { speakText } from "../utils/speech";

const DailyLearnBit = () => {
  const [digest, setDigest] = useState([]);
  const [saved, setSaved] = useState(
    JSON.parse(localStorage.getItem("savedTopics") || "[]")
  );

  useEffect(() => {
    const fetchDigest = async () => {
      try {
        const res = await axios.get("http://localhost:3000/user/daily");
        setDigest(res.data);
      } catch (err) {
        console.error("Error fetching daily digest:", err);
      }
    };
    fetchDigest();
  }, []);

  const toggleSave = (topic) => {
    let updated;
    if (saved.find((t) => t.title === topic.title)) {
      updated = saved.filter((t) => t.title !== topic.title);
    } else {
      updated = [...saved, topic];
    }
    setSaved(updated);
    localStorage.setItem("savedTopics", JSON.stringify(updated));
  };

  if (!digest.length)
    return (
      <p className="text-gray-400 animate-pulse mt-6 text-center">
        <i>Loading today’s top topics...</i>
      </p>
    );

  return (
    <div className="mt-10 w-full max-w-4xl flex flex-col gap-8">
      <h2 className="text-4xl font-bold mb-6 text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-500">
        📚 Today’s Top 10 Digest
      </h2>

      {digest.map((topic, index) => (
        <div
          key={topic.title}
          className="bg-gray-900 p-6 rounded-3xl shadow-xl flex flex-col gap-4 hover:scale-[1.01] transition-transform duration-200"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-bold">{index + 1}. {topic.title}</h3>
            <button
              onClick={() => toggleSave(topic)}
              className={`text-3xl transition ${
                saved.find((t) => t.title === topic.title)
                  ? "text-yellow-400"
                  : "text-gray-500 hover:text-yellow-300"
              }`}
            >
              ⭐
            </button>
          </div>

          {topic.image && (
            <img
              src={topic.image}
              alt={topic.title}
              className="w-full h-56 object-cover rounded-xl border border-gray-700"
            />
          )}

          <p className="text-gray-300 leading-relaxed text-lg">{topic.ai_summary}</p>

          <div className="flex flex-wrap gap-4 mt-3">
            <button
              onClick={() => speakText(topic.ai_summary)}
              className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition text-white font-medium"
            >
              🔊 Listen
            </button>
            {topic.link && (
              <a
                href={topic.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-indigo-500 rounded-lg hover:bg-indigo-500 hover:text-white transition text-indigo-400 font-medium"
              >
                Read more ↗
              </a>
            )}
            {topic.source && (
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-lg text-sm">
                {topic.source}
              </span>
            )}
            {topic.category && topic.category.length > 0 && (
              <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-lg text-sm">
                {topic.category.join(", ")}
              </span>
            )}
          </div>

          {topic.published && (
            <p className="text-gray-500 text-sm mt-2">
              🕒 Published: {new Date(topic.published).toLocaleString()}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default DailyLearnBit;
