import { Button, Group, Modal, Stack, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useCreateSubject } from "../hooks/useCreateSubject";

interface FormEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement;
}

function CreateSubject() {
  const [opened, { open, close }] = useDisclosure(false);
  const [name, setName] = useState("");
  const { mutateAsync, isLoading } = useCreateSubject();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await mutateAsync({
      name,
    });
    close();
    toast.success("Matéria criada com sucesso!");
  };
  const resetForm = () => {
    setName("");
  };
  const handleClose = () => {
    resetForm();
    close();
  };
  return (
    <>
      <Modal opened={opened} onClose={handleClose} title="Criar uma matéria">
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Stack spacing="xs">
              <TextInput
                label="Nome da matéria"
                type="text"
                placeholder="Nome da matéria"
                onChange={(event) => setName(event.target.value)}
              />
              <Button color="green" type="submit" loading={isLoading}>
                Criar
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>

      <Group position="center">
        <Button onClick={open} color="green" style={{ left: "60vh" }}>
          Criar uma matéria
        </Button>
      </Group>
    </>
  );
}
export default CreateSubject;
