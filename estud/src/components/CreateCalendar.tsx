//TODO: Arrumar, nao ta deixando criar um calendario
import {
    Button,
    Checkbox,
    Group,
    Modal,
    NumberInput,
    Stack
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { BsFillCalendar2PlusFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { z } from "zod";
import { useCreateCalendar } from "../hooks/useCreateCalendar";

const createCalendarSchema = z.object({
  courseId: z
    .number()
    .refine((value) => typeof value === "number", {
      message: "Curso inválido",
    }),
  semester: z.number().min(0, { message: "Semestre tem que ser maior que 0" }),
  isActive: z.boolean(),
});

type CreateCalendarForm = z.infer<typeof createCalendarSchema>;

function CreateCalendar() {
  const [opened, { open, close }] = useDisclosure(false);
  const { mutateAsync, isLoading } = useCreateCalendar();
  const handleSubmit = async (createCalendarForm: CreateCalendarForm) => {
    const formValues: CreateCalendarForm = {
      courseId: createCalendarForm.courseId,
      semester: createCalendarForm.semester,
      isActive: createCalendarForm.isActive,
    };
    await mutateAsync(formValues);
    close();
    toast.success("Usuário criado com sucesso!");
  };
  const form = useForm<CreateCalendarForm>({
    initialValues: {
      courseId: 0,
      semester: 0,
      isActive: false,
    },
    validate: zodResolver(createCalendarSchema),
  });
  const handleClose = () => {
    form.reset();
    close();
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue("isActive", event.target.checked);
  };

  return (
    <>
      <Modal opened={opened} onClose={handleClose} title="Criar um usuário">
        <Modal.Body>
          <form
            onSubmit={form.onSubmit((createCalendarForm) =>
              handleSubmit(createCalendarForm)
            )}
          >
            <Stack spacing="xs">
              <NumberInput
                label="Id do curso"
                type="number"
                placeholder="Id do curso"
                {...form.getInputProps("courseId")}
              />
              <NumberInput
                label="Semestre"
                type="number"
                placeholder="Semestre"
                {...form.getInputProps("semester")}
              />
              <Checkbox
                label="Está ativo?"
                checked={form.values.isActive}
                onChange={handleCheckboxChange}
              />
              <Button color="blue" type="submit" loading={isLoading}>
                Criar
              </Button>
            </Stack>
          </form>
        </Modal.Body>
      </Modal>

      <Group position="center">
        <Button onClick={open} color="green" style={{ left: "60vh" }}>
          <span>Criar um calendário </span>
          <BsFillCalendar2PlusFill size="2vh"/>
        </Button>
      </Group>
    </>
  );
}

export default CreateCalendar;
