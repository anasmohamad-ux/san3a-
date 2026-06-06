import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import api from "../api/axios";

function Home() {
  const { user } = useAuth();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    category: "",
    rating: "",
    price_max: "",
  });

  const categories = [
    "Electrical", "Plumbing", "Carpentry", "Painting",
    "AC Services", "Welding", "Tiling", "Gypsum", "Other"
  ];

  const fetchServices = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filters.category) params.append("category", filters.category);
    if (filters.rating) params.append("rating", filters.rating);

    api.get(`/api/services?${params.toString()}`)
      .then(res => {
        let data = res.data.data || [];
        // sort by rating desc by default
        data = data.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        // filter by max price on frontend
        if (filters.price_max) {
          data = data.filter(s => s.price_min <= Number(filters.price_max));
        }
        setServices(data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (user?.role === "client") {
      fetchServices();
    }
  }, [user]);

  const handleFilter = () => fetchServices();

  const handleReset = () => {
    setFilters({ category: "", rating: "", price_max: "" });
    setLoading(true);
    api.get("/api/services")
      .then(res => {
        const data = (res.data.data || []).sort((a, b) => (b.rating || 0) - (a.rating || 0));
        setServices(data);
      })
      .finally(() => setLoading(false));
  };

  const renderStars = (rating) => {
    const rounded = Math.round(rating || 0);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} style={{ fontSize: "16px", color: star <= rounded ? "#F5A623" : "#e0d0c0" }}>★</span>
        ))}
        <span style={{ fontSize: "12px", color: "#9e8070", marginLeft: "4px" }}>
          ({rating > 0 ? Number(rating).toFixed(1) : "No rating"})
        </span>
      </div>
    );
  };

  // ── CLIENT VIEW ──────────────────────────────────────────
  if (user?.role === "client") {
    return (
      <div style={{ background: "#F8F5EF", minHeight: "100vh", padding: "40px" }}>

        {/* HERO */}
        <div style={{
          background: "linear-gradient(135deg,#8B5E3C,#A85D20)",
          borderRadius: "25px",
          padding: "40px 50px",
          color: "white",
          marginBottom: "36px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}>
          <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>
            Welcome back, {user.name} 👋
          </h1>
          <p style={{ fontSize: "18px", opacity: 0.9 }}>
            Find trusted craftsmen and manage your services easily.
          </p>
        </div>

        {/* FILTER BAR */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "20px 24px",
          marginBottom: "28px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
          display: "flex",
          gap: "14px",
          alignItems: "flex-end",
          flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px", flex: "1", minWidth: "140px" }}>
            <label style={{ fontSize: "12px", color: "#9e8070", fontWeight: "500" }}>Category</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              style={{
                padding: "9px 12px",
                borderRadius: "8px",
                border: "1px solid #e0d0c0",
                fontSize: "14px",
                color: "#3d2b1f",
                backgroundColor: "#FDFAF7",
              }}
            >
              <option value="">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px", flex: "1", minWidth: "120px" }}>
            <label style={{ fontSize: "12px", color: "#9e8070", fontWeight: "500" }}>Min Rating</label>
            <select
              value={filters.rating}
              onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
              style={{
                padding: "9px 12px",
                borderRadius: "8px",
                border: "1px solid #e0d0c0",
                fontSize: "14px",
                color: "#3d2b1f",
                backgroundColor: "#FDFAF7",
              }}
            >
              <option value="">Any Rating</option>
              <option value="1">⭐ 1+</option>
              <option value="2">⭐⭐ 2+</option>
              <option value="3">⭐⭐⭐ 3+</option>
              <option value="4">⭐⭐⭐⭐ 4+</option>
              <option value="5">⭐⭐⭐⭐⭐ 5</option>
            </select>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px", flex: "1", minWidth: "120px" }}>
            <label style={{ fontSize: "12px", color: "#9e8070", fontWeight: "500" }}>Max Price (JD)</label>
            <input
              type="number"
              placeholder="e.g. 100"
              value={filters.price_max}
              onChange={(e) => setFilters({ ...filters, price_max: e.target.value })}
              style={{
                padding: "9px 12px",
                borderRadius: "8px",
                border: "1px solid #e0d0c0",
                fontSize: "14px",
                color: "#3d2b1f",
                backgroundColor: "#FDFAF7",
              }}
            />
          </div>

          <button
            onClick={handleFilter}
            style={{
              padding: "9px 22px",
              backgroundColor: "#8B5E3C",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
              height: "38px",
            }}
          >
            Search
          </button>

          <button
            onClick={handleReset}
            style={{
              padding: "9px 16px",
              backgroundColor: "transparent",
              color: "#8B5E3C",
              border: "1px solid #8B5E3C",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              height: "38px",
            }}
          >
            Reset
          </button>
        </div>

        {/* SERVICES */}
        <h2 style={{ color: "#3E2C23", marginBottom: "20px", fontSize: "20px" }}>
          {filters.category || filters.rating || filters.price_max ? "Filtered Services" : "⭐ Top Rated Services"}
        </h2>

        {loading ? (
          <p style={{ textAlign: "center", color: "#9e8070", padding: "40px 0" }}>Loading...</p>
        ) : services.length === 0 ? (
          <p style={{ textAlign: "center", color: "#9e8070", padding: "40px 0" }}>No services found.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {services.map((s) => (
              <div key={s.id} style={{
                backgroundColor: "white",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 4px 16px rgba(0,0,0,0.07)",
                border: "1px solid #f0e8e0",
              }}>
                {/* Post Header — craftsman info */}
                <div style={{
                  padding: "16px 20px 12px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <img
                      src={s.craftsman?.photo ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(s.craftsman?.name || "C")}&background=8B5E3C&color=fff&size=40`}
                      alt="craftsman"
                      style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }}
                    />
                    <div>
                      <div style={{ fontWeight: "600", fontSize: "14px", color: "#3d2b1f" }}>
                        {s.craftsman?.name}
                      </div>
                      <div style={{ fontSize: "11px", color: "#9e8070" }}>
                        {s.craftsman?.city && `📍 ${s.craftsman.city}`}
                      </div>
                    </div>
                  </div>
                  <span style={{
                    fontSize: "11px",
                    backgroundColor: "#EEDBC8",
                    color: "#8B5E3C",
                    padding: "3px 10px",
                    borderRadius: "10px",
                    fontWeight: "500",
                  }}>
                    {s.category}
                  </span>
                </div>

                {/* Service name + description */}
                <div style={{ padding: "0 20px 12px" }}>
                  <h3 style={{ margin: "0 0 6px", color: "#3d2b1f", fontSize: "17px" }}>{s.name}</h3>
                  <p style={{ margin: 0, fontSize: "14px", color: "#7a6a60", lineHeight: "1.6" }}>
                    {s.description}
                  </p>
                </div>

                {/* Images */}
                {s.images && s.images.length > 0 && (
                  <div style={{
                    display: "grid",
                    gridTemplateColumns:
                      s.images.length === 1 ? "1fr" :
                        s.images.length === 2 ? "1fr 1fr" : "1fr 1fr 1fr",
                    gap: "2px",
                  }}>
                    {s.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt={`service-${idx}`}
                        style={{
                          width: "100%",
                          height: s.images.length === 1 ? "260px" : "160px",
                          objectFit: "cover",
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Footer */}
                <div style={{
                  padding: "12px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: "1px solid #f5ede5",
                }}>
                  <span style={{ fontSize: "14px", color: "#8B5E3C", fontWeight: "600" }}>
                    💰 {s.price_min}–{s.price_max} JD
                  </span>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    {renderStars(s.rating)}
                    <Link
                      to={`/craftsman/${s.craftsman?.id}`}
                      style={{
                        fontSize: "13px",
                        color: "#8B5E3C",
                        textDecoration: "none",
                        fontWeight: "500",
                        border: "1px solid #8B5E3C",
                        padding: "4px 12px",
                        borderRadius: "8px",
                      }}
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ── CRAFTSMAN VIEW ────────────────────────────────────────
  if (user?.role === "craftsman") {
    return (
      <div style={{ background: "#F8F5EF", minHeight: "100vh", padding: "40px" }}>
        <div style={{
          background: "linear-gradient(135deg,#8B5E3C,#A85D20)",
          borderRadius: "25px",
          padding: "50px",
          color: "white",
          marginBottom: "40px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}>
          <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>Welcome Back, {user.name} 👋</h1>
          <p style={{ fontSize: "18px", opacity: 0.9 }}>Manage your profile, requests and clients easily.</p>
        </div>

        <h2 style={{ color: "#3E2C23", marginBottom: "20px" }}>⚡ Quick Actions</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "60px",
        }}>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <div style={cardStyle}><h2>🧑‍🔧 My Profile</h2></div>
          </Link>
          <Link to="/requests" style={{ textDecoration: "none" }}>
            <div style={cardStyle}><h2>📩 Requests</h2></div>
          </Link>
          <Link to="/ratings" style={{ textDecoration: "none" }}>
            <div style={cardStyle}><h2>⭐ Ratings</h2></div>
          </Link>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "50px",
        }}>
          <div style={statCard}><h1>📩</h1><h2>2</h2><p>Pending Requests</p></div>
          <div style={statCard}><h1>⭐</h1><h2>4.8</h2><p>Average Rating</p></div>
          <div style={statCard}><h1>💬</h1><h2>3</h2><p>Messages</p></div>
        </div>

        <h2 style={{ color: "#3E2C23", marginBottom: "20px" }}>📋 Latest Requests</h2>
        <div style={cardStyle}>
          <h3>⚡ Electrical Repair</h3>
          <p>Client: Ahmad</p>
          <p>Status: Pending</p>
        </div>
        <div style={{ ...cardStyle, marginTop: "15px" }}>
          <h3>🎨 Painting Service</h3>
          <p>Client: Omar</p>
          <p>Status: Accepted</p>
        </div>

        <h2 style={{ color: "#3E2C23", marginTop: "50px", marginBottom: "20px" }}>⭐ Latest Reviews</h2>
        <div style={cardStyle}>
          <h3>⭐⭐⭐⭐⭐</h3>
          <p>Great service and very professional.</p>
        </div>
        <div style={{ ...cardStyle, marginTop: "15px" }}>
          <h3>⭐⭐⭐⭐</h3>
          <p>Fast response and fair pricing.</p>
        </div>
      </div>
    );
  }

  // ── GUEST VIEW (not logged in) ────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#F8F5EF", padding: "60px" }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "50px",
        flexWrap: "wrap",
      }}>
        <div style={{ flex: 1 }}>
          <p style={{ color: "#A85D20", fontWeight: "600", marginBottom: "10px" }}>
            Trusted craftsmen near you
          </p>
          <h1 style={{ fontSize: "60px", color: "#3E2C23", lineHeight: "1.1", marginBottom: "20px" }}>
            Your Project,<br />Our Craftsmen
          </h1>
          <p style={{ fontSize: "18px", color: "#666", maxWidth: "500px", marginBottom: "30px" }}>
            Find skilled professionals for any service you need.
          </p>
          <div style={{ display: "flex", gap: "15px", marginBottom: "40px" }}>
            <Link to="/register" style={{
              background: "#A85D20", color: "white",
              padding: "12px 25px", borderRadius: "12px",
              textDecoration: "none", fontWeight: "bold",
            }}>Get Started</Link>
            <Link to="/craftsmen" style={{
              border: "2px solid #A85D20", color: "#A85D20",
              padding: "12px 25px", borderRadius: "12px",
              textDecoration: "none", fontWeight: "bold",
            }}>Browse Services</Link>
          </div>
          <div style={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
            <div><h3 style={{ color: "#A85D20" }}>500+</h3><p>Skilled Workers</p></div>
            <div><h3 style={{ color: "#A85D20" }}>1K+</h3><p>Happy Clients</p></div>
            <div><h3 style={{ color: "#A85D20" }}>100%</h3><p>Trusted</p></div>
          </div>
        </div>

        <div style={{
          flex: 1,
          background: "linear-gradient(135deg,#8B5E3C,#A85D20)",
          padding: "25px",
          borderRadius: "25px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
        }}>
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
            alt="Craftsmen"
            style={{ width: "100%", borderRadius: "20px", marginBottom: "20px" }}
          />
          <h3 style={{ color: "white", textAlign: "center" }}>Professional Services</h3>
          <p style={{ color: "#f5f5f5", textAlign: "center" }}>
            Connect with trusted craftsmen and complete your project with confidence.
          </p>
        </div>
      </div>

      {/* OUR SERVICES */}
      <div style={{ marginTop: "80px", textAlign: "center" }}>
        <p style={{ color: "#A85D20", fontSize: "13px", fontWeight: "bold", letterSpacing: "1px", marginBottom: "10px" }}>
          OUR SERVICES
        </p>
        <h2 style={{ fontSize: "42px", color: "#3E2C23", marginBottom: "40px" }}>
          What can we help you with?
        </h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}>
          {[
            { icon: "⚡", title: "Electrical Services", specialty: "Electrician" },
            { icon: "🪚", title: "Carpentry", specialty: "Carpenter" },
            { icon: "🔧", title: "Plumbing", specialty: "Plumber" },
            { icon: "🎨", title: "Painting", specialty: "Painter" },
            { icon: "❄️", title: "AC Services", specialty: "AC Technician" },
            { icon: "🛠", title: "Metal Works", specialty: "Welder" },
          ].map((service) => (
            <Link
              key={service.title}
              to={`/craftsmen?specialty=${encodeURIComponent(service.specialty)}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  background: "white", borderRadius: "20px",
                  padding: "30px 20px", border: "1px solid #eee",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.06)",
                  transition: "0.3s", cursor: "pointer", color: "#3E2C23",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.06)";
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "15px" }}>{service.icon}</div>
                <div style={{ fontWeight: "600" }}>{service.title}</div>
              </div>
            </Link>
          ))}
        </div>
        <Link to="/craftsmen" style={{
          background: "#A85D20", color: "white",
          padding: "14px 35px", borderRadius: "12px",
          textDecoration: "none", fontWeight: "bold", display: "inline-block",
        }}>
          View All Services
        </Link>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "10px",
  borderRadius: "20px",
  color: "#3E2C23",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  transition: "0.3s",
};

const statCard = {
  background: "white",
  padding: "15px",
  borderRadius: "20px",
  textAlign: "center",
  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  color: "#3E2C23",
};

export default Home;