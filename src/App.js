import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { brandTheme } from './styles/brandTheme';
import LayoutWrapper from './pages/LayoutWrapper';
import HomePage from './pages/HomePage';
import InvoicesList from './features/invoices/pages/InvoicesList';
import Contractors from './features/catalog/page/Contractors';
import Goods from './features/catalog/page/Goods';
import Finances from './features/finance/page/Finances';
import ErrorPage from './pages/results/ErrorPage';

import TestPage from './pages/TestPage'

import { store } from './store';
import { Provider } from 'react-redux';

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
                <Route path="contractors" element={<Contractors />} />
                <Route path="goods" element={<Goods />} />
                <Route path="finance" element={<Finances />} />
                <Route path="errorPage" element={<ErrorPage />} />
                <Route path='testPage' element={<TestPage />} />
              </Route>
            </Routes>
          </ConfigProvider>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

export default App;
