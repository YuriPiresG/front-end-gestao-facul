import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DayOfTheWeek } from "../constants/dayOfTheWeek";
import { Periods } from "../constants/periods";
import { api } from "../lib/api";

interface CalendarDay {
  dayOfTheWeek: DayOfTheWeek;
  period: Periods[];
  calendar: number;
  subject: string;
  professor: number[];
}

export const useCreateCalendarDay = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CalendarDay) => {
      const response = await api.post("/calendar-day", data);
      console.log(response);
      queryClient.refetchQueries(["calendar"]);
    },
    
  });
};
