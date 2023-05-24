import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Professor } from "./useCreateProfessor";


export const useGetProfessors = () => {
  return useQuery({
    queryKey: ["professor"],
    queryFn: async () => {
      const response = await api.get<Professor[]>("/professor");
      return response.data;
    },
  });
};
