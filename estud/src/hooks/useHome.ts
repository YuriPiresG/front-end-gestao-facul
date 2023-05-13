import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";


export const useHome = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const home = () => {
      navigate("/home");
    };
    return home;
  };
  