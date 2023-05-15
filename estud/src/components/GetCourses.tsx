import { Button, Table } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { User } from "../hooks/useUser";
import { api } from "../lib/api";
import DeleteCourse from "./DeleteCourse";
import UpdateCourse from "./UpdateCourse";
import CreateCourse from "./CreateCourse";

interface Course {
  id: number;
  name: string;
  coordinatorId: null | User;
  durationHours: number;
  quantityClass: number;
  quantitySemester: number;
  periods: string[];
}

const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await api.get<Course[]>("/course");
      return response.data;
    },
  });
};

function GetCourses() {
  const { data: courses, isLoading } = useCourses();
  const [selectedCourseUpdate, setSelectedCourseUpdate] =
    useState<Course | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  return (
    <div>
      <h2>Lista de cursos</h2>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Coordenador</th>
            <th>Duração(horas)</th>
            <th>Quantidade de aulas</th>
            <th>Quantidade de semestres</th>
            <th>Períodos</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {courses?.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.name}</td>
              <td>{course.coordinatorId?.name}</td>
              <td>{course.durationHours}</td>
              <td>{course.quantityClass}</td>
              <td>{course.quantitySemester}</td>
              <td>{course.periods.join(", ")}</td>
              <td>
                <Button onClick={() => setSelectedCourseUpdate(course)}>
                  EDITAR
                </Button>
              </td>
              <td>
                <Button onClick={() => setSelectedCourse(course)} color="red">
                  DELETAR
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedCourseUpdate && (
        <UpdateCourse
          open={!!selectedCourseUpdate}
          close={() => {
            setSelectedCourseUpdate(null);
          }}
          course={selectedCourseUpdate as any}
        />
      )}
      {selectedCourse && (
        <DeleteCourse
          open={!!selectedCourse}
          close={() => {
            setSelectedCourse(null);
          }}
          course={selectedCourse as any}
        />
      )}
      <CreateCourse />
    </div>
  );
}

export default GetCourses;
