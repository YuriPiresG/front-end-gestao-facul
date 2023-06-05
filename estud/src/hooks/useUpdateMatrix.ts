import { api } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface UpdateMatrix {
  id: number;
  courseId: number;
  subjects: string[];
  skillsDescription: string;
  semester: number;
}

function useUpdateMatrix() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateMatrix) => {
      const response = await api.put(`/matrix/${data.id}`, {
        ...data,
        subjects: data.subjects.map((subject) => +subject),
        skillsDescription: data.skillsDescription.split(", "),
      });
      queryClient.refetchQueries(["matrix"]);
      console.log(response);
    },
  });
}

export { useUpdateMatrix };
