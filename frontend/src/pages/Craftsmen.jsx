import { useState } from "react";
import { Link } from "react-router-dom";

function Craftsmen() {
  const [search, setSearch] = useState("");

  const craftsmen = [
    {
      id: 1,
      name: "محمد أحمد",
      job: "كهربائي",
      rating: 4.8,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "أحمد علي",
      job: "نجار",
      rating: 4.5,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "خالد محمود",
      job: "سباك",
      rating: 4.7,
      image: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      name: "سامي يوسف",
      job: "دهان",
      rating: 4.6,
      image: "https://via.placeholder.com/150",
    },
  ];

  // Search Filter
  const filteredCraftsmen = craftsmen.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.job.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="craftsmen-page">
      <h1 className="craftsmen-title">Craftsmen</h1>

      <p className="craftsmen-subtitle">
        Browse available craftsmen
      </p>

      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name or job..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Craftsmen Cards */}
      <div className="craftsmen-grid">
        {filteredCraftsmen.length > 0 ? (
          filteredCraftsmen.map((c) => (
            <div key={c.id} className="craftsmen-card">
              <img
                src={c.image}
                alt={c.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/150";
                }}
              />

              <h3>{c.name}</h3>

              <p className="craftsmen-job">{c.job}</p>

              <p className="craftsmen-rating">
                ⭐ {c.rating}
              </p>

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
    </div>
  );
}

export default Craftsmen;