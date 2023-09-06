import { ConfigProvider } from 'antd';
import { brandTheme } from './styles/brandTheme';
import { Layout, Space } from 'antd';
import './App.css';


const App = () => {

  const { Header, Sider, Content } = Layout;

  return (
    <ConfigProvider theme={brandTheme}>
      <Space direction="vertical" style={{ width: '100vw' }}>
        <Layout>
          <Sider
            style={{
              height: '100vh',
              backgroundColor: brandTheme.token.colorBgBase,
            }}
          >
            Sider
          </Sider>
          <Layout>
            <Header
              style={{
                backgroundColor: brandTheme.token.colorBgBase,
              }}
            >
              Header
            </Header>
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
