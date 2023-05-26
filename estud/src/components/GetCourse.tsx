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
import DeleteMatrix from "./DeleteMatrix";
import { Matrix } from "../hooks/useCreateMatrix";
import { MdDeleteForever, MdEditSquare } from "react-icons/md";
import UpdateMatrix from "./UpdateMatrix";

function GetCourse() {
  const { id } = useParams<{ id: string }>();
  const { data: course, isLoading } = useGetCourse(id || "");
  const [newMatrix, setNewMatrix] = useState<null | {
    courseId: number;
  }>(null);
  const [selectedMatrixToDelete, setSelectedMatrixToDelete] =
    useState<Matrix | null>(null);
  const [selectedMatrixToUpdate, setSelectedMatrixToUpdate] =
    useState<Matrix | null>(null);

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
      <Button
        color="green"
        onClick={() => setNewMatrix({ courseId: course?.id as number })}
      >
        Nova matriz
      </Button>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Semestre</th>
            <th>Descrição de habilidades</th>
            <th>Aulas</th>
            <th>Ações</th>
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
              <td>
                <Button
                  color="red"
                  onClick={() => setSelectedMatrixToDelete(matrix)}
                >
                  <MdDeleteForever size={30} />
                </Button>
              </td>
              <td>
                <Button onClick={() => setSelectedMatrixToUpdate(matrix)}>
                  <MdEditSquare size={30} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <CreateMatrix
        open={!!newMatrix}
        close={() => setNewMatrix(null)}
        courseId={newMatrix?.courseId as number}
      />
      <DeleteMatrix
        open={!!selectedMatrixToDelete}
        close={() => setSelectedMatrixToDelete(null)}
        matrix={selectedMatrixToDelete as any}
      />
      {selectedMatrixToUpdate && (
        <UpdateMatrix
          open={!!selectedMatrixToUpdate}
          close={() => {
            setSelectedMatrixToUpdate(null);
          }}
          matrix={selectedMatrixToUpdate as any}
        />
      )}{" "}
    </div>
  );
}
export default GetCourse;
