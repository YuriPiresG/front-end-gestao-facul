import React from "react";
import { Link } from "react-router-dom";
import {} from "./DashboardStyle.css"

interface Props {
  name: string;
}

function DirectorScreen(props: Props) {
  return (
    <>
      <div className="dashboard">
        <h1>Bem vindo ao seu dashboard, {props.name} </h1>
        <Link to="/create-course" className="link"> Criar curso </Link>
      </div>
    </>
  );
}

export default DirectorScreen;
