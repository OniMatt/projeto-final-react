import { Copyright, LunchDiningTwoTone } from "@mui/icons-material"
import { Avatar, Box, Button, Container, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()

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
          <LunchDiningTwoTone />
        </Avatar>
        <Typography variant="h5" component="h1">
          Opções
        </Typography>
        <Button onClick={()=>{
          navigate("/pedido")
        }} fullWidth variant="contained">
          Registrar pedido
        </Button>
        <Button onClick={()=>{
          navigate("/pedidosPendentes")
        }} fullWidth variant="contained">
          Consultar pedidos
        </Button>
      </Box>
      <Box m={0} sx={{ width: "100%" }}></Box>
      <Copyright />
    </Container>
  )
}

export default Home