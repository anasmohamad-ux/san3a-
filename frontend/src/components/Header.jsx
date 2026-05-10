import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#FFD700" : "white",
    textDecoration: "none",
    padding: "6px 12px",
    borderRadius: "8px",
    boxShadow: isActive
      ? "0 0 10px rgba(255, 215, 0, 0.7)"
      : "none",
    backgroundColor: isActive
      ? "rgba(255, 255, 255, 0.1)"
      : "transparent",
    transition: "0.3s",
  });

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        backgroundColor: "#8B5E3C",
        color: "white",
        direction: "rtl",
        position: "relative",
      }}
    >
      {/* LEFT SIDE */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          position: "relative",
        }}
      >
        <h2 style={{ margin: 0 }}>
          san3a
        </h2>

        {/* MENU BUTTON */}
        <button
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          style={{
            background: "transparent",
            border: "1px solid white",
            color: "white",
            padding: "6px 12px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "18px",
          }}
        >
          ☰
        </button>

        {/* DROPDOWN MENU */}
        {menuOpen && (
          <div
            style={{
              position: "absolute",
              top: "50px",
              left: "0",
              backgroundColor: "#ffffff",
              color: "#333",
              borderRadius: "10px",
              padding: "15px",
              minWidth: "180px",
              boxShadow:
                "0 5px 15px rgba(0,0,0,0.2)",
              zIndex: 1000,
            }}
          >
            <p
              style={{
                marginBottom: "10px",
                fontWeight: "bold",
              }}
            >
              Menu
            </p>

            <select
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                cursor: "pointer",
              }}
            >
              <option>
                English
              </option>

              <option>
                العربية
              </option>
            </select>
          </div>
        )}
      </div>

      {/* NAVIGATION */}
      <nav
        style={{
          display: "flex",
          gap: "25px",
          alignItems: "center",
        }}
      >
        <NavLink
          to="/"
          style={linkStyle}
        >
          Home page
        </NavLink>

        <NavLink
          to="/craftsmen"
          style={linkStyle}
        >
          Craftsmen
        </NavLink>

        <NavLink
          to="/about"
          style={linkStyle}
        >
          About
        </NavLink>

        {user ? (
          <>
            <span
              style={{
                color: "white",
                fontSize: "14px",
              }}
            >
              👋 {user.name}
            </span>

            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#c0392b",
                color: "white",
                border: "none",
                padding: "6px 14px",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "0.3s",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              style={linkStyle}
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              style={linkStyle}
            >
              Register
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;