import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";

interface Subject {
  name: string;
}

export const useCreateSubject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Subject) => {
      const response = await api.post("/subjects", data);
      queryClient.refetchQueries(["subjects"]);
    },
  });
};
