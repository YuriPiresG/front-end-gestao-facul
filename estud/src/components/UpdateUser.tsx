//TODO Ver com o melo, nao esta funcionando

import {
  Button,
  Input,
  Modal,
  NumberInput,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import { toast } from "react-toastify";
import { useUpdateUser } from "../hooks/useUpdateUser";

interface FormEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement;
}

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  password: string;
  role: number;
}

interface Props {
  user: User;
  open: boolean;
  close: () => void;
}

function UpdateUser(props: Props) {
  const [username, setUsername] = useState(props.user.username);
  const [name, setName] = useState(props.user.name);
  const [password, setPassword] = useState(props.user.password);
  const [email, setEmail] = useState(props.user.email);
  const [role, setRole] = useState<number>(props.user.role);
  const { mutateAsync, isLoading } = useUpdateUser();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await mutateAsync({
      id: props.user.id,
      username,
      name,
      email,
      password,
      role,
    });
    props.close();
    toast.success("Usuário atualizado com sucesso!");
  };
  const resetForm = () => {
    setName("");
    setUsername("");
    setPassword("");
    setEmail("");
    setRole(0);
  };
  const handleClose = () => {
    resetForm();
    props.close();
  };

  return (
    <>
      <Modal
        opened={props.open}
        onClose={handleClose}
        title="Atualizar um usuário"
      >
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Stack spacing="xs">
              <NumberInput
                label="ID do usuário"
                type="number"
                placeholder="ID do usuário"
                value={props.user.id}
                disabled
              />
              <TextInput
                label="Username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              <TextInput
                label="Nome"
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <TextInput
                label="Email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <PasswordInput
                label="Senha"
                type="text"
                placeholder="Senha"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                disabled
              />
              <NumberInput
                label="Role"
                type="number"
                placeholder="Role"
                value={role}
                onChange={(value) => setRole(Number(value))}
              />

              <Button color="blue" type="submit" loading={isLoading}>
                Atualizar
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default UpdateUser;
