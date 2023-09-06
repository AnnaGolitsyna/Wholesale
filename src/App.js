import { ConfigProvider } from 'antd';
import { brandTheme } from './styles/brandTheme';
import { Layout, Space } from 'antd';
import './App.css';
import Header from './components/header/Header';
import NavBar from './components/navBar/NavBar';

const App = () => {
  const { Content } = Layout;

  return (
    <ConfigProvider theme={brandTheme}>
      <Space direction="vertical" style={{ width: '100vw', minWidth: '900px' }}>
        <Layout>
          <NavBar />

          <Layout>
            <Header />

            <Content
              style={{
                backgroundColor: brandTheme.token.colorBgBaseLight,
              }}
            >
              Content
            </Content>
          </Layout>
        </Layout>
      </Space>
    </ConfigProvider>
  );
};

export default App;
