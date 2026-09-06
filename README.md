# 👟 Krossava Store

A full-stack sneaker e-commerce platform built with **Next.js 16**, **React 19**, **TypeScript**, **Node.js**, **Express.js**, **MongoDB**, **Algolia Search**, and an **AI-powered shopping assistant**.

Krossava provides a responsive online storefront with fast product search, filtering, shopping cart functionality, automated product synchronization, Telegram order notifications, SEO optimization, and an AI assistant that helps customers find suitable sneakers using natural-language queries.

---

## 🚀 Live Demo

🌐 **Website:** https://krossava.com.ua

---

## 📸 Preview

> Add screenshots here.

| Home                | Catalog                | Product                | AI Assistant      |
| ------------------- | ---------------------- | ---------------------- | ----------------- |
| `preview-home.webp` | `preview-catalog.webp` | `preview-product.webp` | `preview-ai.webp` |

---

# ✨ Features

### 🛍️ E-commerce

- 👟 Sneaker catalog
- 🔍 Full-text product search
- 📂 Category filtering
- 📏 Size filtering
- 💰 Price filtering
- 📄 Pagination
- 🛒 Shopping cart
- 📦 Checkout form
- 📲 Telegram order notifications
- 👁️ Recently viewed products
- 📱 Fully responsive interface

### 🤖 AI Shopping Assistant

- Natural-language sneaker search
- Ukrainian-language customer communication
- Search by brand and model
- Search by size
- Search by gender
- Search by price
- Search by season/category
- Product availability lookup
- Product recommendations
- Direct links to matching products
- Product cards directly inside the chat
- Conversation context
- API-based product data
- Rate limiting to control AI API usage

### ⚙️ Automation

- Automatic supplier product synchronization
- Automatic MongoDB updates
- Automatic Algolia indexing
- GitHub Actions scheduled workflows

### 🔎 SEO

- Dynamic metadata
- Open Graph
- Twitter Cards
- Canonical URLs
- Dynamic sitemap
- robots.txt
- Schema.org structured data
- Dynamic product metadata

---

# 🤖 AI Shopping Assistant

Krossava includes an AI-powered shopping assistant that allows customers to search the product catalog using natural language.

For example:

```text
"Покажи чорні Nike 41 розміру на осінь"

"Мені потрібні жіночі New Balance до 2500 грн"

"Які є зимові Nike?"

"Покажи ще варіанти"
```

The assistant extracts search parameters from the customer's message and queries the real Krossava product catalog.

Example extracted parameters:

```json
{
  "query": "Nike Black",
  "size": "41",
  "gender": "",
  "category": "Термо",
  "minPrice": 0,
  "maxPrice": 999999,
  "page": 1
}
```

The AI never relies on generated product information. Product names, prices, available sizes, images, and product IDs are retrieved from the store API.

---

## 🧠 AI Architecture

```text
Customer
   │
   ▼
Next.js Chat UI
   │
   ▼
Express API
   │
   ├── Rate Limiting / Redis
   │
   ▼
n8n Webhook
   │
   ▼
AI Agent
   │
   ├── OpenAI
   │
   ├── Conversation Memory
   │
   └── AI Tools
   │        │
   │        ├── search_products
   │        ├── get_product_details
   │        ├── check_availability
   │        ├── get_store_info
   │        ├── create_order
   │        └── notify_admin
   │
   ▼
Krossava API
   │
   ├── Algolia
   ├── MongoDB
   └── Telegram
```

The AI Agent does not have direct access to the database. It communicates with the store through controlled API endpoints.

This keeps product information consistent with the actual catalog and prevents the assistant from inventing prices, sizes, or availability.

---

# 🔍 AI Product Search

The AI product search endpoint supports structured filters extracted from natural-language queries.

Supported parameters:

```text
query
size
gender
category
minPrice
maxPrice
page
sortOrder
limit
```

Example:

```http
GET /ai/products?query=Nike&size=41&category=Термо&page=1
```

The backend converts these parameters into Algolia search queries and filters.

Results returned to the AI are intentionally minimized:

```json
{
  "total": 24,
  "count": 6,
  "page": 1,
  "totalPages": 4,
  "products": []
}
```

This reduces unnecessary AI context and token consumption.

---

# 💬 Conversation Memory

The chatbot maintains conversation context using a session identifier.

This allows conversations such as:

```text
Customer:
Покажи Nike 41 розміру

AI:
Ось доступні варіанти...

Customer:
А чорні?

AI:
Ось чорні Nike 41 розміру...

Customer:
Ще варіанти

AI:
Ось наступні моделі...
```

The customer does not need to repeat all search parameters with every message.

---

# 🛡️ AI Rate Limiting

AI requests are rate-limited to prevent excessive API usage and abuse.

The backend uses **Redis** to track chat request limits.

```text
Customer
   ↓
Express
   ↓
Rate Limit Check
   ↓
n8n
   ↓
OpenAI
```

Requests are counted on the backend rather than relying only on client-side state, preventing users from bypassing limits simply by modifying browser storage.

---

# 🛠 Tech Stack

## Frontend

- **Next.js 16**
- **React 19**
- **TypeScript**
- **CSS Modules**
- **TanStack Query**
- **Axios**
- **Zustand**
- **Formik**
- **Yup**
- **React Hot Toast**
- **React Icons**
- **Swiper**

---

## Backend

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **Celebrate / Joi**
- **Redis**
- **Axios**
- **CORS**

---

## Search

- **Algolia Search**

Used for:

- Full-text product search
- Category filtering
- Size filtering
- Price filtering
- AI product search
- Pagination
- Price sorting

---

## AI & Automation

- **OpenAI**
- **n8n**
- **AI Agent**
- **Conversation Memory**
- **Tool Calling**
- **GitHub Actions**

---

## Deployment

- **Vercel** — frontend
- **Render** — backend
- **n8n Cloud** — AI workflows

---

# 📂 Project Structure

```text
Frontend
│
├── app/
│   ├── sneakers/
│   ├── cart/
│   ├── about/
│   └── ...
│
├── components/
│   ├── ChatBot/
│   ├── SneakerGrid/
│   ├── Filters/
│   ├── Cart/
│   └── ...
│
├── public/
│
└── src/
    ├── hooks/
    ├── lib/
    ├── store/
    └── types/


Backend
│
├── src/
│   ├── config/
│   │   ├── algolia.js
│   │   └── redis.js
│   │
│   ├── controllers/
│   ├── db/
│   ├── mappers/
│   ├── middlewares/
│   ├── models/
│   └── routers/
│
└── scripts/
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/RavemanThc/krossava-store.git
```

## Install Dependencies

```bash
npm install
```

## Start Frontend

```bash
npm run dev
```

## Start Backend

```bash
npm run dev
```

---

# 🔐 Environment Variables

Never commit real API keys or secrets to GitHub.

## Frontend

```env
NEXT_PUBLIC_API_URL=
```

## Backend

```env
PORT=

MONGODB_URL=

ALGOLIA_APP_ID=
ALGOLIA_ADMIN_KEY=
ALGOLIA_INDEX_NAME=

TG_API_KEY=
TG_ID=

N8N_CHATBOT_URL=

UPSTASH_REDIS_REST_URL=
```

---

# 🔄 Automatic Product Synchronization

Products are synchronized automatically using **GitHub Actions**.

Synchronization pipeline:

```text
Supplier XML Feed
       │
       ▼
Download & Parse XML
       │
       ▼
Normalize Products
       │
       ▼
MongoDB
       │
       ▼
Algolia Index
       │
       ▼
Updated Store Catalog
```

The process keeps product information, prices, sizes, and search data synchronized with the supplier catalog.

---

# 🔎 SEO

The project implements modern technical SEO practices.

### Metadata

- Dynamic Metadata API
- Product-specific metadata
- Open Graph
- Twitter Cards
- Canonical URLs

### Crawling & Indexing

- `robots.txt`
- Dynamic `sitemap.xml`
- Search-engine-friendly product URLs

### Structured Data

Schema.org structured data includes:

- `Organization`
- `OnlineStore`
- `Product`
- `BreadcrumbList`

---

# 📦 Main Functionality

Customers can:

- Browse the sneaker catalog
- Search for sneakers
- Filter by category
- Filter by size
- Filter by price
- View product details
- Select available sizes
- Add products to cart
- Manage cart quantities
- Submit orders
- Receive AI-powered product recommendations
- Search products using natural language

Store administrators receive order notifications through Telegram.

---

# 📱 Responsive Design

The application is optimized for:

- 💻 Desktop
- 📱 Tablet
- 📲 Mobile

The AI assistant is also available across screen sizes as a floating chat interface.

---

# ⚡ Performance

Implemented optimizations include:

- Next.js Image Optimization
- Lazy Loading
- Server Components
- Code Splitting
- WebP images
- Optimized fonts
- Paginated API responses
- Algolia-powered search
- Reduced AI tool responses
- Reduced AI context/token usage

---

# 🔒 Security & Reliability

The application includes:

- Environment-based secrets
- Backend request validation
- Joi validation
- CORS configuration
- AI request rate limiting
- Redis-backed rate-limit state
- Controlled AI tool access
- Server-side order processing
- Product data validation

The AI assistant cannot directly modify the product database and receives catalog information through predefined backend APIs.

---

# 📊 Lighthouse Goals

- ✅ Performance
- ✅ Accessibility
- ✅ Best Practices
- ✅ SEO

---

# 📈 Future Improvements

- User authentication
- Wishlist
- Product reviews
- Favorites
- Online payment integration
- Admin dashboard
- Personalized recommendations
- AI recommendation improvements
- Order tracking
- Product comparison

---

# 🎯 Project Goals

Krossava was built not only as an online store, but as a full-stack production-oriented project demonstrating:

- Modern React / Next.js development
- REST API architecture
- Database design
- Search engine integration
- AI tool calling
- Workflow automation
- Redis-based rate limiting
- Third-party API integration
- E-commerce architecture
- SEO optimization
- Deployment and production infrastructure

---

# 📜 License

This project was created for commercial and portfolio purposes.

---

# 👨‍💻 Author

**Vlad Harkusha**

GitHub: https://github.com/RavemanThc

Website: https://krossava.com.ua
