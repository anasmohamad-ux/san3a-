import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axios";

function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price_min: "",
    price_max: "",
  });
  const [serviceImages, setServiceImages] = useState([]);

  const getAvatarUrl = (name) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "User")}&background=8B5E3C&color=fff&size=120`;

  const categories = [
    "Electrical", "Plumbing", "Carpentry", "Painting",
    "AC Services", "Welding", "Tiling", "Gypsum", "Other"
  ];

  useEffect(() => {
    if (user?.role === "craftsman") {
      api.get("/api/my-services")
        .then(res => setServices(res.data.data || []))
        .catch(err => console.error(err));
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateService = async () => {
    if (!form.name || !form.description || !form.category || !form.price_min || !form.price_max) {
      setMessage("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("price_min", form.price_min);
      formData.append("price_max", form.price_max);
      serviceImages.forEach((img) => {
        formData.append("images[]", img);
      });

      const response = await api.post("/api/services", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setServices([...services, response.data]);
      setForm({ name: "", description: "", category: "", price_min: "", price_max: "" });
      setServiceImages([]);
      setShowForm(false);
      setMessage("Service created successfully!");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to create service.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await api.delete(`/api/services/${id}`);
      setServices(services.filter(s => s.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    border: "1px solid #e0d0c0",
    borderRadius: "8px",
    fontSize: "14px",
    color: "#3d2b1f",
    backgroundColor: "#FDFAF7",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block",
    fontSize: "13px",
    color: "#9e8070",
    marginBottom: "5px",
    fontWeight: "500",
  };

  const renderStars = (rating) => {
    const rounded = Math.round(rating || 0);
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              fontSize: "18px",
              color: star <= rounded ? "#F5A623" : "#e0d0c0",
            }}
          >
            ★
          </span>
        ))}
        <span style={{ fontSize: "12px", color: "#9e8070", marginLeft: "4px" }}>
          ({rating > 0 ? Number(rating).toFixed(1) : "No rating"})
        </span>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: "680px", margin: "40px auto", padding: "0 20px 60px" }}>

      {/* Profile Card */}
      <div style={{
        backgroundColor: "white",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        overflow: "hidden",
        marginBottom: "24px",
      }}>
        <div style={{ height: "100px", backgroundColor: "#8B5E3C" }} />

        <div style={{ padding: "0 30px 30px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <img
              src={user?.photo || getAvatarUrl(user?.name)}
              alt="avatar"
              style={{
                width: "90px", height: "90px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "4px solid white",
                marginTop: "-45px",
              }}
            />
            <button
              onClick={() => navigate("/upload-photo")}
              style={{
                padding: "8px 16px",
                backgroundColor: "#8B5E3C",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              Edit Photo
            </button>
          </div>

          <h2 style={{ margin: "12px 0 4px", color: "#3d2b1f", fontSize: "22px" }}>{user?.name}</h2>
          <p style={{ margin: 0, color: "#9e8070", fontSize: "14px", textTransform: "capitalize" }}>
            {user?.role}
          </p>
        </div>

        <div style={{ padding: "0 30px 30px" }}>
          <div style={{
            backgroundColor: "#FDF6F0",
            borderRadius: "12px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
              <span style={{ color: "#9e8070" }}>Email</span>
              <span style={{ color: "#3d2b1f", fontWeight: "500" }}>{user?.email}</span>
            </div>
            {user?.phone && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                <span style={{ color: "#9e8070" }}>Phone</span>
                <span style={{ color: "#3d2b1f", fontWeight: "500" }}>{user.phone}</span>
              </div>
            )}
            {user?.city && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                <span style={{ color: "#9e8070" }}>City</span>
                <span style={{ color: "#3d2b1f", fontWeight: "500" }}>{user.city}</span>
              </div>
            )}
            {user?.specialty && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                <span style={{ color: "#9e8070" }}>Specialty</span>
                <span style={{ color: "#3d2b1f", fontWeight: "500" }}>{user.specialty}</span>
              </div>
            )}
            {user?.experience_years && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                <span style={{ color: "#9e8070" }}>Experience</span>
                <span style={{ color: "#3d2b1f", fontWeight: "500" }}>{user.experience_years} years</span>
              </div>
            )}
            {user?.availability && (
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
                <span style={{ color: "#9e8070" }}>Availability</span>
                <span style={{
                  color: user.availability === "available" ? "#0F6E56" : "#854F0B",
                  fontWeight: "500",
                  textTransform: "capitalize",
                }}>
                  ● {user.availability}
                </span>
              </div>
            )}
            {user?.bio && (
              <div style={{ fontSize: "14px", borderTop: "1px solid #f0e8e0", paddingTop: "14px" }}>
                <span style={{ color: "#9e8070", display: "block", marginBottom: "6px" }}>Bio</span>
                <span style={{ color: "#3d2b1f" }}>{user.bio}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SERVICES SECTION */}
      {user?.role === "craftsman" && (
        <div style={{
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          padding: "24px 30px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h3 style={{ margin: 0, color: "#3d2b1f", fontSize: "18px" }}>My Services</h3>
            <button
              onClick={() => { setShowForm(!showForm); setMessage(""); }}
              style={{
                padding: "8px 16px",
                backgroundColor: showForm ? "#c0392b" : "#8B5E3C",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "13px",
              }}
            >
              {showForm ? "Cancel" : "+ Add Service"}
            </button>
          </div>

          {message && (
            <p style={{
              padding: "10px 14px",
              borderRadius: "8px",
              fontSize: "13px",
              backgroundColor: message.includes("success") ? "#e8f5e9" : "#fdecea",
              color: message.includes("success") ? "#2e7d32" : "#c0392b",
              marginBottom: "16px",
            }}>
              {message}
            </p>
          )}

          {/* CREATE FORM */}
          {showForm && (
            <div style={{
              backgroundColor: "#FDF6F0",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}>
              <h4 style={{ margin: "0 0 4px", color: "#3d2b1f" }}>New Service</h4>

              <div>
                <label style={labelStyle}>Service Name *</label>
                <input name="name" value={form.name} onChange={handleChange}
                  placeholder="e.g. Kitchen Plumbing Repair" style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Category *</label>
                <select name="category" value={form.category} onChange={handleChange} style={inputStyle}>
                  <option value="">Select a category</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Description *</label>
                <textarea name="description" value={form.description} onChange={handleChange}
                  placeholder="Describe what you offer..." rows={3}
                  style={{ ...inputStyle, resize: "vertical" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={labelStyle}>Min Price (JD) *</label>
                  <input type="number" name="price_min" value={form.price_min}
                    onChange={handleChange} placeholder="e.g. 20" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Max Price (JD) *</label>
                  <input type="number" name="price_max" value={form.price_max}
                    onChange={handleChange} placeholder="e.g. 100" style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Service Images (optional, multiple)</label>
                <input type="file" accept="image/*" multiple
                  onChange={(e) => setServiceImages(Array.from(e.target.files))}
                  style={{ fontSize: "13px" }} />
                {serviceImages.length > 0 && (
                  <p style={{ fontSize: "12px", color: "#9e8070", marginTop: "4px" }}>
                    {serviceImages.length} image(s) selected
                  </p>
                )}
              </div>

              <button
                onClick={handleCreateService}
                disabled={loading}
                style={{
                  padding: "12px",
                  backgroundColor: "#8B5E3C",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Creating..." : "Create Service"}
              </button>
            </div>
          )}

          {/* SERVICES LIST — POST STYLE */}
          {services.length === 0 ? (
            <p style={{ textAlign: "center", color: "#b0998a", fontSize: "14px", padding: "20px 0" }}>
              No services yet. Add your first service!
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {services.map((s) => (
                <div key={s.id} style={{
                  border: "1px solid #f0e8e0",
                  borderRadius: "14px",
                  backgroundColor: "white",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}>
                  {/* Post Header */}
                  <div style={{
                    padding: "16px 16px 10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}>
                    <div>
                      <h4 style={{ margin: "0 0 6px", color: "#3d2b1f", fontSize: "16px" }}>{s.name}</h4>
                      <span style={{
                        fontSize: "11px",
                        backgroundColor: "#EEDBC8",
                        color: "#8B5E3C",
                        padding: "2px 8px",
                        borderRadius: "10px",
                      }}>
                        {s.category}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteService(s.id)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#c0392b", fontSize: "18px" }}
                    >🗑</button>
                  </div>

                  {/* Description */}
                  <div style={{ padding: "0 16px 12px" }}>
                    <p style={{ margin: 0, fontSize: "14px", color: "#7a6a60", lineHeight: "1.6" }}>
                      {s.description}
                    </p>
                  </div>

                  {/* Images Grid */}
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
                            height: s.images.length === 1 ? "220px" : "150px",
                            objectFit: "cover",
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div style={{
                    padding: "12px 16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid #f5ede5",
                  }}>
                    <span style={{ fontSize: "14px", color: "#8B5E3C", fontWeight: "500" }}>
                      💰 {s.price_min}–{s.price_max} JD
                    </span>
                    {renderStars(s.rating)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;