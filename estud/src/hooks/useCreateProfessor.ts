import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Periods } from "../constants/periods";

export interface Professor {
  id: number;
  userId: number;
  periods: Periods[];
}

export const useCreateProfessor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Professor) => {
      const response = await api.post("/professor", data);
      queryClient.refetchQueries(["users"]);
      console.log(response);
    },
  });
};
