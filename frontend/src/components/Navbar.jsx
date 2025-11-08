const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-black/40 backdrop-blur-md sticky top-0 z-50">
      <a href="/" className="text-2xl font-bold text-indigo-400">
        🧠 IntelliScope
      </a>

      <div className="flex gap-6 text-gray-300">
        <a href="/" className="hover:text-white transition">
          Home
        </a>
        <a href="/explore" className="hover:text-white transition">
          Explore
        </a>
        <a href="/about" className="hover:text-white transition">
          About
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
