import React, { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { store } from './store';
import { Provider } from 'react-redux';
import { brandTheme } from './styles/brandTheme';

import LayoutWrapper from './pages/layout/LayoutWrapper';
import HomePage from './pages/home/HomePage';
import ErrorPage from './pages/errors/ErrorPage';
import TestPage from './pages/TestPage';

const InvoicesList = lazy(() =>
  import('./features/invoices/pages/InvoicesList')
);
const Finances = lazy(() => import('./features/finance/page/Finances'));
const ContractorsPage = lazy(() => import('./pages/Contractors'));
const GoodsPage = lazy(() => import('./pages/Goods'));
const PaymentsPage = lazy(() => import('./pages/Payments'));

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <ConfigProvider theme={brandTheme}>
            <Routes>
              <Route path="/" element={<LayoutWrapper />}>
                <Route index element={<HomePage />} />
                <Route
                  path="clients/invoices"
                  element={<InvoicesList type="sale" />}
                />
                <Route
                  path="suppliers/invoices"
                  element={<InvoicesList type="purchase" />}
                />
                <Route path="contractors" element={<ContractorsPage />} />
                <Route path="goods" element={<GoodsPage />} />
                <Route path="payments" element={<PaymentsPage />} />
                <Route path="testPage" element={<TestPage />} />
                <Route path="*" element={<ErrorPage />} />
              </Route>
            </Routes>
          </ConfigProvider>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
