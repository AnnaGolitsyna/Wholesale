// import React from 'react';
// import { Modal } from 'antd';
// import FormInvoice from './FormInvoice';

// // import PropTypes from 'prop-types'

// const ModalInvoice = ({ open, setOpen, type }) => {
//   return (
//     <Modal
//       centered
//       // confirmLoading
//       open={open}
//       onOk={() => setOpen(false)}
//       okText="Сохранить"
//       onCancel={() => setOpen(false)}
//       cancelText="Закрыть"
//       width={1000}
//       maskClosable={false}
//     >
//       <FormInvoice type={type} />
//     </Modal>
//   );
// };

// // ModalInvoice.propTypes = {}

// export default ModalInvoice;

// const ModalInvoice = ({ open, setOpen, type }) => {
//   const id = useId();
//   const { token } = useToken();
//   const bgColor =
//     type === 'sale' ? token.modalBgPrimary : token.modalBgSecondary;
//   return (
//     <ConfigProvider
//       theme={{
//         inherit: false,
//         token: {
//           colorBgBase: bgColor,
//           colorTextBase: token.modalText,
//           fontSize: 16,
//         },
//       }}
//     >
//       <Modal
//         centered
//         title={`Накладная № ${id}`}
//         // confirmLoading
//         open={open}
//         onOk={() => setOpen(false)}
//         okText="Сохранить"
//         onCancel={() => setOpen(false)}
//         cancelText="Закрыть"
//         width={1000}
//         maskClosable={false}
//       >
//         <FormInvoice type={type} />
//       </Modal>
//     </ConfigProvider>
//   );
// };
