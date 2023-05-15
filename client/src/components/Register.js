import React from "react";
import { ToastContainer, toast } from "react-toastify";
//import { useState } from "react";

function Register(props) {
  const setUser = props.setUser;
  const setScreen = props.setScreen;

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const entries = [...formData.entries()];

    const newUser = entries.reduce((acc, entry) => {
        const [key, value] = entry;
        acc[key] = value;
        return acc;
    }, {})

    newUser.password === newUser.password2 
    ? fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
    }).then(res => res.json()).then(data => 
        console.log(data))
    : toast("The passwords do not match!", { theme: "dark" })

    //   setScreen("game");
    //   setUser({
    //     name: event.target[0].value,
    //     email: event.target[1].value,
    //     address: event.target[2].value,
    //     shoeSize: event.target[3].value,
    //   });
    }
  

  return (
    <div className="welcome">
      <h1> Welcome</h1>
      <h2>
        Please register with a name and password. 
      </h2>
      <br></br>
      <form className="userForm" onSubmit={(event) => handleSubmit(event)}>
        <div className="user-box">
          <input name="name" type="text" required={true}></input>
          <label>Name </label>
        </div>
        <div className="user-box">
          <input name="password" type="text" required={true}></input>
          <label>Password </label>
        </div>
        <div className="user-box">
          <input name="password2" type="text" required={true}></input>
          <label>Password again </label>
        </div>
        <div className="user-box">
          <input name="address" type="text" required={true}></input>
          <label>Address </label>
        </div>
        <div className="user-box">
          <input name="email" type="email" required={true}></input>
          <label>E-mail</label>
        </div>
        <button type="submit" className="userFormButton">
          Register<span></span>
        </button>
      </form>
      <ToastContainer theme="dark" />
    </div>
  );
}
export default Register;
