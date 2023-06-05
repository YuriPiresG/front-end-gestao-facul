import { Button, LoadingOverlay, Table } from "@mantine/core";
import { useState } from "react";
import { MdDeleteForever, MdEditSquare } from "react-icons/md";
import useGetUsers from "../hooks/useGetUsers";
import { User, useUser } from "../hooks/useUser";
import CreateProfessor from "./CreateProfessor";
import CreateUser from "./CreateUser";
import DeleteUser from "./DeleteUser";
import UpdateUser from "./UpdateUser";

function GetUsers() {
  const { data: users, isLoading } = useGetUsers();
  const [selectedUserToDelete, setSelectedUserToDelete] = useState<User | null>(
    null
  );
  const [selectedUserToProf, setselectedUserToProf] = useState<User | null>(
    null
  );
  const [selectedUserToUpdate, setSelectedUserToUpdate] = useState<User | null>(
    null
  );
  const user = useUser();
  const isPermitedEdit = user?.role === 0 || user?.role === 1;
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
      {isPermitedEdit && <CreateUser />}

      <br />
      <h2>Lista de usuários</h2>
      <LoadingOverlay visible={isLoading} overlayBlur={1} />
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
                <Button
                  onClick={() => setSelectedUserToUpdate(user)}
                  disabled={!isPermitedEdit}
                >
                  <MdEditSquare size="2rem" />
                </Button>
              </td>
              <td>
                <Button
                  color="red"
                  onClick={() => setSelectedUserToDelete(user)}
                  disabled={!isPermitedEdit}
                >
                  <MdDeleteForever size="2rem" />
                </Button>
              </td>
              <td>
                <Button
                  color="yellow"
                  onClick={() => setselectedUserToProf(user)}
                  disabled={user.role === 3}
                >
                  Tornar professor
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
      {selectedUserToProf && (
        <CreateProfessor
          open={!!selectedUserToProf}
          close={() => {
            setselectedUserToProf(null);
          }}
          user={selectedUserToProf as any}
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
