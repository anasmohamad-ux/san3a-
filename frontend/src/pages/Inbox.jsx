import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

function Inbox() {
  const [conversations, setConversations] = useState([]);
    const navigate = useNavigate();
  useEffect(() => {
    api
      .get("/api/inbox")
      .then((res) => {
        console.log("INBOX:", res.data);
        setConversations(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Inbox</h1>

      {Object.keys(conversations).length === 0 ? (
  <p>No conversations yet</p>
) : (
  Object.entries(conversations).map(([senderId, msgs]) => (
    <div
  key={senderId}
  onClick={() => navigate(`/chat/${senderId}`)}
  style={{
    padding: "15px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    background: "#fff",
    cursor: "pointer",
  }}
>
      {msgs[0].sender?.name}
    </div>
  ))
)}
    </div>
  );
}

export default Inbox;