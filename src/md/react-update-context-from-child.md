---
title: 【React + Typescript】useContext の値を子コンポーネントから更新
tags: React TypeScript react-hooks useContext
author: ragnar1904
date: 2020-02-03
slide: false
---
## やること

React Hooks の `useContext` を使用すると、Provider 以下のどのコンポーネントからも値を参照できる。
子コンポーネントから Context の値を更新するには、カスタムフックを作成することで実現できる。

## 環境

- CentOS7
- typescript 3.7
- React 16.12.0 (Next 9.2.0)



## useContext について

React には [Context](https://ja.reactjs.org/docs/context.html) という機能があり、
Provider 以下のいろんなコンポーネントから値を共有出来る仕組み。

いろんなコンポーネントが用いる設定(例: ロケール設定、カラーテーマ等)を管理するのに使用する事が多い。
`useContext`は React Hooks で Context を扱うメソッド。

## 実装

今回はダークモードの切り替えを例とする。

フォルダはnextっぽい感じで以下。

```bash
.
└── src
      ├── components
      │   └── toggle.tsx
      ├── contexts
      │   └── theme.ts
      └── pages
           └── index.tsx
```

### useContextを使ってみる

[Docs](https://ja.reactjs.org/docs/hooks-reference.html#usecontext)の通り。

Contextを作成したら、Providerでラップする。

```typescript:pages/index.tsx
import React from 'react';

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = React.createContext(themes.light);

const Index: React.FC = () => {
  return (
    <ThemeContext.Provider value={themes.dark}>
      ...
      <toggleButton />
    </ThemeContext.Provider>
  );
}

export default Index;
```

子コンポーネントでは・・・

```typescript:components/toggle.tsx
import React from 'react';

const toggleButton: React.FC = () => {
  const theme = useContext(ThemeContext);

  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```

ただこれでは、子コンポーネントからthemeを変更することができない。
(useContextは基本参照用の機能として提供されている。)

なので、Contextを変更できるカスタムフックを作成する。

### カスタムフックの作成

簡略のため、darkかどうかのbooleanをcontextとして扱うことにする。

```typescript:context/theme.ts
import { createContext, useCallback, useState } from 'react';

// set context type
type ThemeContext = {
  dark: boolean;
  setIsDark: (isDark: boolean) => void;
};

// context default value
const defaultContext: ThemeContext = {
  dark: false,
  // 初期値を作成するが、eslintに引っかかる
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsDark: () => {},
};

// context object
export const themeContext = createContext<ThemeContext>(defaultContext);

// custom Hook
export const useDark = (): ThemeContext => {
  // state名はThemeContext typeのプロパティに合わせる。
  const [dark, setDark] = useState(false);
  // 関数名はThemeContext typeのプロパティに合わせる。
  const setIsDark = useCallback((current: boolean): void => {
    setDark(current);
  }, []);
  return {
    dark,
    setIsDark,
  };
};
```
### 利用する

親コンポーネントでは先ほどのカスタムフックを利用、Providerにカスタムフックから受け取った値を渡す

```typescript:pages/index.tsx
import React from 'react';

import { themeContext, useDark } from '../contexts/theme';
import { toggleButton } from "../components/toggle"

const Index: NextPage = () => {
  const ctx = useDark();
  return (
    <themeContext.Provider value={ctx}>
      ...
      <toggleButton />
    </themeContext.Provider>
  );
};
```

子ではuseContextを利用し、contextから値と更新用関数を受け取る。

```typescript:components/toggle.tsx
import React, { useContext } from 'react';

import { themeContext } from '../contexts/align';

const toggleButton: React.FC = () => {
  const ctx = useContext(themeContext);
  const handleClick = () => {
      ctx.setIsDark(!ctx.dark) // Context値更新
  }
  return (
    <button onClick={handleClick}>
     Toggle theme context!
    </button>
  );
}
```

これでuseContextとcontextオブジェクトをインポートすればどこからでもcontextを操作できる。
