import React, { lazy } from 'react';
import { BrowserRouter, useRoutes, Navigate } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { brandTheme } from './styles/brandTheme';
import { AuthProvider } from './features/authentication/hook/useAuth';
import ProtectedRoute from './features/authentication/components/ProtectedRoute';

// Layout Components
import AdaptiveLayoutWrapper from './pages/layout/AdaptiveLayoutWrapper';
import ClientPortalLayout from './pages/layout/ClientPortalLayout';
import ErrorPage from './pages/errors/ErrorPage';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ProfilePage from './pages/auth/ProfilePage';

// Regular Pages
import AdaptiveHomePage from './pages/Dashboard';
import AdminPage from './pages/adminPage/AdminPage';

// Lazy-loaded Pages
const InvoiceListPage = lazy(() => import('./pages/InvoiceList'));
const ContractorsPage = lazy(() => import('./pages/Contractors'));
const PaymentsPage = lazy(() => import('./pages/Payments'));
const ContractorReceivablePage = lazy(
  () => import('./pages/ContractorReceivable'),
);
const AdaptiveOrderProcessingPage = lazy(
  () => import('./pages/OrderProcessing'),
);
const AdaptiveGoodsPage = lazy(() => import('./pages/Goods'));
const AdaptiveReceivablePage = lazy(() => import('./pages/Receivable'));
const ClientPortalPage = lazy(() => import('./pages/ClientPortal'));

const AppRoutes = () => {
  let element = useRoutes([
    // Public routes - accessible without authentication
    { path: '/login', element: <LoginPage /> },
    { path: '/signup', element: <SignUpPage /> },
    { path: '/forgot-password', element: <ForgotPasswordPage /> },

    // Client portal - protected, only for clients
    {
      path: '/client-portal',
      element: <ProtectedRoute allowedRoles={['client']} />,
      children: [
        {
          element: <ClientPortalLayout />,
          children: [
            {
              index: true,
              element: (
                <React.Suspense fallback={<div>Loading...</div>}>
                  <ClientPortalPage />
                </React.Suspense>
              ),
            },
          ],
        },
      ],
    },

    // Admin/Operator routes - protected
    {
      element: <ProtectedRoute allowedRoles={['admin', 'operator']} />,
      children: [
        {
          path: '/',
          element: <AdaptiveLayoutWrapper />,
          children: [
            { index: true, element: <AdaptiveHomePage /> },
            { path: 'invoices/:docType', element: <InvoiceListPage /> },
            { path: 'contractors', element: <ContractorsPage /> },
            { path: 'goods', element: <AdaptiveGoodsPage /> },
            { path: 'payments', element: <PaymentsPage /> },
            { path: 'receivables', element: <AdaptiveReceivablePage /> },
            {
              path: 'receivables/:id/:name',
              element: <ContractorReceivablePage />,
            },
            { path: 'orders', element: <AdaptiveOrderProcessingPage /> },
            {
              path: 'admin',
              element: <ProtectedRoute allowedRoles={['admin']} />,
              children: [{ index: true, element: <AdminPage /> }],
            },
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
