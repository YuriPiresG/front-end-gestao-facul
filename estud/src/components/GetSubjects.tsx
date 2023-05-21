import { Button, Table } from "@mantine/core";
import { Subject, useGetSubjects } from "../hooks/useGetSubjects";
import { useState } from "react";
import UpdateSubject from "./UpdateSubject";
import { MdDeleteForever, MdEditSquare } from "react-icons/md";
import DeleteSubject from "./DeleteSubject";

function GetSubjects() {
  const { data: subjects, isLoading } = useGetSubjects();
  const [selectedSubjectToUpdate, setSelectedSubjectToUpdate] =
    useState<Subject | null>(null);
  const [selectedSubjectToDelete, setselectedSubjectToDelete] =
    useState<Subject | null>(null);

  const sortedSubjects = subjects
    ? [...subjects].sort((a, b) => a.id - b.id)
    : [];

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
          {sortedSubjects.map((subject) => (
            <tr key={subject.id}>
              <td>{subject.id}</td>
              <td>{subject.name}</td>
              <td>
                <Button onClick={() => setSelectedSubjectToUpdate(subject)}>
                  <MdEditSquare size="4vh" />
                </Button>
              </td>
              <td>
                <Button color="red" onClick={() => setselectedSubjectToDelete(subject)}>
                  <MdDeleteForever size="4vh" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {selectedSubjectToUpdate && (
        <UpdateSubject
          open={!!selectedSubjectToUpdate}
          close={() => {
            setSelectedSubjectToUpdate(null);
          }}
          subject={selectedSubjectToUpdate as any}
        />
      )}
      {selectedSubjectToDelete && (
        <DeleteSubject
          open={!!selectedSubjectToDelete}
          close={() => {
            setselectedSubjectToDelete(null);
          }}
          subject={selectedSubjectToDelete as any}
        />
      )}
    </div>
  );
}

export default GetSubjects;
