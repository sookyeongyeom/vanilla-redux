import { legacy_createStore as createStore } from 'redux';

// DOM Element
const $divToggle = document.querySelector('.toggle');
const $counter = document.querySelector('h1');
const $btnIncrease = document.querySelector('#increase');
const $btnDecrease = document.querySelector('#decrease');

// 액션
const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

// 액션 생성 함수
const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increase = (difference) => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });

// 초깃값 설정
const initialState = {
	toggle: false,
	counter: 0,
};

// 리듀서 함수
function reducer(state = initialState, action) {
	switch (action.type) {
		case TOGGLE_SWITCH:
			return {
				...state, // 불변성 유지
				toggle: !state.toggle, // 새로운 값으로 덮어쓰기
			};
		case INCREASE:
			return {
				...state,
				counter: state.counter + action.difference,
			};
		case DECREASE:
			return {
				...state,
				counter: state.counter - 1,
			};
		default:
			return state;
	}
}

const store = createStore(reducer);

const render = () => {
	const state = store.getState();
	// 토글 처리
	if (state.toggle) {
		$divToggle.classList.add('active');
	} else {
		$divToggle.classList.remove('active');
	}
	// 카운터 처리
	$counter.innerText = state.counter;
};

render();

// 상태가 업데이트될 때마다 호출
store.subscribe(render);

// onClick eventListener
$divToggle.onclick = () => store.dispatch(toggleSwitch());
$btnIncrease.onclick = () => store.dispatch(increase(1));
$btnDecrease.onclick = () => store.dispatch(decrease());
