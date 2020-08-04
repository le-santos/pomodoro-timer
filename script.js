const counters = {
  work: { min: 25, sec: 0 },
  rest: { min: 05, sec: 0 },
};

const timer = document.getElementById("work-time"),
  rest = document.getElementById("rest-time");

// Creating the string for the 2 digits format (00:00)

const setDisplayNum = (m, s, clock) => {
  m = ("00" + m).slice(-2);
  s = ("00" + s).slice(-2);
  clock.innerHTML = `${m}:${s}`;
};

setDisplayNum(counters.work.min, counters.work.sec, timer);
setDisplayNum(counters.rest.min, counters.rest.sec, rest);

// Main function

const count = function () {
  if (counters.work.min > 0 && counters.work.sec === 0) {
    counters.work.min--;
    counters.work.sec = 59;
  } else if (counters.work.sec > 0) {
    counters.work.sec--;
  } else {
    if (counters.rest.min > 0 && counters.rest.sec === 0) {
      counters.rest.min--;
      counters.rest.sec = 59;
    } else if (counters.rest.sec > 0) {
      counters.rest.sec--;
    }
  }
  setDisplayNum(counters.work.min, counters.work.sec, timer);
  setDisplayNum(counters.rest.min, counters.rest.sec, rest);
};

// Button Selectors and command functions

const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

const countVariable = { goTimer: "" }; // Timer variable

const getCounting = function () {
  start.removeEventListener("click", getCounting);
  countVariable.goTimer = setInterval(count, 1000);
};

const stopCount = function () {
  start.addEventListener("click", getCounting);
  clearInterval(countVariable.goTimer);
};

const resetCount = function () {
  counters.work.min = 25;
  counters.work.sec = 00;
  counters.rest.min = 05;
  counters.rest.sec = 00;
  setDisplayNum(counters.work.min, counters.work.sec, timer);
  setDisplayNum(counters.rest.min, counters.rest.sec, rest);

  clearInterval(countVariable.goTimer);
};

start.addEventListener("click", getCounting);
stop.addEventListener("click", stopCount);
reset.addEventListener("click", resetCount);

// Functions for adding/removing time from work/rest counters

const addTime = (timeData) => {
  if (timeData.min === 99) {
    return;
  } else {
    return timeData.min++;
  }
};

const removeTime = (timeData) => {
  if (timeData.min === 0) {
    return;
  } else {
    return timeData.min--;
  }
};

const changeTime = () => {
  const operation = event.target.name;
  const areaToChange = event.target.id;
  let displaySelected;

  areaToChange === "work-more" || areaToChange === "work-less"
    ? (displaySelected = counters.work)
    : (displaySelected = counters.rest);

  if (operation === "add") {
    addTime(displaySelected);
  } else if (operation === "subt") {
    removeTime(displaySelected);
  }

  setDisplayNum(counters.work.min, counters.work.sec, timer);
  setDisplayNum(counters.rest.min, counters.rest.sec, rest);
};

document.getElementById("work-more").addEventListener("click", changeTime);
document.getElementById("work-less").addEventListener("click", changeTime);
document.getElementById("rest-more").addEventListener("click", changeTime);
document.getElementById("rest-less").addEventListener("click", changeTime);
