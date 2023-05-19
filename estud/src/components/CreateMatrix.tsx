import {
  Button,
  Group,
  Input,
  Modal,
  MultiSelect,
  NumberInput,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useCreateMatrix } from "../hooks/useCreateMatrix";
import { useGetCourses } from "../hooks/useGetCourses";
import { Subject, useGetSubjects } from "../hooks/useGetSubjects";

function CreateMatrix() {
  const [opened, { open, close }] = useDisclosure(false);
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
  const resetForm = () => {
    setSelectedSubjects([]);
    setSelectedCourseId(null);
    setSkillsDescription([]);
    setSemester(0);
  };
  const handleClose = () => {
    resetForm();
    close();
  };
  return (
    <>
      <Modal opened={opened} onClose={handleClose} title="Criar uma matriz">
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Stack spacing="xs">
              <Select
                label="Curso"
                data={courseId.map((course) => ({
                  value: course.id.toString(),
                  label: course.name,
                }))}
                value={selectedCourseId ? selectedCourseId.toString() : ""}
                onChange={(value) =>
                  setSelectedCourseId(value ? parseInt(value, 10) : null)
                }
                searchable
                placeholder="Selecione o curso"
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

      <Group position="center">
        <Button onClick={open} color="green" style={{ left: "60vh" }}>
          Criar uma matriz
        </Button>
      </Group>
    </>
  );
}

export default CreateMatrix;
