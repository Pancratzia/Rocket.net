import { useState } from 'react'
import './App.css'
import Login from './pages/login/Login';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Recuperar_Password from './pages/recuperar_password/Recuperar_Password';
import Panel_Lateral from './components/Panel_Lateral/Panel_Lateral';




function App() {

  const Layout = () => {
    return (
      <div className="main-login">
        <Panel_Lateral />
        <Outlet />
      </div>
    );
  };

  const router = createBrowserRouter([

    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/recuperar_password",
          element: <Recuperar_Password />,
        },
      ],
    },

  ]);
  
 
  return <RouterProvider router={router} />;
  
}

export default App
