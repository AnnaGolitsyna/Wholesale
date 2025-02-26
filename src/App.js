import React, { lazy } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { brandTheme } from './styles/brandTheme';
import { AuthProvider } from './features/authentication/hook/useAuth';
import ProtectedRoute from './features/authentication/components/ProtectedRoute';

import LayoutWrapper from './pages/layout/LayoutWrapper';
import DashboardPage from './pages/Dashboard';
import ErrorPage from './pages/errors/ErrorPage';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import AdminPage from './pages/adminPage/AdminPage';
import ProfilePage from './pages/auth/ProfilePage';

const InvoiceListPage = lazy(() => import('./pages/InvoiceList'));
const ContractorsPage = lazy(() => import('./pages/Contractors'));
const GoodsPage = lazy(() => import('./pages/Goods'));
const PaymentsPage = lazy(() => import('./pages/Payments'));
const ReceivablePage = lazy(() => import('./pages/Receivable'));
const ContractorReceivablePage = lazy(() =>
  import('./pages/ContractorReceivable')
);

// const AppRoutes = () => {
//   let element = useRoutes([
//     {
//       path: '/',
//       element: <LayoutWrapper />,
//       children: [
//         { path: '/', element: <DashboardPage /> },
//         { path: 'invoices/:docType', element: <InvoiceListPage /> },
//         { path: 'contractors', element: <ContractorsPage /> },
//         { path: 'goods', element: <GoodsPage /> },
//         { path: 'payments', element: <PaymentsPage /> },
//         { path: 'receivables', element: <ReceivablePage /> },
//         {
//           path: 'receivables/:id/:name',
//           element: <ContractorReceivablePage />,
//         },
//         { path: 'admin', element: <AdminPage /> },
//         { path: '*', element: <ErrorPage /> },
//       ],
//     },
//   ]);

//   return element;
// };

const AppRoutes = () => {
  let element = useRoutes([
    // Public routes - accessible without authentication
    { path: '/login', element: <LoginPage /> },
    { path: '/signup', element: <SignUpPage /> },
    { path: '/forgot-password', element: <ForgotPasswordPage /> },

    // Protected routes - require authentication
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: '/',
          element: <LayoutWrapper />,
          children: [
            { path: '/', element: <DashboardPage /> },
            { path: 'invoices/:docType', element: <InvoiceListPage /> },
            { path: 'contractors', element: <ContractorsPage /> },
            { path: 'goods', element: <GoodsPage /> },
            { path: 'payments', element: <PaymentsPage /> },
            { path: 'receivables', element: <ReceivablePage /> },
            {
              path: 'receivables/:id',
              element: <ContractorReceivablePage />,
            },
            { path: 'admin', element: <AdminPage /> },
            { path: 'profile', element: <ProfilePage /> },
          ],
        },
      ],
    },

    // 404 route
    { path: '*', element: <ErrorPage /> },
  ]);

  return element;
};

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ConfigProvider theme={brandTheme}>
          <AuthProvider>
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </AuthProvider>
        </ConfigProvider>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
