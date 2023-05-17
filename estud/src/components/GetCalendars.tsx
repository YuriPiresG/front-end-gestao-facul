import { Button, Table } from "@mantine/core";
import { useState } from "react";
import { useGetCalendars } from "../hooks/useGetCalendars";
import { useUser } from "../hooks/useUser";
import CreateCourse from "./CreateCourse";
import CreateMatrix from "./CreateMatrix";
import DeleteCourse from "./DeleteCourse";
import UpdateCourse from "./UpdateCourse";
import { Course } from "../hooks/useGetCourse";

interface Calendar {
  id: number;
  course: null | Course;
  semester: number;
  isActive: boolean;
}

function GetCalendars() {
  const user = useUser();
  const isPermitedEdit = user?.role === 0 || user?.role === 1;
  const { data: calendars, isLoading } = useGetCalendars();
  const getCalendarStatus = (isActive: boolean) => {
    if (isActive) {
      return "Ativo";
    } else {
      return "Inativo";
    }
  };
  return (
    <div>
      <h2>Calendários</h2>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Curso</th>
            <th>Semestre</th>
            <th>Está ativo?</th>
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
                <Button disabled={!isPermitedEdit}>EDITAR</Button>
              </td>
              <td>
                <Button color="red" disabled={!isPermitedEdit}>
                  DELETAR
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default GetCalendars;
