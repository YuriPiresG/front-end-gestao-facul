import {
  Button,
  Modal,
  NumberInput,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import { toast } from "react-toastify";
import { Calendar } from "../hooks/useGetCalendars";
import { useUpdateCalendar } from "../hooks/useUpdateCalendar";

interface FormEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement;
}

interface Props {
  calendar: Calendar;
  open: boolean;
  close: () => void;
}

function UpdateCalendar(props: Props) {
  const [courseId, setCourseId] = useState<number>(
    props.calendar.course?.id || 0
  );
  const [courseName, setCourseName] = useState(props.calendar.course?.name);
  const [semester, setSemester] = useState<number>(props.calendar?.semester);
  const [isActive, setIsActive] = useState<string>(
    props.calendar.isActive ? "true" : "false"
  );
  const handleChangeIsActive = (value: string) => {
    setIsActive(value);
  };

  const { mutateAsync, isLoading } = useUpdateCalendar();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await mutateAsync({
      id: props.calendar.id,
      course: courseId,
      semester,
      isActive,
    });
    props.close();
    toast.success("Calendário atualizado com sucesso!");
  };
  const handleClose = () => {
    props.close();
  };
  return (
    <>
      <Modal
        opened={props.open}
        onClose={handleClose}
        title="Atualizar um calendário"
      >
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Stack spacing="xs">
              <NumberInput
                label="Id do calendário"
                type="number"
                placeholder="Id do calendário"
                value={props.calendar.id}
                disabled
              />

              <NumberInput
                label="Id do curso"
                type="number"
                placeholder="Id do curso"
                value={courseId}
                onChange={(value) => setCourseId(Number(value))}
                disabled
              />
              <TextInput
                label="Nome do curso"
                type="string"
                placeholder="Nome do curso"
                value={courseName}
                onChange={(event) => setCourseName(event.target.value)}
                disabled
              />

              <NumberInput
                label="Semestre"
                type="number"
                placeholder="Semestre"
                value={semester}
                onChange={(value) => setSemester(Number(value))}
              />
              <Select
                label="Ativo"
                data={[
                  { value: "true", label: "Sim" },
                  { value: "false", label: "Não" },
                ]}
                value={isActive}
                onChange={handleChangeIsActive}
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
export default UpdateCalendar;
