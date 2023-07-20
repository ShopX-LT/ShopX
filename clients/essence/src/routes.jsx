import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import CheckoutPage from "./pages/CheckoutPage";
import VerifyPayment from "./pages/VerifyPayment";

export default function Router() {
  const routes = useRoutes([
    { path: "/", element: <Home />, index: true },
    {
      element: <Home />,
      path: "/",
    },

    { path: "/home", element: <Home /> },

    { path: "/product", element: <ProductsPage /> },
    { path: "/checkout", element: <CheckoutPage /> },
    { path: "/process-payment", element: <VerifyPayment /> },

    // When they enter an invalid store navige to the Landing page. Do this in ExtractStore
  ]);

  return routes;
}

// { path: "/", element: <Home />, index: true },
// { path: "/home", element: <Home /> },

// { path: "/product", element: <ProductsPage /> },
// { path: "/checkout", element: <CheckoutPage /> },
// { path: "/process-payment", element: <VerifyPayment /> },
