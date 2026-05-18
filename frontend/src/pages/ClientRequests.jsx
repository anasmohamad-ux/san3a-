import { useNavigate } from "react-router-dom";

function ClientRequests() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        padding: "60px",
        backgroundColor: "#F5F0E6",
        minHeight: "80vh",
      }}
    >
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
          marginBottom: "20px",
        }}
      >
        ← Back
      </button>

      <h1 style={{ color: "#3E2C23" }}>My Requests</h1>

      <div style={cardStyle}>
        <h3>🔧 Plumbing Service</h3>
        <p><strong>Status:</strong> Pending</p>
        <p><strong>Craftsman:</strong> Ahmad</p>
      </div>

      <div style={cardStyle}>
        <h3>⚡ Electrical Repair</h3>
        <p><strong>Status:</strong> Completed</p>
        <p><strong>Craftsman:</strong> Omar</p>
      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: "white",
  padding: "25px",
  borderRadius: "18px",
  maxWidth: "700px",
  marginTop: "20px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  color: "#3E2C23",
};

export default ClientRequests;