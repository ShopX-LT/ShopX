import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LegacyLayout from './layout/LegacyLayout';
import ProductsPage from './pages/ProductsPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import SuccessPage from './pages/SuccessPage';
import PageNotFound from './pages/PageNotFound';

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <LegacyLayout navStyle="legacy" />,
      children: [
        { element: <Navigate to="/home" />, index: true },
        { path: 'home', element: <HomePage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'checkout', element: <CheckoutPage /> },
        { path: 'payment-success', element: <SuccessPage /> },
      ],
    },
    { path: '404', element: <PageNotFound /> },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
  return routes;
}
