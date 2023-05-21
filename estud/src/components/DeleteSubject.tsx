import { Button, Modal, NumberInput, Stack } from "@mantine/core";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDeleteUser } from "../hooks/useDeleteUser";
import { Subject } from "../hooks/useGetSubjects";

interface User {
  id: number;
}

interface Props {
  subject: Subject;
  open: boolean;
  close: () => void;
}

function DeleteSubject(props: Props) {
  const [userId, setUserId] = useState<number>(props.subject.id);
  const { mutateAsync, isLoading } = useDeleteUser();
  const handleDelete = async () => {
    await mutateAsync(userId);
    props.close();
    toast.success("Matéria deletada com sucesso!");
    toast.error("Erro ao deletar matéria!");
  };

  return (
    <>
      <Modal
        opened={props.open}
        onClose={props.close}
        title={`Tem certeza que deseja deletar ${props.subject.name}?`}
      >
        <Modal.Body>
          <form onSubmit={handleDelete}>
            <Stack spacing="xs">
              <Button color="red" type="submit" loading={isLoading}>
              {`Sim, deletar ${props.subject.name}`}
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteSubject;
