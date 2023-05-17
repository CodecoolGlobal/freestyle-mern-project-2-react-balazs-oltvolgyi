import React from "react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Game(props) {
  //ide majd useProps wagy rögtön distrust
  const [selectedCountry, setSelectedCountry] = useState();
  const [randCountry, setRandCountry] = useState();
  const [score, setScore] = useState(0);
  const [counter, setCounter] = useState(0);
  const searchBy = props.searchBy;
  const setSearchBy = props.setSearchBy;
  const data = props.data;
  const setScreen = props.setScreen;
  const user = props.user;
  const setSortedUsers = props.setSortedUsers;
  useEffect(() => {
    randomFlagFn();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (selectedCountry === randCountry.name) {
      if (counter === 0) setScore(score + 10);
      if (counter === 1) setScore(score + 5);
      if (counter === 2) setScore(score + 2);
      setCounter(0);
      randomFlagFn();
      toast("Made it, next turn!", { theme: "dark" });
    } else {
      if (counter === 0) {
        setCounter(counter + 1);
        toast(`Incorrect, try again... Capital is ${randCountry.capital[0]}`, {
          theme: "dark",
        });
      } else if (counter === 1) {
        setCounter(counter + 1);
        toast(`Incorrect, try again... Region is ${randCountry.region}`, {
          theme: "dark",
        });
      } else {
        randomFlagFn();
        setCounter(0);
        toast(`Lets try another... It was ${randCountry.name}`, {
          theme: "dark",
        });
      }
    }
    setSearchBy("");
    setSelectedCountry();
    e.target.parentElement[0].value = "";
  }

  useEffect(() => {
    console.log("Score:    " + score);
  }, [score]);

  function isTheAnswerCorrect(countryName, e) {
    setSelectedCountry(countryName);
  }
  useEffect(() => {
    console.log(randCountry);
  }, [randCountry]);

  function randomFlagFn() {
    setSearchBy("");
    if (data.length > 0) {
      let randNum = Math.floor(Math.random() * data.length);
      setRandCountry(data[randNum]);
    }
  }
  async function updateUserScore() {
    try {
      const res = await fetch("http://localhost:3001/api/score", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: user.name, score: score }),
      });
      const data = await res.json();
      //console.log(data);
      setSortedUsers(data);
    } catch (error) {
      console.error("Something went wrong!");
    }
  }

  function handleFinish() {
    console.log(user);
    console.log(score);
    updateUserScore();
    setScreen("leaderboard");
  }

  return (
    <div className="gameFirstDiv">
      <p>Logged in as {user.name}</p>
      <span className="text">What country does this flag belongs to?</span>
      <img
        className="randomFlag"
        alt="flag of randCountry name"
        src={randCountry && randCountry.flag}
      />
      <form className="countrySearch">
        <input
          onChange={(event) => setSearchBy(event.target.value)}
          placeholder="Search and click"
          value={selectedCountry && selectedCountry}
        />
        <br />
        <button className="submitButton" onClick={(e) => handleSubmit(e)}>
          Submit answer<span></span>
        </button>
        <ToastContainer theme="dark" />
      </form>
      <div className="Score">Your score is {score}</div>
      <button className="finishButton" onClick={handleFinish}>
        Finish the game<span></span>
      </button>
      <div className="countryNames">
        {data.length > 0 &&
          data
            .filter((cou) =>
              cou.name.toLowerCase().includes(searchBy.toLowerCase())
            )
            .map((country) => (
              <div
                className="countries"
                key={country.name}
                onClick={(e) => isTheAnswerCorrect(country.name, e)}
              >
                {country.name}
              </div>
            ))}
      </div>
    </div>
  );
}

export default Game;
