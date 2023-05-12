import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../lib/api";


export const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const logout = () => {
      console.log("logout called"); // add this line
      localStorage.removeItem("access_token");
      navigate("/");
    };
    return logout;
  };
  