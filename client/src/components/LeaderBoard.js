import React, { useEffect } from "react";

function LeaderBoard(props) {
  const sortedUsers = props.sortedUsers;
  const setScreen = props.setScreen;

  useEffect(() => {
    //console.log(sortedUsers);
  }, [sortedUsers]);

  return (
    <div>
      <table>
        <tr>
          <td className="nameCellHead">Name</td>
          <td className="scoreCellHead">Score</td>
        </tr>
        {sortedUsers.map((user) => (
          <tr className="scoreEntry" key={user.name}>
            <td className="nameCell">{user.name}</td>
            <td className="scoreCell">{user.score}</td>
          </tr>
        ))}
      </table>
      <button onClick={() => setScreen("welcome")} className="submitButton">
        New Game <span></span>
      </button>
    </div>
  );
}

export default LeaderBoard;
