import { useQuery } from "@tanstack/react-query";
import { DayOfTheWeek } from "../constants/dayOfTheWeek";
import { Periods } from "../constants/periods";
import { api } from "../lib/api";
import { Professor } from "./useCreateProfessor";
import { Calendar } from "./useGetCalendars";
import { Subject } from "./useGetSubjects";

export interface CalendarDay {
  id: number;
  dayOfTheWeek: DayOfTheWeek;
  period: Periods[];
  calendar: Calendar;
  subject: Subject;
  professor: Professor[];
}

export const useGetCalendarDays = () => {
  return useQuery({
    queryKey: ["calendar-day"],
    queryFn: async () => {
      const response = await api.get<CalendarDay[]>("/calendar-day");
      return response.data;
    },
  });
};
