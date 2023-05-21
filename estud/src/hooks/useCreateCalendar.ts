import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";

interface Calendar {
  courseId: number;
  semester: number;
  isActive: boolean;
}

export const useCreateCalendar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Calendar) => {
      const response = await api.post("/calendar", data);
      queryClient.refetchQueries(["calendars"]);
    },
  });
};
