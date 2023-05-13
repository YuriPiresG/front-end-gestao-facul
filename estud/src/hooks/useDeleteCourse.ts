import { api } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDeleteCourse() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            const response = await api.delete(`/course/${id}`);
            queryClient.invalidateQueries(["course"]);
        }
    });
}

export { useDeleteCourse };
