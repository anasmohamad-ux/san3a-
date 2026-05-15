import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

// Inline SVG placeholder — no external request, no delay, no layout shift
const PLACEHOLDER = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Crect width='150' height='150' rx='75' fill='%23e8d5c4'/%3E%3Ccircle cx='75' cy='55' r='28' fill='%23a85d20'/%3E%3Cellipse cx='75' cy='118' rx='44' ry='32' fill='%23a85d20'/%3E%3C/svg%3E`;

const cache = { data: null };

function Craftsmen() {
  const [search, setSearch] = useState("");
  const [craftsmen, setCraftsmen] = useState(cache.data || []);
  const [loading, setLoading] = useState(!cache.data);

  useEffect(() => {
    if (cache.data) return;

    api.get("/api/craftsmen")
      .then(res => {
        cache.data = res.data.data || [];
        setCraftsmen(cache.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = craftsmen.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.specialty && c.specialty.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="craftsmen-page">
      <h1 className="craftsmen-title">Craftsmen</h1>
      <p className="craftsmen-subtitle">Browse available craftsmen</p>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name or specialty..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {loading ? (
        // Skeleton grid — same layout as real cards, prevents page jump on load
        <div className="craftsmen-grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="craftsmen-card" style={{ minHeight: 280 }}>
              <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
              <div style={{
                width: 110, height: 110, borderRadius: "50%",
                background: "#e8d5c4", margin: "0 auto 15px",
                animation: "pulse 1.4s ease-in-out infinite"
              }} />
              {[140, 100, 80].map((w, j) => (
                <div key={j} style={{
                  height: 14, width: w, borderRadius: 8,
                  background: "#e8d5c4", margin: "8px auto",
                  animation: "pulse 1.4s ease-in-out infinite",
                  animationDelay: `${j * 0.1}s`
                }} />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="craftsmen-grid">
          {filtered.length > 0 ? (
            filtered.map((c) => (
              <div key={c.id} className="craftsmen-card">
                {/* Fixed-size wrapper — reserves space before image loads */}
                <div style={{ width: 110, height: 110, margin: "0 auto 15px" }}>
                  <img
                    src={c.photo || PLACEHOLDER}
                    alt={c.name}
                    width={110}
                    height={110}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = PLACEHOLDER;
                    }}
                    style={{
                      width: 110, height: 110,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "3px solid #A85D20",
                      display: "block"
                    }}
                  />
                </div>
                <h3>{c.name}</h3>
                <p className="craftsmen-job">{c.specialty || "Craftsman"}</p>
                <p className="craftsmen-rating">⭐ {c.average_rating || "No ratings"}</p>
                {c.city && <p style={{ fontSize: "13px", color: "#888" }}>📍 {c.city}</p>}
                <Link to={`/craftsman/${c.id}`} className="craftsmen-btn">
                  View Profile
                </Link>
              </div>
            ))
          ) : (
            <p className="no-results">No craftsmen found</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Craftsmen;