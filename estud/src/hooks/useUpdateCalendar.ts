import { api } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useUpdateCalendar() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => {
            const response = await api.put(`/calendar/${data.id}`, data);
            queryClient.refetchQueries(["calendars"]);
            console.log(response);
        }
    });
}

export { useUpdateCalendar };
