import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./index.css";
import { Provider } from "react-redux"
import store from './Stores/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* <AlertProvider template={AlertTemplate} {...options}> */}
    <App />
    {/* </AlertProvider> */}
  </Provider>
);