import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { User } from "./useUser";
import { Matrix } from "./useCreateMatrix";

export interface Course {
  id: number;
  name: string;
  coordinatorId: null | User;
  durationHours: number;
  quantityClass: number;
  quantitySemester: number;
  periods: string[];
  matrices: Matrix[];
}

export const useGetCourse = (id: string) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const response = await api.get<Course>(`/course/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
};
