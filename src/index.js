import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


function setIntervaloTime(){
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

setInterval(setIntervaloTime, 1000)
