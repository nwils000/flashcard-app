import React, { useState } from "react";

export default function FlashcardList() {
  const [flashcards, setFlashcards] = useState([
    {
      question: "What is 2 + 2",
      answer: "4",
      options: ["1", "2", "3", "4"],
    },
    {
      question: "Who was the first US president",
      answer: "George Washington",
      options: [
        "Paule Revere",
        "Abraham Lincoln",
        "Barack Obama",
        "George Washington",
      ],
    },
  ]);
  return (
    <>
      <div>
        <form>
          <div>
            <label htmlFor="category">Category</label>
            <select id="category">
              <option value="cateogry title">categories</option>
            </select>
          </div>
          <div>
            <label htmlFor="amount">Number of Questions</label>
            <input
              type="number"
              id="amount"
              min="1"
              max="99"
              step="1"
              defaultValue={10}
            />
          </div>
        </form>
        <div>
          <button>Generate</button>
        </div>
      </div>
      <div>{/* Insert flashcards */}</div>
    </>
  );
}
