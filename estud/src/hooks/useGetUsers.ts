import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  password: string;
  role: number;
}

const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await api.get<User[]>("/users");
      return response.data;
    },
  });
};

export default useUsers;
