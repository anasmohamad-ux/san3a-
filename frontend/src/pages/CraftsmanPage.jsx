import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

// Inline SVG placeholder — no external request, no delay, no layout shift
const PLACEHOLDER = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Crect width='120' height='120' rx='60' fill='%23e8d5c4'/%3E%3Ccircle cx='60' cy='45' r='22' fill='%23a85d20'/%3E%3Cellipse cx='60' cy='95' rx='35' ry='25' fill='%23a85d20'/%3E%3C/svg%3E`;

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

  if (loading) return (
    // Skeleton that matches card dimensions — prevents layout shift on load
    <div className="craftsman-page">
      <div className="craftsman-container">
        <div className="craftsman-card" style={{ minHeight: 420 }}>
          <div style={{
            width: 120, height: 120, borderRadius: "50%",
            background: "#e8d5c4", margin: "0 auto 15px",
            animation: "pulse 1.4s ease-in-out infinite"
          }} />
          {[180, 120, 90].map((w, i) => (
            <div key={i} style={{
              height: 16, width: w, borderRadius: 8,
              background: "#e8d5c4", margin: "10px auto",
              animation: "pulse 1.4s ease-in-out infinite",
              animationDelay: `${i * 0.15}s`
            }} />
          ))}
          <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
        </div>
      </div>
    </div>
  );

  if (!craftsman) return <h2 className="not-found">Craftsman not found</h2>;

  return (
    <div className="craftsman-page">
      <div className="craftsman-container">

        <button onClick={() => navigate(-1)} className="back-btn">
          ⬅ Back
        </button>

        <div className="craftsman-card">

          <div className="craftsman-header">
            {/* Fixed-size wrapper — reserves space before image loads, stops layout jump */}
            <div style={{ width: 120, height: 120, margin: "0 auto 15px" }}>
              <img
                src={craftsman.photo || PLACEHOLDER}
                alt={craftsman.name}
                width={120}
                height={120}
                onError={(e) => { e.target.src = PLACEHOLDER; }}
                style={{
                  width: 120, height: 120,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid #A85D20",
                  display: "block"
                }}
              />
            </div>
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

          <div
  style={{
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginTop: "20px",
  }}
>
  <button className="craftsman-btn">
    Request Service
  </button>

  <button
    className="craftsman-btn"
    onClick={() => navigate(`/chat/${craftsman.id}`)}
  >
    Chat
  </button>
</div>

        </div>
      </div>
    </div>
  );
}

export default CraftsmanPage;