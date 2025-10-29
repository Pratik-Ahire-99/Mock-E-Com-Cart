import React from "react";

export default function Cart({
  cart = { items: [], total: 0 },
  onRemove,
  onQtyChange,
  onCheckoutStart,
}) {
  return (
    <aside className="cart flex flex-col rounded-3xl bg-[#FFF8F2] shadow-md p-6">
      <h2 className="text-2xl font-bold text-[#181716] mb-4">🛍️ Your Cart</h2>

      {cart.items.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-500 italic">
          Your cart is empty.
        </div>
      ) : (
        <>
          <ul className="flex-1 space-y-4 overflow-y-auto pr-2">
            {cart.items.map((it) => (
              <li
                key={it.id}
                className="flex items-center justify-between bg-white rounded-2xl shadow-sm p-4 hover:shadow-md transition-all duration-200 border border-[ #0a0a0aff]"
              >
                {/* Image + meta */}
                <div className="flex items-center space-x-4">
                  <img
                    src={it.image || "/placeholder.png"}
                    alt={it.name}
                    className="w-16 h-16 object-cover rounded-xl border border-[ #060606ff]"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-[#181716]">
                      {it.name}
                    </h3>
                    <div className="text-[#28A745] font-medium">
                      ₹{it.price.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center space-x-3">
                  <input
                    type="number"
                    min="1"
                    value={it.qty}
                    onChange={(e) => onQtyChange(it.id, Number(e.target.value))}
                    className="w-16 rounded-lg border border-[ #0a0a09ff] px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-[#FF9900]/50"
                  />
                  <button
                    onClick={() => onRemove(it.id)}
                    className="bg-[#FF9900] hover:bg-[#FFC300] active:scale-95"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* Total + checkout */}
          <div className="mt-6 border-t border-[#FFD8A8] pt-4 flex flex-col space-y-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span className="text-[#28A745]">
                ₹{cart.total.toFixed(2)}
              </span>
            </div>
            <button
              onClick={onCheckoutStart}
              className="w-full bg-[#FF9900] hover:bg-[#FFC300] text-white font-semibold py-3 rounded-2xl shadow-md transition-all duration-200 active:scale-[0.98]"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </aside>
  );
}
