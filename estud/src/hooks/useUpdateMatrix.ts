import { api } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useUpdateMatrix() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => {
            const response = await api.put(`/matrix/${data.id}`, data);
            queryClient.refetchQueries(["matrices"]);
        }
    });
}

export { useUpdateMatrix };
