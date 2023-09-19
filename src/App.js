import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { brandTheme } from './styles/brandTheme';
import LayoutWrapper from './pages/LayoutWrapper';
import HomePage from './pages/HomePage';
import InvoicesList from './features/invoices/pages/InvoicesList';

const App = () => {
  return (
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
          </Route>
        </Routes>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
