import { Table } from '@mantine/core';
import { useQuery } from "@tanstack/react-query";
import { User } from "../hooks/useUser";
import { api } from "../lib/api";

interface Course {
  id: number;
  name: string;
  coordinatorId: null | User;
  durationHours: number;
  quantityClass: number;
  quantitySemester: number;
  periods: string[];
}

const useCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await api.get<Course[]>("/course");
      return response.data;
    },
  });
};

function GetCourses() {
  const { data: courses, isLoading } = useCourses();
  return (
    <div>
      <h2>Course List</h2>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Coordinator ID</th>
            <th>Duration Hours</th>
            <th>Quantity Class</th>
            <th>Quantity Semester</th>
            <th>Periods</th>
          </tr>
        </thead>
        <tbody>
          {courses?.map((course) => (
            <tr key={course.id}>
              <td>{course.id}</td>
              <td>{course.name}</td>
              <td>{course.coordinatorId?.name}</td>
              <td>{course.durationHours}</td>
              <td>{course.quantityClass}</td>
              <td>{course.quantitySemester}</td>
              <td>{course.periods.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default GetCourses;
