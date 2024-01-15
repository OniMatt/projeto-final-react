//import React from 'react'
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { CssBaseline } from "@mui/material";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
      {/* <React.StrictMode> */}
    <CssBaseline />
      <RouterProvider router={router} />
  {/* </React.StrictMode> */}
    </AuthProvider>
  // Stric mode o react usa par averificar se tem algum problema
  // de vazamento de memoria como adicionar eventos multiplos ao window citado em aula
);
