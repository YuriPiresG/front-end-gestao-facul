import { Button, Table } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import DeleteUser from "./DeleteUser";
import CreateUser from "./CreateUser";
import { useState } from "react";
import UpdateUser from "./UpdateUser";
import CreateProfessor from "./CreateProfessor";

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  password: string;
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
  const getRoleLabel = (role: number) => {
    if (role === 0) {
      return "Administrador";
    } else if (role === 1) {
      return "Diretor";
    } else if (role === 2) {
      return "Coordenador";
    } else {
      return "Professor";
    }
  };
  return (
    <div>
      <CreateUser />
      <br />
      <CreateProfessor />
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
              <td>{getRoleLabel(user.role)}</td>
              <td>
                <Button onClick={() => setSelectedUserToUpdate(user)}>
                  EDITAR
                </Button>
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
      {selectedUserToUpdate && (
        <UpdateUser
          open={!!selectedUserToUpdate}
          close={() => {
            setSelectedUserToUpdate(null);
          }}
          user={selectedUserToUpdate as any}
        />
      )}
    </div>
  );
}

export default GetUsers;
