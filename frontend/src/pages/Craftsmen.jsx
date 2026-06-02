import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "../api/axios";

const PLACEHOLDER = "https://via.placeholder.com/110";

function Craftsmen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const specialtyFilter = searchParams.get("specialty") || "";

  const [search, setSearch] = useState(specialtyFilter);
  const [debouncedSearch, setDebouncedSearch] = useState(specialtyFilter);
  const [craftsmen, setCraftsmen] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSearch(specialtyFilter);
    setDebouncedSearch(specialtyFilter);
  }, [specialtyFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchCraftsmen = async () => {
      setLoading(true);

      try {
        const res = await api.get(
          `/api/craftsmen?search=${debouncedSearch}`
        );

        setCraftsmen(res.data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCraftsmen();
  }, [debouncedSearch]);

  return (
    <div className="craftsmen-page">
      <h1 className="craftsmen-title">
        {specialtyFilter
          ? `${specialtyFilter} Craftsmen`
          : "Craftsmen"}
      </h1>

      <p className="craftsmen-subtitle">
        Browse available craftsmen
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginTop: "-10px",
          marginBottom: "25px",
        }}
      >
        <button
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#8B5E3C",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "15px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
          }}
        >
          ← Back to Home
        </button>
      </div>

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
        <div className="craftsmen-grid">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="craftsmen-card"
              style={{ minHeight: 280 }}
            >
              <style>
                {`
                @keyframes pulse {
                  0%,100% { opacity:1 }
                  50% { opacity:0.4 }
                }
              `}
              </style>

              <div
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: "50%",
                  background: "#e8d5c4",
                  margin: "0 auto 15px",
                  animation:
                    "pulse 1.4s ease-in-out infinite",
                }}
              />

              {[140, 100, 80].map((w, j) => (
                <div
                  key={j}
                  style={{
                    height: 14,
                    width: w,
                    borderRadius: 8,
                    background: "#e8d5c4",
                    margin: "8px auto",
                    animation:
                      "pulse 1.4s ease-in-out infinite",
                    animationDelay: `${j * 0.1}s`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="craftsmen-grid">
          {craftsmen.length > 0 ? (
            craftsmen.map((c) => (
              <div
                key={c.id}
                className="craftsmen-card"
              >
                <div
                  style={{
                    width: 110,
                    height: 110,
                    margin: "0 auto 15px",
                  }}
                >
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
                      width: 110,
                      height: 110,
                      borderRadius: "50%",
                      objectFit: "cover",
                      border:
                        "3px solid #A85D20",
                      display: "block",
                    }}
                  />
                </div>

                <h3>{c.name}</h3>

                <p className="craftsmen-job">
                  {c.specialty || "Craftsman"}
                </p>

                <p className="craftsmen-rating">
                  ⭐ {c.average_rating || "No ratings"}
                </p>

                {c.city && (
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#888",
                    }}
                  >
                    📍 {c.city}
                  </p>
                )}

                <Link
                  to={`/craftsman/${c.id}`}
                  className="craftsmen-btn"
                >
                  View Profile
                </Link>
              </div>
            ))
          ) : (
            <p className="no-results">
              No craftsmen found
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default Craftsmen;