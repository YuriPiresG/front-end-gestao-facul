import { Button, Input, Modal, NumberInput, Stack } from "@mantine/core";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDeleteUser } from "../hooks/useDeleteUser";

interface User {
  id: number;
}

interface Props {
  user: User;
  open: boolean;
  close: () => void;
}

function DeleteSubject(props: Props) {
  const [userId, setUserId] = useState<number>(props.user.id);
  const { mutateAsync, isLoading } = useDeleteUser();
  const handleDelete = async () => {
    await mutateAsync(userId);
    props.close();
    toast.success("Curso deletado com sucesso!");
    toast.error("Erro ao deletar curso!");
  };

  return (
    <>
      <Modal
        opened={props.open}
        onClose={props.close}
        title="Deletar um usuário"
      >
        <Modal.Body>
          <form onSubmit={handleDelete}>
            <Stack spacing="xs">
              <NumberInput
                label="Id do usuário"
                type="number"
                placeholder="ID do curso"
                value={userId}
                onChange={(value) => setUserId(Number(value))}
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

export default DeleteSubject;
