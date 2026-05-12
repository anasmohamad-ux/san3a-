import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Craftsmen from "./pages/Craftsmen";
import CraftsmanPage from "./pages/CraftsmanPage";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./routes/ProtectedRoute";

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
      </Route>

    </Routes>
  );
}

export default App;