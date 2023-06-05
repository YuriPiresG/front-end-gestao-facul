import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";

interface Calendar {
  course: string;
  semester: number;
  isActive: string;
}

export const useCreateCalendar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Calendar) => {
      const response = await api.post("/calendar", {
        ...data,
        course: +data.course,
        isActive: data.isActive === "true" ? true : false,
      });
      queryClient.refetchQueries(["calendar"]);
      console.log(response);
    },
  });
};
