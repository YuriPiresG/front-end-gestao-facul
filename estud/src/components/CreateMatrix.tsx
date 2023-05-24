import {
  Button,
  Modal,
  MultiSelect,
  NumberInput,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { Matrix, useCreateMatrix } from "../hooks/useCreateMatrix";
import { useGetCourses } from "../hooks/useGetCourses";
import { Subject, useGetSubjects } from "../hooks/useGetSubjects";

interface Props {
  matrix: Matrix;
  open: boolean;
  close: () => void;
}

function CreateMatrix(props: Props) {
  const [selectedSubjects, setSelectedSubjects] = useState<Subject[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [skillsDescription, setSkillsDescription] = useState<string[]>([]);
  const courseQuery = useGetCourses();
  const courseId = courseQuery.data ?? [];
  const subjectsQuery = useGetSubjects();
  const subjects = subjectsQuery.data ?? [];
  const [semester, setSemester] = useState<number>(0);
  const { mutateAsync, isLoading } = useCreateMatrix();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await mutateAsync({
      courseId: selectedCourseId!,
      subjects: selectedSubjects,
      skillsDescription,
      semester,
      id: 0,
    });
    close();
    toast.success("Usuário criado com sucesso!");
  };

  return (
    <>
      <Modal opened={props.open} onClose={props.close} title="Criar uma matriz">
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Stack spacing="xs">
              <NumberInput
                label="Id do curso"
                type="number"
                placeholder="Id do curso"
                value={props.matrix.id}
                disabled
              />
              <MultiSelect
                label="Matérias"
                data={subjects.map((subject) => ({
                  value: subject.id.toString(),
                  label: subject.name,
                }))}
                value={selectedSubjects.map((subject) => subject.id.toString())}
                onChange={(values) =>
                  setSelectedSubjects(
                    values
                      .map((value) =>
                        subjects.find(
                          (subject) => subject.id === parseInt(value, 10)
                        )
                      )
                      .filter(
                        (subject): subject is Subject => subject !== undefined
                      )
                  )
                }
                searchable
                multiple
                placeholder="Selecione as matérias"
              />

              <TextInput
                label="Habilidades"
                type="text"
                placeholder="Habilidades(Ex: Habilidade 1,Habilidade 2)"
                value={skillsDescription[0] || ""}
                onChange={(event) => setSkillsDescription([event.target.value])}
              />

              <NumberInput
                label="Semestre"
                type="number"
                placeholder="Semestre"
                onChange={(value) => setSemester(Number(value))}
              />
              <Button color="green" type="submit" loading={isLoading}>
                Criar
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateMatrix;
