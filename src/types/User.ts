export interface User {
  id: number
  nome: string
  email: string
  senha: string
  telefone: string
}

export type LoginParam = Pick<User, "email" | "senha">;