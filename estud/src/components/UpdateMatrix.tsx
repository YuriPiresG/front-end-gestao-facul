import { Button, Modal, MultiSelect, NumberInput, Stack, TextInput } from "@mantine/core";
import { useState } from "react";
import { toast } from "react-toastify";
import { Matrix } from "../hooks/useCreateMatrix";
import { useUpdateMatrix } from "../hooks/useUpdateMatrix";

interface FormEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement;
}

interface Props {
  matrix: Matrix;
  open: boolean;
  close: () => void;
}

function UpdateMatrix(props: Props) {
  const [subjects, setSubjects] = useState(props.matrix.subjects);
  const [skillsDescription, setSkillsDescription] = useState(
    props.matrix.skillsDescription
  );
  const [semester, setSemester] = useState(props.matrix.semester);
  const { mutateAsync, isLoading } = useUpdateMatrix();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await mutateAsync({
      id: props.matrix.id,
      subjects,
      skillsDescription,
      semester,
    });
    props.close();
    toast.success("Matriz atualizada com sucesso!");
  };
  const resetForm = () => {
    setSubjects([]);
    setSkillsDescription([]);
    setSemester(0);
  };
  const handleClose = () => {
    resetForm();
    props.close();
  };

  return (
    <>
      <Modal
        opened={props.open}
        onClose={handleClose}
        title="Atualizar uma Matriz"
      >
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Stack spacing="xs">
              <NumberInput
                label="ID da Matriz"
                type="number"
                placeholder="ID da Matriz"
                value={props.matrix.id}
                disabled
              />
              <NumberInput
                label="Semestre"
                type="number"
                placeholder="Semestre"
                value={semester}
                onChange={(value) => setSemester(Number(value))}
              />
              <TextInput
                label="Descrição das habilidades"
                type="text"
                placeholder="Descrição das habilidades"
                value={skillsDescription}
                onChange={(event) =>
                  setSkillsDescription(Array(event.target.value))
                }
              />
             <MultiSelect
                label="Matéria"
                placeholder="Selecione a matéria"
                data={subjects.map((subject) => ({
                  value: subject.id.toString(), 
                  label: subject.name,
                }))}
                required
                maxDropdownHeight={80}
                searchable
                
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
export default UpdateMatrix;
