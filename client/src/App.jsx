import React, { useState, useEffect } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const fetchMessages = async () => {
    const res = await fetch("/api/messages");
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    setText("");
    fetchMessages();
  };

  return (
    <div style={{ maxWidth: "500px", margin: "3rem auto", fontFamily: "sans-serif", padding: "1rem" }}>
      <h1>MERN Deployment Test</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: "0.5rem" }}
        />
        <button type="submit">Send</button>
      </form>
      <ul>
        {messages.map((m) => (
          <li key={m._id}>{m.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
