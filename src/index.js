import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/buttonStyled.css';
import App from './App';
// import dayjs from 'dayjs';
// import 'dayjs/locale/uk'; // Import Ukrainian locale for dayjs
// import localizedFormat from 'dayjs/plugin/localizedFormat'; // For localized date formats

// dayjs.extend(localizedFormat); // Enable localized date formats
// dayjs.locale('uk'); 

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
