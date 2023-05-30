import { api } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/users/${id}`);
      queryClient.refetchQueries(["users"]);
      console.log(response);
    },
  });
}

export { useDeleteUser };
