import { api } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDeleteCalendarDay() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/calendar-day/${id}`);
      queryClient.refetchQueries(["calendar-day"]);
      console.log(response);
    },
  });
}

export { useDeleteCalendarDay };
