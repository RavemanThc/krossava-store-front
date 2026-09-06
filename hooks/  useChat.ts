"use client";

import { sendChatMessage } from "@/src/lib/api";
import { ChatMessage } from "@/types/  chat";
import axios from "axios";
import { useEffect, useState } from "react";

const STORAGE_KEY = "krossava-chat";
const SESSION_KEY = "krossava-chat-session";

const getInitialMessages = (): ChatMessage[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const getSessionId = (): string => {
  let sessionId = localStorage.getItem(SESSION_KEY);

  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, sessionId);
  }

  return sessionId;
};

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(getInitialMessages);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (messages.length === 0) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async (text: string) => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text,
      createdAt: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const sessionId = getSessionId();

      const data = await sendChatMessage(text, sessionId);

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: data.message,
        products: data.products,
        createdAt: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      let errorMessage = "Не вдалося отримати відповідь. Спробуйте ще раз.";

      if (axios.isAxiosError(error)) {
        const backendMessage = error.response?.data?.message;

        if (backendMessage) {
          errorMessage = backendMessage;
        }
      }

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          text: errorMessage,
          createdAt: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);

    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SESSION_KEY);
  };

  return {
    messages,
    sendMessage,
    clearChat,
    isLoading,
  };
};
