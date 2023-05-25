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
import { useCreateMatrix } from "../hooks/useCreateMatrix";
import { useGetSubjects } from "../hooks/useGetSubjects";

const createMatrixSchema = z.object({
  subject: z.array(z.string()),
  skillsDescription: z.string().nonempty(),
  semester: z.number(),
});

type CreateMatrixForm = z.infer<typeof createMatrixSchema>;

interface Props {
  courseId: number;
  open: boolean;
  close: () => void;
}

function CreateMatrix(props: Props) {
  const { mutateAsync, isLoading } = useCreateMatrix();
  const subjectsQuery = useGetSubjects();
  const subjects = subjectsQuery.data ?? [];
  const form = useForm<CreateMatrixForm>({
    initialValues: {
      subject: [""],
      skillsDescription: "",
      semester: 0,
    },
    validate: zodResolver(createMatrixSchema),
  });
  const handleSubmit = async (matrixForm: CreateMatrixForm) => {
    const formValues = {
      courseId: props.courseId,
      semester: matrixForm.semester,
      skillsDescription: matrixForm.skillsDescription,
      subjects: matrixForm.subject,
    };
    await mutateAsync(formValues);
    toast.success("Matriz criada com sucesso!");
    handleClose();
  };
  function handleClose() {
    props.close();
    form.reset();
  }

  return (
    <>
      <Modal opened={props.open} onClose={handleClose} title="Criar uma matriz">
        <Modal.Body>
          <form
            onSubmit={form.onSubmit((matrixForm) => handleSubmit(matrixForm))}
          >
            <Stack spacing="xs">
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

              <TextInput
                label="Habilidades"
                multiple
                type="text"
                placeholder="Habilidades(Ex: Habilidade 1,Habilidade 2)"
                {...form.getInputProps("skillsDescription")}
              />

              <NumberInput
                label="Semestre"
                type="number"
                {...form.getInputProps("semester")}
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
