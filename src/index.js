import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './UIComponents/Game';
import init from './init.js';
import config from './config.js';
import _ from 'lodash';

// ========================================
if(typeof window !== undefined){
  window.global = window;
}

global._ = _;
global.config = config;

console.log(_.get(config, "sidebar.enabled"));

init(config);



ReactDOM.render(
  <Game  sizeX={config.board.sizeX} sizeY={config.board.sizeY}/>,
  document.getElementById('root')
);
  
