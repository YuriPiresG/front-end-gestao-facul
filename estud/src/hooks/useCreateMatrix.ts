import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Subject } from "./useGetSubjects";

export interface Matrix {
  id: number;
  subjects: Subject[];
  skillsDescription: string[];
  semester: number;
}

export const useCreateMatrix = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Matrix) => {
      const response = await api.post("/matrix", data);
      queryClient.refetchQueries(["matrices"]);
    },
  });
};
