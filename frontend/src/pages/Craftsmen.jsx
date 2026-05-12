import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

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
        <p style={{ textAlign: "center", marginTop: "40px" }}>Loading...</p>
      ) : (
        <div className="craftsmen-grid">
          {filtered.length > 0 ? (
            filtered.map((c) => (
              <div key={c.id} className="craftsmen-card">
                <img
                  src={c.photo || "https://via.placeholder.com/150"}
                  alt={c.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
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