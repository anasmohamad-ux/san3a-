import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useRef } from "react";
import api from "../api/axios";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [conversations, setConversations] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);
  const profileRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!chatOpen) return;
    api.get("/api/inbox")
      .then((res) => setConversations(res.data))
      .catch((err) => console.error(err));
  }, [chatOpen]);

  // close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedUser) return;
    try {
      await api.post("/api/messages", { receiver_id: selectedUser.id, body: message });
      const response = await api.get(`/api/messages/${selectedUser.id}`);
      setMessages(response.data.data);
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  const handleLogout = async () => {
    setProfileOpen(false);
    await logout();
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const getAvatarUrl = (name) =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(name || "User")}&background=8B5E3C&color=fff&size=40`;

  const avatarColors = [
    { bg: "#EEDBC8", color: "#8B5E3C" },
    { bg: "#D8E8FF", color: "#185FA5" },
    { bg: "#D8F0E4", color: "#0F6E56" },
    { bg: "#F0D8EE", color: "#993556" },
    { bg: "#FFF0D8", color: "#854F0B" },
  ];

  const getAvatarColor = (id) => avatarColors[id % avatarColors.length];

  const linkStyle = ({ isActive }) => ({
    color: isActive ? "#FFD700" : "white",
    textDecoration: "none",
    padding: "6px 12px",
    borderRadius: "8px",
    boxShadow: isActive ? "0 0 10px rgba(255, 215, 0, 0.7)" : "none",
    backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "transparent",
    transition: "0.3s",
  });

  return (
    <header style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 40px",
      backgroundColor: "#8B5E3C",
      color: "white",
      position: "relative",
    }}>

      {/* LEFT SIDE - LOGO */}
      <h2 style={{ margin: 0 }}>san3a</h2>

      {/* NAVIGATION */}
      <nav style={{ display: "flex", gap: "25px", alignItems: "center" }}>
        <NavLink to="/" style={linkStyle}>Home page</NavLink>
        <NavLink to="/craftsmen" style={linkStyle}>Craftsmen</NavLink>
        <NavLink to="/about" style={linkStyle}>About</NavLink>

        <button
          onClick={() => setChatOpen(!chatOpen)}
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          💬 Chat
        </button>

        {user ? (
          <div ref={profileRef} style={{ position: "relative" }}>
            {/* PROFILE TRIGGER */}
            <div
              onClick={() => setProfileOpen(!profileOpen)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                padding: "4px 10px",
                borderRadius: "20px",
                backgroundColor: profileOpen ? "rgba(255,255,255,0.15)" : "transparent",
                transition: "0.2s",
              }}
            >
              <img
                src={user.photo || getAvatarUrl(user.name)}
                alt="avatar"
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid white",
                }}
              />
              <span style={{ color: "white", fontSize: "14px" }}>{user.name}</span>
              <span style={{ color: "white", fontSize: "10px", opacity: 0.7 }}>
                {profileOpen ? "▲" : "▼"}
              </span>
            </div>

            {/* DROPDOWN */}
            {profileOpen && (
              <div style={{
                position: "absolute",
                top: "50px",
                right: "0",
                backgroundColor: "white",
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
                minWidth: "200px",
                zIndex: 1000,
                overflow: "hidden",
              }}>
                {/* User info */}
                <div style={{
                  padding: "16px",
                  borderBottom: "1px solid #f0e8e0",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}>
                  <img
                    src={user.photo || getAvatarUrl(user.name)}
                    alt="avatar"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid #8B5E3C",
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: "600", fontSize: "14px", color: "#3d2b1f" }}>
                      {user.name}
                    </div>
                    <div style={{ fontSize: "11px", color: "#9e8070" }}>
                      {user.role}
                    </div>
                  </div>
                </div>

                {/* View Profile */}
                <button
                  onClick={() => { setProfileOpen(false); navigate("/profile"); }}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#3d2b1f",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#FDF6F0"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                >
                  👤 View Profile
                </button>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    background: "none",
                    border: "none",
                    borderTop: "1px solid #f0e8e0",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#c0392b",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#fff5f5"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "none"}
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <NavLink to="/login" style={linkStyle}>Login</NavLink>
            <NavLink to="/register" style={linkStyle}>Register</NavLink>
          </>
        )}
      </nav>

      {/* CHAT MODAL */}
      {chatOpen && (
        <>
          <div
            onClick={() => setChatOpen(false)}
            style={{
              position: "fixed",
              top: 0, left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.45)",
              zIndex: 9998,
            }}
          />
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "fixed",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "800px",
              height: "500px",
              background: "#fff",
              borderRadius: "16px",
              boxShadow: "0 24px 60px rgba(0,0,0,0.18)",
              zIndex: 9999,
              display: "flex",
              overflow: "hidden",
            }}
          >
            {/* SIDEBAR */}
            <div style={{
              width: "240px", minWidth: "240px",
              background: "#F9F6F3",
              borderRight: "0.5px solid #e8e0d8",
              display: "flex", flexDirection: "column",
            }}>
              <div style={{
                padding: "18px 16px 14px",
                borderBottom: "0.5px solid #e8e0d8",
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <span style={{ fontSize: "15px", fontWeight: "600", color: "#3d2b1f" }}>
                  💬 Messages
                </span>
                <button
                  onClick={() => setChatOpen(false)}
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#9e8070" }}
                >✕</button>
              </div>

              <div style={{ flex: 1, overflowY: "auto", padding: "8px" }}>
                {Object.entries(conversations).length === 0 ? (
                  <p style={{ textAlign: "center", color: "#b0998a", fontSize: "13px", marginTop: "24px" }}>
                    No conversations yet
                  </p>
                ) : (
                  Object.entries(conversations).map(([senderId, msgs], idx) => {
                    const sender = msgs[0]?.sender;
                    const isActive = selectedUser?.id === sender?.id;
                    const ac = getAvatarColor(idx);
                    return (
                      <div
                        key={senderId}
                        onClick={() => {
                          setSelectedUser(sender);
                          api.get(`/api/messages/${senderId}`)
                            .then((res) => setMessages(res.data.data))
                            .catch((err) => console.error(err));
                        }}
                        style={{
                          display: "flex", alignItems: "center", gap: "10px",
                          padding: "10px", borderRadius: "10px", cursor: "pointer",
                          marginBottom: "4px",
                          background: isActive ? "#fff" : "transparent",
                          border: isActive ? "0.5px solid #e0d0c4" : "0.5px solid transparent",
                        }}
                      >
                        <div style={{
                          width: "36px", height: "36px", borderRadius: "50%",
                          background: ac.bg, color: ac.color,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "12px", fontWeight: "600", flexShrink: 0,
                        }}>
                          {getInitials(sender?.name)}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: "13px", fontWeight: "600", color: "#3d2b1f", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {sender?.name}
                          </div>
                          <div style={{ fontSize: "11px", color: "#b0998a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {msgs[msgs.length - 1]?.body}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* MAIN CHAT AREA */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, background: "#fff" }}>
              {selectedUser ? (
                <>
                  <div style={{
                    padding: "14px 18px", borderBottom: "0.5px solid #e8e0d8",
                    display: "flex", alignItems: "center", gap: "10px",
                  }}>
                    <div style={{
                      width: "32px", height: "32px", borderRadius: "50%",
                      background: "#EEDBC8", color: "#8B5E3C",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "12px", fontWeight: "600", flexShrink: 0,
                    }}>
                      {getInitials(selectedUser.name)}
                    </div>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: "600", color: "#3d2b1f" }}>{selectedUser.name}</div>
                      <div style={{ fontSize: "11px", color: "#22c55e" }}>Online</div>
                    </div>
                  </div>

                  <div style={{
                    flex: 1, overflowY: "auto", padding: "16px 18px",
                    display: "flex", flexDirection: "column", gap: "8px",
                  }}>
                    {messages.map((msg) => {
                      const isMine = msg.sender_id === user?.id;
                      return (
                        <div key={msg.id} style={{ display: "flex", justifyContent: isMine ? "flex-end" : "flex-start" }}>
                          <div style={{
                            maxWidth: "65%", padding: "9px 13px",
                            borderRadius: "12px",
                            borderBottomRightRadius: isMine ? "4px" : "12px",
                            borderBottomLeftRadius: isMine ? "12px" : "4px",
                            background: isMine ? "#8B5E3C" : "#F5EDE4",
                            color: isMine ? "#fff" : "#3d2b1f",
                            fontSize: "13px", lineHeight: "1.5",
                            border: isMine ? "none" : "0.5px solid #e8d8cc",
                          }}>
                            {msg.body}
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>

                  <div style={{
                    padding: "12px 16px", borderTop: "0.5px solid #e8e0d8",
                    display: "flex", gap: "8px", alignItems: "center",
                  }}>
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a message..."
                      style={{
                        flex: 1, padding: "9px 16px",
                        border: "0.5px solid #d8c8b8",
                        borderRadius: "20px", fontSize: "13px",
                        background: "#F9F6F3", color: "#3d2b1f", outline: "none",
                      }}
                    />
                    <button
                      onClick={handleSendMessage}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#7a5232"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "#8B5E3C"}
                      style={{
                        width: "36px", height: "36px", borderRadius: "50%",
                        background: "#8B5E3C", color: "#fff",
                        border: "none", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "16px", flexShrink: 0, transition: "background 0.15s",
                      }}
                    >➤</button>
                  </div>
                </>
              ) : (
                <div style={{
                  flex: 1, display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  color: "#b0998a", gap: "10px",
                }}>
                  <span style={{ fontSize: "36px" }}>💬</span>
                  <p style={{ fontSize: "14px" }}>Select a conversation</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;