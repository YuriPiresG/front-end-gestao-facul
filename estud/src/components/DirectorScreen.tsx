import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";



function DirectorScreen() {
  const user = useUser();
  return (
    <>
      <div className="dashboard">
        <h1>Bem vindo ao seu dashboard, {user?.name} </h1>
        <Link to="/create-course" className="link"> Criar curso </Link> <br />
        <Link to="/get-courses" className="link"> Ver cursos existentes </Link>
      </div>
    </>
  );
}

export default DirectorScreen;
