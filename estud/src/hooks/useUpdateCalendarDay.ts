import { api } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useUpdateCalendarDay() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: any) => {
            const response = await api.put(`/calendar-day/${data.id}`, data);
            queryClient.refetchQueries(["calendar-days"]);
        }
    });
}

export { useUpdateCalendarDay };
