import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export interface Subject {
  id: number;
  name: string;
}

export const useGetSubjects = () => {
  return useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      const response = await api.get<Subject[]>("/subjects");
      return response.data;
    },
  });
};
