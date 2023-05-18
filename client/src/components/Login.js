import React from "react";
import { ToastContainer, toast } from "react-toastify";
//import { useState } from "react";

function Login(props) {
  const setUser = props.setUser;
  const setScreen = props.setScreen;

  function handleSubmit(event) {
    event.preventDefault();

    console.log(
      "event targetek: " + event.target[0].value,
      event.target[1].value
    );

    fetch(
      `http://localhost:3001/${event.target[0].value}/${event.target[1].value}`
    )
      .then((res) => res.json())
      .then((data) =>
        data.name
          ? (setScreen("chooseGameMode"), setUser(data))
          : toast.error("Incorrect name and/or password!", {
              theme: "colored",
              position: "top-right",
            })
      );
  }

  return (
    <div className="login">
      <h1> Welcome</h1>
      <h2>
        This is an educational game. <br />
        You have to guess which country's flag is displayed.
        <br />
        Before you start, please log in:
      </h2>
      <br></br>
      <form className="userForm" onSubmit={(event) => handleSubmit(event)}>
        <div className="user-box">
          <input type="text" required={true}></input>
          <label>Name: </label>
        </div>
        <div className="user-box">
          <input type="password" required={true}></input>
          <label>Password: </label>
        </div>
        <button type="submit" className="userFormButton">
          Start game<span></span>
        </button>
      </form>
      <button
        style={{ fontSize: "small" }}
        onClick={() => setScreen("register")}
        className="userFormButton"
      >
        Register<span></span>
      </button>
      <ToastContainer theme="dark" position="top-right" />
    </div>
  );
}
export default Login;
