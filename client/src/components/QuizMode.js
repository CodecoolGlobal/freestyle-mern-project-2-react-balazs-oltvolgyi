import React, { useState, useEffect } from "react";

function QuizMode(props) {
  const user = props.user;
  const data = props.data;
  const setScreen = props.setScreen;
  const setSortedUsers = props.setSortedUsers;
  const [randomCountry, setRandomCountry] = useState();
  const [fourCountryName, setFourCountryName] = useState([]);

  function randomFourNumbers() {
    return Math.floor(Math.random() * 4);
  }

  function randomFlagAndNames() {
    if (data.length > 0) {
      let randNum = Math.floor(Math.random() * data.length);
      setRandomCountry(data[randNum]);
    }
  }

  useEffect(() => {
    randomFlagAndNames();
  }, []);

  return (
    randomCountry && (
      <div className="quizMain">
        <h1>Flag of ...</h1>
        <div>
          <img className="quizFlag" src={randomCountry.flag} />
        </div>
        <div className="firstrow">
          <div></div>
          <div></div>
        </div>
        <div className="secondRow">
          <div></div>
          <div></div>
        </div>
      </div>
    )
  );
}

export default QuizMode;
