import React, { lazy } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { brandTheme } from './styles/brandTheme';

import LayoutWrapper from './pages/layout/LayoutWrapper';
import HomePage from './pages/home/HomePage';
import ErrorPage from './pages/errors/ErrorPage';
import TestPage from './pages/TestPage';

const InvoiceListPage = lazy(() => import('./pages/InvoiceList'));
const ContractorsPage = lazy(() => import('./pages/Contractors'));
const GoodsPage = lazy(() => import('./pages/Goods'));
const PaymentsPage = lazy(() => import('./pages/Payments'));
const ReceivablePage = lazy(() => import('./pages/Receivable'));

const AppRoutes = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <LayoutWrapper />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: 'invoices/:docType', element: <InvoiceListPage /> },
        { path: 'contractors', element: <ContractorsPage /> },
        { path: 'goods', element: <GoodsPage /> },
        { path: 'payments', element: <PaymentsPage /> },
        { path: 'receivables', element: <ReceivablePage /> },
        { path: 'testPage', element: <TestPage /> },
        { path: '*', element: <ErrorPage /> },
      ],
    },
  ]);

  return element;
};

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <ConfigProvider theme={brandTheme}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ConfigProvider>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
