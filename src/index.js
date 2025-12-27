import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import { createRoot } from 'react-dom/client';
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
const root = createRoot(document.getElementById('root'));

root.render(
  <Game  sizeX={config.board.sizeX} sizeY={config.board.sizeY}/>,
  document.getElementById('root')
);
  
