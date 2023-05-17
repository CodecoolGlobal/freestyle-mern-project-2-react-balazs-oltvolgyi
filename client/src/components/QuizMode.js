import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function QuizMode(props) {
  const user = props.user;
  const data = props.data;
  const setScreen = props.setScreen;
  const setSortedUsers = props.setSortedUsers;
  const [randomCountry, setRandomCountry] = useState();
  const [fourCountryName, setFourCountryName] = useState([]);
  const [quizScore, setQuizScore] = useState(0);
  const [answerNumber, setAnswerNumber] = useState(4);

  function randomNumber(number) {
    return Math.floor(Math.random() * number);
  }

  function randomFlagAndName() {
    setRandomCountry(data[randomNumber(data.length)]);
  }

  async function updateUserScore() {
    try {
      const res = await fetch("http://localhost:3001/api/score", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: user.name, score: quizScore }),
      });
      const data = await res.json();
      //console.log(data);
      setSortedUsers(data);
      setScreen("leaderboard");
    } catch (error) {
      console.error("Something went wrong!");
    }
  }

  function selectCountry(answer) {
    console.log(answer);
    if (answer === randomCountry.name) {
      setQuizScore(quizScore + 5);
      toast.success("You're right! Next round!", {
        theme: "colored",
        autoClose: 2000,
      });
      randomFlagAndName();
    } else {
      toast.error(`The solution was ${randomCountry.name}`, {
        theme: "colored",
        autoClose: 2000,
      });
      randomFlagAndName();
    }
  }

  function setCountryOptions() {
    let countryNames = [];
    for (let x = 0; x < answerNumber; x++) {
      let temp = data[randomNumber(data.length)].name;
      if (countryNames.includes(temp)) {
        while (!countryNames.includes(temp)) {
          temp = data[randomNumber(data.length)].name;
        }
      } else {
        countryNames.push(temp);
      }
    }
    countryNames[randomNumber(answerNumber)] = randomCountry.name;
    setFourCountryName(countryNames);
  }

  useEffect(() => {
    randomFlagAndName();
  }, []);

  useEffect(() => {
    console.log(randomCountry);
    randomCountry && setCountryOptions();
  }, [randomCountry]);

  return (
    randomCountry &&
    fourCountryName && (
      <div className="quizMain">
        <h1 className="title">Flag of ...</h1>
        <div className="flagContainer">
          <img className="quizFlag" src={randomCountry.flag} />
        </div>
        <div className="firstRow">
          <div className="answer">
            <button
              className="finishButton"
              key={1}
              value={fourCountryName[0]}
              onClick={(e) => selectCountry(e.target.value)}
            >
              {fourCountryName[0]}
              <span></span>
            </button>
          </div>
          <div className="answer">
            <button
              className="finishButton"
              key={2}
              value={fourCountryName[1]}
              onClick={(e) => selectCountry(e.target.value)}
            >
              {fourCountryName[1]}
              <span></span>
            </button>
          </div>
        </div>
        <div className="secondRow">
          <div className="answer">
            <button
              className="finishButton"
              key={3}
              value={fourCountryName[2]}
              onClick={(e) => selectCountry(e.target.value)}
            >
              {fourCountryName[2]}
              <span></span>
            </button>
          </div>
          <div className="answer">
            <button
              className="finishButton"
              key={4}
              value={fourCountryName[3]}
              onClick={(e) => selectCountry(e.target.value)}
            >
              {fourCountryName[3]}
              <span></span>
            </button>
          </div>
        </div>
        <div className="quizScore">Your score: {quizScore}</div>
        <button
          className="finishButton"
          onClick={() => setScreen("chooseGameMode")}
        >
          Back to game modes<span></span>
        </button>
        <button className="finishButton" onClick={updateUserScore}>
          Finish Game<span></span>
        </button>
        <ToastContainer theme="dark" />
      </div>
    )
  );
}

export default QuizMode;
