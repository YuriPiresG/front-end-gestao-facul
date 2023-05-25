import { useQuery } from "@tanstack/react-query";
import { ProfessorWithUser } from "../components/GetProfessors";
import { DayOfTheWeek } from "../constants/dayOfTheWeek";
import { Periods } from "../constants/periods";
import { api } from "../lib/api";
import { Calendar } from "./useGetCalendars";
import { Subject } from "./useGetSubjects";

export interface CalendarDay {
  id: number;
  dayOfTheWeek: DayOfTheWeek;
  period: Periods[];
  calendar: Calendar;
  subject: Subject;
  professor: ProfessorWithUser[];
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
