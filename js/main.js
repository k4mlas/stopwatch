const playBtn = document.querySelector('.stopwatch__btn__option--start');
const pauseBtn = document.querySelector('.stopwatch__btn__option--pause');
const stopBtn = document.querySelector('.stopwatch__btn__option--stop');
const resetBtn = document.querySelector('.stopwatch__btn__option--reset');
const historyBtn = document.querySelector('.stopwatch__btn__option--history');
const clock = document.querySelector('.stopwatch__time');
const lastTime = document.querySelector('.stopwatch__result');
const timeList = document.querySelector('.stopwatch__list');
const infoBtn = document.querySelector('.stopwatch__info__quest');
const brushBtn = document.querySelector('.stopwatch__info__brush');
const modalShadow = document.querySelector('.modal');
const modalBtn = document.querySelector('.close');
const colors = document.querySelector('.stopwatch__colors');
const colorOne = document.querySelector('.stopwatch__colors__red');
const colorTwo = document.querySelector('.stopwatch__colors__blue');
const colorThree = document.querySelector('.stopwatch__colors__green');
const colorFour = document.querySelector('.stopwatch__colors__yellow');
let root = document.documentElement;

let countTime;
let second = 0;
let minutes = 0;

const timeArr = [];

const timePlay = () => {
	clearInterval(countTime);
	countTime = setInterval(() => {
		if (second < 9) {
			second++;
			clock.textContent = `${minutes}:0${second}`;
		} else if (second >= 9 && second < 59) {
			second++;
			clock.textContent = `${minutes}:${second}`;
		} else {
			minutes++;
			second = 0;
			clock.textContent = `${minutes}:0${second}`;
		}
	}, 1000);
};

const timePause = () => {
	clearInterval(countTime);
};

const timeStop = () => {
	if (clock.textContent !== '0:00') {
		lastTime.style.visibility = 'visible';
		lastTime.innerHTML = `Twój ostatni czas to: ${clock.textContent}`;
		timeArr.push(clock.textContent);
		console.log(timeArr);
	}
	minutes = 0;
	second = 0;
	clock.textContent = `${minutes}:0${second}`;
	clearInterval(countTime);
	timeList.textContent = '';
};

const timeReset = () => {
	minutes = 0;
	second = 0;
	clock.textContent = `${minutes}:0${second}`;
	lastTime.textContent = '';
	timeArr.splice(0, timeArr.length);
	clearInterval(countTime);
	console.log(timeArr);
	timeList.textContent = '';
};

const timeHistory = () => {
	timeList.textContent = '';
	let num = 1;
	timeArr.forEach((x) => {
		const itemLi = document.createElement('li');
		timeList.appendChild(itemLi);
		itemLi.innerHTML = `Pomiar nr ${num}: <span>${x}<span>`;
		num++;
	});
};

const infoModal = () => {
	modalShadow.style.display = 'block';
	modalShadow.classList.add('modal-animation');

	modalBtn.addEventListener('click', (closed) => {
		modalShadow.style.display = 'none';
		modalShadow.classList.remove('modal-animation');
	});
};

const colorsModal = () => {
	colors.classList.toggle('showColors');
};

colorOne.addEventListener('click', () => {
	root.style.setProperty('--first-color', 'rgb(250, 20, 6)');
});

colorTwo.addEventListener('click', () => {
	root.style.setProperty('--first-color', 'rgb(6, 173, 250)');
});

colorThree.addEventListener('click', () => {
	root.style.setProperty('--first-color', 'rgb(0, 255, 42)');
});
colorFour.addEventListener('click', () => {
	root.style.setProperty('--first-color', 'rgb(255,255,0)');
});

playBtn.addEventListener('click', timePlay);
pauseBtn.addEventListener('click', timePause);
stopBtn.addEventListener('click', timeStop);
resetBtn.addEventListener('click', timeReset);
historyBtn.addEventListener('click', timeHistory);
infoBtn.addEventListener('click', infoModal);
brushBtn.addEventListener('click', colorsModal);
window.addEventListener('click', (e) =>
	e.target === modalShadow ? (modalShadow.style.display = 'none') : false
);
