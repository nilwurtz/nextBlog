---
title: 【React + Typescript】スクロール位置を取得するコンポーネント
tags: React TypeScript
author: ragnar1904
date: 2020-01-29
slide: false
---
よく使うのでメモ。

以下のコードはスクロール位置が80px以下になると色が変化するnavの例。
ちゃんとやるならrefから高さ取得する感じかな。

```typescript
import React, { useEffect, useState } from 'react';

const scrollTop = (): number => {
  return Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
};

export const NavBar: React.FC = () => {
  const [isTop, setIsTop] = useState<boolean>(true);

  const onScroll = (): void => {
    const position = scrollTop();
    if (position >= 80) {
      setIsTop(false);
    } else {
      setIsTop(true);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", onScroll);
    return (): void => document.removeEventListener("scroll", onScroll);
  });

  const  scrollStyle: React.CSSProperties = isTop
    ? { backgroundColor: "#fff" }
    : { backgroundColor: "#000", opacity: 0.8 };

  return (
   <nav style={scrollStyle}></nav>
  );
};

```
