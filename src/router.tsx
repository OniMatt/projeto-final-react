import { createBrowserRouter } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import Order from "./pages/Order";
import PendingOrders from "./pages/PendingOrders";

export const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/registrar",
    element: <SignUp />,
  },
  {
    path: "/entrar",
    element: <SignIn />
  },
  {
    path: "/pedido",
    element: <Order />,
  },
  {
    path: "/pedidosPendentes",
    element: <PendingOrders />,
  },
  {
    path: "/*",
    element: <PageNotFound />,
  }
]);
