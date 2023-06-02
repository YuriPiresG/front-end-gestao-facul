import { Button, LoadingOverlay, Table } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetCourses } from "../hooks/useGetCourses";
import { User, useUser } from "../hooks/useUser";
import CreateCourse from "./CreateCourse";
import DeleteCourse from "./DeleteCourse";
import UpdateCourse from "./UpdateCourse";
import { MdEditSquare, MdDeleteForever } from "react-icons/md";

interface Course {
  id: number;
  name: string;
  coordinatorId: null | User;
  durationHours: number;
  quantityClass: number;
  quantitySemester: number;
  periods: string[];
}

function GetCourses() {
  const user = useUser();
  const isPermitedEdit = user?.role === 0 || user?.role === 1;
  const { data: courses, isLoading } = useGetCourses();
  const [selectedCourseUpdate, setSelectedCourseUpdate] =
    useState<Course | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  return (
    <div>
      <CreateCourse />
      <br />
      <Link to="/subjects/get">
        <Button>Ver matérias</Button>
      </Link>

      <h2>Lista de cursos</h2>
      <LoadingOverlay visible={isLoading} overlayBlur={1} />
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
                <Button
                  onClick={() => setSelectedCourseUpdate(course)}
                  disabled={!isPermitedEdit}
                >
                  <MdEditSquare size="2rem" />
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => setSelectedCourse(course)}
                  color="red"
                  disabled={!isPermitedEdit}
                >
                  <MdDeleteForever size="2rem" />
                </Button>
              </td>
              <td>
                <Link to={`/get-course/${course.id}`}>
                  <Button>Ver matrizes</Button>
                </Link>
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
    </div>
  );
}

export default GetCourses;
