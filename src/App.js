import React, { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { brandTheme } from './styles/brandTheme';
import { ContractorsPage } from './pages/Contractors';
import { GoodsPage } from './pages/Goods';

// import LayoutWrapper from './pages/layout/LayoutWrapper';
// import HomePage from './pages/home/HomePage';
// import InvoicesList from './features/invoices/pages/InvoicesList';
// import Finances from './features/finance/page/Finances';
// import ErrorPage from './pages/results/ErrorPage';
// import TestPage from './pages/TestPage';

import { store } from './store';
import { Provider } from 'react-redux';

const LayoutWrapper = lazy(() => import('./pages/layout/LayoutWrapper'));
const HomePage = lazy(() => import('./pages/home/HomePage'));
const InvoicesList = lazy(() =>
  import('./features/invoices/pages/InvoicesList')
);
const Finances = lazy(() => import('./features/finance/page/Finances'));
const ErrorPage = lazy(() => import('./pages/errors/ErrorPage'));
const TestPage = lazy(() => import('./pages/TestPage'));

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
                <Route path="finance" element={<Finances />} />
                <Route path="testPage" element={<TestPage />} />
                {/* <Route path="errorPage" element={<ErrorPage />} /> */}
              </Route>
            </Routes>
          </ConfigProvider>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
