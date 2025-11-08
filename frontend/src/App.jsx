import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-black text-white">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
