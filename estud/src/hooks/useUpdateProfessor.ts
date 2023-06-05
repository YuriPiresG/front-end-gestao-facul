import { api } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useUpdateProfessor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await api.put(`/professor/${data.id}`, data);
      queryClient.refetchQueries(["professor"]);
      console.log(response);
    },
  });
}

export { useUpdateProfessor };
