import { Button, Modal, Stack } from "@mantine/core";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDeleteCalendarDay } from "../hooks/useDeleteCalendarDay";
import { CalendarDay } from "../hooks/useGetCalendarDays";

interface Props {
  calendarDay: CalendarDay;
  open: boolean;
  close: () => void;
}

function DeleteCalendarDay(props: Props) {
  const calendarDayId = props.calendarDay?.id;
  const { mutateAsync, isLoading } = useDeleteCalendarDay();
  const handleDelete = async () => {
    try {
      await mutateAsync(calendarDayId);
      toast.success("Dia deletado com sucesso!");
      props.close();
    } catch (error) {
      toast.error("Erro ao deletar dia!");
    }
  };

  return (
    <>
      <Modal
        opened={props.open}
        onClose={props.close}
        title={`Tem certeza que deseja deletar ${props.calendarDay?.dayOfTheWeek}`}
      >
        <Modal.Body>
          <Stack spacing="xs">
            <Button onClick={handleDelete} color="red" loading={isLoading}>
              {`Sim tenho certeza que desejo deletar ${props.calendarDay?.dayOfTheWeek}`}
            </Button>
          </Stack>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteCalendarDay;
