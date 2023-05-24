import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Periods } from "../constants/periods";
import { User } from "./useUser";


 interface Professor {
  id: number;
  user: User;
  periods: Periods[];
}

export const useGetProfessors = () => {
  return useQuery({
    queryKey: ["professor"],
    queryFn: async () => {
      const response = await api.get<Professor[]>("/professor");
      return response.data;
    },
  });
};
