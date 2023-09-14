import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { brandTheme } from './styles/brandTheme';
import LayoutWrapper from './components/layout/LayoutWrapper';
import HomePage from './pages/HomePage';
import Invoices from './features/invoices/pages/Invoices';

const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={brandTheme}>
        <Routes>
          <Route path="/" element={<LayoutWrapper />}>
            <Route index element={<HomePage />} />
            <Route
              path="clients/invoices"
              element={<Invoices type="debet" />}
            />
            <Route
              path="clients/suppliers"
              element={<Invoices type="credit" />}
            />
          </Route>
        </Routes>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
