"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import ChatMessage from "./ChatMessage";
import css from "./ChatBot.module.css";
import { useChat } from "@/hooks/  useChat";

const MAX_MESSAGES = 6;
const BLOCK_TIME = 30 * 60 * 1000;

const ChatWindow = () => {
  const [value, setValue] = useState("");

  const [messageCount, setMessageCount] = useState(0);
  const [blockedUntil, setBlockedUntil] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  const { messages, clearChat, sendMessage, isLoading } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isBlocked = timeLeft > 0;

  useEffect(() => {
    const timeout = setTimeout(() => {
      const savedCount = Number(localStorage.getItem("chatMessageCount"));

      const savedBlockedUntil = Number(
        localStorage.getItem("chatBlockedUntil"),
      );

      setMessageCount(savedCount || 0);

      if (savedBlockedUntil > Date.now()) {
        setBlockedUntil(savedBlockedUntil);

        const remaining = Math.ceil((savedBlockedUntil - Date.now()) / 1000);

        setTimeLeft(remaining);
      } else {
        localStorage.removeItem("chatMessageCount");
        localStorage.removeItem("chatBlockedUntil");
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isLoading]);

  useEffect(() => {
    if (!blockedUntil) return;

    const interval = setInterval(() => {
      const remaining = Math.ceil((blockedUntil - Date.now()) / 1000);

      if (remaining <= 0) {
        localStorage.removeItem("chatMessageCount");
        localStorage.removeItem("chatBlockedUntil");

        setMessageCount(0);
        setBlockedUntil(0);
        setTimeLeft(0);

        return;
      }

      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [blockedUntil]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const text = value.trim();

    if (!text || isLoading || isBlocked) return;

    setValue("");

    try {
      await sendMessage(text);

      const newCount = messageCount + 1;

      setMessageCount(newCount);

      localStorage.setItem("chatMessageCount", String(newCount));

      if (newCount >= MAX_MESSAGES) {
        const until = Date.now() + BLOCK_TIME;

        setBlockedUntil(until);
        setTimeLeft(BLOCK_TIME / 1000);

        localStorage.setItem("chatBlockedUntil", String(until));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className={css.chatBotWindow}>
      <div className={css.chatBotMessages}>
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isLoading && <p>Шукаю...</p>}
      </div>

      <form onSubmit={handleSubmit} className={css.chatBotForm}>
        <textarea
          className={css.chatBotMessage}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={
            isBlocked
              ? "Ліміт повідомлень вичерпано"
              : "Напишіть, які кросівки шукаєте..."
          }
          disabled={isBlocked}
        />

        <div className={css.buttonwrap}>
          <button type="button" onClick={clearChat}>
            Очистити чат
          </button>

          <button
            type="submit"
            disabled={isLoading || isBlocked || !value.trim()}
          >
            {isBlocked
              ? formatTime(timeLeft)
              : isLoading
                ? "Шукаю..."
                : "Надіслати"}
          </button>
        </div>

        <div ref={messagesEndRef} />
      </form>
    </div>
  );
};

export default ChatWindow;
