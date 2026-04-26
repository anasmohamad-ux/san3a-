import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh", backgroundColor: "#F5F0E6" }}>
      <div style={{ width: "300px", padding: "25px", borderRadius: "10px", backgroundColor: "white", boxShadow: "0 0 15px rgba(0,0,0,0.1)" }}>

        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>

        {error && (
          <p style={{ color: "red", fontSize: "13px", marginBottom: "10px", textAlign: "center" }}>
            {error}
          </p>
        )}

        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "6px", border: "1px solid #ccc" }} />

        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "20px", borderRadius: "6px", border: "1px solid #ccc" }} />

        <button onClick={handleLogin}
          style={{ width: "100%", padding: "10px", backgroundColor: "#E67E22", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          Login
        </button>

        <p style={{ textAlign: "center", marginTop: "15px", fontSize: "13px" }}>
          Don't have an account?{" "}
          <a href="/register" style={{ color: "#E67E22" }}>Register</a>
        </p>

      </div>
    </div>
  );
}

export default Login;