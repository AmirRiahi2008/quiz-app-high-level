import { useState, useEffect } from "react";
import questions from "../data/data.json";
import Option from "./Option";
import Score from "./Score";

export default function Question({ selectedTopic, choices }) {
  
  const [curQuestionNumber, setCurQuestionNumber] = useState(0);
  const [questionText, setQuestionText] = useState("");
  const [questionOptions, setQuestionOptions] = useState([]);
  const [questionAnswer, setQuestionAnswer] = useState("");
  const [selectedOptionID, setSelectedOptionID] = useState(null);
  const [selectedOptionValue, setSelectedOptionValue] = useState("");
  const [isDisableOption, setIsDisableOption] = useState(false);
  const [optionsEls, setOptionsEls] = useState([
    { id: "A", invalid: false, correct: false },
    { id: "B", invalid: false, correct: false },
    { id: "C", invalid: false, correct: false },
    { id: "D", invalid: false, correct: false },
  ]);
  const [score, setScore] = useState(0);
  const [submitBtnValue, setSubmitBtnValue] = useState("Submit Answer");
  const [clickCountSubmitBtn, setClickCountSubmitBtn] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false); 
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false); 
  const findSelectedQuestionsData = questions.quizzes.find(
    (q) => q.title === selectedTopic
  );
  const [selectedTopicIcon, setSelectedTopicIcon] = useState(
    choices.find((c) => c.name === selectedTopic)
  );

  useEffect(() => {
    if (findSelectedQuestionsData && findSelectedQuestionsData.questions) {
      const questionData =
        findSelectedQuestionsData.questions[curQuestionNumber];

      if (questionData) {
        const { question, answer, options } = questionData;

        setQuestionText(question);
        setQuestionOptions(options);
        setQuestionAnswer(answer);

        setOptionsEls([
          { id: "A", invalid: false, correct: false },
          { id: "B", invalid: false, correct: false },
          { id: "C", invalid: false, correct: false },
          { id: "D", invalid: false, correct: false },
        ]);
        setIsDisableOption(false);
        setSelectedOptionID(null);
        setSelectedOptionValue("");
        setSubmitBtnValue("Submit Answer");
      }
    }
  }, [curQuestionNumber, findSelectedQuestionsData]);

  const handleClickOption = (id, e) => {
    setSelectedOptionID(id);
    setSelectedOptionValue(e.target.textContent.slice(1));
  };

  function handleSubmitAnswer() {
    if (!selectedOptionValue) {
      alert("Please select an option 😎");
      return;
    }
    setIsDisableOption(true);

    const isCorrect = selectedOptionValue === questionAnswer;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    const updatedOptions = optionsEls.map((o) => {
      const isSelected = o.id === selectedOptionID;
      const isCorrectOption =
        questionOptions[o.id.charCodeAt(0) - 65] === questionAnswer;

      return {
        ...o,
        correct: isCorrectOption,
        invalid: !isCorrectOption,
      };
    });

    setOptionsEls(updatedOptions);
    setSubmitBtnValue("Next Question ->");
    setClickCountSubmitBtn((prev) => prev + 1);
  }

  function handleNextQuestion() {
    if (curQuestionNumber + 1 >= findSelectedQuestionsData.questions.length) {
      setIsQuizFinished(true);
      setSubmitBtnValue("Finish Quiz");
    } else {
      setClickCountSubmitBtn(0);
      setCurQuestionNumber((prev) => prev + 1);
      setSubmitBtnValue("Submit Answer");
    }
  }

  function handleClicksSubmitBtn() {
    

    if (clickCountSubmitBtn === 0) {
      handleSubmitAnswer();
    } else {
      handleNextQuestion();
    }
  }


  return (
    <>
      {isQuizFinished ? (
        <Score
          score={score}
          selectedTopic={selectedTopic}
          selectedTopicIcon={selectedTopicIcon}
        />
      ) : (
        <article className="question-screen">
          <div className="left-content">
            <div className="question-wrapper">
              <p className="question-count">
                Question{" "}
                <span className="question-number">{curQuestionNumber + 1}</span>{" "}
                of
                <span className="question-total">
                  {" "}
                  {findSelectedQuestionsData.questions.length}
                </span>
              </p>
              <h2 className="question">{questionText}</h2>
            </div>
            <div className="progress-bar whole">
              <div
                className="progress-bar done"
                style={{ width: `${(curQuestionNumber + 1) * 10}%` }}
              ></div>
            </div>
          </div>

          <div className="choices options">
            {questionOptions.map((o, i) => (
              <Option
                key={i}
                id={optionsEls[i].id}
                invalid={optionsEls[i].invalid}
                correct={optionsEls[i].correct}
                content={o}
                isSelected={selectedOptionID === optionsEls[i].id}
                onClick={handleClickOption}
                isDisableOption={isDisableOption}
              />
            ))}

            <button className="submit-answer" onClick={handleClicksSubmitBtn}>
              {submitBtnValue}
            </button>
            <div className="select-prompt">
              <img src="./assets/images/icon-error.svg" alt="error icon" />
              <p className="select-prompt-text">Please select an answer</p>
            </div>
          </div>
        </article>
      )}
    </>
  );
}
