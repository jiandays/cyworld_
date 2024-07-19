// 반복문 실습

const fruits = [
	{ number: 1, title: "레드향" },
	{ number: 2, title: "샤인머스켓" },
	{ number: 3, title: "산청딸기" },
	{ number: 4, title: "한라봉" },
	{ number: 5, title: "사과" },
	{ number: 6, title: "애플망고" },
	{ number: 7, title: "딸기" },
	{ number: 8, title: "천혜향" },
	{ number: 9, title: "과일선물세트" },
	{ number: 10, title: "귤" },
];
//undefined
for (let k = 0; k < fruits.length; k++) {
	console.log(fruits[k].number + " " + fruits[k].title);
}
// 1 레드향
// 2 샤인머스켓
// 3 산청딸기
// 4 한라봉
// 5 사과
// 6 애플망고
// 7 딸기
// 8 천혜향
// 9 과일선물세트
// 10 귤
undefined;
for (let k = 0; k < fruits.length; k++) {
	console.log(`${fruits[k].number} ${fruits[k].title}`);
}
// 1 레드향
// 2 샤인머스켓
// 3 산청딸기
// 4 한라봉
// 5 사과
// 6 애플망고
// 7 딸기
// 8 천혜향
// 9 과일선물세트
// 10 귤
undefined;
for (let k = 0; k < fruits.length; k++) {
	console.log(`과일 차트 ${fruits[k].number}위는 ${fruits[k].title}입니다`);
}
// 과일 차트 1위는 레드향입니다
// 과일 차트 2위는 샤인머스켓입니다
// 과일 차트 3위는 산청딸기입니다
// 과일 차트 4위는 한라봉입니다
// 과일 차트 5위는 사과입니다
// 과일 차트 6위는 애플망고입니다
// 과일 차트 7위는 딸기입니다
// 과일 차트 8위는 천혜향입니다
// 과일 차트 9위는 과일선물세트입니다
