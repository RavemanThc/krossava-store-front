export interface ChatProduct {
  id: string;
  name: string;
  price: number;
  color?: string;
  sizeText?: string;
  image?: string;
  url: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  products?: ChatProduct[];
  createdAt: number;
}

export interface ChatResponse {
  message: string;
  products: ChatProduct[];
  rateLimited?: boolean;
  retryAfterSeconds?: number;
}
