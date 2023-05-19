import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Matrix } from "./useCreateMatrix";


export const useGetMatrices = () => {
  return useQuery({
    queryKey: ["matrices"],
    queryFn: async () => {
      const response = await api.get<Matrix[]>("/matrix");
      return response.data;
    },
  });
};
