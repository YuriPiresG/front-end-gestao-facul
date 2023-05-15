import { Modal, Stack, Input, MultiSelect, Button, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useCreateUser } from "../hooks/useCreateUser";

interface User {
  username: string;
  name: string;
  email: string;
  password: string;
  role: number;
}

function CreateUser() {
  const [opened, { open, close }] = useDisclosure(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<number>(0);
  const { mutateAsync, isLoading } = useCreateUser();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await mutateAsync({
      username,
      name,
      email,
      password,
      role,
    });
    close();
    toast.success("Usuário criado com sucesso!");
  };
  const resetForm = () => {
    setName("");
    setUsername("");
    setEmail("");
    setPassword("");
    setRole(0);
  };
  const handleClose = () => {
    resetForm();
    close();
  };
  return (
    <>
      <Modal opened={opened} onClose={handleClose} title="Criar um curso">
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Stack spacing="xs">
              <Input
                type="text"
                placeholder="Username"
                onChange={(event) => setUsername(event.target.value)}
              />
              <Input
                type="text"
                placeholder="Nome"
                onChange={(event) => setName(event.target.value)}
              />
              <Input
                type="text"
                placeholder="Email"
                onChange={(event) => setEmail(event.target.value)}
              />
              <Input
                type="password"
                placeholder="Senha"
                onChange={(event) => setPassword(event.target.value)}
              />
              <Input
                type="number"
                placeholder="Role"
                onChange={(event) => setRole(Number(event.target.value))}
              />
              <Button color="blue" type="submit" loading={isLoading}>
                Criar
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>

      <Group position="center">
        <Button
          onClick={open}
          color="green"
          style={{ right: "78vh", top: "1vh" }}
        >
          Criar um usuário
        </Button>
      </Group>
    </>
  );
}

export default CreateUser;
