import { NavLink } from "react-router-dom";

function Header() {
  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#FFD700" : "white",
    textDecoration: "none",
    padding: "6px 12px",
    borderRadius: "8px",
    boxShadow: isActive ? "0 0 10px rgba(255, 215, 0, 0.7)" : "none",
    backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "transparent",
    transition: "0.3s",
  });

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
      }}
    >
      <h2 style={{ margin: 0 }}>san3a</h2>

      <nav
        style={{
          display: "flex",
          gap: "25px",
        }}
      >
        <NavLink to="/" style={linkStyle}>
          Home Bage
        </NavLink>

        <NavLink to="/craftsmen" style={linkStyle}>
          Craftsmen
        </NavLink>

        <NavLink to="/about" style={linkStyle}>
           About
        </NavLink>

        <NavLink to="/login" style={linkStyle}>
           Login
        </NavLink>

        <NavLink to="/register" style={linkStyle}>
          Register
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;