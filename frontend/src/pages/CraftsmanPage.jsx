import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

function CraftsmanPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [craftsman, setCraftsman] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    api.get(`/api/users/${id}`)
      .then(res => setCraftsman(res.data.data))
      .catch(() => setCraftsman(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p style={{ textAlign: "center", marginTop: "60px" }}>Loading...</p>;
  if (!craftsman) return <h2 className="not-found">Craftsman not found</h2>;

  return (
    <div className="craftsman-page">
      <div className="craftsman-container">

        <button onClick={() => navigate(-1)} className="back-btn">
          ⬅ Back
        </button>

        <div className="craftsman-card">

          <div className="craftsman-header">
            <img
              src={craftsman.photo || "https://via.placeholder.com/120"}
              alt={craftsman.name}
              onError={(e) => { e.target.src = "https://via.placeholder.com/120"; }}
            />
            <h2>{craftsman.name}</h2>
            <p className="craftsman-job">{craftsman.specialty || "Craftsman"}</p>
            <p className="craftsman-rating">⭐ {craftsman.average_rating || "No ratings yet"}</p>
            {craftsman.city && <p>📍 {craftsman.city}</p>}
            {craftsman.experience_years && (
              <p>🛠 {craftsman.experience_years} years of experience</p>
            )}
            <p style={{ fontSize: "13px", color: craftsman.availability === "available" ? "green" : "gray" }}>
              ● {craftsman.availability || "unknown"}
            </p>
          </div>

          {craftsman.bio && (
            <div className="craftsman-section">
              <h3>About</h3>
              <p>{craftsman.bio}</p>
            </div>
          )}

          {craftsman.services && craftsman.services.length > 0 && (
            <div className="craftsman-section">
              <h3>Services</h3>
              <ul className="craftsman-services">
                {craftsman.services.map((s) => (
                  <li key={s.id}>{s.name} — {s.price_min}–{s.price_max} JD</li>
                ))}
              </ul>
            </div>
          )}

          {craftsman.reviews && craftsman.reviews.length > 0 && (
            <div className="craftsman-section">
              <h3>Reviews</h3>
              {craftsman.reviews.map((r) => (
                <div key={r.id} style={{ borderBottom: "1px solid #eee", paddingBottom: "8px", marginBottom: "8px" }}>
                  <strong>{r.client?.name}</strong> — ⭐ {r.rating}
                  <p style={{ fontSize: "13px", color: "#555" }}>{r.body}</p>
                </div>
              ))}
            </div>
          )}

          <button className="craftsman-btn">
            Request Service
          </button>

        </div>
      </div>
    </div>
  );
}

export default CraftsmanPage;