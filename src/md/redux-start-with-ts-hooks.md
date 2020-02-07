---
title: 【React】Hooks + Typescript で始める Redux
tags: redux React TypeScript react-hooks
author: ragnar1904
date: 2020-02-07
slide: false
---

## 概要

ひと月前ほどから React + Typescriptに入門し、最近Reduxを触っています。
始めた時期的にも Hooks を使用することがほとんどなのですが、今ではReactとReduxをつなぐreact-reduxもHooksで書け、案外ハードルは低いように感じました。
今回はそんな、最近 React + Typescriptに入門した人向けのRedux記事です。

また今回はTypescriptのActionCreatorライブラリ、`typescript-fsa`, `typescript-fsa-reducers`は使用しません。
一度一通り自分で実装してみてから楽しようと思います。

基本的には、Reduxのチュートリアルをなぞっています。
[Usage With TypeScript](https://redux.js.org/recipes/usage-with-typescript/)

## 環境

- CentOS 7
- react 16.12.0
- react-redux 7.1.3
- redux 4.0.5

## Redux について

Reduxの説明に関しては省略。Qiitaにもわかりやすい記事が多数あるのでリンクを。

- [たぶんこれが一番分かりやすいと思います React + Redux のフロー図解 - Qiita](https://qiita.com/mpyw/items/a816c6380219b1d5a3bf)
- [Redux 入門【ダイジェスト版】10 分で理解する Redux の基礎 - Qiita](https://qiita.com/kitagawamac/items/49a1f03445b19cf407b7)

## 準備

React + Typescriptの環境は設定済の状態からスタートします。
`$ create-react-app . --typescript`で始めました。
Reduxを使用するのに必要なパッケージをインストール。

```bash
$ yarn add redux react-redux
$ yarn add --dev @types/react-redux
```

Reduxを書くにあたって、ディレクトリ構成等もスタイルがあります。
今回は機能ごとにフォルダを分け、Action, ActionCreator, Reducerをまとめてしまう Ducksパターンで作成しました。
参考: [Redux のファイル構成は『Ducks』がオススメ - Qiita](https://qiita.com/uryyyyyyy/items/a88f37b76fe434c62bac)

```bash
.
├── README.md
├── package.json
├── public
│   ├── favicon.ico...
│
├── src
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── components
│   │   ├── Button.tsx
│   │   ├── Counter.tsx
│   │   ├── TodoForm.tsx
│   │   └── TodoListItem.tsx
│   ├── index.tsx
│   ├── logo.svg
│   ├── react-app-env.d.ts
│   ├── serviceWorker.ts
│   ├── setupTests.ts
│   └── store
│       ├── actionTypes.ts
│       ├── counter
│       │   ├── actions.ts
│       │   ├── reducer.ts
│       │   └── types.ts
│       ├── index.ts
│       └── todo
│           ├── actions.ts
│           ├── reducer.ts
│           └── types.ts
├── tsconfig.json
├── yarn-error.log
└── yarn.lock
```

## Counterを作成する
### Actionを書く

今回はカウンターアプリとTODOアプリを作成します。
Reduxを書く場合、Actionの種類を考え、Typeを定義することから始めるとわかりやすいです。
Actionで発行されるtype はプロジェクトで一意である必要があるので、`src/store/actionTypes`の中の一つのオブジェクトとして管理することにしました。

```typescript:src/store/actionTypes.ts
// *
// * action types
// * 一意となるキーを指定するので、Actionが増えるたびにここにキーを書く
// *

export const ActionTypes = {
  increment: "INCREMENT", // "INCREMENT"型
  decrement: "DECREMENT", // "DECREMENT"型
  countReset: "COUNT_RESET", // "COUNT_RESET"型
} as const;
```

Typescript3.4から導入された*const assertion*を用いて、プロパティをストリングリテラル型にしておくことで
Actionの型をストリングリテラル型にでき、Actionに対して型推論も効きます。

### 型定義を書く

次は、Actionの型を書いていきます。カウンターなので今回は値を引数に持たないパターンで実装します。

```typescript:src/store/counter/types.ts
import { Action } from "redux";

import { ActionTypes } from "../actionTypes";

// *
// * type of Actions
// *

// stateの型
export type Count = {
  value: number;
};

// Actionの型 Actionを継承
interface IncrementAction extends Action {
  type: typeof ActionTypes.increment; // "INCREMENT"型
}

interface DecrementAction extends Action {
  type: typeof ActionTypes.decrement;
}

interface ResetAction extends Action {
  type: typeof ActionTypes.countReset;
}

// exportするActionの型, Unionで結合
export type CounterActionTypes = IncrementAction | DecrementAction | ResetAction;
```

### Action Creatorを書く

Actionを発行するActionCreatorを書きます。
これらは、CounterActionTypesを返却する関数、すなわち`{ type: "INCREMENT" }`のようなオブジェクトを返す関数です。

```typescript:src/store/counter/actions.ts
import { ActionTypes } from "../actionTypes";
import { CounterActionTypes } from "./types";

// *
// * action creators
// *

export const incrementAction = (): CounterActionTypes => {
  return {
    type: ActionTypes.increment, // "INCREMENT"
  };
};

export const decrementAction = (): CounterActionTypes => {
  return {
    type: ActionTypes.decrement,
  };
};

export const resetAction = (): CounterActionTypes => {
  return {
    type: ActionTypes.countReset,
  };
};
```

### Reducer を書く

Actionとstateを受け取り、更新後のstateを返す関数、Reducerを定義します。
Count型の初期値を指定し、それぞれのActionに対応した処理をします。
default部にはnever型の定数を定義します。
想定外のActionを受け取ってしまう場合、actionがnever型がアサインされエラーとなるのを防ぐためです。
参考: [typescript-fsaに頼らないReact × Redux - ログミーTech](https://logmi.jp/tech/articles/320496)

```typescript:src/store/counter/reducer.ts
import { ActionTypes } from "../actionTypes";
import { Count, CounterActionTypes } from "./types";

// *
// * reducer
// *

const initialState: Count = {
  value: 0,
};

export const countReducer = (state = initialState, action: CounterActionTypes): Count => {
  switch (action.type) {
    case ActionTypes.increment: // action.type === "INCREMENT"
      return { value: state.value + 1 }; // value に1足す
    case ActionTypes.decrement:
      // 0以下にはならない
      return { value: state.value === 0 ? 0 : state.value - 1 };
    case ActionTypes.countReset:
      return { value: 0 };
    default:
      const _: never = action;
      return state;
  }
};
```


### storeを書く

最後にstoreを定義します。
`src/store/index.ts`にstoreを書き、`./store`としてインポートするようにします。

```typescript:src/store/index.ts
import { combineReducers, createStore } from 'redux';

import { countReducer } from './counter/reducer';

// *
// * store 本体
// *

// Reducerを増やすときは、ここに追加
const rootReducer = combineReducers({
  counter: countReducer,
});

// states type
export type RootState = ReturnType<typeof rootReducer>; // ReturnType<typeof fn>は、fnの返り値の型

// store
const store = createStore(rootReducer);

export default store;
```


### Componentでstoreからstateを取得

一通りRedux周りは書けたので、コンポーネントでstoreを参照します。

#### Provider

storeを参照するために、`src/index.tsx`にProviderを設定します。

```tsx:src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root"),
);
```

#### useSelector

コンポーネントでstoreを参照するには、useSelector Hookを使用します。
useSelector関数の引数には、stateを引数にとり、使用するstateの値を返す関数を渡します。
一見よくわかりませんが、storeという大きなオブジェクトの中から必要な値を取得しているだけです。


```tsx:component
import { useSelector } from 'react-redux';

import { RootState } from '../store';

export const Counter: React.FC = () => {
  // storeからstateを取得する
  // rootReducer.counterにcountReducerを指定したので、以下のようにする。
  // currentCountはCount型のオブジェクト
  const currentCount = useSelector((state: RootState) => state.counter);
  return <div>{currentCount.value}</div>;
};
```

#### useDispatch

Actionを発行するDispatchは、useDispatch Hookを使用します。
dispatch(actionCreator())とすることでActionを発行します。
ButtonコンポーネントはlabelとonClickを受け取るコンポーネントです。

```tsx:component
import React from 'react';
import { useDispatch } from 'react-redux';

import { decrementAction, incrementAction, resetAction } from '../store/counter/actions';
import { Button } from './Button';


export const Counter: React.FC = () => {
  const dispatch = useDispatch();

  // action を発行する関数
  // 引数にはaction creatorを渡す
  // 親のrenderごとに子のrenderが走るので、useCallbackを用いメモ化すべき。
  const handleIncrement = () => dispatch(incrementAction());
  const handleDecrement = () => dispatch(decrementAction());
  const handleReset = () => dispatch(resetAction());

  return (
    <>
      <Button label="Up" onClick={handleIncrement} />
      <Button label="Down" onClick={handleDecrement} />
      <Button label="Reset" onClick={handleReset} />
    </>
  );
};

```

### 完成:Counter

以上を組み合わせ、Counterコンポーネントができました。

```tsx:src/components/Counter.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store';
import { decrementAction, incrementAction, resetAction } from '../store/counter/actions';
import { Button } from './Button';

export const Counter: React.FC = () => {
  const currentCount = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();

  const handleIncrement = () => dispatch(incrementAction());
  const handleDecrement = () => dispatch(decrementAction());
  const handleReset = () => dispatch(resetAction());
  return (
    <>
      <div>{currentCount.value}</div>
      <Button label="Up" onClick={handleIncrement} />
      <Button label="Down" onClick={handleDecrement} />
      <Button label="Reset" onClick={handleReset} />
    </>
  );
};

```


## todoアプリを作る

先程はActionに引数が不要でしたが、現実ではいろんなオブジェクトを渡し、加工、変換、抽出などを行います。
Redux ExampleにもあるTodoアプリを作成してみます。

カウンターと同じように、`src/store`に`todo`ディレクトリを作成し、そこに型定義とActionCreator、Reducerを作成します。
その前に、Actionの定義を追加します。


### Action定義

```typescript:src/store/actionTypes.ts
export const ActionTypes = {
  increment: "INCREMENT",
  decrement: "DECREMENT",
  countReset: "COUNT_RESET",
  // 追加
  addTodo: "ADD_TODO",
  deleteTodo: "DELETE_TODO",
} as const;
```

### 型定義

次に、型定義します。Todoは一つづつIDとtextを持ちます。
stateとして持つ型は`TodoData[]`、すなわち`ToDos`です。

Actionの型にもpayloadが追加されています。
Todoを追加するには本文、削除するには削除対象のidが必要です。

```typescript:src/store/todo/types.ts
import { Action } from 'redux';

import { ActionTypes } from '../actionTypes';

type TodoData = {
  id: number;
  text: string;
};

export type ToDos = TodoData[];

interface AddTodoAction extends Action {
  type: typeof ActionTypes.addTodo;
  payload: { text: string };
}

interface DeleteTodoAction extends Action {
  type: typeof ActionTypes.deleteTodo;
  payload: { id: number };
}

export type TodoActionTypes = AddTodoAction | DeleteTodoAction;
```

### ActionCreator

先ほどの型定義の通り、returnするオブジェクトを書きます。

```typescript:src/store/todo/actions.ts
import { ActionTypes } from '../actionTypes';
import { TodoActionTypes } from './types';

export const addTodoAction = (todoText: string): TodoActionTypes => {
  return {
    type: ActionTypes.addTodo,
    payload: {
      text: todoText,
    },
  };
};

export const deleteTodoAction = (todoId: number): TodoActionTypes => {
  return {
    type: ActionTypes.deleteTodo,
    payload: {
      id: todoId,
    },
  };
};
```

### Reducer

次にReducerの定義をします。`action.payload`に値が渡ってきます。
stateを操作し、値を返します。

```typescript:src/store/todo/reducer.ts
import { ActionTypes } from '../actionTypes';
import { TodoActionTypes, ToDos } from './types';

const initialState: ToDos = [];

export const todoReducer = (state = initialState, action: TodoActionTypes) => {
  const latestId = state.length;
  switch (action.type) {
    case ActionTypes.addTodo:
      state.push({
        id: latestId + 1,
        text: action.payload.text,
      });
      return state;
    case ActionTypes.deleteTodo:
      return state.filter(data => data.id !== action.payload.id);
    default:
      const _: never = action;
      return state;
  }
};
```

### store

最後に、Reducerを結合して完了です。

```ts:src/store/index.ts
import { combineReducers, createStore } from 'redux';

import { countReducer } from './counter/reducer';
import { todoReducer } from './todo/reducer';

const rootReducer = combineReducers({
  counter: countReducer,
   // 追加
  todo: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer);

export default store;
```

### 完成

これで簡単なtodoアプリの完成です。

```tsx:src/components/TodoForm.tsx
import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store';
import { addTodoAction, deleteTodoAction } from '../store/todo/actions';
import { TodoListItem } from './TodoListItem';

export const TodoForm: React.FC = () => {
  const todoList = useSelector((state: RootState) => state.todo);
  const dispatch = useDispatch();
  const inputForm = useRef<HTMLInputElement | null>(null);
  const [inputTodo, setInputTodo] = useState("");
  const handleInput = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputTodo(event.target.value);
  }, []);

  const clearInput = () => {
    if (inputForm.current !== null) {
      inputForm.current.value = "";
      setInputTodo("");
    }
  };

  const handleAdd = () => {
    dispatch(addTodoAction(inputTodo));
    clearInput();
  };

  return (
    <>
      <h1>TODO</h1>
      <input ref={inputForm} onChange={handleInput}></input>
      <button onClick={handleAdd}>ADD</button>
      <ul>
        {todoList.map(item => (
          <TodoListItem key={item.id} onClick={() => dispatch(deleteTodoAction(item.id))}>
            {item.text}
          </TodoListItem>
        ))}
      </ul>
    </>
  );
};

```

```tsx:src/components/TodoListItem.tsx
import React from 'react';
import styled from 'styled-components';

type Props = {
  children?: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => void;
};

export const TodoListItem: React.FC<Props> = props => {
  return (
    <li>
      {props.children}
      <DeleteButton onClick={props.onClick}>×</DeleteButton>
    </li>
  );
};

const DeleteButton = styled.span`
  font-size: 2rem;
  cursor: pointer;
`;
```


## まとめ

Hooksを用いて、一度Action, ActionCreator, Reducer, Storeを作成してしまうと、案外わかりやすいですね。
Hooks登場後にReactに入門した身からすると、Hooksで大体のことは出来てしまうのですが、コンポーネントがどんどん肥大化してしまうのは気になっていました。
Reduxを使用し、Ducksパターンのディレクトリ構成にしていると、コンポーネントファイルの見通しが良く保守性もよさそうです。

まだまだReactのパフォーマンス部分への理解が出来ておらず、メモ化を使用する部分があまり解っていないので、勉強する必要がありますね・・・。
