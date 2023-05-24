import { Button, Input, Modal, NumberInput, Stack } from "@mantine/core";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDeleteCourse } from "../hooks/useDeleteCourse";
import { CalendarDay } from "../hooks/useGetCalendarDays";
import { useDeleteCalendarDay } from "../hooks/useDeleteCalendarDay";

interface Props {
  calendarDay: CalendarDay;
  open: boolean;
  close: () => void;
}

function DeleteCalendarDay(props: Props) {
  const [calendarDayId, setCourseId] = useState<number>(props.calendarDay.id);
  const { mutateAsync, isLoading } = useDeleteCalendarDay();
  const handleDelete = async () => {
    await mutateAsync(calendarDayId);
    props.close();
    toast.success("Dia deletado com sucesso!");
    toast.error("Erro ao deletar dia!");
  };

  return (
    <>
      <Modal
        opened={props.open}
        onClose={props.close}
        title={`Tem certeza que deseja deletar ${props.calendarDay.dayOfTheWeek}`}
      >
        <Modal.Body>
          <form onSubmit={handleDelete}>
            <Stack spacing="xs">
              <Button color="red" type="submit" loading={isLoading}>
                {`Sim tenho certeza que desejo deletar ${props.calendarDay.dayOfTheWeek}`}
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteCalendarDay;
