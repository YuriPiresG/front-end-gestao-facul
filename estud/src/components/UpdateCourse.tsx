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
  id: number;
  name: string;
  coordinatorId: { id: number };
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

interface Props {
  course: Course;
  open: boolean;
  close: () => void;
}

function UpdateCourse(props: Props) {
  const [name, setName] = useState(props.course.name);
  const [coordinatorId, setCoordinatorId] = useState<number>(
    props.course?.coordinatorId?.id
  );
  const [durationHours, setDurationHours] = useState<number>(
    props.course.durationHours
  );
  const [quantityClass, setQuantityClass] = useState<number>(
    props.course.quantityClass
  );
  const [quantitySemester, setQuantitySemester] = useState<number>(
    props.course.quantitySemester
  );
  const [periods, setPeriods] = useState<string[]>(
    props.course.periods.map((period) => period)
  );
  const handlePeriodsChange = (selectedItems: any[]) => {
    setPeriods(selectedItems.map((item) => item.value) as string[]);
  };
  const { mutateAsync, isLoading } = useUpdateCourse();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await mutateAsync({
      id: props.course.id,
      name,
      coordinatorId,
      durationHours,
      quantityClass,
      quantitySemester,
      periods,
    });
    props.close();
    toast.success("Curso atualizado com sucesso!");
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
    props.close();
  };
  return (
    <>
      <Modal
        opened={props.open}
        onClose={handleClose}
        title="Atualizar um curso"
      >
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Stack spacing="xs">
              <Input
                type="number"
                placeholder="Id do curso"
                value={props.course.id}
                disabled
              />
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
                placeholder="Duração do curso em horas"
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
    </>
  );
}
export default UpdateCourse;
