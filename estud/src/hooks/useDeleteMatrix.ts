import { api } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDeleteMatrix() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/matrix/${id}`);
      queryClient.refetchQueries(["matrix"]);
      console.log(response);
    },
  });
}

export { useDeleteMatrix };
