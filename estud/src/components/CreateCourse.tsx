import {
  Button,
  Group,
  Modal,
  MultiSelect,
  NumberInput,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { toast } from "react-toastify";
import { z } from "zod";
import { useCourse } from "../hooks/useCourse";
import useGetUsers from "../hooks/useGetUsers";

const createCourseSchema = z.object({
  name: z.string().nonempty(),
  durationHours: z.number().positive(),
  quantityClass: z.number().positive(),
  coordinatorId: z.string(),
  quantitySemester: z.number().positive(),
  periods: z.array(z.string()),
});

type CreateCourseForm = z.infer<typeof createCourseSchema>;

const periodsOptions = [
  { value: "M1", label: "M1" },
  { value: "M2", label: "M2" },
  { value: "T1", label: "T1" },
  { value: "T2", label: "T2" },
  { value: "N1", label: "N1" },
  { value: "N2", label: "N2" },
];

function CreateCourse() {
  const [opened, { open, close }] = useDisclosure(false);
  const coordinatorsQuery = useGetUsers();
  const coordinators =
    coordinatorsQuery.data?.filter((user) => user.role === 2) ?? [];
  const { mutateAsync, isLoading } = useCourse();
  const handleSubmit = async (courseForm: CreateCourseForm) => {
    const formValues: CreateCourseForm = {
      name: courseForm.name,
      durationHours: courseForm.durationHours,
      quantityClass: courseForm.quantityClass,
      coordinatorId: courseForm.coordinatorId,
      quantitySemester: courseForm.quantitySemester,
      periods: courseForm.periods,
    };
    await mutateAsync(formValues);
    toast.success("Curso criado com sucesso!");
    close();
  };
  const form = useForm<CreateCourseForm>({
    initialValues: {
      name: "",
      durationHours: 0,
      quantityClass: 0,
      coordinatorId: "",
      quantitySemester: 0,
      periods: [""],
    },
    validate: zodResolver(createCourseSchema),
  });

  const handleClose = () => {
    form.reset();
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={handleClose} title="Criar um curso">
        <Modal.Body>
          <form
            onSubmit={form.onSubmit((createCourseForm) =>
              handleSubmit(createCourseForm)
            )}
          >
            <Stack spacing="xs">
              <TextInput
                label="Nome do curso"
                type="text"
                placeholder="Engenharia de Software"
                {...form.getInputProps("name")}
              />
              <Select
                label="Coordenador"
                placeholder="Selecione o coordenador"
                data={coordinators.map((coordinator) => ({
                  value: coordinator.id.toString(),
                  label: coordinator.name,
                }))}
                {...form.getInputProps("coordinatorId")}
                required
              />
              <NumberInput
                label="Duração do curso em horas"
                type="number"
                placeholder="Duração do curso em horas"
                {...form.getInputProps("durationHours")}
              />
              <NumberInput
                label="Quantidade de aulas"
                type="number"
                placeholder="Quantidade de aulas"
                {...form.getInputProps("quantityClass")}
              />
              <NumberInput
                label="Quantidade de semestres"
                type="number"
                placeholder="Quantidade de semestres"
                {...form.getInputProps("quantitySemester")}
              />
              <MultiSelect
                label="Períodos"
                placeholder="Selecione os períodos"
                data={periodsOptions}
                {...form.getInputProps("periods")}
                multiple
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
          Criar um curso
        </Button>
      </Group>
    </>
  );
}
export default CreateCourse;
