import { api } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useUpdateCalendar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await api.put(`/calendar/${data.id}`, {
        ...data,
        isActive: data.isActive === "true" ? true : false,
      });
      queryClient.refetchQueries(["calendar"]);
      console.log(response);
    },
  });
}

export { useUpdateCalendar };
