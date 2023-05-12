import React from 'react'
import LoginScreen from './LoginScreen'
import { useUser } from "../hooks/useUser";
import { Link } from 'react-router-dom';

function CoordinatorScreen() {
  const user= useUser()
  return (
    <>
      <div className="dashboard">
        <h1>Bem vindo ao seu dashboard, {user?.name} </h1>
        <Link to="/create-course" className="link"> Função 1 </Link> <br />
        <Link to="/get-courses" className="link"> Função 2 </Link>
      </div>
    </>
  )
}

export default CoordinatorScreen