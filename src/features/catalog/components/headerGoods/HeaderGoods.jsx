import React from 'react';
//import PropTypes from 'prop-types'
import { Typography, Button, Space, Radio, theme } from 'antd';
import Icon, { GiftTwoTone } from '@ant-design/icons';

const NewspaperSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="100"
    height="100"
    viewBox="0 0 100 100"
  >
    <path fill="#78a0cf" d="M13 27A2 2 0 1 0 13 31A2 2 0 1 0 13 27Z"></path>
    <path fill="#f1bc19" d="M77 12A1 1 0 1 0 77 14A1 1 0 1 0 77 12Z"></path>
    <path fill="#cee1f4" d="M50 13A37 37 0 1 0 50 87A37 37 0 1 0 50 13Z"></path>
    <path fill="#f1bc19" d="M83 11A4 4 0 1 0 83 19A4 4 0 1 0 83 11Z"></path>
    <path fill="#78a0cf" d="M87 22A2 2 0 1 0 87 26A2 2 0 1 0 87 22Z"></path>
    <path
      fill="#fbcd59"
      d="M81 74A2 2 0 1 0 81 78 2 2 0 1 0 81 74zM15 59A4 4 0 1 0 15 67 4 4 0 1 0 15 59z"
    ></path>
    <path fill="#78a0cf" d="M25 85A2 2 0 1 0 25 89A2 2 0 1 0 25 85Z"></path>
    <path
      fill="#fff"
      d="M18.5 51A2.5 2.5 0 1 0 18.5 56A2.5 2.5 0 1 0 18.5 51Z"
    ></path>
    <path fill="#f1bc19" d="M21 66A1 1 0 1 0 21 68A1 1 0 1 0 21 66Z"></path>
    <path fill="#fff" d="M80 33A1 1 0 1 0 80 35A1 1 0 1 0 80 33Z"></path>
    <path
      fill="#fdfcee"
      d="M73.583,29.899c0.148-5.448-5.917-5.17-5.917-5.17l-31.44,0.084c-2.405,0-4.393,2.384-4.393,4.6 l-0.042,27.171l-6,0.012c0,1.645,0.022,13.473,0.042,13.683c0.404,4.354,5.331,3.947,5.331,3.947l36.086,0.037 c1.948,0.19,3-2.172,3-3.525s0-40.752,0-40.752L73.583,29.899z"
    ></path>
    <path
      fill="#472b29"
      d="M67.47,75c-0.095,0.001-0.19-0.004-0.286-0.013l-36.021-0.033 c-1.893,0.147-5.656-0.599-6.027-4.605c-0.028-0.296-0.045-13.621-0.045-13.754c0-0.401,0.313-0.727,0.699-0.728l5.303-0.01 l0.041-26.446c0-2.514,2.178-5.327,5.093-5.327l31.438-0.083c0.108,0.002,3.256-0.126,5.185,1.847 c0.997,1.02,1.479,2.39,1.434,4.071c-0.01,0.387-0.31,0.697-0.682,0.707l-2.651,0.068v40.043c0,0.983-0.456,2.473-1.457,3.419 C68.907,74.712,68.212,75,67.47,75z M31.109,73.5l36.142,0.035c0.527,0.049,0.928-0.101,1.301-0.454 c0.649-0.613,0.999-1.665,0.999-2.343V29.985c0-0.395,0.303-0.718,0.683-0.728l2.63-0.068c-0.087-0.943-0.421-1.716-0.995-2.304 c-1.5-1.533-4.142-1.427-4.17-1.43L36.229,25.54c-2.048,0-3.695,2.118-3.695,3.873l-0.042,27.172 c-0.001,0.401-0.313,0.726-0.699,0.727l-5.301,0.01c0.003,3.077,0.023,12.505,0.04,12.913 C26.864,73.809,30.939,73.521,31.109,73.5z"
    ></path>
    <path
      fill="#fef6aa"
      d="M32.708 57.058l-6.248-.016c-.005.208.003 11.963.023 12.15.28 3.897 5.121 3.371 6.225 3.35V57.058zM47.5 45.5L47.5 55.5 36.5 55.5 36.5 43.5 45.5 43.5"
    ></path>
    <path
      fill="#472b29"
      d="M47.75,55.75h-11.5v-12.5h9.25c0.138,0,0.25,0.112,0.25,0.25s-0.112,0.25-0.25,0.25h-8.75v11.5h10.5 V45.5c0-0.138,0.112-0.25,0.25-0.25s0.25,0.112,0.25,0.25V55.75z"
    ></path>
    <path
      fill="#fef6aa"
      d="M54.5 67.5L54.5 58.5 65.5 58.5 65.5 68.5 57.5 68.5"
    ></path>
    <path
      fill="#472b29"
      d="M65.75 68.75H57.5c-.138 0-.25-.112-.25-.25s.112-.25.25-.25h7.75v-9.5h-10.5v8.75c0 .138-.112.25-.25.25s-.25-.112-.25-.25v-9.25h11.5V68.75zM29.791 70.7c-.348 0-.649-.259-.694-.613-.048-.384.224-.733.608-.781.905-.113 1.429-.404 1.429-1.556V54.917c0-.387.313-.7.7-.7s.7.313.7.7V67.75c0 1.191-.461 2.67-2.655 2.944C29.849 70.698 29.819 70.7 29.791 70.7zM70.5 31.533H51.25c-.387 0-.7-.313-.7-.7s.313-.7.7-.7H70.5c.387 0 .7.313.7.7S70.887 31.533 70.5 31.533z"
    ></path>
    <g>
      <path
        fill="#472b29"
        d="M47.5,35.917H36.583c-0.138,0-0.25-0.112-0.25-0.25s0.112-0.25,0.25-0.25H47.5 c0.138,0,0.25,0.112,0.25,0.25S47.638,35.917,47.5,35.917z"
      ></path>
    </g>
    <g>
      <path
        fill="#472b29"
        d="M43.5,39.75h-7c-0.138,0-0.25-0.112-0.25-0.25s0.112-0.25,0.25-0.25h7c0.138,0,0.25,0.112,0.25,0.25 S43.638,39.75,43.5,39.75z"
      ></path>
    </g>
    <g>
      <path
        fill="#472b29"
        d="M57.5,35.917h-6.917c-0.138,0-0.25-0.112-0.25-0.25s0.112-0.25,0.25-0.25H57.5 c0.138,0,0.25,0.112,0.25,0.25S57.638,35.917,57.5,35.917z"
      ></path>
    </g>
    <g>
      <path
        fill="#472b29"
        d="M65.5,35.917h-5c-0.138,0-0.25-0.112-0.25-0.25s0.112-0.25,0.25-0.25h5 c0.138,0,0.25,0.112,0.25,0.25S65.638,35.917,65.5,35.917z"
      ></path>
    </g>
    <g>
      <path
        fill="#472b29"
        d="M65.5,39.75h-20c-0.138,0-0.25-0.112-0.25-0.25s0.112-0.25,0.25-0.25h20 c0.138,0,0.25,0.112,0.25,0.25S65.638,39.75,65.5,39.75z"
      ></path>
    </g>
    <g>
      <path
        fill="#472b29"
        d="M65.5,43.75h-15c-0.138,0-0.25-0.112-0.25-0.25s0.112-0.25,0.25-0.25h15 c0.138,0,0.25,0.112,0.25,0.25S65.638,43.75,65.5,43.75z"
      ></path>
    </g>
    <g>
      <path
        fill="#472b29"
        d="M65.5,47.75h-15c-0.138,0-0.25-0.112-0.25-0.25s0.112-0.25,0.25-0.25h15 c0.138,0,0.25,0.112,0.25,0.25S65.638,47.75,65.5,47.75z"
      ></path>
    </g>
    <g>
      <path
        fill="#472b29"
        d="M65.5,51.75h-15c-0.138,0-0.25-0.112-0.25-0.25s0.112-0.25,0.25-0.25h15 c0.138,0,0.25,0.112,0.25,0.25S65.638,51.75,65.5,51.75z"
      ></path>
    </g>
    <g>
      <path
        fill="#472b29"
        d="M65.5,55.75h-15c-0.138,0-0.25-0.112-0.25-0.25s0.112-0.25,0.25-0.25h15 c0.138,0,0.25,0.112,0.25,0.25S65.638,55.75,65.5,55.75z"
      ></path>
    </g>
    <g>
      <path
        fill="#472b29"
        d="M51.5,59.75h-15c-0.138,0-0.25-0.112-0.25-0.25s0.112-0.25,0.25-0.25h15 c0.138,0,0.25,0.112,0.25,0.25S51.638,59.75,51.5,59.75z"
      ></path>
    </g>
    <g>
      <path
        fill="#472b29"
        d="M51.5,63.75h-15c-0.138,0-0.25-0.112-0.25-0.25s0.112-0.25,0.25-0.25h15 c0.138,0,0.25,0.112,0.25,0.25S51.638,63.75,51.5,63.75z"
      ></path>
    </g>
    <g>
      <path
        fill="#472b29"
        d="M51.5,67.75h-15c-0.138,0-0.25-0.112-0.25-0.25s0.112-0.25,0.25-0.25h15 c0.138,0,0.25,0.112,0.25,0.25S51.638,67.75,51.5,67.75z"
      ></path>
    </g>
    <g>
      <path
        fill="#472b29"
        d="M47.417,31.533h-5.5c-0.387,0-0.7-0.313-0.7-0.7s0.313-0.7,0.7-0.7h5.5c0.387,0,0.7,0.313,0.7,0.7 S47.803,31.533,47.417,31.533z"
      ></path>
    </g>
  </svg>
);

const NewspaperIcon = (props) => <Icon component={NewspaperSvg} {...props} />;

//const { useToken } = theme;

const HeaderGoods = (props) => {
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
          <NewspaperIcon
            style={{
              fontSize: '32px',
            }}
          />
          <Typography.Title level={3} style={{ margin: 3 }}>
            Список товаров
          </Typography.Title>
        </Space>
        <Radio.Group
          defaultValue="true"
          buttonStyle="solid"
          // onChange={handleCheckboxChange}
        >
          <Radio.Button value="true">Товары в реализации</Radio.Button>
          <Radio.Button value="false">Сняты с реализации</Radio.Button>
        </Radio.Group>
      </Space>
      <Space size="middle">
        <GiftTwoTone
          twoToneColor={token.colorSecondaryBtn}
          style={{ fontSize: 30 }}
        />

        <Button
          type="primary"
          //onClick={() => handleModifyContractor(null)}
        >
          Создать нового
        </Button>
      </Space>
    </Space.Compact>
  );
};

//HeaderGoods.propTypes = {}

export default HeaderGoods;
