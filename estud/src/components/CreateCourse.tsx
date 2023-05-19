import {
  Button,
  Group,
  Modal,
  MultiSelect,
  NumberInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useCourse } from "../hooks/useCourse";

interface FormEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement;
}

const periodsOptions = [
  { value: "M1", label: "M1" },
  { value: "M2", label: "M2" },
  { value: "T1", label: "T1" },
  { value: "T2", label: "T2" },
  { value: "N1", label: "N1" },
  { value: "N2", label: "N2" },
];

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
  const resetForm = () => {
    setName("");
    setCoordinatorId(0);
    setDurationHours(0);
    setQuantityClass(0);
    setQuantitySemester(0);
    setPeriods([]);
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
              <TextInput
                label="Nome do curso"
                type="text"
                placeholder="Engenharia de Software"
                onChange={(event) => setName(event.target.value)}
              />
              <NumberInput
                label="ID do coordenador"
                type="number"
                placeholder="ID do coordenador"
                onChange={(value) => setCoordinatorId(Number(value))}
              />
              <NumberInput
                label="Duração do curso em horas"
                type="number"
                placeholder="Duração do curso em horas"
                onChange={(value) => setDurationHours(Number(value))}
              />
              <NumberInput
                label="Quantidade de aulas"
                type="number"
                placeholder="Quantidade de aulas"
                onChange={(value) => setQuantityClass(Number(value))}
              />
              <NumberInput
                label="Quantidade de semestres"
                type="number"
                placeholder="Quantidade de semestres"
                onChange={(value) => setQuantitySemester(Number(value))}
              />
              <MultiSelect
                label="Períodos"
                placeholder="Selecione os períodos"
                data={periodsOptions}
                value={periods}
                onChange={(values) => setPeriods(values)}
                multiple
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
          Criar um curso
        </Button>
      </Group>
    </>
  );
}
export default CreateCourse;
