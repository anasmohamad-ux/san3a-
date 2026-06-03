import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import bgImage from "../assets/backgsan3a.jpg";
import logoImage from "../assets/logo san3a.jpg";


function Register() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [role, setRole] = useState("client");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [experienceYears, setExperienceYears] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleRegister = async () => {
    setErrors({});
    try {
      await api.get("/sanctum/csrf-cookie");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password_confirmation", passwordConfirmation);
      formData.append("role", role);

      if (role === "craftsman") {
        formData.append("specialty", specialty);
        formData.append("experience_years", experienceYears);
        if (profileImage) {
          formData.append("photo", profileImage);
        }
      }

      const response = await api.post("/api/register", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUser(response.data.user);

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
    {/* Left Side Register */}
    <div
      style={{
        width: "450px",
        background: "rgba(255,255,255,0.96)",
        padding: "35px",
        borderRadius: "20px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "25px",
          color: "#4E2C1E",
        }}
      >
        Create Account
      </h1>

      <label>Account Type</label>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
          borderRadius: "8px",
        }}
      >
        <option value="client">Client</option>
        <option value="craftsman">Craftsman</option>
      </select>

      <label>Full Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your full name"
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "10px",
          borderRadius: "8px",
        }}
      />

      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "10px",
          borderRadius: "8px",
        }}
      />

      {role === "craftsman" && (
        <>
          <label>Specialty</label>
          <input
            type="text"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            placeholder="Plumber, Electrician..."
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          />

          <label>Years of Experience</label>
          <input
            type="number"
            value={experienceYears}
            onChange={(e) => setExperienceYears(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          />

          <label>Profile Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfileImage(e.target.files[0])}
            style={{
              width: "100%",
              marginBottom: "15px",
            }}
          />
        </>
      )}

      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "10px",
          borderRadius: "8px",
        }}
      />

      <label>Confirm Password</label>
      <input
        type="password"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        placeholder="Confirm Password"
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "20px",
          borderRadius: "8px",
        }}
      />

      <button
        onClick={handleRegister}
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
        Register
      </button>

      <p
        style={{
          textAlign: "center",
          marginTop: "15px",
        }}
      >
        Already have an account?{" "}
        <a href="/login" style={{ color: "#8B4513" }}>
          Login
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
          borderRadius:15,
        }}
      />
    </div>
  </div>
);
}

export default Register;