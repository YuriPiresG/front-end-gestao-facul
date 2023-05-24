import { Button, Table } from "@mantine/core";
import { useGetMatrices } from "../hooks/useGetMatrices";
import { useState } from "react";
import { Matrix } from "../hooks/useCreateMatrix";
import UpdateMatrix from "./UpdateMatrix";
import DeleteMatrix from "./DeleteMatrix";

function GetMatrices() {
  const { data: matrices, isLoading } = useGetMatrices();
  const [selectedMatrixToUpdate, setSelectedMatrixToUpdate] =
    useState<Matrix | null>(null);
  const [selectedMatrixToDelete, setSelectedMatrixToDelete] =
    useState<Matrix | null>(null);
  return (
    <div>
      <h2>Lista de matrizes</h2>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Habilidades</th>
            <th>Semestre</th>
            <th>Matérias</th>
          </tr>
        </thead>
        <tbody>
          {matrices?.map((matrix) => (
            <tr key={matrix.id}>
              <td>{matrix.id}</td>
              <td>{matrix.skillsDescription.join(", ")}</td>
              <td>{matrix.semester}</td>
              <td>
                {matrix.subjects.map((subject) => subject.name).join(", ")}
              </td>
              <td>
                <Button onClick={() => setSelectedMatrixToUpdate(matrix)}>
                  EDITAR
                </Button>
              </td>
              <td>
                <Button color="red" onClick={() => setSelectedMatrixToDelete(matrix)}>
                  DELETAR
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedMatrixToUpdate && (
        <UpdateMatrix
          open={!!selectedMatrixToUpdate}
          close={() => {
            setSelectedMatrixToUpdate(null);
          }}
          matrix={selectedMatrixToUpdate as any}
        />
      )}
      {selectedMatrixToDelete && (
        <DeleteMatrix
          open={!!selectedMatrixToDelete}
          close={() => {
            setSelectedMatrixToDelete(null);
          }}
          matrix={selectedMatrixToDelete as any}
        />
      )}
    </div>
  );
}

export default GetMatrices;
