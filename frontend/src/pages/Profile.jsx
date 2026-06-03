import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const getAvatarUrl = (name) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "User")}&background=8B5E3C&color=fff&size=120`;

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "0 20px" }}>

      {/* Profile Card */}
      <div style={{
        backgroundColor: "white",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}>
        {/* Cover */}
        <div style={{ height: "100px", backgroundColor: "#8B5E3C" }} />

        {/* Avatar + Info */}
        <div style={{ padding: "0 30px 30px", position: "relative" }}>
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

        {/* Details */}
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
    </div>
  );
}

export default Profile;