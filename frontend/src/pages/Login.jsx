import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import bgImage from "../assets/backgsan3a.jpg";
import logoImage from "../assets/logo san3a.jpg";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      if (err.response?.status === 422) {
        setError(err.response.data.message || "Invalid credentials.");
      } else {
        setError("Login failed. Please try again.");
      }

      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "40px 80px",
      }}
    >
      {/* Left Side Login */}
      <div
        style={{
          width: "450px",
          background: "rgba(255,255,255,0.96)",
          padding: "35px",
          borderRadius: "20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              backgroundColor: "#8B4513",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ← Back
          </button>
        </div>

        <h1
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "#4E2C1E",
          }}
        >
          Login
        </h1>

        {error && (
          <p
            style={{
              color: "red",
              textAlign: "center",
              marginBottom: "15px",
            }}
          >
            {error}
          </p>
        )}

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "14px",
            backgroundColor: "#8B4513",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Login
        </button>

        <p
          style={{
            textAlign: "center",
            marginTop: "15px",
          }}
        >
          Don't have an account?{" "}
          <a
            href="/register"
            style={{
              color: "#8B4513",
              fontWeight: "bold",
            }}
          >
            Register
          </a>
        </p>
      </div>

      {/* Right Side Logo */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={logoImage}
          alt="San3a Logo"
          style={{
            width: "650px",
            maxWidth: "90%",
            borderRadius: "35px",
          }}
        />
      </div>
    </div>
  );
}

export default Login;