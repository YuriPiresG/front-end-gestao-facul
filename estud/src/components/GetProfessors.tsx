import { Table } from "@mantine/core";
import { useState } from "react";
import { Professor } from "../hooks/useCreateProfessor";
import { useGetProfessors } from "../hooks/useGetProfessors";
import UpdateCourse from "./UpdateCourse";

function GetProfessors() {
  const { data: professors, isLoading } = useGetProfessors();
  const [selectedProfessorToUpdate, setSelectedProfessorToUpdate] =
    useState<Professor | null>(null);
    console.log(professors)
  return (
    <div>
      <h2>Lista de professores</h2>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Períodos</th>
          </tr>
        </thead>
        <tbody>
          {professors?.map((professor) => (
            <tr key={professor.id}>
              <td>{professor.id}</td>
              <td>{professor.user.name}</td>
              <td>{professor.periods.join(", ")}</td>
              {/* <td>
                <Button
                  onClick={() => setSelectedProfessorToUpdate(professor)}
                  disabled={!isPermitedEdit}
                >
                  EDITAR
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => setSelectedCourse(course)}
                  color="red"
                  disabled={!isPermitedEdit}
                >
                  DELETAR
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => setselectedCourseToMatrix(course)}
                  color="green"
                >
                  Criar Matriz
                </Button>
              </td> */}
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedProfessorToUpdate && (
        <UpdateCourse
          open={!!selectedProfessorToUpdate}
          close={() => {
            setSelectedProfessorToUpdate(null);
          }}
          course={selectedProfessorToUpdate as any}
        />
      )}
    </div>
  );
}

export default GetProfessors;
