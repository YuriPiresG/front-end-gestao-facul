//TODO: Mudar o atualizar o curso para um modo que o usuario consiga selecionar o curso entre os disponiveis

import { Button, Group, Input, Modal, Stack, MultiSelect } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { toast } from "react-toastify";
import { useUpdateCourse } from "../hooks/useUpdateCourse";

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

const periodsOptions = [
  { value: "M1", label: "M1" },
  { value: "M2", label: "M2" },
  { value: "T1", label: "T1" },
  { value: "T2", label: "T2" },
  { value: "N1", label: "N1" },
  { value: "N2", label: "N2" },
];

function UpdateCourse() {
  const [opened, { open, close }] = useDisclosure(false);
  const [name, setName] = useState("");
  const [coordinatorId, setCoordinatorId] = useState<number>(0);
  const [durationHours, setDurationHours] = useState<number>(0);
  const [quantityClass, setQuantityClass] = useState<number>(0);
  const [quantitySemester, setQuantitySemester] = useState<number>(0);
  const [periods, setPeriods] = useState<string[]>([]);
  const handlePeriodsChange = (selectedItems: any[]) => {
    setPeriods(selectedItems.map((item) => item.value) as string[]);
  };
  const { mutateAsync, isLoading } = useUpdateCourse();
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
      <Modal opened={opened} onClose={handleClose} title="Atualizar um curso">
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Stack spacing="xs">
              <Input
                type="text"
                placeholder="Nome do curso"
                onChange={(event) => setName(event.target.value)}
              />
              <Input
                type="number"
                placeholder="ID do coordenador"
                onChange={(event) =>
                  setCoordinatorId(Number(event.target.value))
                }
              />
              <Input
                type="number"
                placeholder="Duração do curso em horas"
                onChange={(event) =>
                  setDurationHours(Number(event.target.value))
                }
              />
              <Input
                type="number"
                placeholder="Quantidade de aulas"
                onChange={(event) =>
                  setQuantityClass(Number(event.target.value))
                }
              />
              <Input
                type="number"
                placeholder="Quantidade de semestres"
                onChange={(event) =>
                  setQuantitySemester(Number(event.target.value))
                }
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
              <Button color="blue" type="submit" loading={isLoading}>
                Atualizar
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>

      <Group position="center">
        <Button onClick={open} color="blue">
          Atualizar um curso
        </Button>
      </Group>
    </>
  );
}
export default UpdateCourse;
