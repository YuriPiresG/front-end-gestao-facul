import {
  Button,
  Modal,
  MultiSelect,
  NumberInput,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import { toast } from "react-toastify";
import { useUpdateUser } from "../hooks/useUpdateUser";
import { Professor } from "../hooks/useCreateProfessor";
import { useUpdateProfessor } from "../hooks/useUpdateProfessor";

interface FormEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement;
}

interface Props {
  professor: Professor;
  open: boolean;
  close: () => void;
}

const periodsOptions = [
  { value: "M1", label: "M1" },
  { value: "M2", label: "M2" },
  { value: "T1", label: "T1" },
  { value: "T2", label: "T2" },
  { value: "N1", label: "N1" },
  { value: "N2", label: "N2" },
];

function UpdateProfessor(props: Props) {
  const [periods, setPeriods] = useState(props.professor.periods);
  const { mutateAsync, isLoading } = useUpdateProfessor();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await mutateAsync({
      id: props.professor.id,
      periods,
    });
    props.close();
    toast.success("Usuário atualizado com sucesso!");
  };

  return (
    <>
      <Modal
        opened={props.open}
        onClose={props.close}
        title="Atualizar um professor"
      >
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Stack spacing="xs">
              <NumberInput
                label="ID do usuário"
                type="number"
                placeholder="ID do usuário"
                value={props.professor.id}
                disabled
              />
              <MultiSelect
                label="Períodos"
                placeholder="Selecione os períodos"
                data={periodsOptions}
                multiple
                required
                maxDropdownHeight={80}
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
export default UpdateProfessor;
