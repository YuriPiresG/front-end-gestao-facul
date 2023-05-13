import { api } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useUpdateCourse() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => {
            const response = await api.put(`/course/${data.id}`, data);
            queryClient.invalidateQueries(["course"]);
        }
    });
}

export { useUpdateCourse };
