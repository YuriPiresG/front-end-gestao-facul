import { api } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDeleteProfessor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/professor/${id}`);
      queryClient.refetchQueries(["professors"]);
    },
  });
}

export { useDeleteProfessor };
