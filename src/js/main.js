import '../css/style.css';
import '../css/styles-main.css';

import { darkModeHandle } from './utils';
import { startGame } from './game';
import { getUserId } from './statistic';


darkModeHandle();
getUserId();

const startGameButton = document.getElementById('startGame');
startGameButton.addEventListener('click', startGame)

