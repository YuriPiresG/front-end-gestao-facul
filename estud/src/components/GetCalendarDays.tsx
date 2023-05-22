import { Button, Table } from "@mantine/core";
import { MdDeleteForever, MdEditSquare } from "react-icons/md";
import { useGetCalendarDays } from "../hooks/useGetCalendarDays";
import { useUser } from "../hooks/useUser";

function GetCalendarDays() {
  const user = useUser();
  const { data: calendarDays, isLoading } = useGetCalendarDays();
  //   const [selectedCalendarUpdate, setSelectedCalendarUpdate] =
  //     useState<Calendar | null>(null);
  //   const [selectedCalendarToDelete, setSelectedCalendarToDelete] =
  //     useState<Calendar | null>(null);
  const getCalendarStatus = (isActive: boolean) => {
    if (isActive) {
      return "Ativo";
    } else {
      return "Inativo";
    }
  };
  return (
    <div>
      <h2>Dias calendario</h2>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Dia da semana</th>
            <th>Id do calendário</th>
            <th>Matéria</th>
            <th>Professor</th>
            <th>Período</th>
          </tr>
        </thead>
        <tbody>
          {calendarDays?.map((calendarDay) => (
            <tr key={calendarDay.id}>
              <td>{calendarDay.id}</td>
              <td>{calendarDay.dayOfTheWeek}</td>
              <td>{calendarDay.calendar?.id}</td>
              <td>{calendarDay.subject?.name}</td>
              <td>
                {calendarDay.professor
                  .map((professor) => professor.userId)
                  .join(", ")}
              </td>
              <td>{calendarDay.period?.join(", ")}</td>
              <td>
                <Button>Abrir</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default GetCalendarDays;
