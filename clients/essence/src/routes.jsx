import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import CheckoutPage from "./pages/CheckoutPage";
import VerifyPayment from "./pages/VerifyPayment";

export default function Router({ styles }) {
  const routes = useRoutes([
    { path: "/", element: <Home />, index: true },
    { path: "/home", element: <Home /> },

    { path: "/product", element: <ProductsPage /> },
    { path: "/checkout", element: <CheckoutPage /> },
    { path: "/process-payment", element: <VerifyPayment /> },
  ]);

  return routes;
}
