import { useState } from 'react'
import './App.css'
import Login from './pages/login/Login';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Recuperar_Password from './pages/recuperar_password/Recuperar_Password';
import Panel_Lateral from './components/Panel_Lateral/Panel_Lateral';
import Sidebar from './components/Sidebar/Sidebar';




function App() {

  const LayoutExt = () => {  //Layout de las páginas externas (Login y Recuperar contraseña)
    return (
      <div className="main-login">
        <Panel_Lateral />
        <Outlet />
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
        }
      ]
    },
    {
      path: '/recuperar_password',
      element: <LayoutExt />,
      children: [
        {
          element: <Recuperar_Password />,
          path: '/recuperar_password',
        }
      ]
    },


  ]);
  
 
  return <RouterProvider router={router} />;
  
}

export default App
