import { Container } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import React from "react";

const App = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()

  React.useEffect(() => {
    navigate("/registrar")
  }, [navigate])

  return (
    <Container>
      <Outlet />
    </Container>
  );
};

export default App;
