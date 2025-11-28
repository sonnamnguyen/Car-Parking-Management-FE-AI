import React, { useState, useRef, useEffect } from "react";
import "../css/chatbot.css";
import { sendChatMessage } from "../api/chat";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: `${Date.now()}-welcome`,
      role: "bot",
      content: "Hi! How can I help you with parking today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const suggestionChips = [
    "Parking zones & rates",
    "How to pay for parking",
    "Variable parking tariff",
    "Parking fines",
    "Subscriptions",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [
      ...prev,
      { id: `${Date.now()}-user`, role: "user", content: userMessage },
    ]);
    setIsLoading(true);

    try {
      const data = await sendChatMessage({ message: userMessage });
      setMessages((prev) => [
        ...prev,
        { id: `${Date.now()}-bot`, role: "bot", content: data.reply },
      ]);
    } catch (error) {
      // Log for diagnostics and provide a friendly fallback
      // eslint-disable-next-line no-console
      console.error("Chatbot sendMessage error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-error`,
          role: "bot",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading && input.trim()) {
        // Create a synthetic event to reuse sendMessage
        sendMessage({ preventDefault: () => {} } as unknown as React.FormEvent);
      }
    }
  };

  const handleSuggestionClick = (text: string) => {
    if (isLoading) return;
    setInput(text);
    // Send immediately
    setTimeout(() => {
      sendMessage({ preventDefault: () => {} } as unknown as React.FormEvent);
    }, 0);
  };

  return (
    <>
      <button
        className="chatbot-toggle-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
      >
        {isOpen ? "✕" : "💬"}
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-left">
              <div className="chatbot-avatar">
                <span>🅿️</span>
                <span
                  className="chatbot-status"
                  aria-label={isLoading ? "Typing" : "Online"}
                ></span>
              </div>
              <div className="chatbot-title">
                <h3>ParkIn Assistant</h3>
                <p className="chatbot-subtitle">
                  {isLoading ? "Typing…" : "Online"}
                </p>
              </div>
            </div>
            <button
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chatbot-message ${msg.role}`}>
                <div className="message-content">
                  {msg.role === "bot" ? (
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="chatbot-message bot">
                <div className="message-content typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div className="chatbot-suggestions">
              {suggestionChips.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  className="chatbot-chip"
                  onClick={() => handleSuggestionClick(chip)}
                  disabled={isLoading}
                >
                  {chip}
                </button>
              ))}
            </div>
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={sendMessage} className="chatbot-input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about parking..."
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !input.trim()}>
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
