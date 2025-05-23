import '../css/style.css';
import '../css/styles-main.css';

import { darkModeHandle } from './utils';
import { startGame } from './game';
import { getUserId } from './statistic';




darkModeHandle();
// getUserId();

//Запуск игры виселица
const startGameButton = document.getElementById('startGame');
startGameButton.addEventListener('click', startGame);

//Присваивание id на index.html
const getUserId_index = document.getElementById ('index');
getUserId_index.attachEvent('onload', getUserId);


