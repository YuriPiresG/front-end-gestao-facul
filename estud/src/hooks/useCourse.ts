import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";

interface Course {
  name: string;
  coordinatorId: number;
  durationHours: number;
  quantityClass: number;
  quantitySemester: number;
  periods: string[];
}
export const useCourse = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Course) => {
      const response = await api.post("/course", data);
      queryClient.refetchQueries(["courses"]);
    },
  });
};
