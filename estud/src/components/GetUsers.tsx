import { Button, Table } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import DeleteUser from "./DeleteUser";
import CreateUser from "./CreateUser";
import { useState } from "react";

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
  const [selectedUserToDelete, setSelectedUserToDelete] = useState<User | null>(
    null
  );
  const [selectedUserToUpdate, setSelectedUserToUpdate] = useState<User | null>(
    null
  );
  return (
    <div>
      <CreateUser />
      <h2>Lista de usuários</h2>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Função</th>
            <th>Ações</th>
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
              <td>
                <Button>EDITAR</Button>
              </td>
              <td>
                <Button
                  color="red"
                  onClick={() => setSelectedUserToDelete(user)}
                >
                  DELETAR
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      {selectedUserToDelete && (
        <DeleteUser
          open={!!selectedUserToDelete}
          close={() => {
            setSelectedUserToDelete(null);
          }}
          user={selectedUserToDelete as any}
        />
      )}
    </div>
  );
}

export default GetUsers;
