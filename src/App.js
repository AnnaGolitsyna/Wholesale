import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { brandTheme } from './styles/brandTheme';
import LayoutWrapper from './components/layout/LayoutWrapper';
import HomePage from './pages/HomePage';
import Clients from './pages/Clients';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider theme={brandTheme}>
        <Routes>
          <Route path="/" element={<LayoutWrapper />}>
            <Route index element={<HomePage />} />
            <Route path="bills" element={<Clients />} />
          </Route>
        </Routes>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
