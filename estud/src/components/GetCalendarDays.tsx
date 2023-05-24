import { Button, Table } from "@mantine/core";
import { CalendarDay, useGetCalendarDays } from "../hooks/useGetCalendarDays";
import { MdEditSquare, MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import UpdateCalendarDay from "./UpdateCalendarDay";

function GetCalendarDays() {
  const { data: calendarDays, isLoading } = useGetCalendarDays();
  const [selectedCalendarDayToUpdate, setSelectedCalendarDayToUpdate] =
    useState<CalendarDay | null>(null);
  const [selectedCalendarDayToDelete, setSelectedCalendarDayToDelete] =
    useState<CalendarDay | null>(null);

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
            <td>Ações</td>
          </tr>
        </thead>
        <tbody>
          {calendarDays?.map((calendarDay) => (
            <tr key={calendarDay.id}>
              <td>{calendarDay.id}</td>
              <td>{calendarDay.dayOfTheWeek}</td>
              <td>{calendarDay.calendar?.id}</td>
              <td>{calendarDay.subject?.name}</td>
              <td>{calendarDay.professor.map((prof) => prof.id).join(", ")}</td>
              {/* <td>
                {calendarDay.professor
                  .map((professor) => professor.userId)
                  .join(", ")}
              </td> */}
              <td>{calendarDay.period?.join(", ")}</td>
              <td>
                <Button
                  onClick={() => setSelectedCalendarDayToUpdate(calendarDay)}
                >
                  <MdEditSquare size="4vh" />
                </Button>
              </td>
              <td>
                <Button
                  color="red"
                  onClick={() => setSelectedCalendarDayToDelete(calendarDay)}
                >
                  <MdDeleteForever size="4vh" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedCalendarDayToUpdate && (
        <UpdateCalendarDay
          open={!!selectedCalendarDayToUpdate}
          close={() => {
            setSelectedCalendarDayToUpdate(null);
          }}
          calendarDay={selectedCalendarDayToUpdate as any}
        />
      )}
    </div>
  );
}

export default GetCalendarDays;
