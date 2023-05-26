import { Button, Modal, Select, Stack } from "@mantine/core";
import { toast } from "react-toastify";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { Periods } from "../constants/periods";
import { useCreateCalendarDay } from "../hooks/useCreateCalendarDay";
import { useGetProfessors } from "../hooks/useGetProfessors";
import { useGetSubjects } from "../hooks/useGetSubjects";

enum DayOfTheWeek {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
}

const createCalendarDayScheme = z.object({
  subject: z.string().nonempty(),
  professor: z.string().nonempty(),
});

type CreateCalendarDayForm = z.infer<typeof createCalendarDayScheme>;

const periodsOptions = [
  { value: "M1", label: "M1" },
  { value: "M2", label: "M2" },
  { value: "T1", label: "T1" },
  { value: "T2", label: "T2" },
  { value: "N1", label: "N1" },
  { value: "N2", label: "N2" },
];
const dayOfTheWeekOptions = [
  { value: "MONDAY", label: "Segunda" },
  { value: "TUESDAY", label: "Terça" },
  { value: "THURSDAY", label: "Quarta" },
  { value: "WEDNESDAY", label: "Quinta" },
  { value: "FRIDAY", label: "Sexta" },
  { value: "SATURDAY", label: "Sábado" },
];

interface Props {
  calendarId: number;
  period: Periods;
  dayOfTheWeek: DayOfTheWeek;
  open: boolean;
  close: () => void;
}

function CreateCalendarDay(props: Props) {
  const { mutateAsync, isLoading } = useCreateCalendarDay();
  const subjectsQuery = useGetSubjects();
  const subjects = subjectsQuery.data ?? [];
  const professorsQuery = useGetProfessors();
  const professors = professorsQuery.data ?? [];
  const form = useForm<CreateCalendarDayForm>({
    initialValues: {
      subject: "",
      professor: "",
    },
    validate: zodResolver(createCalendarDayScheme),
  });
  const handleSubmit = async (calendarDayForm: CreateCalendarDayForm) => {
    const formValues = {
      dayOfTheWeek: props.dayOfTheWeek,
      calendarId: props.calendarId,
      subject: calendarDayForm.subject,
      period: [props.period],
      professor: [calendarDayForm.professor],
    };
    await mutateAsync(formValues);
    toast.success("Dia da semana criado com sucesso!");
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
        title="Criar um dia de semana"
      >
        <Modal.Body>
          <form
            onSubmit={form.onSubmit((calendarDayForm) =>
              handleSubmit(calendarDayForm)
            )}
          >
            <Stack spacing="xs">
              <Select
                label="Período"
                placeholder="Selecione os períodos"
                data={periodsOptions}
                value={props.period}
                maxDropdownHeight={80}
                disabled
              />
              <Select
                label="Dia da semana"
                placeholder="Selecione o dia da semana"
                data={dayOfTheWeekOptions}
                value={props.dayOfTheWeek}
                maxDropdownHeight={80}
                disabled
              />
              <Select
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
              <Select
                label="Professores"
                placeholder="Selecione os professores"
                data={professors.map((professor) => ({
                  value: professor.id.toString(),
                  label: professor.user.name.toString(),
                }))}
                required
                maxDropdownHeight={400}
                {...form.getInputProps("professor")}
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

export default CreateCalendarDay;
