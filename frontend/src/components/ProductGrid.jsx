import React from "react";

export default function ProductGrid({ products = [], onAdd, loading }) {
  return (
    <section className="products flex flex-col items-center">
      {/* Centered title */}
      <h2 className="text-2xl font-semibold text-[#181716] mb-6 text-center">
        🛍️ Our Products
      </h2>

      {/* Centered, fixed-width container */}
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {products.map((p) => (
            <div
              key={p.id}
              className="w-full max-w-[260px] bg-white rounded-3xl shadow-md border border-[#FFD8A8] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Product image */}
              <div className="relative h-44 overflow-hidden rounded-t-3xl">
                <img
                  src={p.image || "/placeholder.png"}
                  alt={p.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Product info */}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-[#181716] truncate">
                    {p.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {p.description}
                  </p>
                </div>

                {/* Price & button */}
                <div className="flex items-center justify-between">
                  <span className="text-[#28A745] font-bold text-base">
                    ₹{p.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => onAdd(p.id)}
                    disabled={loading}
                    className={`px-4 py-1.5 rounded-full text-white font-semibold text-sm transition-all duration-300 ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#FF9900] hover:bg-[#FFC300] active:scale-95"
                    }`}
                  >
                    {loading ? "Adding..." : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
