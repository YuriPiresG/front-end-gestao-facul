import { Button, Group, Input, Modal, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDeleteCourse } from "../hooks/useDeleteCourse";

function DeleteCourse() {
  const [opened, { open, close }] = useDisclosure(false);
  const [courseId, setCourseId] = useState<number>(0);
  const { mutateAsync, isLoading } = useDeleteCourse();
  const handleDelete = async () => {
    await mutateAsync(courseId);
    close();
    toast.success("Curso deletado com sucesso!");
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Deletar um Curso">
        <Modal.Body>
          <form onSubmit={handleDelete}>
            <Stack spacing="xs">
              <Input
                type="number"
                placeholder="ID do curso"
                onChange={(event) => setCourseId(Number(event.target.value))}
              />
              <Button color="red" type="submit" loading={isLoading}>
                Deletar
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>

      <Group position="center">
        <Button onClick={open} color="red">
          Deletar um Curso
        </Button>
      </Group>
    </>
  );
}

export default DeleteCourse;