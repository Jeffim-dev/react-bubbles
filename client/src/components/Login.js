import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const Login = (props) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [status, setStatus] = useState({
    username: '',
    password: ''
  })

  const handleChange = e => {
    setStatus({
      ...status,       
      [e.target.name]: e.target.value
    });
  };

  const login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", status)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push("/bubble");
      })
      .catch(err => {
        localStorage.removeItem("token");
        console.log(err);
      })
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={login}>
          <input
            type="text"
            name="username"
            placeholder="User Name"
            value={status.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={status.password}
            onChange={handleChange}
          />           
          <button type='submit'>Log in</button>           
        </form>
    </>
  );
};

export default Login;
