const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');

const savedWeatherData = JSON.parse(localStorage.getItem('saved-weather'));
const savedToDoList = JSON.parse(localStorage.getItem('saved-items'));

const createTodo = function (storageData) {
	let todoContents = todoInput.value;
	if (storageData) {
		todoContents = storageData.contents;
	}

	const newLi = document.createElement('li');
	const newSpan = document.createElement('span');
	const newBtn = document.createElement('button');

	newBtn.addEventListener('click', () => {
		newLi.classList.toggle('complete');
		saveItemsFn();
	});

	newLi.addEventListener('dblclick', () => {
		newLi.remove();
		saveItemsFn();
	});

	if (storageData?.complete) {
		newLi.classList.add('complete');
	}

	newSpan.textContent = todoContents;
	newLi.appendChild(newBtn);
	newLi.appendChild(newSpan);
	todoList.appendChild(newLi);
	todoInput.value = '';
	saveItemsFn();
};

let isComposing = false;

const keyCodeCheck = (event) => {
	if (event.key === 'Enter' && todoInput.value.trim() !== '' && !isComposing) {
		createTodo();
	}
};

todoInput.addEventListener('keydown', keyCodeCheck);
todoInput.addEventListener('compositionstart', () => {
	isComposing = true;
});
todoInput.addEventListener('compositionend', () => {
	isComposing = false;
});

const deleteAll = () => {
	const liList = document.querySelectorAll('li');
	for (let i = 0; i < liList.length; i++) {
		liList[i].remove();
	}
	saveItemsFn();
};

const saveItemsFn = () => {
	const saveItems = [];
	for (let i = 0; i < todoList.children.length; i++) {
		const todoObj = {
			contents: todoList.children[i].querySelector('span').textContent,
			complete: todoList.children[i].classList.contains('complete'),
		};
		saveItems.push(todoObj);
	}
	saveItems.length === 0
		? localStorage.removeItem('saved-items')
		: localStorage.setItem('saved-items', JSON.stringify(saveItems));
};

// 페이지 로드 시 저장된 할 일 목록 불러오기
if (savedToDoList) {
	for (let i = 0; i < savedToDoList.length; i++) {
		createTodo(savedToDoList[i]);
	}
}

// 날씨 데이터 처리 함수
const weatherDataActive = function ({ location, weather }) {
	const weatherMainList = [
		'Clear',
		'Clouds',
		'Drizzle',
		'Rain',
		'Snow',
		'Thunderstorm',
	];
	weather = weatherMainList.includes(weather) ? weather : 'Fog';
	const locationNameTag = document.querySelector('#location-name-tag');
	locationNameTag.textContent = location;
	document.body.style.backgroundImage = `url('./images/${weather}.jpg')`;
	if (
		!savedWeatherData ||
		savedWeatherData.location !== location ||
		savedWeatherData.weather !== weather
	) {
		localStorage.setItem(
			'saved-weather',
			JSON.stringify({ location, weather })
		);
	}
};

// 날씨 API 요청 함수
const weatherSearch = ({ latitude, longitude }) => {
	fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=52bab00817155695c3c9d95c036a1af1`
	)
		.then((res) => {
			return res.json();
		})
		.then((json) => {
			const weatherData = {
				location: json.name,
				weather: json.weather[0].main,
			};
			weatherDataActive(weatherData);
		})
		.catch((err) => {
			console.error(err);
		});
};

// 사용자 위치 접근 함수
const accessToGeo = ({ coords }) => {
	const { latitude, longitude } = coords;
	const positionObj = { latitude, longitude }; // shorthand property
	weatherSearch(positionObj);
};

// 위치 요청 함수
const askForLocation = () => {
	navigator.geolocation.getCurrentPosition(accessToGeo, (err) => {
		console.error(err);
	});
};

// 위치 요청 호출
askForLocation();

// 저장된 날씨 데이터가 있을 경우 그 데이터 사용
if (savedWeatherData) {
	weatherDataActive(savedWeatherData);
}
ㄴ;
