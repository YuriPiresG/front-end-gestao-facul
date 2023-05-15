import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export interface Course {
  name: string;
  coordinatorId: null | number;
  durationHours: number;
  quantityClass: number;
  quantitySemester: number;
  periods: string[];
}

export const useGetCourse = (id: string) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: async () => {
      const response = await api.get<Course>(`/course/${id}`);
      return response.data;
    },
  });
};
