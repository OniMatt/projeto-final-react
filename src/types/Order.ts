import { User } from "./User";

export interface Product {
  preco: number;
  nome: string;
}

export interface Order {
  produtosPedido: Product[];
  status: StatusEnum;
  data: string;
  cliente: User;
}

export enum StatusEnum {
  EM_PREPARO = "EM_PREPARO",
}

