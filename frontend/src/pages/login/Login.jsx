import React from 'react'
import '../login/Login.css'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div>
         <div className='contenedor-login'>
          <div className='contenedor-formulario'>
            <h1>Bienvenido</h1>
            <h2>Inicia sesión para continuar</h2>
            <h3>Usuario</h3>
            <form>
              <input type = 'text' className='input1' />
            </form>
            <h3>Contraseña</h3>
            <form>
              <input type = 'password' className='input1' />
            </form>
            <button>Iniciar sesion</button> 
            <a href='#'>¿Olvidaste la contraseña?</a>
          </div>
        </div>
        <Link to="/recuperar_password">Recuperar Contraseña</Link>
    </div>
  )
}

export default Login
