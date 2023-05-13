import {
  Button,
  Center,
  Image,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import coruja from "../assets/coruja.png";
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
        </Stack>
        <Image src={coruja} alt="Coruja" width={150} height={150} style={{marginLeft:"4vh"}}/>
        <Stack>
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
