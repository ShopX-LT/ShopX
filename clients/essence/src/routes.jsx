import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";

export default function Router({ styles }) {
  const routes = useRoutes([
    { path: "/", element: <Home styles={styles} />, index: true },
    { path: "/home", element: <Home styles={styles} /> },

    { path: "/product", element: <ProductsPage styles={styles} /> },
  ]);

  return routes;
}
