import { Button, Modal, Select, Stack } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { toast } from "react-toastify";
import { z } from "zod";
import { DayOfTheWeek } from "../constants/dayOfTheWeek";
import { Periods } from "../constants/periods";
import { useGetProfessors } from "../hooks/useGetProfessors";
import { useGetSubjects } from "../hooks/useGetSubjects";
import { useUpdateCalendarDay } from "../hooks/useUpdateCalendarDay";

const updateCalendarDayScheme = z.object({
  subject: z.string().nonempty(),
  professor: z.string().nonempty(),
});

type UpdateCalendarDayForm = z.infer<typeof updateCalendarDayScheme>;

const periodsOptions = [
  { value: "M1", label: "M1" },
  { value: "M2", label: "M2" },
  { value: "T1", label: "T1" },
  { value: "T2", label: "T2" },
  { value: "N1", label: "N1" },
  { value: "N2", label: "N2" },
];


interface Props {
  id: number;
  calendarId: number;
  period: Periods;
  dayOfTheWeek: DayOfTheWeek;
  open: boolean;
  close: () => void;
}

function UpdateCalendarDay(props: Props) {
  const { mutateAsync, isLoading } = useUpdateCalendarDay();
  const subjectsQuery = useGetSubjects();
  const subjects = subjectsQuery.data ?? [];
  const professorsQuery = useGetProfessors();
  const professors = professorsQuery.data ?? [];
  const form = useForm<UpdateCalendarDayForm>({
    initialValues: {
      subject: "",
      professor: "",
    },
    validate: zodResolver(updateCalendarDayScheme),
  });
  const handleSubmit = async (calendarDayForm: UpdateCalendarDayForm) => {
    const formValues = {
      id: props.id,
      dayOfTheWeek: props.dayOfTheWeek,
      calendarId: props.calendarId,
      subject: calendarDayForm.subject,
      period: [props.period],
      professor: [calendarDayForm.professor],
    };
    try {
      await mutateAsync(formValues);
      toast.success("Dia da semana atualizado com sucesso!");
      handleClose();
    } catch (error) {
      toast.error("Erro ao atualizar dia da semana!");
    }
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
        title="Atualizar um dia da semana"
      >
        <Modal.Body>
          <form
            onSubmit={form.onSubmit((calendarDayForm) =>
              handleSubmit(calendarDayForm)
            )}
          >
            <Select
              label="Período"
              placeholder="Selecione os períodos"
              data={periodsOptions}
              value={props.period}
              maxDropdownHeight={80}
              disabled
            />
            <Stack spacing="xs">
              <Select
                label="Matéria"
                placeholder="Selecione a matéria"
                data={subjects.map((subject) => ({
                  value: subject.id.toString(),
                  label: subject.name,
                }))}
                required
                maxDropdownHeight={100}
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
export default UpdateCalendarDay;
