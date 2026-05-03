import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Craftsmen from "./pages/Craftsmen";
import CraftsmanPage from "./pages/CraftsmanPage";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* صفحات عامة */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Layout + حماية */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            {/* Home */}
            <Route index element={<Home />} />

            {/* 👇 أهم تعديل: خليهم absolute */}
            <Route path="/craftsmen" element={<Craftsmen />} />
            <Route path="/craftsman/:id" element={<CraftsmanPage />} />

            <Route path="/about" element={<About />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;