import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DayOfTheWeek } from "../constants/dayOfTheWeek";
import { Periods } from "../constants/periods";
import { api } from "../lib/api";

export interface CalendarDay {
  dayOfTheWeek: DayOfTheWeek;
  calendarId: number;
  subject: number;
  period: Periods[];
  professor: number[];
}

export const useCreateCalendarDay = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CalendarDay) => {
      const response = await api.post("/calendar-day", data);
      queryClient.refetchQueries(["calendar-days"]);
    },
  });
};
