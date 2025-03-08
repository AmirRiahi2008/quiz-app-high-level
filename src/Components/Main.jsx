import { useState, useEffect } from "react";
import Header from "./Header";
import ThemeSwitcher from "./ThemeSwitcher";
import AllTopics from "./AllTopics";
import Question from "./Question";
export default function Main() {
  const choices = [
    { id: 1, name: "HTML", icon: "./assets/images/icon-html.svg" },
    { id: 2, name: "CSS", icon: "./assets/images/icon-css.svg" },
    {
      id: 3,
      name: "JavaScript",
      icon: "./assets/images/icon-js.svg",
    },
    {
      id: 4,
      name: "Accessibility",
      icon: "./assets/images/icon-accessibility.svg",
    },
  ];
  const [selectedTopic, setSelectedTopic] = useState("");

  function handleClickTopic(name) {
    setSelectedTopic(name);
  }
  const findSelectedTopic = choices.find((c) => c.name === selectedTopic);
 
  return (
    <>
      <main>
        <article className="row-top">
          {selectedTopic ? (
            <>
              <div className="curr-subject" style={{ visibility: "visible" }}>
                <div className="button-icon-container">
                  <img
                    className="subject-img"
                    src={findSelectedTopic.icon}
                    alt="subject icon"
                  />
                </div>

                <h2 className="subject-chosen">{findSelectedTopic.name}</h2>
              </div>
              <ThemeSwitcher />
            </>
          ) : (
            <>
              <div className="curr-subject">
                <div className="button-icon-container">
                  <img
                    className="subject-img"
                    src="../../public/assets/images/icon-css.svg"
                    alt="subject icon"
                  />
                </div>

                <h2 className="subject-chosen">some Subject</h2>
              </div>
              <ThemeSwitcher />
            </>
          )}
        </article>
        {selectedTopic ? (
          <Question
          
            selectedTopic={selectedTopic}
            choices={choices}
          />
        ) : (
          <article className={`start-menu`}>
            <Header />

            <AllTopics choices={choices} handleClickTopic={handleClickTopic} />
          </article>
        )}
      </main>
    </>
  );
}
