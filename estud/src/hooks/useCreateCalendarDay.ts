import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DayOfTheWeek } from "../constants/dayOfTheWeek";
import { Periods } from "../constants/periods";
import { api } from "../lib/api";

interface CalendarDay {
  dayOfTheWeek: DayOfTheWeek;
  period: Periods[];
  calendarId: number;
  subject: string;
  professor: string[];
}

export const useCreateCalendarDay = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CalendarDay) => {
      const response = await api.post("/calendar-day", {
        ...data,
        subject: +data.subject,
        professor: data.professor.map((professor) => +professor),
      });
      queryClient.refetchQueries(["calendar-day"]);
    },
  });
};
