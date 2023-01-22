import React from "react";

export default function Flashcard({ flashcard }) {
  return (
    <div>
      <div>
        {flashcard.question}
        <div>
          {flashcard.options.map((option) => {
            return <div key={option}>{option}</div>;
          })}
        </div>
      </div>
      <div>{flashcard.answer}</div>
    </div>
  );
}
