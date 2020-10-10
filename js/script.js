const inputWord = document.querySelector("#input-word");
const timeLeft = document.querySelector("#time-left");
const wordsContainer = document.querySelector(".words__container");
const btnRestart = document.querySelector(".btn__restart");
const result = document.querySelector(".result");
const resultTotalWords = document.querySelector(".result__total_words");
const resultTotalRightAns = document.querySelector(".result__total_right_ans");
const resultTotalTime = document.querySelector(".result__total_time");
const resultTotalWpm = document.querySelector(".result__total_wpm");

let startInterval;

let state = {
  scores: 0,
  limitTime: 60,
  words: [
    "achieve",
    "ecstasy",
    "museum",
    "urine",
    "eagle",
    "reader",
    "policy",
    "agree",
    "professional",
    "late",
    "thread",
    "seize",
    "mushroom",
    "knowledge",
    "throne",
    "seller",
    "energy",
    "project",
    "aware",
    "horn",
    "price",
    "sheep",
    "rule",
    "chest",
    "rescue",
    "throat",
    "fine",
    "blue",
    "stand",
    "instruction",
    "manufacture",
    "reward",
    "detector",
    "tribute",
    "deposit",
    "architecture",
    "economist",
    "corner",
    "cord",
    "scale",
    "cooperative",
    "context",
    "intention",
    "morale",
    "chord",
    "statement",
    "giant",
    "distant",
    "fever",
    "faithful",
  ],
  input_time: 0,
  input_state_index: 0,
  result: [],
};

function init() {
  wordsContainer.innerHTML = `
    ${state.words
      .map((item, index) => {
        return `<span class="word">${item}</span>`;
      })
      .join("")}
  `;

  inputWord.addEventListener("keyup", start);
}

function start() {
  startInterval = setInterval(() => {
    if (state.limitTime < 1) {
      return stop();
    }
    state.input_time += 1;
    state.limitTime -= 1;
    timeLeft.innerText = state.limitTime.toString().toHHMMSS();
  }, 1000);

  inputWord.removeEventListener("keyup", start);
  inputWord.addEventListener("keyup", correcting);
}

function correcting() {
  let inputWordValue = inputWord.value;
  const word = document.querySelectorAll(".word");
  let wordWithNowIndex = word[state.input_state_index];

  wordWithNowIndex.classList.add("focused");
  state.words[state.input_state_index].includes(inputWordValue)
    ? wordWithNowIndex.classList.remove("wrong")
    : wordWithNowIndex.classList.add("wrong");

  if (inputWordValue.includes(" ")) {
    wordWithNowIndex.classList.remove("wrong");
    wordWithNowIndex.classList.remove("focused");
    inputWordValue = inputWordValue.replace(" ", "");

    state.result.push({
      word: inputWordValue,
      ans:
        state.words[state.input_state_index] === inputWordValue ? true : false,
    });
    state.input_state_index += 1;
    console.log("Jumlah kata: " + state.words.length);
    console.log("Index sekarang: " + state.input_state_index);
    if (state.input_state_index === state.words.length) {
      return stop();
    }
    inputWord.value = "";
  }
}

function stop() {
  timeLeft.innerText = "FINISH!!!";
  console.log("Total jumlah kata: " + state.words.length);
  const rightAns = state.result.filter((x) => x.ans === true);
  console.log("Total jawaban benar: " + rightAns.length);
  console.log("Total waktu anda mengetik: " + state.input_time + " detik");
  resultTotalWords.innerText = "Jumlah Kata: " + state.words.length;
  resultTotalRightAns.innerText = "Kata yang benar: " + rightAns.length;
  resultTotalTime.innerText = "Waktu mengetik: " + state.input_time + " detik";
  resultTotalWpm.innerText =
    "Kecepatan Mengetik: " +
    rightAns.length / (state.input_time / 60) +
    " kata per menit";

  reset();
}

function reset() {
  clearInterval(startInterval);
  const word = document.querySelectorAll(".word");
  word.forEach((w) => w.classList.remove("wrong"));
  word.forEach((w) => w.classList.remove("focused"));
  inputWord.removeAttribute("disabled");
  state.limitTime = 60;
  state.input_time = 0;
  state.input_state_index = 0;
  state.result = [];
  inputWord.value = "";
}

function restart() {
  reset();
  resultTotalWords.innerText = "";
  resultTotalRightAns.innerText = "";
  resultTotalTime.innerText = "";
  resultTotalWpm.innerText = "";
  timeLeft.innerText = "1:00";
  init();
}
String.prototype.toHHMMSS = function () {
  var sec_num = parseInt(this, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return minutes + ":" + seconds;
};

btnRestart.addEventListener("click", restart);
init();
