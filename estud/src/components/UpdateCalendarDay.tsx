import {
  Button,
  Modal,
  MultiSelect,
  NumberInput,
  Select,
  Stack
} from "@mantine/core";
import { useState } from "react";
import { toast } from "react-toastify";
import { DayOfTheWeek } from "../constants/dayOfTheWeek";
import { Periods } from "../constants/periods";
import { Subject, useGetSubjects } from "../hooks/useGetSubjects";
import { useUpdateCalendarDay } from "../hooks/useUpdateCalendarDay";
import { CalendarDay } from "../hooks/useGetCalendarDays";
import { Calendar } from "../hooks/useGetCalendars";
import { Professor } from "../hooks/useCreateProfessor";

interface FormEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement;
}

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

function UpdateCalendarDay(props: Props) {
  const [dayOfTheWeek, setDayOfTheWeek] = useState<DayOfTheWeek>(
    props.calendarDay.dayOfTheWeek
  );
  const [calendarId, setCalendarId] = useState<Calendar>(
    props.calendarDay.calendar
  );
  const [subject, setSubject] = useState<Subject>(props.calendarDay.subject);
  const [period, setPeriod] = useState<Periods[]>(props.calendarDay.period);
  const [professor, setProfessor] = useState<Professor[]>(
    props.calendarDay.professor
  );
  const subjectsQuery = useGetSubjects();
  const subjects = subjectsQuery.data ?? [];
  const { mutateAsync, isLoading } = useUpdateCalendarDay();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await mutateAsync({
      dayOfTheWeek,
      calendarId,
      subject,
      period,
      professor,
    });
    props.close();
    toast.success("Dia da semana atualizado com sucesso!");
  };
  const handleClose = () => {
    props.close();
  };
  return (
    <>
      <Modal
        opened={props.open}
        onClose={handleClose}
        title="Atualizar um dia da semana"
      >
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Stack spacing="xs">
              <Select
                label="Dia da semana"
                placeholder="Selecione o dia da semana"
                data={dayOfTheWeekOptions}
                multiple
                required
                maxDropdownHeight={80}
                value={dayOfTheWeek}
                onChange={(value) => setDayOfTheWeek(value as DayOfTheWeek)}
              />
              <NumberInput
                label="Id do calendário"
                type="number"
                placeholder="Id do calendário"
                value={calendarId.id}
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
                maxDropdownHeight={80}
                searchable
                value={subject.id.toString()}
                onChange={(value) => setSubject(value as unknown as Subject)}
              />
              <MultiSelect
                label="Períodos"
                placeholder="Selecione os períodos"
                data={periodsOptions}
                multiple
                required
                maxDropdownHeight={80}
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
