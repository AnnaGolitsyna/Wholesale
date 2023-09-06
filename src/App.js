import { ConfigProvider } from 'antd';
import { brandTheme } from './styles/brandTheme';
import './App.css';
import { Button } from 'antd/es/radio';

function App() {
  return (
    <ConfigProvider theme={brandTheme}>
      <div className="App">
        <Button >button</Button>
      </div>
      ;
    </ConfigProvider>
  );
}

export default App;
