import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Order, Product, StatusEnum } from '../types/Order';
import { Button, List } from '@mui/material';
import { User } from '../types/User';

const products = [
  { preco: 35.0, nome: "Hambúrguer de Risoto de Camarão" },
  { preco: 20.0, nome: "Hambúrguer de Macarrão à Bolonhesa" },
  { preco: 30.0, nome: "Hambúrguer de Fettuccine ao Molho Alfredo" },
  { preco: 25.0, nome: "Hambúrguer de Filé Mignon ao Molho Madeira" },
  { preco: 25.0, nome: "Hambúrguer de Gnocchi de Ricota" },
  { preco: 5.0, nome: "Del Valle de Morango" },
  { preco: 8.0, nome: "Dolly Limão" },
  { preco: 19.0, nome: "Charrua Safra 1980 Envelhecido" },
  { preco: 5.0, nome: "Chá Matte Leão" },
  { preco: 5.0, nome: "Cerveja Pilsen" }
];

interface ProductSelectProps {
  onSubmit: (order: Order) => void;
}

function ProductSelect({ onSubmit }: ProductSelectProps) {
  const [selectedProducts, setSelectedProducts] = React.useState([]);

  const handleChange = (event: any) => {
    setSelectedProducts(event.target.value);
  };

  const calculateTotalValue = () => {
    return selectedProducts.reduce(
      (total, selectedProduct) =>
        total + (products.find((product) => product.nome === selectedProduct)?.preco ?? 0),
      0
    );
  };

  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  }

  React.useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      console.log("User details retrieved:", user);
    }
  }, []);

  const storedUser = localStorage.getItem("user")
  const user: User = storedUser ? JSON.parse(storedUser) : {}

  const buildOrder = (): Order => {
    const selectedProductsDetails: Product[] = selectedProducts
      .map((selectedProduct) => products.find((product) => product.nome === selectedProduct))
      .filter((product): product is Product => !!product);
  
    const order: Order = {
      produtosPedido: selectedProductsDetails,
      status: StatusEnum.EM_PREPARO,
      data: getCurrentDate(),
      cliente: user
    };
  
    return order;
  };

  const sendOrder = () => {
    const order = buildOrder();
    onSubmit(order);
  };

  return (
    <div>
      <FormControl sx={{ width: 418 }}>
        <InputLabel id="demo-multiple-name-label">Produtos</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={selectedProducts}
          onChange={handleChange}
          input={<OutlinedInput label="Produtos" />}
        >
          {products.map((product) => (
            <MenuItem
              key={product.nome}
              value={product.nome}
            >
              {product.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>  

      <div>
        <h2>Produtos selecionados:</h2>
          <List>
            {selectedProducts.map((selectedProduct) => (
              <li key={selectedProduct}>{selectedProduct}</li>
            ))}
          </List>
          <p>Valor Total: R${calculateTotalValue().toFixed(2)}</p>
      </div> 
      <Button
          onClick={sendOrder}
          type="submit"
          fullWidth
          variant="contained"
        >
          Pedir
        </Button>
    </div>
  );
};

export default ProductSelect;