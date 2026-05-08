import React, { useState } from "react";
import axios from "axios";
import botImg from "../assets/bot.png";

function ChatBot({ expenses }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleChat = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { user: input, bot: "Typing..." }];
    setMessages(newMessages);

    try {
      const res= await axios.post(
  "https://ai-finance-tracker-mf04.onrender.com/api/ai",
  {
    message: input,
    expenses: expenses,
  }
);;

      setMessages([
        ...newMessages.slice(0, -1),
        { user: input, bot: res.data.reply },
      ]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMessages.slice(0, -1),
        { user: input, bot: "Something went wrong..." },
      ]);
    }

    setInput("");
  };

  return (
    <>
      {/* 🔥 IMAGE BUTTON */}
      <div className="chat-toggle" onClick={() => setOpen(!open)}>
        <img src={botImg} alt="bot" />
      </div>

      {/* 🔥 CHAT WINDOW */}
      {open && (
        <div className="chatbox">
          <h3>💬 Smart Assistant</h3>

          {/* Suggestions */}
          <div className="suggestions">
            <button onClick={() => setInput("Where am I spending most?")}>
              Spending most?
            </button>
            <button onClick={() => setInput("How can I save money?")}>
              Save money?
            </button>
            <button onClick={() => setInput("What is my balance?")}>
              Balance?
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i}>
                <p className="user-msg">You: {m.user}</p>
               <p className="bot-msg">
  AI:{" "}
  {m.bot === "typing" ? (
    <span className="typing">
      <span></span>
      <span></span>
      <span></span>
    </span>
  ) : (
    m.bot
  )}
</p>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your spending..."
            />
            <button onClick={handleChat}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;