import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";

interface User {
  username: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: User) => {
      const response = await api.post("/users",{
        ...data,
        role: +data.role,
      });
      queryClient.refetchQueries(["users"]);
      console.log(response);
    },
  });
};
