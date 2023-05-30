import { api } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDeleteCalendar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/calendar/${id}`);
      queryClient.refetchQueries(["calendars"]);
      console.log(response);
    },
  });
}

export { useDeleteCalendar };
