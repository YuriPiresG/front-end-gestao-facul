import { Button, Modal, Stack } from "@mantine/core";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDeleteCourse } from "../hooks/useDeleteCourse";

interface Course {
  id: number;
  name: string;
  coordinatorId: { id: number };
  durationHours: number;
  quantityClass: number;
  quantitySemester: number;
  periods: string[];
}

interface Props {
  course: Course;
  open: boolean;
  close: () => void;
}

function DeleteCourse(props: Props) {
  const [courseId] = useState<number>(props.course.id);
  const { mutateAsync, isLoading } = useDeleteCourse();
  const handleDelete = async () => {
    try {
      await mutateAsync(courseId);
      props.close();
      toast.success("Curso deletado com sucesso!");
    } catch (error) {
      toast.error("Erro ao deletar curso!");
    }
  };

  return (
    <>
      <Modal
        opened={props.open}
        onClose={props.close}
        title={`Deseja deletar ${props.course.name}?`}
      >
        <Modal.Body>
          <form onSubmit={handleDelete}>
            <Stack spacing="xs">
              <Button color="red" type="submit" loading={isLoading}>
                {`Sim desejo deletar ${props.course.name}?`}
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteCourse;
