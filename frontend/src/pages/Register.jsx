import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

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

        {role === "craftsman" && (
          <>
            <label>Specialty</label>
            <input type="text" value={specialty} onChange={(e) => setSpecialty(e.target.value)}
              placeholder="e.g. Plumber, Electrician..."
              style={{ width: "100%", padding: "10px", marginBottom: "5px" }} />
            {errors.specialty && <p style={{ color: "red", fontSize: "12px", marginBottom: "10px" }}>{errors.specialty[0]}</p>}

            <label>Years of Experience</label>
            <input type="number" value={experienceYears} onChange={(e) => setExperienceYears(e.target.value)}
              placeholder="e.g. 5"
              style={{ width: "100%", padding: "10px", marginBottom: "5px" }} />
            {errors.experience_years && <p style={{ color: "red", fontSize: "12px", marginBottom: "10px" }}>{errors.experience_years[0]}</p>}

            <label>Profile Image</label>
            <input type="file" accept="image/*" onChange={(e) => setProfileImage(e.target.files[0])}
              style={{ width: "100%", padding: "10px", marginBottom: "15px" }} />
          </>
        )}

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

        <p style={{ textAlign: "center", marginTop: "15px", fontSize: "13px" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#E67E22" }}>Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;