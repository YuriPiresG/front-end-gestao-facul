import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";

interface User {
  username: string;
  name: string;
  email: string;
  password: string;
  role: number;
}

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: User) => {
      const response = await api.post("/users", data);
      queryClient.refetchQueries(["users"]);
      console.log(response);
    },
  });
};
