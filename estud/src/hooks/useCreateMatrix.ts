import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Subject } from "./useGetSubjects";

export interface Matrix {
  id: number;
  subjects: Subject[];
  skillsDescription: string[];
  semester: number;
}

export interface CreateMatrix {
  courseId: number;
  subjects: string[];
  skillsDescription: string;
  semester: number;
}

export const useCreateMatrix = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateMatrix) => {
      const response = await api.post("/matrix", {
        ...data,
        subjects: data.subjects.map((subject) => +subject),
        skillsDescription: data.skillsDescription.split(", "),
      });
      queryClient.refetchQueries(["matrix"]);
      console.log(response);
    },
  });
};
