import React from 'react'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div>
        Login

        <Link to="/recuperar_password">Recuperar Contraseña</Link>
    </div>
  )
}

export default Login