import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Requests from "./pages/Requests";
import Ratings from "./pages/Ratings";
import ClientRequests from "./pages/ClientRequests";
import Favorites from "./pages/Favorites";

import Home from "./pages/Home";
import Craftsmen from "./pages/Craftsmen";
import CraftsmanPage from "./pages/CraftsmanPage";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectedRoute";
import Chat from "./pages/Chat";

function App() {
  return (
    <Routes>

      {/* Public pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Layout + Protection */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />
        <Route path="/craftsmen" element={<Craftsmen />} />
        <Route path="/craftsman/:id" element={<CraftsmanPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/ratings" element={<Ratings />} />
        <Route path="/client-requests" element={<ClientRequests />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/chat/:id" element={<Chat />} />
      </Route>

    </Routes>
  );
}

export default App;