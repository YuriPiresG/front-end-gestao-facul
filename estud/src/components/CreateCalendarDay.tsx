import {
  Button,
  Modal,
  MultiSelect,
  NumberInput,
  Select,
  Stack,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";
import { useCreateCalendarDay } from "../hooks/useCreateCalendarDay";
import { CalendarDay } from "../hooks/useGetCalendarDays";

enum DayOfTheWeek {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
}

enum Periods {
  M1 = "M1",
  M2 = "M2",
  T1 = "T1",
  T2 = "T2",
  N1 = "N1",
  N2 = "N2",
}

const createCalendarDayScheme = z.object({
  dayOfTheWeek: z.nativeEnum(DayOfTheWeek),
  calendarId: z.number().min(0),
  subject: z.number().min(0),
  period: z.nativeEnum(Periods).array().nonempty(),
  professor: z.array(z.number().min(0)).nonempty(),
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
  calendarDay: CalendarDay;
  open: boolean;
  close: () => void;
}

function CreateCalendarDay(props: Props) {
  const [calendarId, setCalendarId] = useState<number>(props.calendarDay.id);
  const { mutateAsync, isLoading } = useCreateCalendarDay();
  const handleSubmit = async (calendarDayForm: CreateCalendarDayForm) => {
    const formValues: CreateCalendarDayForm = {
      dayOfTheWeek: calendarDayForm.dayOfTheWeek,
      calendarId: calendarDayForm.calendarId,
      subject: calendarDayForm.subject,
      period: calendarDayForm.period,
      professor: calendarDayForm.professor,
    };
    await mutateAsync(formValues);
    close();
    toast.success("Dia da semana criado com sucesso!");
  };

  const form = useForm<CreateCalendarDayForm>({
    initialValues: {
      dayOfTheWeek: DayOfTheWeek.MONDAY,
      calendarId: 0,
      subject: 0,
      period: [Periods.M1],
      professor: [0],
    },
    validate: zodResolver(createCalendarDayScheme),
  });

  return (
    <>
      <Modal
        opened={props.open}
        onClose={props.close}
        title="Criar um calendário"
      >
        <Modal.Body>
          <form
            onSubmit={form.onSubmit((calendarDayForm) =>
              handleSubmit(calendarDayForm)
            )}
          >
            <Stack spacing="xs">
              <NumberInput
                label="Id do calendário"
                type="number"
                placeholder="Id do calendário"
                value={calendarId}
                disabled
              />
              <MultiSelect
                label="Períodos"
                placeholder="Selecione os períodos"
                data={periodsOptions}
                multiple
                required
                maxDropdownHeight={80}
                {...form.getInputProps("period")}
              />
              <Select
                label="Dia da semana"
                placeholder="Selecione o dia da semana"
                data={dayOfTheWeekOptions}
                multiple
                required
                maxDropdownHeight={80}
                {...form.getInputProps("dayOfTheWeek")}
              />
              <NumberInput
                label="Id da matéria"
                type="number"
                placeholder="Id da matéria"
                {...form.getInputProps("subject")}
              />
              {form.values.professor.map((index) => (
                <NumberInput
                  key={index}
                  label="Id do Professor"
                  type="number"
                  placeholder="Id do Professor"
                  {...form.getInputProps(`professor.${index}`)}
                />
              ))}
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
