import { LoginParam, User } from "../types/User";

const db: User[] = [];

export async function signIn({ email, senha }: LoginParam) {
  const response = await fetch('http://localhost:8080/cliente?' + email);
  let data = await response.json();
  data = Object.fromEntries(data.entries()) as unknown as User;
  if(data.email === email && data.senha === senha) {
    return data;
  }
  return new Error("Email e/ou senha invalido!")
}

export async function signUp(params: User) {
  const response = await fetch('http://localhost:8080/cliente?' + params.email);
  let data = await response.json();
  data = Object.fromEntries(data.entries()) as unknown as User;
  if(data.email === params.email)
    return new Error("Usuario já cadastrado!")
  db.push(params)
}