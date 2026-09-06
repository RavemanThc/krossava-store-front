"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import css from "./ChatBot.module.css";
import { useChat } from "@/hooks/  useChat";
import ChatMessageItem from "./ChatMessage";

const MAX_MESSAGES = 6;
const BLOCK_TIME = 30 * 60; // 30 минут

const ChatWindow = () => {
  const [value, setValue] = useState("");
  const [messageCount, setMessageCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  const { messages, clearChat, sendMessage, isLoading } = useChat();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isBlocked = messageCount >= MAX_MESSAGES;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isBlocked) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setMessageCount(0);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isBlocked]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const text = value.trim();

    if (!text || isLoading || isBlocked) return;

    setValue("");

    await sendMessage(text);

    setMessageCount((prev) => {
      const newCount = prev + 1;

      if (newCount >= MAX_MESSAGES) {
        setTimeLeft(BLOCK_TIME);
      }

      return newCount;
    });
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
          <ChatMessageItem key={message.id} message={message} />
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
          <button
            type="button"
            onClick={clearChat}
            disabled={messages.length === 0}
          >
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
