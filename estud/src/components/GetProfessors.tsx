import { Button, Table } from "@mantine/core";
import { useState } from "react";
import { useGetProfessors } from "../hooks/useGetProfessors";
import UpdateProfessor from "./UpdateProfessor";
import { Periods } from "../constants/periods";
import { User } from "../hooks/useUser";

interface Professor {
  id: number;
  user: User;
  periods: Periods[];
}
function GetProfessors() {
  const { data: professors, isLoading } = useGetProfessors();
  const [selectedProfessorToUpdate, setSelectedProfessorToUpdate] =
    useState<Professor | null>(null);
  console.log(professors);
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
              <td>
                <Button
                  onClick={() => {
                    setSelectedProfessorToUpdate(professor);
                  }}
                >
                  EDITAR
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedProfessorToUpdate && (
        <UpdateProfessor
          open={!!selectedProfessorToUpdate}
          close={() => {
            setSelectedProfessorToUpdate(null);
          }}
          professor={selectedProfessorToUpdate as any}
        />
      )}
    </div>
  );
}

export default GetProfessors;
