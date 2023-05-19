import { Table } from "@mantine/core";
import { useGetMatrices } from "../hooks/useGetMatrices";

function GetMatrices() {
  const { data: matrices, isLoading } = useGetMatrices();
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
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default GetMatrices;
