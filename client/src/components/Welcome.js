import React from "react";
//import { useState } from "react";

function Welcome(props) {
  const setUser = props.setUser;
  const setScreen = props.setScreen;

  function handleSubmit(event) {
    event.preventDefault();
    if (event.target[3].value < 18) {
      alert("Még nem élsz elég nagy lábon ahhoz, hogy játszhasd ezt a játékot");
    } else {
      console.log(event.target[0].value);
      console.log(event.target[1].value);
      setScreen("game");
      setUser({
        name: event.target[0].value,
        email: event.target[1].value,
        address: event.target[2].value,
        shoeSize: event.target[3].value,
      });
    }
  }

  return (
    <div className="welcome">
      <h1> Welcome</h1>
      <h2>
        This is an educational game. <br />
        You have to guess which country's flag is displayed.
        <br />
        Before you start, please fill the form with your details:
      </h2>
      <br></br>
      <form className="userForm" onSubmit={(event) => handleSubmit(event)}>
        <div className="user-box">
          <input type="text" required={true}></input>
          <label>Name: </label>
        </div>
        <div className="user-box">
          <input type="email" required={true}></input>
          <label>E-mail: </label>
        </div>
        <div className="user-box">
          <input type="text" required={true}></input>
          <label>Adress: </label>
        </div>
        <div className="user-box">
          <input type="number" required={true}></input>
          <label>Shoe size: </label>
        </div>
        <button type="submit" className="userFormButton">
          Start game<span></span>
        </button>
      </form>
    </div>
  );
}
export default Welcome;
