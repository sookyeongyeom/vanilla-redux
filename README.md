# 💟 리덕스 맛보기

리덕스에서 중요한 개념은 다음의 네가지다.

1. 액션
2. 액션 생성 함수
3. 리듀서
4. 구독
5. 디스패치
6. 불변성 유지

## 1. 액션

상태에 어떤 변화가 필요하면 액션을 일으켜야 한다.

액션은 하나의 객체인데, 필수 필드는 `type`이다.

```javascript
{
	type: TOGGLE_VALUE;
}
```

이외 필드도 필요하다면 추가할 수 있다.

```javascript
{
	type: INCREASE, difference;
}
```

참고로, 액션의 이름은 문자열이 아닌 변수로 관리한다.

```javascript
const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
```

## 2. 액션 생성 함수

액션 생성 함수는 액션 객체를 만들어주는 함수다.  
디스패치를 통해 액션을 일으킬 때, 이 액션 생성 함수를 호출해주어야 한다.

```javascript
const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
```

## 3. 리듀서

리듀서는 변화를 일으키는 함수다.  
액션을 발생시키면 리듀서가 `현재 상태`와 `전달받은 액션 객체`를 파라미터로 받아온다.
그리고 두 값을 참고하여 미리 정의된 로직을 통해 새로운 상태를 만들어 반환한다.

리듀서를 만들기 위해서는 두가지가 필요하다.

1. 액션 이름
2. 초기 상태값

```javascript
// 초깃값 설정
const initialState = {
	toggle: false,
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case TOGGLE_SWITCH:
			return {
				...state, // 불변성 유지
				toggle: !state.toggle, // 새로운 값으로 덮어쓰기
			};
	}
}
```

리듀서를 정의했다면 드디어 `store`를 만들 수 있다.

```javascript
const store = createStore(reducer);
```

## 4. 구독

상태가 업데이트될 때마다 어떤 함수를 실행시켜주고 싶다면 (예: render) 구독을 이용하면 된다.

```javascript
const render = () => console.log('상태가 업데이트됨');

const unsubscribe = store.subscribe(render);
```

`unsubscribe`라고 네이밍해주는 이유는 추후 구독을 비활성화할 때 해당 함수를 사용하기 위함이다.

## 5. 디스패치

액션을 발생시키는 함수를 디스패치라고 한다.  
파라미터에 액션 객체를 넣어주면 된다.

```javascript
$divToggle.onclick = () => store.dispatch(toggleSwitch());
```

## 6. 불변성 유지

리듀서를 사용하여 상태를 업데이트할 때는, 기존 상태의 불변성을 유지해주어야 한다.  
기존 상태값을 수정하는 것이 아니라 새로운 객체를 만들어 덮어씌워주어야 한다는 뜻이다.

이유는, 리덕스가 상태 업데이트 여부를 확인할 때 성능 유지를 위해 얕은 비교를 수행하기 때문이다.

기존 상태값을 수정하게 되면 객체의 특성상 동일한 주소를 갖기 때문에 리덕스는 상태가 유지된 것으로 본다.  
반면 새로운 객체로 아예 덮어쓰게 되면 기존 상태값과는 별개의 객체이므로 다른 주소를 갖게 되어 리덕스가 업데이트를 인지하게 된다.

이때 이전 상태값을 복사하기 위해 스프레드 연산자를 주로 이용하는데,  
스프레드 연산자는 `depth 1`까지만 깊은 복사를 수행하기 때문에 객체가 복잡할 경우 적절치 않다.

이러한 문제를 편하게 다루기 위해 `immer` 라이브러리를 주로 사용한다고 한다.
