import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import DirectorScreen from "./DirectorScreen";
import CoordinatorScreen from "./CoordinatorScreen";
import { Button, Center, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useLogin } from "../hooks/useLogin";

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
  const { mutateAsync, isLoading } = useLogin();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await mutateAsync({ username, password });
  };

  return (
    <Center h={"100vh"}>
      <form className="form-login" onSubmit={handleSubmit}>
        <Stack>
          <h1 className="login-header">Course Planner</h1>
          <TextInput
            label="Username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <PasswordInput
            label="Password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button type="submit" loading={isLoading}>
            Login
          </Button>
        </Stack>
      </form>
    </Center>
  );
}

export default LoginScreen;
