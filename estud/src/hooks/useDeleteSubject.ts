import { api } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDeleteSubject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/subjects/${id}`);
      queryClient.refetchQueries(["subjects"]);
    },
  });
}

export { useDeleteSubject  };
