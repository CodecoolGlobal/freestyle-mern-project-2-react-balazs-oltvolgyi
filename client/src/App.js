import React, { useState, useEffect } from "react";
import "./App.css";
import Game from "./components/Game.js";
import Welcome from "./components/Welcome";
import LeaderBoard from "./components/LeaderBoard";
import Login from "./components/Login";
import Register from "./components/Register";
import ChooseGame from "./components/ChooseGame";
import QuizMode from "./components/QuizMode";

function App() {
  const [data, setData] = useState([]);
  const [screen, setScreen] = useState("welcome");

  const [searchBy, setSearchBy] = useState("");
  const [user, setUser] = useState();
  const [sortedUsers, setSortedUsers] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const nameAndFlag = data.map((cou) => {
          return {
            name: cou.name.common,
            flag: cou.flags.png,
            region: cou.region,
            capital: cou.capital,
          };
        });
        setData(nameAndFlag);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="App">
      {(() => {
        switch (screen) {
          case "welcome": {
            return <Login setUser={setUser} setScreen={setScreen} />;
          }
          case "register": {
            return <Register setUser={setUser} setScreen={setScreen} />;
          }
          case "chooseGameMode": {
            return <ChooseGame setScreen={setScreen} />;
          }
          case "quiz": {
            return (
              <QuizMode
                data={data}
                setScreen={setScreen}
                user={user}
                setSortedUsers={setSortedUsers}
              />
            );
          }
          case "game": {
            return (
              <div className="gameDiv">
                <Game
                  data={data}
                  searchBy={searchBy}
                  setSearchBy={setSearchBy}
                  setScreen={setScreen}
                  user={user}
                  setSortedUsers={setSortedUsers}
                />
              </div>
            );
          }
          case "leaderboard": {
            return (
              <div className="leaderboard">
                <h2>High scores </h2>
                <LeaderBoard sortedUsers={sortedUsers} setScreen={setScreen} />
              </div>
            );
          }
          default: {
            break;
          }
        }
      })()}
    </div>
  );
}

export default App;
