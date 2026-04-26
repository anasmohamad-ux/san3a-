import { useState } from "react";

function Register() {
  const [role, setRole] = useState("user");

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F0E6",
      }}
    >
      <div
        style={{
          width: "360px",
          padding: "30px",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 0 15px rgba(0,0,0,0.12)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Create Account
        </h2>

        <label>Account Type</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "6px",
            marginBottom: "15px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        >
          <option value="user">User</option>
          <option value="craftsman">Craftsman</option>
        </select>

        {role === "craftsman" && (
          <>
            <label>Craft</label>
            <input
              type="text"
              placeholder="Example: Plumber, Electrician"
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "6px",
                marginBottom: "15px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
          </>
        )}

        <label>Full Name</label>
        <input
          type="text"
          placeholder="Enter your full name"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "6px",
            marginBottom: "15px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "6px",
            marginBottom: "15px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          style={{
            width: "100%",
            padding: "10px",
            marginTop: "6px",
            marginBottom: "20px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={() => {
            console.log("Role:", role);
            alert("Registered as " + role);
          }}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#E67E22",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;