import { useState } from "react";
import backendUrl from "../App";
export default function PaymentForm() {
  const [amount, setAmount] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      order_id: `ORDER${Date.now()}`,
      amount,
      currency: "INR",
      redirect_url: "https://your-site.com/payment-success",
      cancel_url: "https://your-site.com/payment-cancel",
      language: "en",
    };

    try {
      const res = await fetch(`${backendUrl}/api/order/ccavenue`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const html = await res.text();

      // Replace current page with the form that auto-submits to CCAvenue
      const newWindow = window.open();
      newWindow.document.open();
      newWindow.document.write(html);
      newWindow.document.close();
    } catch (err) {
      console.error("Payment initiation failed", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto p-4 bg-white rounded shadow"
    >
      <h2 className="text-xl font-semibold mb-2">Make a Payment</h2>

      <label className="block">
        <span className="text-gray-700">Amount</span>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded p-2"
        />
      </label>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Pay Now
      </button>
    </form>
  );
}
