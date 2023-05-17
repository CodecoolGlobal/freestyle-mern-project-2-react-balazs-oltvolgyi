import React from "react";
import practice from "../../src/practice.png";
import quizMode from "../../src/quiz.png";

function ChooseGame(props) {
  const setScreen = props.setScreen;

  return (
    <div className="chooseGame">
      <h1 className="gameMode">Choose your Game Mode</h1>
      <div className="chooseGameMode">
        <div>
          <img
            className="gameMode1"
            src={quizMode}
            onClick={() => {
              setScreen("quiz");
            }}
          />
          <p className="gmlabel">Quiz Mode with 4 possible answer</p>
        </div>
        <div>
          <img
            className="gameMode2"
            src={practice}
            onClick={() => {
              setScreen("game");
            }}
          />
          <p className="gmlabel">Practice Mode with list</p>
        </div>
      </div>
    </div>
  );
}

export default ChooseGame;
