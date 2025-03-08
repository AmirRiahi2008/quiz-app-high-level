import React from "react";

export default function Option({
  content,
  id,
  isSelected,
  onClick,
  isDisableOption,
  invalid,
  correct,
}) {
  return (
    <button
      id={id}
      className={`option ${isSelected ? "selected" : ""} ${
        invalid ? "invalid" : ""
      } ${correct ? "correct" : ""}`}
      onClick={(e) => onClick(id, e)}
      disabled={isDisableOption}
    >
      <div
        className={`option-box ${invalid ? "invalid-box" : ""} ${
          correct ? "correct-box" : ""
        }`}
      >
        {id}
      </div>
      {content}
    </button>
  );
}
