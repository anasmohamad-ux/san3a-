import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("client");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState({});

  const handleRegister = async () => {
    setErrors({});
    try {
      await api.get("/sanctum/csrf-cookie");

      const response = await api.post("/api/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
        role,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/");

    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors || {});
      } else {
        alert("Register failed: " + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <div style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#F5F0E6" }}>
      <div style={{ width: "360px", padding: "30px", backgroundColor: "white", borderRadius: "12px", boxShadow: "0 0 15px rgba(0,0,0,0.12)" }}>

        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Create Account</h2>

        <label>Account Type</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "15px" }}>
          <option value="client">Client</option>
          <option value="craftsman">Craftsman</option>
        </select>

        <label>Full Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}
          placeholder="Enter your full name"
          style={{ width: "100%", padding: "10px", marginBottom: "5px" }} />
        {errors.name && <p style={{ color: "red", fontSize: "12px", marginBottom: "10px" }}>{errors.name[0]}</p>}

        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          style={{ width: "100%", padding: "10px", marginBottom: "5px" }} />
        {errors.email && <p style={{ color: "red", fontSize: "12px", marginBottom: "10px" }}>{errors.email[0]}</p>}

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          style={{ width: "100%", padding: "10px", marginBottom: "5px" }} />
        {errors.password && <p style={{ color: "red", fontSize: "12px", marginBottom: "10px" }}>{errors.password[0]}</p>}

        <label>Confirm Password</label>
        <input type="password" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="Confirm your password"
          style={{ width: "100%", padding: "10px", marginBottom: "20px" }} />

        <button onClick={handleRegister}
          style={{ width: "100%", padding: "12px", backgroundColor: "#E67E22", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}>
          Register
        </button>

      </div>
    </div>
  );
}

export default Register;