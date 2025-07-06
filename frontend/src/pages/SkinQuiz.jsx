import React, { useState, useContext } from "react";
import ProductItem from "../components/ProductItem";
import { ShopContext } from "../context/ShopContext";

const questions = [
  {
    question: "How would you describe your skin type?",
    options: ["Oily", "Dry", "Combination", "Sensitive", "Normal"],
  },
  {
    question: "What is your primary skin concern?",
    options: [
      "Acne or breakouts",
      "Pigmentation or dullness",
      "Signs of aging or uneven texture",
      "Dryness and flakiness",
      "Tan and sun damage",
    ],
  },
  {
    question: "What texture do you prefer in your skincare?",
    options: [
      "Lightweight and gel-based",
      "Nourishing oils",
      "Creamy and rich",
      "Powder-based masks",
      "Scrubs or exfoliating formulas",
    ],
  },
  {
    question: "How often do you use face masks or scrubs?",
    options: [
      "Never",
      "Occasionally (once a week)",
      "Regularly (2–3 times a week)",
    ],
  },
  {
    question: "Do you spend a lot of time outdoors or in the sun?",
    options: ["Yes", "No", "Sometimes"],
  },
];

const results = {
  A: {
    title: "🧴 Oily or Acne-Prone Skin",
    products: [
      "Salicylic Acid Serum",
      "Activated Charcoal Face Pack",
      "Rice Water Scrub",
    ],
  },
  B: {
    title: "🍊 Dry, Dull Skin Needing Hydration",
    products: ["Vitamin C Serum", "Moisturizer", "Coffee Scrub"],
  },
  C: {
    title: "🌺 Mature or Uneven Textured Skin",
    products: ["Kumkumadi Serum", "Multani Mitti Face Pack", "Moisturizer"],
  },
  D: {
    title: "🌾 Sensitive or Combination Skin",
    products: ["Rice Water Scrub", "Kumkumadi Serum", "Moisturizer"],
  },
  E: {
    title: "☀️ Normal Skin with Occasional Tan",
    products: ["Sunscreen", "Vitamin C Serum", "Coffee Scrub"],
  },
};

const SkinQuiz = () => {
  const { products } = useContext(ShopContext);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qIndex, optIndex) => {
    const letter = String.fromCharCode(65 + optIndex);
    const newAnswers = [...answers];
    newAnswers[qIndex] = letter;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    if (answers.includes("")) {
      alert("Please answer all questions.");
      return;
    }
    setSubmitted(true);
  };

  const resetQuiz = () => {
    setAnswers(Array(questions.length).fill(""));
    setSubmitted(false);
  };

  const calculateResult = () => {
    const counts = {};
    answers.forEach((a) => {
      counts[a] = (counts[a] || 0) + 1;
    });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const topAnswer = sorted[0][0];
    return results[topAnswer];
  };

  const extractKeywords = (phrases) => {
    return phrases.flatMap(
      (p) =>
        p
          .split(/[\s–(),.]+/) // split on space or punctuation
          .map((word) => word.toLowerCase().trim())
          .filter((w) => w.length > 3) // ignore short words like "the", "or"
    );
  };

  const result = submitted ? calculateResult() : null;

  const matchedProducts =
    submitted && result
      ? products
          .filter((item) => {
            const name = item.name.toLowerCase();
            const keywords = extractKeywords(result.products);
            return keywords.some((word) => name.includes(word));
          })
          .slice(0, 3)
      : [];

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6  bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">
        🌿 Find Your Skincare Match
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Answer the questions below to know which products are perfect for your
        skin needs.
      </p>

      {!submitted ? (
        <div className="space-y-6">
          {questions.map((q, qIdx) => (
            <div key={qIdx}>
              <h3 className="font-semibold mb-2">
                {qIdx + 1}. {q.question}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt, optIdx) => {
                  const selected =
                    answers[qIdx] === String.fromCharCode(65 + optIdx);
                  return (
                    <button
                      key={optIdx}
                      className={`py-2 px-4 border rounded-lg text-left transition ${
                        selected
                          ? "bg-green-100 border-green-400 text-green-800 font-semibold"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => handleSelect(qIdx, optIdx)}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            Submit Quiz
          </button>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-semibold mb-3">{result?.title}</h3>
          <ul className="list-disc list-inside space-y-2 mb-4">
            {result?.products.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>

          <div className="text-sm text-gray-600 mb-4">
            💡 Tips:
            <ul className="list-disc ml-5 mt-2">
              <li>
                Use serums daily, scrubs 2–3x a week, and masks 1–2x a week.
              </li>
              <li>Always follow serums and scrubs with a moisturizer.</li>
              <li>Don’t skip sunscreen, even on cloudy days.</li>
            </ul>
          </div>

          {matchedProducts.length > 0 && (
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-3">
                🛍 Recommended Products in Our Store
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {matchedProducts.map((item) => (
                  <ProductItem
                    key={item._id}
                    name={item.name}
                    id={item._id}
                    price={item.price}
                    image={item.image}
                  />
                ))}
              </div>
            </div>
          )}

          <button
            onClick={resetQuiz}
            className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Retake Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default SkinQuiz;
