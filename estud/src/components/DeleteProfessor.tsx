import { Button, Modal, Stack } from "@mantine/core";
import { Profiler, useState } from "react";
import { toast } from "react-toastify";
import { useDeleteProfessor } from "../hooks/useDeleteProfessor";
import { Periods } from "../constants/periods";
import { User } from "../hooks/useUser";

interface Props {
  professor: Professor;
  open: boolean;
  close: () => void;
}

interface Professor {
  id: number;
  user: User;
  periods: Periods[];
}

function DeleteProfessor(props: Props) {
  const [userId, setUserId] = useState<number>(props.professor.id);
  const { mutateAsync, isLoading } = useDeleteProfessor();
  const handleDelete = async () => {
    await mutateAsync(userId);
    props.close();
    toast.success("Professor deletado com sucesso!");
    toast.error("Erro ao deletar professor!");
  };

  return (
    <>
      <Modal
        opened={props.open}
        onClose={props.close}
        title={`Tem certeza que deseja deletar ${props.professor.user.name}?`}
      >
        <Modal.Body>
          <form onSubmit={handleDelete}>
            <Stack spacing="xs">
              <Button color="red" type="submit" loading={isLoading}>
                {`Sim, deletar ${props.professor.user.name}`}
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteProfessor;
