import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { User } from "./useUser";

interface Course {
  id: number;
  name: string;
  coordinatorId: null | User;
  durationHours: number;
  quantityClass: number;
  quantitySemester: number;
  periods: string[];
}

export const useGetCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const response = await api.get<Course[]>("/course");
      return response.data;
    },
  });
};
