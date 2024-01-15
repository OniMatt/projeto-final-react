import LockOutlined from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";

import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Copyright from "../components/Copyright";
import useAuth from "../hooks/useAuth";
import { User } from "../types/User";
import { onEnterKeydown } from "../utils/windowUtils";

function SignUp() {
  const navigate = useNavigate();
  const { isAuthenticated, register } = useAuth();
  const submitRef = React.useRef<HTMLButtonElement>(null)

  const submit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries()) as unknown as User;
    data.id = 1
    register(data)
    navigate("/entrar")
  }, [navigate, register]);

  React.useEffect(() => {
    if (isAuthenticated()) navigate("/entrar");
  }, [isAuthenticated, navigate]);

  React.useEffect(() => onEnterKeydown(() => submitRef.current?.click()), [submit]);

  return (
    <Container
      sx={{
        flexWrap: "wrap",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={submit}
        p={2}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={2}
        sx={{
          maxWidth: "450px",
          minWidth: "420px",
        }}
      >
        <Avatar
          sx={(theme) => ({ backgroundColor: theme.palette.primary.main })}
        >
          <LockOutlined />
        </Avatar>
        <Typography variant="h5" component="h1">
          Registrar
        </Typography>
        <TextField
          fullWidth
          name="nome"
          id="first-name"
          label="Nome"
          variant="outlined"
        />
        <TextField
          fullWidth
          name="email"
          id="email-address"
          label="Endereço de Email"
          variant="outlined"
          autoComplete="email"
        />
        <TextField
          fullWidth
          name="senha"
          id="senha"
          label="Senha"
          variant="outlined"
          type="password"
          autoComplete="password"
        />
        <TextField
          fullWidth
          name="telefone"
          id="phone"
          label="Telefone"
          variant="outlined"
          type="number"
          autoComplete="phone"
        />
        <Typography variant="caption">
          Já possui cadastro?{" "}
          <Link component={RouterLink} to={"/entrar"}>
            clique aqui
          </Link>
          .
        </Typography>
        <Button ref={submitRef} type="submit" fullWidth variant="contained">
          Registrar
        </Button>
      </Box>
      <Box m={0} sx={{ width: "100%" }}></Box>
      <Copyright />
    </Container>
  );
}

export default SignUp;
