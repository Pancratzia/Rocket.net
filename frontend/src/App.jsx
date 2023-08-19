import { useState } from 'react'
import './App.css';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/login/Login';
import Recuperar_Password from './pages/recuperar_password/Recuperar_Password';
import Panel_Lateral from './components/Panel_Lateral/Panel_Lateral';
import Sidebar from './components/Sidebar/Sidebar';




function App() {

  const LayoutExt = () => {  //Layout de las páginas externas (Login y Recuperar contraseña)
    return (
      <div className="main-login">
        <div className="video-bg">
          <video className="video" autoPlay loop muted>
            <source src="./estrellas.mp4" type="video/mp4"/>
            <source src="./estrellas.webm" type="video/webm"/>
          </video>
        </div>
        <div className="contenedor-panel">
        <Panel_Lateral />
        <Outlet />
        </div>
      </div>
    );
  };

  const LayoutSidebar = () => { //Layout de las páginas internas (Dashboard y todo lo que esté dentro)
    return (
      <div className="main">
        <Outlet />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LayoutSidebar />,
      children: [
        {
          element: <Sidebar />,
          path: '/',
        }
        ,
        {
          // Aquí se agregan las rutas para el dashboard
        },
      ],
    },


    {
      path: '/',
      element: <LayoutExt />,
      children: [
        {
          element: <Login />,
          path: '/login',
        },
        {
          element: <Recuperar_Password />,
          path: '/recuperar_password',
        }
      ]
    }


  ]);
  
 
  return <RouterProvider router={router} />;
  
}

export default App
