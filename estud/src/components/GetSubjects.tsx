import { Table } from "@mantine/core";
import { useGetSubjects } from "../hooks/useGetSubjects";

function GetSubjects() {
  const { data: subjects, isLoading } = useGetSubjects();

  return (
    <div>
      <br />
      <h2>Lista de matérias</h2>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
          </tr>
        </thead>
        <tbody>
          {subjects?.map((subject) => (
            <tr key={subject.id}>
              <td>{subject.id}</td>
              <td>{subject.name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default GetSubjects;
