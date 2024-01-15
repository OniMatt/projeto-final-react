import LockOutlined from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Container,
  Typography,
} from "@mui/material";

import React from "react";
import { Link as RouterNavigate, useNavigate } from "react-router-dom";
import Copyright from "../components/Copyright";
import { onEnterKeydown } from "../utils/windowUtils";
import ProductSelect from "../components/ProductSelect";
import { Order } from "../types/Order";

function Order() {
  const navigate = useNavigate();
  const submitRef = React.useRef<HTMLButtonElement>(null)
 
  const handleSubmit = (order: Order) => {
    fetch('http://localhost:8080/pedido', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Order sent successfully:', data);
      })
      .catch((error) => {
        console.error('Error sending order:', error);
      });
  };

  React.useEffect(() => onEnterKeydown(() => submitRef.current?.click()), []);

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
        onSubmit={() => handleSubmit}
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
          Registrar pedido
        </Typography>
        <ProductSelect onSubmit={handleSubmit} />
      </Box>
      <Box m={0} sx={{ width: "100%" }}></Box>
      <Copyright />
    </Container>
  );
}

export default Order;
