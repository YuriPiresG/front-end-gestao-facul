import { Button, Table } from "@mantine/core";
import { useGetMatrices } from "../hooks/useGetMatrices";
import { useState } from "react";
import { Matrix } from "../hooks/useCreateMatrix";
import UpdateMatrix from "./UpdateMatrix";

function GetMatrices() {
  const { data: matrices, isLoading } = useGetMatrices();
  const [selectedMatrixToUpdate, setSelectedMatrixToUpdate] =
    useState<Matrix | null>(null);
  console.log(matrices);
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
    </div>
  );
}

export default GetMatrices;
