import { Button, Input, Modal, Stack } from "@mantine/core";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDeleteUser } from "../hooks/useDeleteUser";

interface User {
  id: number;
  name: string;
}

interface Props {
  user: User;
  open: boolean;
  close: () => void;
}

function DeleteUser(props: Props) {
  const [userId, setUserId] = useState<number>(props.user.id);
  const { mutateAsync, isLoading } = useDeleteUser();
  const handleDelete = async () => {
    await mutateAsync(userId);
    props.close();
    toast.success("Usuário deletado com sucesso!");
    toast.error("Erro ao deletar usuário!");
  };

  return (
    <>
      <Modal
        opened={props.open}
        onClose={props.close}
        title={`Tem certeza que deseja deletar ${props.user.name}?`}
      >
        <Modal.Body>
          <form onSubmit={handleDelete}>
            <Stack spacing="xs">
              <Button color="red" type="submit" loading={isLoading}>
                {`Sim, deletar ${props.user.name}`}
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteUser;
