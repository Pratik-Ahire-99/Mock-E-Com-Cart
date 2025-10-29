# Mock E-Com Cart — Full Stack Assignment

Simple full-stack shopping cart app for Vibe Commerce screening.

## Tech
- Backend: Node.js + Express + SQLite (better-sqlite3)
- Frontend: React (Vite)
- REST APIs: GET/POST/DELETE/PATCH endpoints for products & cart + checkout (mock)

## Run locally Clone the repository
## bash
git clone https://github.com/Pratik-Ahire-99/Mock-E-Com-Cart.git
cd Mock-E-Com-Cart

### Backend
1. `cd backend`
2. `npm install`
3. `npm run dev` (or `npm start`)
4. Backend runs at `http://localhost:4000`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`
4. Open the URL shown (default `http://localhost:5173`)

> Ensure backend is running before using the frontend app.

## Deliverables
- `/backend` — API & SQLite DB
- `/frontend` — React app
- README + demo script
- 1–2 min demo video

## 📸 Screenshots
# 🏠 Home Page
- Mock-E-Com-Cart\screenshots\Home.png

# 🛒 Cart Page
- Mock-E-Com-Cart\screenshots\cart.png

# Check Out Form
- Mock-E-Com-Cart\screenshots\checkoutForm.png

# Recipt 
- Mock-E-Com-Cart\screenshots\submitForm.png

### 🎥 Demo Video
- https://youtu.be/i_DX1ycEejA

### 🧾 API Endpoints

| Method | Endpoint        | Description                          |
| ------ | --------------- | ------------------------------------ |
| GET    | `/api/products` | Fetch all products                   |
| GET    | `/api/cart`     | Get cart items                       |
| POST   | `/api/cart`     | Add product to cart                  |
| PUT    | `/api/cart/:id` | Update cart quantity                 |
| DELETE | `/api/cart/:id` | Remove item from cart                |
| POST   | `/api/checkout` | Complete checkout and return receipt |

### 🧑‍💻 Author

👤 Pratik Ahire
📧 Feel free to connect for collaboration or feedback!

⭐ If you like this project, don’t forget to star it on GitHub! ⭐