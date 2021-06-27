import React from 'react';
import ReactDOM from 'react-dom';
import {ActionCableProvider} from 'react-actioncable-provider';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

import { API_WS_ROOT } from './constants';

import '../node_modules/@fortawesome/fontawesome-free/css/all.css'

import "../node_modules/font-awesome/css/font-awesome.min.css";

import {
  BrowserRouter as Router,
} from "react-router-dom";

ReactDOM.render(
  <ActionCableProvider url={API_WS_ROOT}>
    <Router>
      <App />
    </Router>
    </ActionCableProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
