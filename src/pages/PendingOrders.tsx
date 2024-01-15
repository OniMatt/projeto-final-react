import React, { useEffect, useState } from 'react';
import { List, Typography, Container, Divider } from '@mui/material';

interface Order {
  id: number;
  cliente: {
    id: number;
    email: string;
    nome?: string;
    senha?: string;
  };
  data: string;
  produtosPedido: {
    id: number;
    nome: string;
    preco: number;
  }[];
  status: string;
}

const OrderListPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8080/pedido/notDelivered');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{marginTop: 10}}>
        Lista de Pedidos
      </Typography>
      <Divider />
      {orders.map((order) => (
        <div key={order.id}>
          <List>
            <strong>Data:</strong> {order.data}
            <br />
            <strong>Status:</strong> {"EM PREPARO"}
            <br />
            <strong>Produtos:</strong>
            <ul>
              {order.produtosPedido.map((product) => (
                <li key={product.id}>
                  {product.nome} - R${product.preco.toFixed(2)}
                </li>
              ))}
            </ul>
          </List>
          <Divider />
        </div>
      ))}
    </Container>
  );
};

export default OrderListPage;
