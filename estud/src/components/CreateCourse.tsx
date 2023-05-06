import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface FormEvent extends React.ChangeEvent<HTMLSelectElement> {
  target: HTMLSelectElement;
}

interface Course {
  name: string;
  coordinatorId: number;
  durationHours: number;
  quantityClass: number;
  quantitySemester: number;
  periods: string[];
}
function CreateCourse() {
  const [name, setName] = useState("");
  const [coordinatorId, setCoordinatorId] = useState("");
  const [durationHours, setDurationHours] = useState("");
  const [quantityClass, setQuantityClass] = useState("");
  const [quantitySemester, setQuantitySemester] = useState("");
  const [periods, setPeriods] = useState<string[]>([]);

  const handlePeriodsChange = (event: FormEvent) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setPeriods(selectedOptions);
  };

  axios
    .post("http://localhost:3000/course", {
      name,
      coordinatorId,
      durationHours,
      quantityClass,
      quantitySemester,
      periods,
    })
    .then((res) => {
      const course: Course = res.data.course;
      toast.success("Course created sucessfully");
      console.log(course);
    })
    .catch((err) => {
      console.log(err);
      toast.error("Invalid course");
    });

  return (
    <>
      <form>
        <label htmlFor="name">Nome do curso</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="coordinatorId">Id do coordenador</label>
        <input type="number" name="coordinatorId" id="coordinatorId" />
        <label htmlFor="durationHours">Quantidade de horas</label>
        <input type="number" name="durationHours" id="durationHours" />
        <label htmlFor="quantityClass">Quantidade de aulas</label>
        <input type="number" name="quantityClass" id="quantityClass" />
        <label htmlFor="quantitySemester">Quantidade de Semestres</label>
        <input type="number" name="quantitySemester" id="quantitySemester" />
        <label htmlFor="periods">Períodos</label>
        <input type="text" name="periods" id="periods" />
        {/* <label>
          Periods:
          <select multiple onChange={handlePeriodsChange}>
            <option>M1</option>
            <option>M2</option>
            <option>T1</option>
            <option>T2</option>
          </select>
        </label> */}
        <button type="submit">Criar curso</button>
      </form>
    </>
  );
}
export default CreateCourse;
