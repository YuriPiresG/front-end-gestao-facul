import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Stack, Modal, Button, Group, Input } from "@mantine/core";
import { useCourse } from "../hooks/useCourse";
import { useDisclosure } from "@mantine/hooks";
import { Form, useForm } from "@mantine/form";

interface FormEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement;
}

interface Course {
  name: string;
  coordinatorId: number;
  durationHours: number;
  quantityClass: number;
  quantitySemester: number;
  periods: string[];
}

function CreateCourse() {
  const [opened, { open, close }] = useDisclosure(false);
  const [name, setName] = useState("");
  const [coordinatorId, setCoordinatorId] = useState<number>(0);
  const [durationHours, setDurationHours] = useState<number>(0);
  const [quantityClass, setQuantityClass] = useState<number>(0);
  const [quantitySemester, setQuantitySemester] = useState<number>(0);
  const [periods, setPeriods] = useState<string[]>([]);
  const { mutateAsync, isLoading } = useCourse();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await mutateAsync({
      name,
      coordinatorId,
      durationHours,
      quantityClass,
      quantitySemester,
      periods,
    });
    close();
    toast.success("Curso criado com sucesso!");
  };
  return (
    <>
      <Modal opened={opened} onClose={close} title="Criar um curso">
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Stack spacing="xs">
              <Input
                type="text"
                placeholder="Nome do curso"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <Input
                type="number"
                placeholder="ID do coordenador"
                value={coordinatorId}
                onChange={(event) =>
                  setCoordinatorId(Number(event.target.value))
                }
              />
              <Input
                type="number"
                placeholder="Duração do curso"
                value={durationHours}
                onChange={(event) =>
                  setDurationHours(Number(event.target.value))
                }
              />
              <Input
                type="number"
                placeholder="Quantidade de aulas"
                value={quantityClass}
                onChange={(event) =>
                  setQuantityClass(Number(event.target.value))
                }
              />
              <Input
                type="number"
                placeholder="Quantidade de semestres"
                value={quantitySemester}
                onChange={(event) =>
                  setQuantitySemester(Number(event.target.value))
                }
              />
              <Input
                type="text"
                placeholder="Períodos"
                value={periods}
                onChange={(event) => setPeriods(event.target.value.split(","))}
              />
              <Button type="submit" loading={isLoading} >
                Criar
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>

      <Group position="center">
        <Button onClick={open} style={{ right: "68vh" }}>
          Criar um curso
        </Button>
      </Group>
    </>
  );
}
export default CreateCourse;
