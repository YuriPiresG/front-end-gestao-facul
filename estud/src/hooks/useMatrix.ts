import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";

interface Matrix {
  courseId: number;
  selectedSubjects: number[];
  skillsDescription: string[];
  semester: number;
}

export const useMatrix = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Matrix) => {
      const response = await api.get("/matrix");
      queryClient.invalidateQueries(["matrix"]);
    },
  });
};
