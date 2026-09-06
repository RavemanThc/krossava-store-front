"use client";

import { useEffect, useState } from "react";
import { LuBot } from "react-icons/lu";
import { IoMdCloseCircle } from "react-icons/io";

import css from "./ChatBot.module.css";
import ChatWindow from "./ChatWindow";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleCloseChat = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className={css.chatButton}
        onClick={() => setIsOpen(true)}
        aria-label="Відкрити чат"
      >
        <LuBot className={css.chatButtonIcon} />
      </button>

      {isOpen && (
        <div className={css.overlay} onClick={handleCloseChat}>
          <div
            className={css.modal}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={css.closeButton}
              onClick={handleCloseChat}
              aria-label="Закрити чат"
            >
              <IoMdCloseCircle />
            </button>

            <ChatWindow />
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
