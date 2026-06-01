import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function Chat() {
  const { id } = useParams();
  const { user } = useAuth();
  const [craftsman, setCraftsman] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

useEffect(() => {
  api
    .get(`/api/users/${id}`)
    .then((res) => setCraftsman(res.data.data))
    .catch((err) => console.error(err));

  api
    .get(`/api/messages/${id}`)
    .then((res) => {
      console.log("MESSAGES:", res.data.data);
      setMessages(res.data.data);
    })
    .catch((err) => console.error(err));
}, [id]);
const handleSend = async () => {
  if (!message.trim()) return;

  try {
    await api.post("/api/messages", {
  receiver_id: id,
  body: message,
});

const response = await api.get(`/api/messages/${id}`);

setMessages(response.data.data);

alert("Message sent successfully");

setMessage("");
  } catch (error) {
    console.error(error);
    alert("Failed to send message");
  }
};

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "20px auto",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#A85D20",
          color: "white",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
<h2 style={{ margin: 0 }}>
  Chat with {craftsman?.name || "Craftsman"}
</h2>   
   </div>

      <div
        style={{
          height: "400px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "15px",
          overflowY: "auto",
          background: "#fafafa",
        }}
      >
{messages.length === 0 ? (
  <p>No messages yet</p>
) : (
  messages.map((msg) => (
    <div
      key={msg.id}
      style={{
        marginBottom: "10px",
        padding: "10px",
        background: msg.sender_id === user?.id ? "#d4edda" : "#fff",
        borderRadius: "8px",
        border: "1px solid #eee",
        textAlign: msg.sender_id === user?.id ? "right" : "left",
      }}
    >
      {msg.body}
    </div>
  ))
)}      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "15px",
        }}
      >
        <input
  type="text"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  placeholder="Write your message..."
  style={{
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  }}
/>

        <button
  onClick={handleSend}
  style={{
    background: "#A85D20",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  Send
</button>
      </div>
    </div>
  );
}

export default Chat;