import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../lib/api";

interface User {
  name: string;
  role: number;
}

interface Payload {
  username: string;
  password: string;
}

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: Payload) => {
      const response = await api.post("/auth/login", data);
      const user: User = response.data.user;
      localStorage.setItem("access_token", response.data.access_token);
      queryClient.setQueryData(["me"], user);
      toast.success("Login successful");
      navigate("/home");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Invalid username or password");
    },
  });
};
