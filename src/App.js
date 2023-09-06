import { ConfigProvider } from 'antd';
import { brandTheme } from './styles/brandTheme';
import { Layout, Space } from 'antd';
import './App.css';
import HeaderWholesale from './components/headerWholesale/HeaderWholesale';
import NavBar from './components/navBar/NavBar';


const App = () => {

  const { Content } = Layout;

  return (
    <ConfigProvider theme={brandTheme}>
      <Space direction="vertical" style={{ width: '100vw' }}>
        <Layout>
          <NavBar />

          <Layout>
            <HeaderWholesale />
           
            <Content
              style={{
                backgroundColor: brandTheme.token.colorTextBase,
              }}
            >
              Content
            </Content>
          </Layout>
        </Layout>
      </Space>
    </ConfigProvider>
  );
}

export default App;
