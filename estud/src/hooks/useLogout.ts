import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";


export const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const logout = () => {
      localStorage.removeItem("access_token");
      navigate("/");
    };
    console.log(queryClient);
    return logout;
  };
  