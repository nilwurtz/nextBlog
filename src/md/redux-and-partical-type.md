---
title: 【Redux + Typescript】Formの値管理にはPartical型が生きる
tags: redux TypeScript
author: ragnar1904
date: 2020-02-23
slide: false
---
## Partical型

TypescriptにはPartical型というものが存在し、すべてのプロパティを省略可能にした型がある。

```ts
type User = {
  firstName: string;
  lastName: string;
  age: number;
  gender: "man" | "women" | "other";
};

type PartialUser = Partial<User>;

// こうなる
// type PartialUser = {
//    firstName?: string;
//    lastName?: string;
//    age?: number;
//    gender?: "man" | "women" | "other";
//}
```

Reduxでフォームの値を保持するケースも多々あるが、これを用いれば簡潔にReduxでのフォームの値管理を行える。


## type

型を書いていく。今回は`User`型のデータを入力するフォームの想定。

```ts
import { Action } from "redux";

export const ActionTypes = {
  userFormChange: "USER_FORM_CHANGE",
} as const;

// state型　Formと対応
export type User = {
  firstName: string;
  lastName: string;
  age: number;
  gender: "man" | "women" | "other";
};

// Action 型
type UserFormChangeAction = {
  type: typeof ActionTypes.userFormChange;
  payload: Partial<User>;
} & Action;

export type FormActionTypes = UserFormChangeAction;
```


## ActionCreator
`payload`には、`Partical<User>` 型、すなわち`User`型オブジェクトの一部分を渡す。  
このため型安全を保ちつつ、更新するフォームの値のみを渡すことができる。

```ts
export const userFormChangeAction = (user: Partial<User>): FormActionTypes => {
  return {
    type: ActionTypes.userFormChange,
    payload: user,
  };
};
```

## Reducer
`Object.assign`を使って、前のstateとマージする。

```ts
const initialState: User = {
  firstName: "",
  lastName: "",
  age: 0,
  gender: "man",
};

export const FormReducer = (state = initialState, action: FormActionTypes):User => {
  switch (action.type) {
    case ActionTypes.userFormChange:
      // action.payloadはstateと同じ型の一部
      // { age: 20 }のように渡せばageだけが更新される。
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};
```

conbineするだけなのでstore省略。


## dispatch

ReactコンポーネントでFormを更新する例。

```tsx:コンポーネント
import React from 'react';
import { useDispatch } from 'react-redux';

import { userFormChangeAction } from '../path/to/actions';

export const UserForm: React.FC = () => {
  const dispatch = useDispatch();
  const changeFirstName = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(userFormChangeAction({ firstName: e.target.value }));
  const changeLastName = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch(userFormChangeAction({ lastName: e.target.value }));
  // 略

  return (
    <form>
      <input onChange={changeFirstName} />
      <input onChange={changeLastName} />
      {/* inputが続く... */}
    </form>
  );
};
```

似たような関数なので、まとめてしまうとスッキリ。

```tsx
import React from 'react';
import { useDispatch } from 'react-redux';

import { userFormChangeAction } from '../path/to/actions';
import { User } from "../path/to/type/User"

export const UserForm: React.FC = () => {
  const dispatch = useDispatch();

  // handler関数を作成する関数
  const formHandler = (key: keyof User) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    dispatch(userFormChangeAction({ [key]: e.target.value }));
  // Formが大きくなっても簡潔に書ける
  const changeFirstName = formHandler("firstName"),
  const changeLastName = formHandler("lastName"),
  ...

  return (
    <form>
      <input onChange={changeFirstName} />
      <input onChange={changeLastName}/>
      {/* inputが続く... */}
    </form>
  );
};
```

- keyof

`keyof User`は、`User`型のプロパティのみを抜き出した型。

```ts
type User = {
  firstName: string;
  lastName: string;
  age: number;
  gender: "man" | "women" | "other";
};

type KeyOfUser = keyof User;

// type KeyOfUser = "firstName" | "lastName" | "age" | "gender"
```

これを引数にし、actionにわたすpayloadのオブジェクトを動的に変更する。

```ts
// オブジェクトのキーを動的に指定
{ [key]: value }
```

## まとめ

ReduxでFormの値管理を試行錯誤していたらスッキリ書けました。
Typescriptは型のスクリプト言語だとかいうけど、その感覚がわかってくるとすごい楽しいですね。
大体のフォームは`useState`で済ませることも多いのですが、複数コンポーネントから参照、入力とかするとReduxが欲しくなってきますね。


あと本当はuseCallbackとか書く必要あるので注意。
