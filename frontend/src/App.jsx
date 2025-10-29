import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import {
  getProducts,
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  checkout,
} from "./api";
import ProductGrid from "./components/ProductGrid";
import Cart from "./components/Cart";
import CheckoutModal from "./components/CheckoutModal";

function AppContent() {
  const navigate = useNavigate(); // ✅ define navigate
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [error, setError] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);

  async function loadProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (e) {
      setError(e.message);
    }
  }

  async function loadCart() {
    try {
      const data = await getCart();
      setCart(data);
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    loadProducts();
    loadCart();
  }, []);

  async function handleAdd(id) {
    setLoading(true);
    setError("");
    try {
      await addToCart(id, 1);
      await loadCart();
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }

  async function handleRemove(cartId) {
    setError("");
    try {
      await removeFromCart(cartId);
      await loadCart();
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleQtyChange(cartId, qty) {
    setError("");
    try {
      await updateCartItem(cartId, qty);
      await loadCart();
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleCheckout(name, email) {
    setError("");
    try {
      const res = await checkout(name, email);
      setReceipt(res.receipt);
      await loadCart();
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF4EC] text-[#181716] flex flex-col">
      {/* Header */}
      
      <div className="container mx-auto flex justify-between items-center px-6">
        <header className="py-5 shadow-sm bg-[#FFF4EC]">
          <h1 className="text-3xl font-bold text-center text-[#181716]">
            🛍️ Nexora
          </h1>
            <p className="p-6 text-center text-[#656565] text-sm">
              Experience seamless shopping with style ✨
            </p>
        </header>

          <nav className="flex items-center gap-x-12 py-4">
            <button
              onClick={() => navigate("/")}
              className="bg-[#FF9900] text-black px-5 py-2 rounded-full font-medium hover:bg-[#FFC300] transition-all duration-300 active:scale-95"
            >
              Products
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="relative bg-[#FF9900] text-black px-5 py-2 rounded-full font-medium hover:bg-[#FFC300] transition-all duration-300 active:scale-95 flex items-center gap-2"
            >
               🛒Cart  
              {cart.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF3366] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {cart.items.length}
                </span>
              )}
            </button>
          </nav>
        </div>
      

      
      {/* Main content */}
<main className="flex-1 flex justify-center items-center container mx-auto px-6 py-6">
  <div className="w-full max-w-7xl">
    {error && (
      <div className="p-3 rounded-md bg-[#FF3366]/10 border border-[#FF3366] text-[#FF3366] text-center mb-4">
        {error}
      </div>
    )}

    <Routes>
      <Route
        path="/"
        element={
          <ProductGrid
            products={products}
            onAdd={handleAdd}
            loading={loading}
          />
        }
      />
      <Route
        path="/cart"
        element={
          <Cart
            cart={cart}
            onRemove={handleRemove}
            onQtyChange={handleQtyChange}
            onCheckoutStart={() => setShowCheckout(true)}
          />
        }
      />
    </Routes>
  </div>
</main>


      {/* Checkout Modal */}
      {showCheckout && (
        <CheckoutModal
          onSubmit={handleCheckout}
          receipt={receipt}
          onClose={() => {
            setShowCheckout(false);
            setReceipt(null);
          }}
        />
      )}

      {/* Footer */}
      <footer className="py-4 bg-[#181716] text-center text-[#FFF4EC] text-sm rounded-t-3xl">
        Demo assignment — mock checkout only.
      </footer>
    </div>
  );
}

// ✅ Wrap AppContent in Router here
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
