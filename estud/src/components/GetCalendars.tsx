import { Button, Table } from "@mantine/core";
import { Calendar, useGetCalendars } from "../hooks/useGetCalendars";
import { useUser } from "../hooks/useUser";
import { useState } from "react";
import UpdateCalendar from "./UpdateCalendar";
import CreateCalendar from "./CreateCalendar";
import DeleteCalendar from "./DeleteCalendar";
import { MdEditSquare, MdDeleteForever } from "react-icons/md";

function GetCalendars() {
  const user = useUser();
  const { data: calendars, isLoading } = useGetCalendars();
  const [selectedCalendarUpdate, setSelectedCalendarUpdate] =
    useState<Calendar | null>(null);
  const [selectedCalendarToDelete, setSelectedCalendarToDelete] =
    useState<Calendar | null>(null);
  const getCalendarStatus = (isActive: boolean) => {
    if (isActive) {
      return "Ativo";
    } else {
      return "Inativo";
    }
  };
  return (
    <div>
      <CreateCalendar />
      <h2>Calendários</h2>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Curso</th>
            <th>Semestre</th>
            <th>Está ativo?</th>
            <th>Dias da semana</th>
          </tr>
        </thead>
        <tbody>
          {calendars?.map((calendar) => (
            <tr key={calendar.id}>
              <td>{calendar.id}</td>
              <td>{calendar.course?.name}</td>
              <td>{calendar.semester}</td>
              <td>{getCalendarStatus(calendar.isActive)}</td>
              <td>
                <Button>Abrir</Button>
              </td>
              <td>
                <Button onClick={() => setSelectedCalendarUpdate(calendar)}>
                <MdEditSquare size="4vh" />
                </Button>
              </td>
              <td>
                <Button color="red" onClick={() => setSelectedCalendarToDelete(calendar)}>
                <MdDeleteForever size="4vh" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedCalendarUpdate && (
        <UpdateCalendar
          open={!!selectedCalendarUpdate}
          close={() => {
            setSelectedCalendarUpdate(null);
          }}
          calendar={selectedCalendarUpdate as any}
        />
      )}
      {selectedCalendarToDelete && (
        <DeleteCalendar
          open={!!selectedCalendarToDelete}
          close={() => {
            setSelectedCalendarToDelete(null);
          }}
          calendar={selectedCalendarToDelete as any}
        />
      )}
    </div>
  );
}

export default GetCalendars;
