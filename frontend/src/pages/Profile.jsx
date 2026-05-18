import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();
  return (
    <div
      style={{
        padding: "60px",
        backgroundColor: "#F5F0E6",
        minHeight: "80vh",
      }}

    >
        <div style={{ marginBottom: "20px" }}>
  <button
    onClick={() => navigate("/")}
    style={{
      backgroundColor: "#8B5E3C",
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
      <h1 style={{ color: "#3E2C23" }}>My Profile</h1>

      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "18px",
          marginTop: "30px",
          maxWidth: "600px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        }}
      >
        <p><strong>Name:</strong> Yousef</p>
        <p><strong>Specialty:</strong> Electrician</p>
        <p><strong>City:</strong> Amman</p>
        <p><strong>Experience:</strong> 5 Years</p>
      </div>
    </div>
  );
}

export default Profile;