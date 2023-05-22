import { Button, Input, Modal, NumberInput, Stack } from "@mantine/core";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDeleteCourse } from "../hooks/useDeleteCourse";
import { useDeleteCalendar } from "../hooks/useDeleteCalendar";

interface Calendar{
    id: number;
}

interface Props {
  calendar: Calendar;
  open: boolean;
  close: () => void;
}

function DeleteCalendar(props: Props) {
  const [calendarId, setCalendarId] = useState<number>(props.calendar.id);
  const { mutateAsync, isLoading } = useDeleteCalendar();
  const handleDelete = async () => {
    await mutateAsync(calendarId);
    props.close();
    toast.success("Calendário deletado com sucesso!");
    toast.error("Erro ao deletar curso!");
  };

  return (
    <>
      <Modal opened={props.open} onClose={props.close} title="Certeza que deseja deletar o calendário?">
        <Modal.Body>
          <form onSubmit={handleDelete}>
            <Stack spacing="xs">
              <Button color="red" type="submit" loading={isLoading}>
                Deletar
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteCalendar;