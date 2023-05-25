import {
  Box,
  Button,
  Card,
  CardSection,
  Image,
  LoadingOverlay,
  Table,
} from "@mantine/core";
import { useParams } from "react-router-dom";
import courseLogo from "../assets/courseLogo.png";
import { useGetCourse } from "../hooks/useGetCourse";
import { useState } from "react";
import CreateMatrix from "./CreateMatrix";


function GetCourse() {
  const { id } = useParams<{ id: string }>();
  const { data: course, isLoading } = useGetCourse(id || "");
  const [newMatrix, setNewMatrix] = useState<null | {
    courseId: number;
  }>(null);

  return (
    <div>
      <Card shadow="sm" padding="md" radius="md" withBorder>
        <CardSection>
          <Image src={courseLogo} width={300} height={100} />
        </CardSection>
      </Card>
      <Box
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[3],
          padding: theme.spacing.xl,
          borderRadius: theme.radius.md,
        })}
      >
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <h1>Nome do curso: {course?.name}</h1>
        <h2>Coordenador: {course?.coordinatorId?.name}</h2>
        <h3>Duração: {course?.durationHours}</h3>
        <h3>Quantidade de aulas: {course?.quantityClass}</h3>
        <h3>Semestre: {course?.quantitySemester}</h3>
        <h3>Períodos: {course?.periods.join(", ")}</h3>
      </Box>
      <h1>Matrizes</h1>
      <Button onClick={() => setNewMatrix({ courseId: course?.id as number })}>
        Novo
      </Button>
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
      <CreateMatrix
        open={!!newMatrix}
        close={() => setNewMatrix(null)}
        courseId={newMatrix?.courseId as number}
      />
    </div>
  );
}

export default GetCourse;
