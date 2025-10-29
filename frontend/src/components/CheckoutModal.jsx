import React, { useState } from 'react';

export default function CheckoutModal({ onSubmit, receipt, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // If receipt is passed, show it
  if (receipt) {
    return (
      <div className="modal fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="modal-content bg-[#FFF4EC] p-8 rounded-2xl shadow-xl  max-w-sm">
          <h3 className="text-2xl font-semibold text-[#181716] mb-4">Receipt</h3>
          <div className="text-left text-[#181716] space-y-2">
            <div>
              <strong className="text-[#28A745]">Receipt ID:</strong> {receipt.id}
            </div>
            <div>
              <strong className="text-[#28A745]">Name:</strong> {receipt.name}
            </div>
            <div>
              <strong className="text-[#28A745]">Email:</strong> {receipt.email}
            </div>
            <div>
              <strong className="text-[#28A745]">Total:</strong> ₹{receipt.total.toFixed(2)}
            </div>
            <div>
              <strong className="text-[#28A745]">Time:</strong> {receipt.timestamp}
            </div>
          </div>

          <button
            onClick={onClose}
            className="mt-6 bg-[#FF9900] hover:bg-[#FFC300] text-white font-semibold px-6 py-2 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // Checkout form
  return (
    <div className="modal fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="modal-content bg-[#FFF4EC] p-8 rounded-2xl shadow-xl  max-w-sm">
        <h3 className="text-2xl font-semibold text-[#181716] mb-6 text-center">Checkout</h3>

        <div className="space-y-4">
          <label className="block text-[#181716] font-medium">
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#FF9900] outline-none"
            />
          </label>

          <label className="block text-[#181716] font-medium">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#FF9900] outline-none"
            />
          </label>
        </div><br></br>

        <div className="modal-actions flex justify-between mt-6">
          <button
            onClick={() => onSubmit(name, email)}
            className="bg-[#28A745] hover:bg-green-600 text-white px-6 py-2 rounded-xl font-semibold transition-colors"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="bg-[#FF3366] hover:bg-red-500 text-white px-6 py-2 rounded-xl font-semibold transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
