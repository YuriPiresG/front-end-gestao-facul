import { Button, Group, Input, Modal, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
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
  const [courseId, setCourseId] = useState<number>(props.course.id);
  const { mutateAsync, isLoading } = useDeleteCourse();
  const handleDelete = async () => {
    await mutateAsync(courseId);
    props.close();
    toast.success("Curso deletado com sucesso!");
    toast.error("Erro ao deletar curso!");
  };

  return (
    <>
      <Modal opened={props.open} onClose={props.close} title="Deletar um Curso">
        <Modal.Body>
          <form onSubmit={handleDelete}>
            <Stack spacing="xs">
              <Input
                type="number"
                placeholder="ID do curso"
                value={courseId}
                onChange={(event) => setCourseId(Number(event.target.value))}
              />
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

export default DeleteCourse;
