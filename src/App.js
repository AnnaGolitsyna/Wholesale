import React, { lazy } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { brandTheme } from './styles/brandTheme';
import { AuthProvider } from './features/authentication/hook/useAuth';
import ProtectedRoute from './features/authentication/components/ProtectedRoute';

// Layout Components
import AdaptiveLayoutWrapper from './pages/layout/AdaptiveLayoutWrapper';
import ErrorPage from './pages/errors/ErrorPage';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ProfilePage from './pages/auth/ProfilePage';

// Regular Pages
import DashboardPage from './pages/Dashboard';
import AdminPage from './pages/adminPage/AdminPage';

// Lazy-loaded Pages
const InvoiceListPage = lazy(() => import('./pages/InvoiceList'));
const ContractorsPage = lazy(() => import('./pages/Contractors'));
const PaymentsPage = lazy(() => import('./pages/Payments'));
const ReceivablePage = lazy(() => import('./pages/Receivable'));
const ContractorReceivablePage = lazy(() =>
  import('./pages/ContractorReceivable')
);

// Import Adaptive Goods Page (supports both mobile and desktop)
const AdaptiveGoodsPage = lazy(() => import('./pages/Goods'));

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
          element: <AdaptiveLayoutWrapper />, // Now uses adaptive layout
          children: [
            { path: '/', element: <DashboardPage /> },
            { path: 'invoices/:docType', element: <InvoiceListPage /> },
            { path: 'contractors', element: <ContractorsPage /> },
            { path: 'goods', element: <AdaptiveGoodsPage /> }, // Updated to use adaptive version
            { path: 'payments', element: <PaymentsPage /> },
            { path: 'receivables', element: <ReceivablePage /> },
            {
              path: 'receivables/:id/:name',
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
