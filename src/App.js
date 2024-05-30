import React, { lazy } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { store } from './store';
import { Provider } from 'react-redux';
import { brandTheme } from './styles/brandTheme';

import LayoutWrapper from './pages/layout/LayoutWrapper';
import HomePage from './pages/home/HomePage';
import ErrorPage from './pages/errors/ErrorPage';
import TestPage from './pages/TestPage';

import InvoiceListPage from './pages/InvoiceList';

const InvoicesList = lazy(() =>
  import('./features/invoices/pages/InvoicesList')
);
const Finances = lazy(() => import('./features/finance/page/Finances'));
const ContractorsPage = lazy(() => import('./pages/Contractors'));
const GoodsPage = lazy(() => import('./pages/Goods'));
const PaymentsPage = lazy(() => import('./pages/Payments'));

const AppRoutes = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <LayoutWrapper />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: 'invoices/:type', element: <InvoiceListPage /> },
        { path: 'contractors', element: <ContractorsPage /> },
        { path: 'goods', element: <GoodsPage /> },
        { path: 'payments', element: <PaymentsPage /> },
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
