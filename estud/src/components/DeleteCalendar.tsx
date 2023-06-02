import { Button, Modal, Stack } from "@mantine/core";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDeleteCalendar } from "../hooks/useDeleteCalendar";

interface Calendar {
  id: number;
}

interface Props {
  calendar: Calendar;
  open: boolean;
  close: () => void;
}

function DeleteCalendar(props: Props) {
  const [calendarId] = useState<number>(props.calendar.id);
  const { mutateAsync, isLoading } = useDeleteCalendar();
  const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await mutateAsync(calendarId);
      props.close();
      toast.success("Calendário deletado com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar curso!");
    }
  };

  return (
    <>
      <Modal
        opened={props.open}
        onClose={props.close}
        title="Certeza que deseja deletar o calendário?"
      >
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
