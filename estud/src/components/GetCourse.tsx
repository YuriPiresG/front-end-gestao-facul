import { useParams } from "react-router-dom";
import { useGetCourse } from "../hooks/useGetCourse";
import { Button, Table } from "@mantine/core";

function GetCourse() {
  const { id } = useParams<{ id: string }>();
  const { data: course, isLoading } = useGetCourse(id || "");

  return (
    <div>
      <h1>Nome {course?.name}</h1>
      <h2>Nome coord{course?.coordinatorId?.name}</h2>
      <h3>duracao{course?.durationHours}</h3>
      <h4>Quantity class{course?.quantityClass}</h4>
      <h5>Semestre{course?.quantitySemester}</h5>
      <h6>{course?.periods.join(", ")}</h6>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Semestre</th>
            <th>Descrição de habilidades</th>
            <th>Aulas</th>
          </tr>
        </thead>
        <tbody>
          {course?.matrices?.map((matrix) => (
            <tr key={matrix.id}>
              <td>{matrix.id}</td>
              <td>{matrix.semester}</td>
              <td>{matrix.skillsDescription.join(",")}</td>
              <td>
                {matrix.subjects.map((subject) => subject.name).join(", ")}
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button>Novo</Button>
    </div>
  );
}

export default GetCourse;
