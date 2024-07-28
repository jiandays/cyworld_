const messageContainer = document.querySelector('#d-day-message');
const container = document.querySelector('#d-day-container');
const savedDate = localStorage.getItem('saved-date');
const intervalIdArr = [];
// 초기 설정: D-Day 입력 메시지와 컨테이너 숨기기

// 날짜 형식을 생성하는 함수
const dateFormMaker = function () {
	const inputYear = document.querySelector('#target-year-input').value;
	const inputMonth = document.querySelector('#target-month-input').value;
	const inputDate = document.querySelector('#target-date-input').value;

	//const dateFormat = inputYear + '-' + inputMonth + '-' + inputDate;
	const dateFormat = `${inputYear}-${inputMonth}-${inputDate}`;
	return dateFormat;
};

// D-Day 카운터 함수
const counterMaker = function (data) {
	if (data !== savedDate) {
		localStorage.setItem('saved-date', data);
	}
	const nowDate = new Date();
	const targetDate = new Date(data).setHours(0, 0, 0, 0);
	const remaining = (targetDate - nowDate) / 1000;

	// 유효한 날짜인지 확인
	if (remaining <= 0) {
		container.style.display = 'none';
		messageContainer.innerHTML = '<h3>타이머가 종료되었습니다.</h3>';
		messageContainer.style.display = 'flex';
		setClearInterval();
		return;
	} else if (isNaN(remaining)) {
		container.style.display = 'none';
		messageContainer.innerHTML = '<h3>유효한 시간대가 아닙니다.</h3>';
		messageContainer.style.display = 'flex';
		setClearInterval();
		return;
	}

	const remainingObj = {
		remainingDate: Math.floor(remaining / 3600 / 24),
		remainingHours: Math.floor(remaining / 3600) % 24,
		remainingMin: Math.floor(remaining / 60) % 60,
		remainingSec: Math.floor(remaining) % 60,
	};

	const documentArr = ['days', 'hours', 'min', 'sec'];
	const timeKeys = Object.keys(remainingObj);
	// ['remainingDate', ...]

	const format = function (time) {
		if (time < 10) {
			return '0' + time;
		} else {
			return time;
		}
	};
	// 남은 시간 값을 화면에 표시
	let i = 0;
	for (let tag of documentArr) {
		const remainingTime = format(remainingObj[timeKeys[i]]);
		document.getElementById(tag).textContent = remainingTime;
		i++;
	}
};
// 카운터 시작 함수
const starter = function (targetDateInput) {
	if (!targetDateInput) {
		targetDateInput = dateFormMaker();
	}
	container.style.display = 'flex';
	messageContainer.style.display = 'none';
	setClearInterval();
	counterMaker(targetDateInput);
	const intervalId = setInterval(() => {
		counterMaker(targetDateInput);
	}, 1000);
	intervalIdArr.push(intervalId);
};

const setClearInterval = function () {
	localStorage.removeItem('saved-date');
	for (let i = 0; i < intervalIdArr.length; i++) {
		clearInterval(intervalIdArr[i]);
	}
};

// 타이머 초기화 함수
const resetTimer = function () {
	setClearInterval();
	container.style.display = 'none';
	messageContainer.innerHTML = '<h3>D-Day를 입력해 주세요.</h3>';
	messageContainer.style.display = 'flex';
};

if (savedDate) {
	stater(savedDate);
} else {
	container.style.display = 'none';
	messageContainer.innerHTML = '<h3>D-Day를 입력해 주세요.</h3>';
}
