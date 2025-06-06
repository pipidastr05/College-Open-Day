import { WORDS, KEYBOARD_LETTERS } from "./consts";

const gameDiv = document.getElementById("game");
const logoH1 = document.getElementById("logo");

let triesLeft;
let winCount;

const createPlaceholdersHTML = () => {
  const word = sessionStorage.getItem("word");

  //№1 вариант reduce
  const wordArray = Array.from(word);
  const placeholdersHTML = wordArray.reduce(
    (acc, curr, i) => acc + `<h1 id="letter_${i}" class="letter">_</h1>`,
    " "
  );

  //№2
  // console.log(Array.from('_'.repeat(word.length)));
  // const placeholdersArray = Array.from('_'.repeat(word.length));
  // const placeholdersHTML = placeholdersArray.reduce((acc, curr, i) => acc +`<h1 id="letter_${i}" class="letter">${curr}</h1>`, ' ')

  //старый вариант
  // let placeholdersHTML = '';
  // for (let i = 0; i<word.length; i++) {  //цикл повторяется столько раз, сколько букв у нас в слове
  //     placeholdersHTML = placeholdersHTML + `<h1 id="letter_${i}" class="letter">_</h1>`

  // }
  return `<div id="placeholders" class="placeholders-wrapper">${placeholdersHTML}</div>`;
};

const createKeyboard = () => {
  const keyboard = document.createElement("div");
  keyboard.classList.add("keyboard");
  keyboard.id = "keyboard";

  const keyboardHTML = KEYBOARD_LETTERS.reduce((acc, curr) => {
    return (
      acc +
      `<button class="button-primary keyboard-button" id=${curr}>${curr}</button>`
    );
  }, "");

  keyboard.innerHTML = keyboardHTML;
  return keyboard;
};

const createHangmanImg = () => {
  const image = document.createElement("img");
  image.src = "images/hg-0.png";
  image.alt = "hangman image";
  image.classList.add("hangman-img");
  image.id = "hangman-img";

  return image;
};

const checkLetter = (letter) => {
  const word = sessionStorage.getItem("word");
  const inputLetter = letter.toLowerCase();
  //буквы в слове нет
  if (!word.includes(inputLetter)) {
    const triesCounter = document.getElementById("tries-left");
    triesLeft -= 1;
    triesCounter.innerText = triesLeft;

    const hangmanImg = document.getElementById("hangman-img");
    hangmanImg.src = `images/hg-${10 - triesLeft}.png`;

    if (triesLeft === 0) {
      stopGame("lose");
    }
  } else {
    //буква в слове есть
    const wordArray = Array.from(word);
    wordArray.forEach((currentLetter, i) => {
      if (currentLetter === inputLetter) {
        winCount += 1;
        if (winCount === word.length) {
          stopGame("win");
          return;
        }
        document.getElementById(`letter_${i}`).innerText =
          inputLetter.toUpperCase();
      }
    });
  }
};

const stopGame = (status) => {
  document.getElementById("placeholders").remove();
  document.getElementById("tries").remove();
  document.getElementById("keyboard").remove();
  document.getElementById("quit").remove();

  const word = sessionStorage.getItem("word");

  if (status === "win") {
    //сценарий выигрыша
    document.getElementById("hangman-img").src = "images/hg-win.png";
    document.getElementById("game").innerHTML +=
      `<h2 class="result-header win">Ты победил!</h2>
      <button class="button-primary px-5 py-2 mt-5" onclick="location.href='https://sites.google.com/view/crit-dev-helper/%D1%81%D0%BA%D0%B0%D1%87%D0%B0%D1%82%D1%8C-%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE%D1%82%D1%83%D1%80';">Погнали дальше</button>
      `;
      // <button class="button-primary px-5 py-2 mt-5" onclick="location.href='./test.html';">Костыль</button>

  } else if (status === "lose") {
    //сценарий проигрыша
    document.getElementById("game").innerHTML +=
      '<h2 class="result-header lose">Ты проиграл :(</h2>';
  } else if (status === "quit") {
    document.getElementById("hangman-img").remove();
    logoH1.classList.remove('logo-sm');

  }

  document.getElementById(
    "game"
  ).innerHTML += `<p>Загаданное слово: <span class="result-word">${word}</span></p>
  <button id="play-again" class="button-primary px-5 py-2 mt-5">Играть снова</button>`;
  document.getElementById("play-again").onclick = startGame;
};

export const startGame = () => {
  triesLeft = 10;
  winCount = 0;

  logoH1.classList.add("logo-sm");
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const wordToGuess = WORDS[randomIndex];
  sessionStorage.setItem("word", wordToGuess);

  gameDiv.innerHTML = createPlaceholdersHTML();

  gameDiv.innerHTML +=
    '<p id="tries" class="mt-2">ПОПЫТОК ОСТАЛОСЬ: <span id="tries-left" class="font-medium text-red-600">10</span></p>';

  const keyboardDiv = createKeyboard();
  keyboardDiv.addEventListener("click", (event) => {
    if (event.target.tagName.toLowerCase() === "button") {
      event.target.disabled = true;
      checkLetter(event.target.id);
    }
  });

  const hangmanImg = createHangmanImg();
  gameDiv.prepend(hangmanImg);

  gameDiv.appendChild(keyboardDiv);
  // gameDiv.innerHTML += createKeyboard()
  gameDiv.insertAdjacentHTML(
    "beforeend",
    '<button id="quit" class="button-secondary px-2 py-1 mt-4">Выйти</button>'
  );
  document.getElementById("quit").onclick = () => {
    const isSure = confirm ('Вы уверены, что хотите выйти из игры и потерять прогресс?');
    if (isSure) {
      stopGame("quit");
    }
    
  };
};



// import { supabase } from './supabaseClient';
// import { getUserId } from './statistic.js';

// async function trackStep(stepName) {
//   const userId = getUserId();
//   const { data, error } = await supabase
//     .from('college-open-day')
//     .update({ [stepName]: 'visit' }) // динамически: 'hangman' или 'novel'
//     .eq('id', userId);

//   if (error) {
//     console.error(`Ошибка при обновлении шага "${stepName}":`, error);
//   } else {
//     console.log(`Пользователь зашёл на модуль: ${stepName}`);
//   }
// }

// // Вызови эту функцию при загрузке страницы
// trackStep('hangman');

