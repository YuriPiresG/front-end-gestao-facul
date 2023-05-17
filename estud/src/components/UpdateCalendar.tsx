//TODO: Mudar o atualizar o curso para um modo que o usuario consiga selecionar o curso entre os disponiveis

import { Button, Input, Modal, MultiSelect, Stack } from "@mantine/core";
import { useState } from "react";
import { toast } from "react-toastify";
import { useUpdateCourse } from "../hooks/useUpdateCourse";
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
  const [isActive, setIsActive] = useState<boolean>(props.calendar?.isActive);

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
    toast.success("Curso atualizado com sucesso!");
  };
  const handleClose = () => {
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
                placeholder="Id do calendário"
                value={props.calendar.id}
                disabled
              />
              <Input
                type="number"
                placeholder="Id do curso"
                value={courseId}
                onChange={(event) => setCourseId(Number(event.target.value))}
              />
              <Input
                type="string"
                placeholder="Nome do curso"
                value={courseName}
                onChange={(event) => setCourseName(event.target.value)}
                disabled
              />

              <Input
                type="number"
                placeholder="Semestre"
                value={semester}
                onChange={(event) => setSemester(Number(event.target.value))}
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
