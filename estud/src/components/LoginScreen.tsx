import React, { useState } from "react";
import axios from "axios";
import "./LoginScreen.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DirectorScreen from "./DirectorScreen";
import CoordinatorScreen from "./CoordinatorScreen";

interface User {
  name: string;
  role: number;
}

interface FormEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement;
}

function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    axios
      .post("http://localhost:3000/auth/login", { username, password })
      .then((res) => {
        const user: User = res.data.user;
        setUser(user);
        toast.success("Login successful");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invalid username or password");
      });
  };
  if (user) {
    if ((user.role === 1 || user.role === 0)) {
      return <DirectorScreen name={user.name} />;
    } else if (user.role === 2) {
      return <CoordinatorScreen />;
    }
  }

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
