import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function ClientRequests() {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/api/bookings");

      setRequests(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

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

      <h1 style={{ color: "#3E2C23" }}>
        My Requests
      </h1>

      {requests.length === 0 ? (
        <p>No requests found</p>
      ) : (
        requests.map((request) => (
          <div
            key={request.id}
            style={cardStyle}
          >
            <h3>
              🔧 {request.service?.name}
            </h3>

            <p>
              <strong>Status:</strong>{" "}
              {request.status}
            </p>

            <p>
              <strong>Craftsman:</strong>{" "}
              {request.craftsman?.name}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {request.preferred_date}
            </p>

            <p>
              <strong>Description:</strong>{" "}
              {request.description}
            </p>
          </div>
        ))
      )}
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