import { Button, LoadingOverlay, Table } from "@mantine/core";
import { useState } from "react";
import { useGetProfessors } from "../hooks/useGetProfessors";
import UpdateProfessor from "./UpdateProfessor";
import { Periods } from "../constants/periods";
import { User } from "../hooks/useUser";
import DeleteProfessor from "./DeleteProfessor";
import { MdDeleteForever, MdEditSquare } from "react-icons/md";

export interface ProfessorWithUser {
  id: number;
  user: User;
  periods: Periods[];
}
function GetProfessors() {
  const { data: professors, isLoading } = useGetProfessors();
  const [selectedProfessorToUpdate, setSelectedProfessorToUpdate] =
    useState<ProfessorWithUser | null>(null);
  const [selectedProfessorToDelete, setSelectedProfessorToDelete] =
    useState<ProfessorWithUser | null>(null);
  return (
    <div>
      <h2>Lista de professores</h2>
      <LoadingOverlay visible={isLoading} overlayBlur={1} />
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Períodos</th>
            <th>Ações</th>
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
                  style={{ height: "4vh" }}
                  onClick={() => {
                    setSelectedProfessorToUpdate(professor);
                  }}
                >
                  <MdEditSquare size="4vh" />
                </Button>

                <Button
                  color="red"
                  style={{
                    marginLeft: "1rem",
                    height: "4vh",
                    position: "relative",
                  }}
                  onClick={() => {
                    setSelectedProfessorToDelete(professor);
                  }}
                >
                  <MdDeleteForever style={{ fontSize: "4vh" }} />
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

      {selectedProfessorToDelete && (
        <DeleteProfessor
          open={!!selectedProfessorToDelete}
          close={() => {
            setSelectedProfessorToDelete(null);
          }}
          professor={selectedProfessorToDelete as any}
        />
      )}
    </div>
  );
}

export default GetProfessors;
