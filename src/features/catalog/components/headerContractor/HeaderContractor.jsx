import React from 'react';
import { Typography, Button, Space, Radio, theme } from 'antd';
import Icon, { CrownTwoTone } from '@ant-design/icons';
// import PropTypes from 'prop-types'

const ContractorSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="100"
    height="100"
    viewBox="0 0 100 100"
  >
    <circle cx="77" cy="13" r="1" fill="#f1bc19"></circle>
    <circle cx="50" cy="50" r="37" fill="#e6edb7"></circle>
    <circle cx="83" cy="15" r="4" fill="#f1bc19"></circle>
    <circle cx="87" cy="24" r="2" fill="#9f8066"></circle>
    <circle cx="81" cy="76" r="2" fill="#fbcd59"></circle>
    <circle cx="15" cy="63" r="4" fill="#fbcd59"></circle>
    <circle cx="25" cy="87" r="2" fill="#9f8066"></circle>
    <circle cx="19.5" cy="43.5" r="2.5" fill="#fff"></circle>
    <circle cx="79.5" cy="33.5" r="1.5" fill="#fff"></circle>
    <g>
      <path
        fill="#78a0cf"
        d="M50.7,72.3v-8h-10v-5h-11V49c0-3.474,2.826-6.3,6.3-6.3c2.528,0,4.803,1.503,5.796,3.83 l0.399,0.936l0.731-0.708C44.298,45.431,46.1,44.7,48,44.7c2.441,0,4.711,1.214,6.071,3.249l0.38,0.568l0.577-0.366 C56.523,47.202,58.242,46.7,60,46.7c5.128,0,9.3,4.172,9.3,9.3v16.3H50.7z"
      ></path>
      <path
        fill="#472b29"
        d="M36,43.4c2.247,0,4.27,1.336,5.153,3.405l0.799,1.872l1.462-1.416 c1.24-1.2,2.869-1.861,4.586-1.861c2.207,0,4.259,1.098,5.49,2.938l0.76,1.136l1.154-0.732C56.786,47.864,58.376,47.4,60,47.4 c4.742,0,8.6,3.858,8.6,8.6v15.6H51.4V65v-1.4H50h-8.6V60v-1.4H40h-9.6V49C30.4,45.912,32.912,43.4,36,43.4 M36,42 c-3.866,0-7,3.134-7,7v10.745C29,59.886,29.114,60,29.255,60H40v4.797C40,64.909,40.091,65,40.203,65H50v8h20V56 c0-5.523-4.477-10-10-10c-1.969,0-3.799,0.577-5.347,1.56C53.218,45.414,50.775,44,48,44c-2.162,0-4.12,0.861-5.56,2.255 C41.373,43.754,38.891,42,36,42L36,42z"
      ></path>
      <circle cx="61" cy="33" r="5.3" fill="#78a0cf"></circle>
      <path
        fill="#472b29"
        d="M61,28.4c2.536,0,4.6,2.063,4.6,4.6s-2.064,4.6-4.6,4.6c-2.536,0-4.6-2.063-4.6-4.6 S58.464,28.4,61,28.4 M61,27c-3.314,0-6,2.687-6,6s2.686,6,6,6c3.314,0,6-2.687,6-6S64.314,27,61,27L61,27z"
      ></path>
      <circle cx="47" cy="34" r="4.3" fill="#78a0cf"></circle>
      <path
        fill="#472b29"
        d="M47,30.4c1.985,0,3.6,1.615,3.6,3.6s-1.615,3.6-3.6,3.6s-3.6-1.615-3.6-3.6S45.015,30.4,47,30.4 M47,29c-2.761,0-5,2.239-5,5s2.239,5,5,5s5-2.239,5-5S49.761,29,47,29L47,29z"
      ></path>
      <circle cx="35" cy="35" r="3.3" fill="#78a0cf"></circle>
      <path
        fill="#472b29"
        d="M35,32.4c1.434,0,2.6,1.167,2.6,2.6s-1.166,2.6-2.6,2.6s-2.6-1.167-2.6-2.6S33.566,32.4,35,32.4 M35,31c-2.209,0-4,1.791-4,4s1.791,4,4,4s4-1.791,4-4S37.209,31,35,31L35,31z"
      ></path>
      <path
        fill="#472b29"
        d="M53.5,61.083c-0.138,0-0.25-0.112-0.25-0.25v-4.869c0-0.138,0.112-0.25,0.25-0.25 s0.25,0.112,0.25,0.25v4.869C53.75,60.971,53.638,61.083,53.5,61.083z"
      ></path>
      <path
        fill="#472b29"
        d="M53.69,54.652c-0.02,0-0.04-0.002-0.06-0.007c-0.134-0.033-0.216-0.169-0.183-0.303 c0.11-0.445,0.268-0.881,0.469-1.296c1.115-2.306,3.489-3.796,6.048-3.796h0.071c0.138,0,0.25,0.112,0.25,0.25 s-0.112,0.25-0.25,0.25h-0.071c-2.369,0-4.566,1.379-5.598,3.513c-0.186,0.384-0.332,0.788-0.434,1.199 C53.904,54.576,53.802,54.652,53.69,54.652z"
      ></path>
      <path
        fill="#472b29"
        d="M53.5,69.75c-0.138,0-0.25-0.112-0.25-0.25v-6.583c0-0.138,0.112-0.25,0.25-0.25 s0.25,0.112,0.25,0.25V69.5C53.75,69.638,53.638,69.75,53.5,69.75z"
      ></path>
      <g>
        <path
          fill="#472b29"
          d="M44.063,50.068c-0.042,0-0.083-0.01-0.122-0.031c-0.121-0.067-0.164-0.219-0.097-0.34 c0.839-1.509,2.431-2.446,4.155-2.446c0.138,0,0.25,0.112,0.25,0.25s-0.112,0.25-0.25,0.25c-1.543,0-2.968,0.839-3.718,2.189 C44.236,50.021,44.151,50.068,44.063,50.068z"
        ></path>
      </g>
      <g>
        <path
          fill="#472b29"
          d="M43.5,61.75c-0.138,0-0.25-0.112-0.25-0.25V52c0-0.138,0.112-0.25,0.25-0.25s0.25,0.112,0.25,0.25 v9.5C43.75,61.638,43.638,61.75,43.5,61.75z"
        ></path>
      </g>
      <g>
        <path
          fill="#472b29"
          d="M32.5,56.75c-0.138,0-0.25-0.112-0.25-0.25v-5.75c0-0.138,0.112-0.25,0.25-0.25 s0.25,0.112,0.25,0.25v5.75C32.75,56.638,32.638,56.75,32.5,56.75z"
        ></path>
      </g>
      <g>
        <path
          fill="#472b29"
          d="M32.5,49.25c-0.138,0-0.25-0.112-0.25-0.25c0-2.068,1.682-3.75,3.75-3.75 c0.138,0,0.25,0.112,0.25,0.25s-0.112,0.25-0.25,0.25c-1.792,0-3.25,1.458-3.25,3.25C32.75,49.138,32.638,49.25,32.5,49.25z"
        ></path>
      </g>
    </g>
  </svg>

);

const ContractorIcon = (props) => <Icon component={ContractorSvg} {...props} />;

const HeaderContractor = ({ handleCheckboxChange, handleModifyContractor }) => {
  const { token } = theme.useToken();
  return (
    <Space.Compact
      block
      style={{
        alignItems: 'baseline',
        justifyContent: 'space-evenly',
        marginBottom: 10,
      }}
    >
      <Space direction="vertical">
        <Space>
          <ContractorIcon
            style={{
              fontSize: '32px',
            }}
          />
          <Typography.Title level={3} style={{ margin: 3 }}>
            Список контрагентов
          </Typography.Title>
        </Space>
        <Radio.Group
          defaultValue="true"
          buttonStyle="solid"
          onChange={handleCheckboxChange}
        >
          <Radio.Button value="true">Действующие контрагенты</Radio.Button>
          <Radio.Button value="false">Недействующие контрагенты</Radio.Button>
        </Radio.Group>
      </Space>
      <Space size="middle">
        <CrownTwoTone
          twoToneColor={token.colorSecondaryBtn}
          style={{ fontSize: 32 }}
        />
        <Button type="primary" onClick={() => handleModifyContractor(null)}>
          Создать нового
        </Button>
      </Space>
    </Space.Compact>
  );
};

// HeaderContractor.propTypes = {}

export default HeaderContractor;
