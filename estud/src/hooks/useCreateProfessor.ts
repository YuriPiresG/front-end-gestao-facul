import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";

interface Professor {
  userId: number;
  periods: string[];
}

export const useCreateProfessor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Professor) => {
      const response = await api.post("/professor", data);
      queryClient.refetchQueries(["professor"]);
    },
  });
};
