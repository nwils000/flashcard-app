import React, { useState, useEffect, useRef } from "react";
import Flashcard from "./Flashcard";
import axios from "axios";

export default function FlashcardList() {
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);

  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((res) => {
      setCategories(res.data.trivia_categories);
    });
  });

  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .get("https://opentdb.com/api.php", {
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value,
        },
      })
      .then((res) => {
        setFlashcards(
          res.data.results.map((questionItem, index) => {
            const answer = decodeString(questionItem.correct_answer);
            const options = [
              ...questionItem.incorrect_answers.map((a) => decodeString(a)),
              answer,
            ];
            return {
              id: `${index}-${Date.now()}`,
              question: decodeString(questionItem.question),
              answer: answer,
              options: options.sort(() => Math.random() - 0.5),
            };
          })
        );
      });
  }

  return (
    <>
      <div className="form-container">
        <form className="header">
          <div className="form-group">
            <label className="label" htmlFor="category">
              Category
            </label>
            <select
              className="input input-category"
              id="category"
              ref={categoryEl}
            >
              {categories.map((category) => {
                return (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label className="label" htmlFor="amount">
              Number of Questions
            </label>
            <input
              className="input input-number-of-questions"
              type="number"
              id="amount"
              min="1"
              max="99"
              step="1"
              defaultValue={10}
              ref={amountEl}
            />
          </div>
        </form>
        <div className="button-container">
          <button className="button" onClick={handleSubmit}>
            Generate
          </button>
        </div>
      </div>
      <div className="card-grid">
        {flashcards.map((flashcard) => {
          return <Flashcard flashcard={flashcard} key={flashcard.id} />;
        })}
      </div>
    </>
  );
}
