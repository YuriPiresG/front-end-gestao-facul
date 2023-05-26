import {
  Button,
  Modal,
  MultiSelect,
  NumberInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useGetSubjects } from "../hooks/useGetSubjects";
import { UpdateMatrix, useUpdateMatrix } from "../hooks/useUpdateMatrix";

const updateMatrixSchema = z.object({
  subject: z.array(z.string()),
  skillsDescription: z.string().nonempty(),
  semester: z.number(),
});
type UpdateMatrixForm = z.infer<typeof updateMatrixSchema>;

interface Props {
  matrix: UpdateMatrix;
  open: boolean;
  close: () => void;
}

function UpdateMatrix(props: Props) {
  const subjectsQuery = useGetSubjects();
  const subjects = subjectsQuery.data ?? [];
  const { mutateAsync, isLoading } = useUpdateMatrix();
  const form = useForm<UpdateMatrixForm>({
    initialValues: {
      subject: [""],
      skillsDescription: "",
      semester: 0,
    },
    validate: zodResolver(updateMatrixSchema),
  });
  const handleSubmit = async (matrixForm: UpdateMatrixForm) => {
    const formValues = {
      id: props.matrix.id,
      courseId: props.matrix.courseId,
      semester: matrixForm.semester,
      skillsDescription: matrixForm.skillsDescription,
      subjects: matrixForm.subject,
    };
    await mutateAsync(formValues);
    toast.success("Matriz atualizada com sucesso!");
    handleClose();
  };
  function handleClose() {
    props.close();
    form.reset();
  }

  return (
    <>
      <Modal
        opened={props.open}
        onClose={handleClose}
        title="Atualizar uma Matriz"
      >
        <Modal.Body>
          <form
            onSubmit={form.onSubmit((matrixForm) => handleSubmit(matrixForm))}
          >
            <Stack spacing="xs">
              <NumberInput
                label="Semestre"
                type="number"
                placeholder="Semestre"
                {...form.getInputProps("semester")}
              />
              <TextInput
                label="Descrição das habilidades"
                type="text"
                placeholder="Descrição das habilidades"
                {...form.getInputProps("skillsDescription")}
              />
              <MultiSelect
                label="Matéria"
                placeholder="Selecione a matéria"
                data={subjects.map((subject) => ({
                  value: subject.id.toString(),
                  label: subject.name,
                }))}
                required
                maxDropdownHeight={200}
                searchable
                {...form.getInputProps("subject")}
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
