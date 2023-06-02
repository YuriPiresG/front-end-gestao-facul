import {
  Button,
  Group,
  Modal,
  Select,
  NumberInput,
  Stack,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { toast } from "react-toastify";
import { useCreateCalendar } from "../hooks/useCreateCalendar";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useGetCourses } from "../hooks/useGetCourses";

const createCalendarSchema = z.object({
  course: z.string(),
  semester: z.number(),
  isActive: z.string(),
});

type CreateCalendarForm = z.infer<typeof createCalendarSchema>;

function CreateCalendar() {
  const [opened, { open, close }] = useDisclosure(false);
  const courseQuery = useGetCourses();
  const courses = courseQuery.data ?? [];
  const { mutateAsync, isLoading } = useCreateCalendar();
  const handleSubmit = async (calendarForm: CreateCalendarForm) => {
    const formValues: CreateCalendarForm = {
      course: calendarForm.course,
      semester: calendarForm.semester,
      isActive: calendarForm.isActive,
    };
    await mutateAsync(formValues);
    toast.success("Calendario criado com sucesso!");
    close();
  };
  const form = useForm<CreateCalendarForm>({
    initialValues: {
      course: "",
      semester: 0,
      isActive: "",
    },
    validate: zodResolver(createCalendarSchema),
  });

  const handleClose = () => {
    form.reset();
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={handleClose} title="Criar um calendario">
        <Modal.Body>
          <form
            onSubmit={form.onSubmit((createCalendarForm) =>
              handleSubmit(createCalendarForm)
            )}
          >
            <Stack spacing="xs">
              <Select
                label="Curso"
                data={courses.map((course) => ({
                  value: course.id.toString(),
                  label: course.name,
                }))}
                placeholder="Curso"
                {...form.getInputProps("course")}
              />
              <NumberInput
                label="Semestre"
                type="number"
                placeholder="Semestre"
                {...form.getInputProps("semester")}
              />
              <Select
                label="Está ativo?"
                placeholder="Selecione"
                data={[
                  { value: "true", label: "Sim" },
                  { value: "false", label: "Não" },
                ]}
                {...form.getInputProps("isActive")}
                required
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
          <span>Criar um calendario</span>
        </Button>
      </Group>
    </>
  );
}

export default CreateCalendar;
