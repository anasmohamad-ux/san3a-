import { useNavigate } from "react-router-dom";

function Requests() {
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

      <h1 style={{ color: "#3E2C23", marginBottom: "25px" }}>
        Service Requests
      </h1>

      <div
        style={{
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "18px",
          maxWidth: "700px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h3>⚡ Electrical Repair</h3>
        <p><strong>Client:</strong> Ahmad</p>
        <p><strong>Status:</strong> Pending</p>
      </div>

      <div
        style={{
          backgroundColor: "white",
          padding: "25px",
          borderRadius: "18px",
          maxWidth: "700px",
          marginTop: "20px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h3>🎨 Painting Service</h3>
        <p><strong>Client:</strong> Omar</p>
        <p><strong>Status:</strong> Accepted</p>
      </div>
    </div>
  );
}

export default Requests;