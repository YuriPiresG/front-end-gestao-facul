import { Button, Modal, Stack } from "@mantine/core";
import { toast } from "react-toastify";
import { Matrix } from "../hooks/useCreateMatrix";
import { useDeleteMatrix } from "../hooks/useDeleteMatrix";

interface Props {
  matrix: Matrix;
  open: boolean;
  close: () => void;
}

function DeleteMatrix(props: Props) {
  const matrixId = props.matrix?.id;
  const { mutateAsync, isLoading } = useDeleteMatrix();
  const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await mutateAsync(matrixId);
      toast.success("Matriz deletada com sucesso!");
      props.close();
    } catch (error) {
      toast.error("Erro ao deletar matriz!");
    }
  };

  return (
    <>
      <Modal
        opened={props.open}
        onClose={props.close}
        title={`Tem certeza que deseja deletar a matriz ${props.matrix?.id}?`}
      >
        <Modal.Body>
          <form onSubmit={handleDelete}>
            <Stack spacing="xs">
              <Button color="red" type="submit" loading={isLoading}>
                {`Sim, tenho certeza que desejo deletar a matriz ${props.matrix?.id}`}
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteMatrix;
