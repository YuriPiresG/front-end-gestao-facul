import { Box, Button, LoadingOverlay, Table } from "@mantine/core";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdDeleteForever, MdEditSquare } from "react-icons/md";
import { useParams } from "react-router-dom";
import { DayOfTheWeek } from "../constants/dayOfTheWeek";
import { Periods } from "../constants/periods";
import { useGetCalendarById } from "../hooks/useGetCalendarById";
import { CalendarDay } from "../hooks/useGetCalendarDays";
import CreateCalendarDay from "./CreateCalendarDay";
import DeleteCalendarDay from "./DeleteCalendarDay";
import UpdateCalendarDay from "./UpdateCalendarDay";

interface Row {
  professor: string;
  subject: string;
  calendarDay: CalendarDay | null;
  period: Periods;
  dayOfTheWeek: string;
}

function GetCalendarDays() {
  const AllPeriods = Object.values(Periods);
  const ALLDAYS = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  const params = useParams();
  const [newDay, setNewDay] = useState<null | {
    calendarId: number;
    period: Periods;
    dayOfTheWeek: DayOfTheWeek;
  }>(null);
  const { data: calendar, isLoading } = useGetCalendarById(params.id as string);
  const [selectedCalendarDayToUpdate, setSelectedCalendarDayToUpdate] =
    useState<CalendarDay | null>(null);
  const [selectedCalendarDayToDelete, setSelectedCalendarDayToDelete] =
    useState<CalendarDay | null>(null);
  const calendarDays = calendar?.calendarDays || [];
  const valor: Record<string, Row>[] = [];
  AllPeriods.forEach((period) => {
    const valor2: Record<string, Row> = {};
    ALLDAYS.forEach((day) => {
      const foundCalendarDay = calendarDays.find(
        (calendarDay) =>
          calendarDay.period.includes(period) &&
          calendarDay.dayOfTheWeek === day
      );
      valor2[day] = {
        period: period,
        professor: foundCalendarDay?.professor
          .map((professor) => professor.user.name)
          .join(", ") as string,
        subject: foundCalendarDay?.subject.name as string,
        calendarDay: foundCalendarDay || null,
        dayOfTheWeek: day,
      };
    });
    valor.push(valor2);
  });
  function formatCalendarDay(value: Row) {
    if (!value.calendarDay) {
      return (
        <Box>
          <Button
            sx={{
              opacity: 0,
              "&:hover": {
                opacity: 1,
              },
              transition: "opacity 200ms ease",
            }}
            onClick={() => {
              setNewDay({
                calendarId: calendar?.id as number,
                period: value.period,
                dayOfTheWeek: value.dayOfTheWeek as DayOfTheWeek,
              });
            }}
          >
            <AiOutlinePlus />
          </Button>
        </Box>
      );
    }
    return (
      <div style={{ display: "flex" }}>
        <div>
          {value.professor}
          <br />
          {value.subject}
          <br />
        </div>
        <div>
          <MdEditSquare />
          <MdDeleteForever
            onClick={() => {
              setSelectedCalendarDayToDelete(value.calendarDay);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <CreateCalendarDay
        open={!!newDay}
        close={() => setNewDay(null)}
        calendarId={newDay?.calendarId as number}
        period={newDay?.period as Periods}
        dayOfTheWeek={newDay?.dayOfTheWeek as DayOfTheWeek}
      />

      <DeleteCalendarDay
        open={!!selectedCalendarDayToDelete}
        close={() => {
          setSelectedCalendarDayToDelete(null);
        }}
        calendarDay={selectedCalendarDayToDelete as any}
      />

      <br />
      <h2>Dias calendario</h2>
      <Box pos={"relative"}>
        <LoadingOverlay visible={isLoading} overlayBlur={1} />
        <Table>
          <thead>
            <tr>
              <th>Período</th>
              <th>Segunda</th>
              <th>Terça</th>
              <th>Quarta</th>
              <th>Quinta</th>
              <th>Sexta</th>
              <th>Sábado</th>
            </tr>
          </thead>
          <tbody>
            {valor.map((day, index) => (
              <tr key={index}>
                <td>{day.MONDAY.period}</td>
                <td>{formatCalendarDay(day.MONDAY)}</td>
                <td>{formatCalendarDay(day.TUESDAY)}</td>
                <td>{formatCalendarDay(day.WEDNESDAY)}</td>
                <td>{formatCalendarDay(day.THURSDAY)}</td>
                <td>{formatCalendarDay(day.FRIDAY)}</td>
                <td>{formatCalendarDay(day.SATURDAY)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
      {selectedCalendarDayToUpdate && (
        <UpdateCalendarDay
          open={!!selectedCalendarDayToUpdate}
          close={() => {
            setSelectedCalendarDayToUpdate(null);
          }}
          calendarDay={selectedCalendarDayToUpdate as any}
        />
      )}
      {selectedCalendarDayToDelete && (
        <DeleteCalendarDay
          open={!!selectedCalendarDayToDelete}
          close={() => {
            setSelectedCalendarDayToDelete(null);
          }}
          calendarDay={selectedCalendarDayToDelete as any}
        />
      )}
    </div>
  );
}

export default GetCalendarDays;
