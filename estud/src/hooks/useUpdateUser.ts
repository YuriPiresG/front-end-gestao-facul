import { api } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const response = await api.put(`/users/${data.id}`, data);
      queryClient.refetchQueries(["users"]);
      console.log(response);
    },
  });
}

export { useUpdateUser };
