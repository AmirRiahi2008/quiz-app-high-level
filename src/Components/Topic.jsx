import React from "react";

export default function Topic({ index, name, icon ,handleClickTopic}) {
  return (
    <button id={`${name}`} className="quiz-type" onClick={() => handleClickTopic(name)}>
      <div className="button-icon-container">
        <img src={icon} alt={`${name.toLowerCase()} icon`} />
      </div>
      {name}
    </button>
  );
}
