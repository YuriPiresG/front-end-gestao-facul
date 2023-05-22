import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";

interface Calendar {
  course: number;
  semester: number;
  isActive: boolean;
}

export const useCreateCalendarDay = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Calendar) => {
      const response = await api.post("/calendar-day", data);
      queryClient.refetchQueries(["calendar-days"]);
    },
  });
};
