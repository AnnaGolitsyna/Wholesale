import { theme } from 'antd';

const { useToken } = theme;

const useTableBgColor = (type) => {
  const { token } = useToken();
  let tableBgColorLight;
  let tableBgColorDark;

  if (type === 'debet') {
    tableBgColorDark = token.green4;
    tableBgColorLight = token.green2;
    return [tableBgColorDark, tableBgColorLight];
  }
  tableBgColorDark = token.purple4;
  tableBgColorLight = token.purple2;

  return [tableBgColorDark, tableBgColorLight];
};

export default useTableBgColor;
