const workTime = {
	min: 25,
	sec: 0
};

const restTime = {
	min: 05,
	sec: 0
};

const timer = document.getElementById("work-time");
const rest = document.getElementById("rest-time");

// Creating the string to show 2 digits number

let setDisplayNum = (m, s, clock) => {
	m = ("00" + m).slice(-2);
	s = ("00" + s).slice(-2);
	clock.innerHTML = `${m}:${s}`;
};

setDisplayNum(workTime.min, workTime.sec, timer);
setDisplayNum(restTime.min, restTime.sec, rest);

// Main function

const count = function () {
	if (workTime.min > 0 && workTime.sec === 0) {
		workTime.min--;
		workTime.sec = 59;
	} else if (workTime.sec > 0) {
		workTime.sec--;
	} else {
		if (restTime.min > 0 && restTime.sec === 0) {
			restTime.min--;
			restTime.sec = 59;
		} else if (restTime.sec > 0) {
			restTime.sec--;
		}
	}
	setDisplayNum(workTime.min, workTime.sec, timer);
	setDisplayNum(restTime.min, restTime.sec, rest);
};

// Button Selectors and command functions

const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");

var goTimer; // Variable for the setInterval counter

const getCounting = function () {
	start.removeEventListener("click", getCounting);
	goTimer = setInterval(count, 1000);
};

const stopCount = function () {
	start.addEventListener("click", getCounting);
	clearInterval(goTimer);
};

const resetCount = function () {
	workTime.min = 25;
	workTime.sec = 00;
	restTime.min = 05;
	restTime.sec = 00;
	setDisplayNum(workTime.min, workTime.sec, timer);
	setDisplayNum(restTime.min, restTime.sec, rest);

	clearInterval(goTimer);
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
		? (displaySelected = workTime)
		: (displaySelected = restTime);

	if (operation === "add") {
		addTime(displaySelected);
	} else if (operation === "subt") {
		removeTime(displaySelected);
	}

	setDisplayNum(workTime.min, workTime.sec, timer);
	setDisplayNum(restTime.min, restTime.sec, rest);
};

document.getElementById("work-more").addEventListener("click", changeTime);
document.getElementById("work-less").addEventListener("click", changeTime);
document.getElementById("rest-more").addEventListener("click", changeTime);
document.getElementById("rest-less").addEventListener("click", changeTime);