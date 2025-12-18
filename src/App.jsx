import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import MainDashboard from "./pages/MainDashboard";
import SpotifyPage from "./pages/SpotifyPage";
import SocialMedia from "./pages/SocialMedia";

// Set basename depending on environment
const basename = process.env.NODE_ENV === "production" ? "/LDV" : "/";

export default function App() {
  return (
    <Router basename={basename}>
      <div className="min-h-screen bg-brandBlack text-white">
        {/* Nav */}
        <nav className="flex space-x-4 p-4 bg-brandRed">
          <Link to="/">Dashboard</Link>
          <Link to="/spotify">Spotify</Link>
          <Link to="/social">Social Media</Link>
        </nav>

        {/* Pages */}
        <Routes>
          <Route path="/" element={<MainDashboard />} />
          <Route path="/spotify" element={<SpotifyPage />} />
          <Route path="/social" element={<SocialMedia />} />
        </Routes>
      </div>
    </Router>
  );
}
