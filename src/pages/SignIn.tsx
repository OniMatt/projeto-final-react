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

import { Link as RouterLink, useNavigate } from "react-router-dom";
import Copyright from "../components/Copyright";
import React from "react";
import useAuth from "../hooks/useAuth";
import { onEnterKeydown } from "../utils/windowUtils";

function SignIn() {
  const navigate = useNavigate()
  const { isAuthenticated, login } = useAuth()
  const [nameError, setNameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  

  const nomeRef = React.useRef<HTMLInputElement>(null)
  const emailRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)

  const submit = React.useCallback(() => {
    const name = nomeRef.current?.value
    const email = emailRef.current?.value
    const senha = passwordRef.current?.value

    if (!name || name.length < 3) {
      setNameError("Nome inválido!")
      return;
    }
    if (!email || !email.includes("@")) {
      setEmailError("Email inválido!")
      return;
    }
    if (!senha || senha.length < 8) {
      setPasswordError("Senha insegura!")
      return;
    }

    const user = { name, email };
    localStorage.setItem("user", JSON.stringify(user)); 

    login({email, senha})
  }, [login]);

  React.useEffect(() => {
    if (isAuthenticated()) navigate("/home");
  }, [isAuthenticated, navigate]);

  React.useEffect(() => onEnterKeydown(submit), [submit])

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
          Entrar
        </Typography>
        <TextField
          fullWidth
          inputRef={nomeRef}
          name="nome"
          id="name"
          label="Nome Completo"
          variant="outlined"
          autoComplete="name"
          error={!!nameError}
          helperText={nameError}
        />
        <TextField
          fullWidth
          inputRef={emailRef}
          name="email"
          id="email-address"
          label="Endereço de Email"
          variant="outlined"
          autoComplete="email"
          error={!!emailError}
          helperText={emailError}
        />
        <TextField
          fullWidth
          inputRef={passwordRef}
          name="password"
          error={!!passwordError}
          helperText={passwordError}
          id="password"
          type="password"
          label="Senha"
          variant="outlined"
          autoComplete="password"
        />
        <Typography variant="caption">
          Não possui cadastro?{" "}
          <Link component={RouterLink} to={"/registrar"}>
            clique aqui
          </Link>
          .
        </Typography>
        <Button onClick={submit} fullWidth variant="contained">
          Entrar
        </Button>
      </Box>
      <Box m={0} sx={{ width: "100%" }}></Box>
      <Copyright />
    </Container>
  );
}

export default SignIn;
