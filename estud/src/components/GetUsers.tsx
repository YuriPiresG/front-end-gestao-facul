import { Table } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

interface User {
    id: number;
    username: string;
    name: string;
    email: string;
    role: number;
  }

const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await api.get<User[]>("/users");
      return response.data;
    },
  });
};

function GetUsers() {
  const { data: users, isLoading } = useUsers();
  return (
    <div>
      <h2>Lista de usuários</h2>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Função</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>

            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default GetUsers;
