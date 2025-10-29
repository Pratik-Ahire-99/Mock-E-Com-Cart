const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

export async function getProducts() {
  const res = await fetch(`${API_BASE}/products`);
  if (!res.ok) throw new Error('Failed to load products');
  return res.json();
}

export async function getCart() {
  const res = await fetch(`${API_BASE}/cart`);
  if (!res.ok) throw new Error('Failed to load cart');
  return res.json();
}

export async function addToCart(productId, qty = 1) {
  const res = await fetch(`${API_BASE}/cart`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, qty })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Add to cart failed');
  }
  return res.json();
}

export async function removeFromCart(id) {
  const res = await fetch(`${API_BASE}/cart/${id}`, { method: 'DELETE' });
  if (res.status === 204) return true;
  const err = await res.json();
  throw new Error(err.error || 'Remove failed');
}

export async function updateCartItem(id, qty) {
  const res = await fetch(`${API_BASE}/cart/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ qty })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Update failed');
  }
  return res.json();
}

export async function checkout(name, email) {
  const res = await fetch(`${API_BASE}/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Checkout failed');
  }
  return res.json();
}
