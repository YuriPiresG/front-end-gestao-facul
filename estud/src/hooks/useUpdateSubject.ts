import { api } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useUpdateSubject() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => {
            const response = await api.put(`/subjects/${data.id}`, data);
            queryClient.refetchQueries(["subjects"]);
            console.log(response);
        }
    });
}

export { useUpdateSubject };
