import { useState } from "react";

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    { text: "Hello 👋 I am San3a Assistant. How can I help you?", sender: "bot" },
  ]);

  const getBotReply = (text) => {
    const msg = text.toLowerCase();

    if (msg.includes("register") || msg.includes("sign up")) {
      return "You can create an account from the Register page and choose whether you are a User or Craftsman.";
    }

    if (msg.includes("login")) {
      return "You can login using your email and password from the Login page.";
    }

    if (msg.includes("craftsman") || msg.includes("craftsmen")) {
      return "Go to the Craftsmen page to browse available craftsmen and view their profiles.";
    }

    if (msg.includes("service") || msg.includes("request")) {
      return "Open any craftsman profile, then click Request Service to request help.";
    }

    if (msg.includes("hello") || msg.includes("hi")) {
      return "Hello! How can I help you today?";
    }

    return "I can help you with registration, login, finding craftsmen, or requesting a service.";
  };

  const sendMessage = () => {
    if (input.trim() === "") return;

    const userMessage = input;
    const botReply = getBotReply(userMessage);

    setMessages((prev) => [
      ...prev,
      { text: userMessage, sender: "user" },
      { text: botReply, sender: "bot" },
    ]);

    setInput("");
  };

  return (
    <>
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "25px",
            width: "360px",
            height: "500px",
            backgroundColor: "white",
            borderRadius: "16px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            overflow: "hidden",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              backgroundColor: "#8B5E3C",
              color: "white",
              padding: "15px",
              fontWeight: "bold",
            }}
          >
            San3a Assistant
          </div>

          <div
            style={{
              flex: 1,
              padding: "15px",
              overflowY: "auto",
              backgroundColor: "#FFFDF9",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "12px",
                  textAlign: msg.sender === "user" ? "right" : "left",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: "10px 14px",
                    borderRadius: "14px",
                    backgroundColor:
                      msg.sender === "user" ? "#E67E22" : "#F5F0E6",
                    color: msg.sender === "user" ? "white" : "#3E2C23",
                    maxWidth: "80%",
                    lineHeight: "1.5",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              padding: "12px",
              borderTop: "1px solid #EADBC8",
              display: "flex",
              gap: "8px",
              backgroundColor: "white",
            }}
          >
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />

            <button
              onClick={sendMessage}
              style={{
                backgroundColor: "#E67E22",
                color: "white",
                border: "none",
                padding: "10px 14px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: "25px",
          right: "25px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          border: "none",
          backgroundColor: "#E67E22",
          color: "white",
          fontSize: "26px",
          cursor: "pointer",
          boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
          zIndex: 1000,
        }}
      >
        {open ? "×" : "💬"}
      </button>
    </>
  );
}

export default ChatBot;