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
      "Dynamic Duo Face Serum",
      "Carbon Detox Face Pack",
      "Rice Revive Scrub",
    ],
  },
  B: {
    title: "🍊 Dry, Dull Skin Needing Hydration",
    products: ["Aquavita Bloom Face serum", "Ginseng Gold Moisturizer", "Coffee Crush Scrub"],
  },
  C: {
    title: "🌺 Mature or Uneven Textured Skin",
    products: [
      "Radiant Royale Face Serum",
      "Multani Mitti Face Pack",
      "Ginseng Gold Moisturizer",
    ],
  },
  D: {
    title: "🌾 Sensitive or Combination Skin",
    products: ["Rice Revive Scrub", "Radiant Royale Face Serum", "Ginseng Gold Moisturizer"],
  },
  E: {
    title: "☀️ Normal Skin with Occasional Tan",
    products: ["Sunny Side Sunscreen", "Aquavita Bloom Face Serum", "Coffee Crush Scrub"],
  },
};

const SkinQuiz = () => {
  const { products } = useContext(ShopContext);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [submitted, setSubmitted] = useState(false);
  let SuggestedPro = []

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






  const mostFeq = (answer) =>{
  let res = null;

  for(let i = 0; i <= answers.length; i++ ){
    for(let j = i+1; j< answer.length; j++){
      if(answer[i]==answers[j]){
        res = answer[i]
      }
    }
  }
  return res;
}

const ans = mostFeq(answers)


const findProd = () => {
  if (!ans || !results?.[ans]?.products || !products) return;

  const matchedIds = new Set(); 

  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    const productName = product?.name?.toLowerCase();

    for (let j = 0; j < results[ans].products.length; j++) {
      const keyword = results[ans].products[j]?.toLowerCase();
      

      if(productName.includes(keyword)){
        SuggestedPro.push(products[i])
      }

    }
  }
};


  findProd()

  const result = submitted ? findProd : null;
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
            className="mt-6 font-bold w-full bg-[#ff8787] text-white py-3 rounded-lg hover:bg-[#ff8787]/90"
          >
            Submit Quiz
          </button>
        </div>
      ) : (
        <div>
          <h3 className="text-xl font-semibold mb-3">{results?.[ans]?.title}</h3>
          <ul className="list-disc list-inside space-y-2 mb-4">
            {results?.[ans]?.products.map((p, i) => (
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

          {SuggestedPro.length > 0 && (
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-3">
                🛍 Recommended Products in Our Store
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {SuggestedPro.map((item) => (
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

