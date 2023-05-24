import {
  Button,
  Group,
  Modal,
  Select,
  NumberInput,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useCreateCalendar } from "../hooks/useCreateCalendar";

interface FormEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement;
}

function CreateCalendar() {
  const [opened, { open, close }] = useDisclosure(false);
  const [course, setCourse] = useState<number>(0);
  const [semester, setSemester] = useState<number>(0);
  const [isActive, setIsActive] = useState<string>("false");

  const { mutateAsync, isLoading } = useCreateCalendar();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await mutateAsync({
      course,
      semester,
      isActive: isActive === "true",
    });
    close();
    toast.success("Calendario criado com sucesso!");
  };

  const handleClose = () => {
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={handleClose} title="Criar um calendario">
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Stack spacing="xs">
              <NumberInput
                label="Id do curso"
                type="number"
                placeholder="Id do curso"
                value={course}
                onChange={(value) => setCourse(Number(value))}
              />
              <NumberInput
                label="Semestre"
                type="number"
                placeholder="Semestre"
                value={semester}
                onChange={(value) => setSemester(Number(value))}
              />
              <Select
                label="Está ativo?"
                placeholder="Selecione"
                data={[
                  { value: "true", label: "Sim" },
                  { value: "false", label: "Não" },
                ]}
                value={isActive || ""}
                onChange={(value) => setIsActive(value || "")}
                required
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
          <span>Criar um calendario</span>
        </Button>
      </Group>
    </>
  );
}

export default CreateCalendar;