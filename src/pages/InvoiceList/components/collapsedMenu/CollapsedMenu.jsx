import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Typography, Space, Modal } from 'antd';
import { ReactComponent as TemplateBox } from '../../../../styles/icons/template/TemplateBox.svg';
import { ReactComponent as CopyIcon } from '../../../../styles/icons/template/CopyIcon.svg';
import { ReactComponent as SaveIcon } from '../../../../styles/icons/template/SaveIcon.svg';
import { ReactComponent as ViewIcon } from '../../../../styles/icons/template/ViewIcon.svg';

const CollapsedMenu = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const buttonStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px', // Adjust padding as needed
  };

  const iconStyle = {
    width: '50px', // Adjust the size as needed
    height: '50px', // Adjust the size as needed
    marginRight: 8, // Space between the icon and the text
  };

  const textStyle = {
    fontSize: '16px', // Adjust the size as needed
  };

  return (
    <>
      <Button onClick={showModal} type='text' style={buttonStyle}>
        <TemplateBox style={iconStyle} />
        <Typography.Text style={textStyle}>Шаблон</Typography.Text>
      </Button>

      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Button style={buttonStyle}>
            <CopyIcon style={iconStyle} />
            <Typography.Text style={textStyle}>
              Копировать в шаблон
            </Typography.Text>
          </Button>
          <Button style={buttonStyle}>
            <SaveIcon style={iconStyle} />
            <Typography.Text style={textStyle}>
              Вставить из шаблона
            </Typography.Text>
          </Button>
          <Button style={buttonStyle}>
            <ViewIcon style={iconStyle} />
            <Typography.Text style={textStyle}>
              Узнай что в шаблоне
            </Typography.Text>
          </Button>
        </Space>
      </Modal>
    </>
  );
};

CollapsedMenu.propTypes = {};

export default CollapsedMenu;

// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { Button, Typography, Space, Modal } from 'antd';
// import { ReactComponent as TemplateBox } from '../../../../styles/icons/template/TemplateBox.svg';
// import { ReactComponent as CopyIcon } from '../../../../styles/icons/template/CopyIcon.svg';
// import { ReactComponent as SaveIcon } from '../../../../styles/icons/template/SaveIcon.svg';
// import { ReactComponent as ViewIcon } from '../../../../styles/icons/template/ViewIcon.svg';

// const CollapsedMenu = (props) => {

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const showModal = () => {
//     setIsModalOpen(true);
//   };
//   const handleOk = () => {
//     setIsModalOpen(false);
//   };
//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };
//   return (
//     <>
//       <Button onClick={showModal}>
//         <TemplateBox />
//         <Typography.Text>Шаблон</Typography.Text>
//       </Button>

//       <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
//         <Space direction="vertical">
//           <Button>
//             <CopyIcon />
//             <Typography.Text>Копировать в шаблон</Typography.Text>
//           </Button>
//           <Button>
//             <SaveIcon />
//             <Typography.Text>Вставить из шаблона</Typography.Text>
//           </Button>
//           <Button style={{ width: '100%', height: '100%' }}>
//             <ViewIcon />
//             <Typography.Text>Узнай что в шаблоне</Typography.Text>
//           </Button>
//         </Space>
//       </Modal>
//     </>
//   );
// };

// CollapsedMenu.propTypes = {};

// export default CollapsedMenu;
