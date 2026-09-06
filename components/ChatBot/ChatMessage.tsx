import { ChatMessage } from "@/types/  chat";
import ChatProductCard from "./ChatProductCard";
import css from "./ChatBot.module.css";
interface Props {
  message: ChatMessage;
}

const ChatMessageItem = ({ message }: Props) => {
  return (
    <div
      className={
        message.role === "user" ? css.userMessageWrapper : css.botMessageWrapper
      }
    >
      <p className={message.role === "user" ? css.userMessage : css.botMessage}>
        {message.text}
      </p>

      {!!message.products?.length && (
        <div className={css.products}>
          {message.products.map((product) => (
            <ChatProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatMessageItem;
