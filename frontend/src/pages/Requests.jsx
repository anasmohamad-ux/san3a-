import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Requests() {
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

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/api/bookings/${id}/status`, {
        status,
      });

      fetchRequests();
    } catch (error) {
      console.log(error);
      alert("Failed to update request");
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

      <h1 style={{ color: "#3E2C23", marginBottom: "25px" }}>
        Service Requests
      </h1>

      {requests.length === 0 ? (
        <p>No requests found</p>
      ) : (
        requests.map((request) => (
          <div
            key={request.id}
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "18px",
              maxWidth: "700px",
              marginBottom: "20px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            }}
          >
            <h3>
              {request.service?.name}
            </h3>

            <p>
              <strong>Client:</strong>{" "}
              {request.client?.name}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {request.preferred_date}
            </p>

            <p>
              <strong>Description:</strong>{" "}
              {request.description}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {request.status}
            </p>

            {request.status === "pending" && (
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "15px",
                }}
              >
                <button
                  onClick={() =>
                    updateStatus(
                      request.id,
                      "accepted"
                    )
                  }
                  style={{
                    background: "green",
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Accept
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      request.id,
                      "declined"
                    )
                  }
                  style={{
                    background: "red",
                    color: "#fff",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Decline
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Requests;