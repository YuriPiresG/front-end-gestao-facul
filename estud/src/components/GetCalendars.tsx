import { Button, Table } from "@mantine/core";
import { useState } from "react";
import { MdDeleteForever, MdEditSquare } from "react-icons/md";
import { Link } from "react-router-dom";
import { Calendar, useGetCalendars } from "../hooks/useGetCalendars";
import { useUser } from "../hooks/useUser";
import CreateCalendar from "./CreateCalendar";
import CreateCalendarDay from "./CreateCalendarDay";
import DeleteCalendar from "./DeleteCalendar";
import UpdateCalendar from "./UpdateCalendar";

function GetCalendars() {
  const user = useUser();
  const [selectedCalendarForDay, setSelectedCalendarForDay] =
    useState<Calendar | null>(null);
  const { data: calendars, isLoading } = useGetCalendars();
  const [selectedCalendarUpdate, setSelectedCalendarUpdate] =
    useState<Calendar | null>(null);
  const [selectedCalendarToDelete, setSelectedCalendarToDelete] =
    useState<Calendar | null>(null);
  const [selectedCalendar, setSelectedCalendar] = useState<Calendar | null>(
    null
  );

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
      <br />
      <Link to="/calendar-day/get">
        <Button>Ver Dias da semana</Button>
      </Link>
      <h2>Calendários</h2>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Curso</th>
            <th>Semestre</th>
            <th>Está ativo?</th>
            <th>Criar um dia da semana</th>
            <th>Atualizar</th>
            <th>Deletar</th>
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
                <Button onClick={() => setSelectedCalendarForDay(calendar)}>
                  Criar dia
                </Button>
              </td>
              <td>
                <Button onClick={() => setSelectedCalendarUpdate(calendar)}>
                  <MdEditSquare size="4vh" />
                </Button>
              </td>
              <td>
                <Button
                  color="red"
                  onClick={() => setSelectedCalendarToDelete(calendar)}
                >
                  <MdDeleteForever size="4vh" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedCalendarForDay && (
        <CreateCalendarDay
          open={!!selectedCalendarForDay}
          close={() => {
            setSelectedCalendarForDay(null);
          }}
          calendarDay={selectedCalendarForDay as any}
        />
      )}
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
