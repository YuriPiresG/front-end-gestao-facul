import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";

interface Matrix {
  courseId: number;
  subjects: number[];
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
