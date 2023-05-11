import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { UserRole } from "../constants/role";

export interface User {
  id: number;
  name: string;
  role: UserRole;
}

export const useUser = () => {
  const accessToken = localStorage.getItem("access_token");
  const response = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await api.get<User>("/users/me");
      return response.data;
    },
    enabled: !!accessToken,
  });
  return response.data;
};
