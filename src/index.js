import 'react-app-polyfill/stable';
import { createRoot } from 'react-dom/client';
import './index.css';
import Game from './UIComponents/Game';
import init from './init.js';
import config from './config.js';

// ========================================
init(config);
const root = createRoot(document.getElementById('root'));

root.render(
  <Game  sizeX={config.board.sizeX} sizeY={config.board.sizeY}/>
);
  
