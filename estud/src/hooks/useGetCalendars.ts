import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Course } from "./useGetCourse";

interface Calendar {
  id: number;
  course: null | Course;
  semester: number;
  isActive: boolean;
}

export const useGetCalendars = () => {
  return useQuery({
    queryKey: ["calendar"],
    queryFn: async () => {
      const response = await api.get<Calendar[]>("/calendar");
      return response.data;
    },
  });
};
