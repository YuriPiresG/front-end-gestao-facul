import { DayOfTheWeek } from "../constants/dayOfTheWeek";
import { Periods } from "../constants/periods";
import { api } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateCalendarDay {
  id: number;
  dayOfTheWeek: DayOfTheWeek;
  period: Periods[];
  calendarId: number;
  subject: string;
  professor: string[];
}

function useUpdateCalendarDay() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: UpdateCalendarDay) => {
      const response = await api.put(`/calendar-day/${data.id}`, {
        ...data,
        subject: +data.subject,
        professor: data.professor.map((professor) => +professor),
      });
      queryClient.refetchQueries(["calendar-days"]);
      console.log(response);
    },
  });
}

export { useUpdateCalendarDay };
