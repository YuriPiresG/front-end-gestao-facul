import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

interface User {
    username: string;
    name: string;
    email: string;
    password: string;
    role: number;
  }

export const useGetUser = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await api.get<User>(`/user/${id}`);
      return response.data;
    },
  });
};
