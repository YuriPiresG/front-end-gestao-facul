import { Button, Modal, Stack } from "@mantine/core";
import { useState } from "react";
import { toast } from "react-toastify";
import { Matrix } from "../hooks/useCreateMatrix";
import { useDeleteMatrix } from "../hooks/useDeleteMatrix";

interface Props {
  matrix: Matrix;
  open: boolean;
  close: () => void;
}

function DeleteMatrix(props: Props) {
  const [matrixId, setMatrixId] = useState<number>(props.matrix.id);
  const { mutateAsync, isLoading } = useDeleteMatrix();
  const handleDelete = async () => {
    await mutateAsync(matrixId);
    props.close();
    toast.success("Matriz deletada com sucesso!");
    toast.error("Erro ao deletar matriz!");
  };

  return (
    <>
      <Modal
        opened={props.open}
        onClose={props.close}
        title="Certeza que deseja deletar a matriz?"
      >
        <Modal.Body>
          <form onSubmit={handleDelete}>
            <Stack spacing="xs">
              <Button color="red" type="submit" loading={isLoading}>
                <span>Sim, tenho certeza</span>
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteMatrix;
