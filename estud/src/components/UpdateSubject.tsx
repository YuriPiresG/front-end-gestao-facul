import {
  Button,
  Modal,
  NumberInput,
  Stack,
  TextInput
} from "@mantine/core";
import { useState } from "react";
import { toast } from "react-toastify";
import { Subject } from "../hooks/useGetSubjects";
import { useUpdateSubject } from "../hooks/useUpdateSubject";

interface FormEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement;
}

interface Props {
  subject: Subject;
  open: boolean;
  close: () => void;
}

function UpdateSubject(props: Props) {
  const [name, setName] = useState(props.subject.name);
  const { mutateAsync, isLoading } = useUpdateSubject();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await mutateAsync({
      id: props.subject.id,
      name,
    });
    props.close();
    toast.success("Matéria atualizada com sucesso!");
  };

  return (
    <>
      <Modal
        opened={props.open}
        onClose={props.close}
        title="Atualizar uma matéria"
      >
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Stack spacing="xs">
              <NumberInput
                label="Id da matéria"
                type="number"
                placeholder="Id da matéria"
                value={props.subject.id}
                disabled
              />
              <TextInput
                label="Nome da matéria"
                type="text"
                placeholder="Nome da matéria"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />

              <Button color="blue" type="submit" loading={isLoading}>
                Atualizar
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default UpdateSubject;
