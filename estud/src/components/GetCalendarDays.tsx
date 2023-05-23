import { Table } from "@mantine/core";
import { useGetCalendarDays } from "../hooks/useGetCalendarDays";
//TODO ver com o melo pq n retorna professor
function GetCalendarDays() {
  const { data: calendarDays, isLoading } = useGetCalendarDays();
  console.log(calendarDays);

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
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default GetCalendarDays;
