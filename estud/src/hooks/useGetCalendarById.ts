import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";
import { Calendar } from "./useGetCalendars";
import { CalendarDay } from "./useGetCalendarDays";

type CalendarWithCalendarDays = Calendar & { calendarDays: CalendarDay[] };

export const useGetCalendarById = (id: string) => {
  return useQuery({
    queryKey: ["calendar-day"],
    queryFn: async () => {
      const response = await api.get<CalendarWithCalendarDays>(`/calendar/${id}`);
      return response.data;
    },
  });
};
