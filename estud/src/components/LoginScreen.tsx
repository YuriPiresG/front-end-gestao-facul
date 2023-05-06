import React, { useState } from "react";
import axios from "axios";
import "./LoginScreen.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement;
}

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    axios
      .post("http://localhost:3000/auth/login", { username, password })
      .then((res) => {
        console.log(res);
        toast.success("Login successful");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invalid username or password");
      });
  };
  return (
    <>
      <div>
        <form className="form-login" onSubmit={handleSubmit}>
          <h1 className="login-header">Course Planner</h1>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <label htmlFor=""></label>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default LoginScreen;
