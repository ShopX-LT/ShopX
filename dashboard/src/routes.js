import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import UserPage from './pages/UserPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AddProductPage from './pages/AddProductPage';
import CategoriesPage from './pages/CategoriesPage';
import OrdersPage from './pages/OrdersPage';
import ReviewPages from './pages/ReviewPages';
import PayoutPage from './pages/PayoutPage';

// CONTEXT
import useAuth from './hooks/useAuth';
import PersistLogin from './components/PersistLogin';

// ----------------------------------------------------------------------

export default function Router() {
  const { auth } = useAuth();
  const location = useLocation();
  const routes = useRoutes([
    { path: 'signin', element: <SignIn /> },
    { path: 'signup', element: <SignUp /> },

    {
      element: <PersistLogin />,
      children: [
        {
          element: <RequireAuth />,
          children: [
            {
              path: '/dashboard',
              // element: auth?.token ? <DashboardLayout /> : <Navigate to="/signin" state={{ from: location }} replace />,
              element: <DashboardLayout />,

              children: [
                { element: <Navigate to="/dashboard/app" />, index: true },
                { path: 'app', element: <DashboardAppPage /> },
                // { path: 'user', element: <UserPage /> },
                { path: 'products', element: <ProductsPage /> },
                { path: 'addproduct', element: <AddProductPage /> },
                { path: 'category', element: <CategoriesPage /> },
                { path: 'orders', element: <OrdersPage /> },
                // { path: 'reviews', element: <ReviewPages /> },
                { path: 'payout', element: <PayoutPage /> },
              ],
            },
          ],
        },
      ],
    },

    {
      element: <RequireAuth />,
      children: [
        {
          element: <SimpleLayout />,
          children: [
            { element: <Navigate to="/dashboard/app" />, index: true },
            { path: '404', element: <Page404 /> },
            { path: '*', element: <Navigate to="/404" /> },
          ],
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
