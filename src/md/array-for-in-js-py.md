---
title: PythonとJavaScriptの配列ループを比較
tags: Python JavaScript 初心者
author: ragnar1904
date: 2020-03-04
slide: false
---

Pythonを主に使用するのですが、JavaScriptを触ってみるといろんな配列操作があってこんがらがるので整理しました。

## お題

今回はstringの入った配列をループし、すべての要素の末尾に`__`を付けた配列を返すプログラムをお題としました。

## Python

### for in
Pythonでは基本for文は一つです。`for i in <list>`でイテレーションが出来ます。  

```python
from typing import List
array = ["hoge", "fuga", "foo", "bar"]

def add_suffix(text: str) -> str:
    return text + "__"

def for_in(array: List[str]) -> List[str]:
    ls: list = []
    for item in array:
        ls.append(add_suffix(item))
    return ls

print(for_map(array))
# ['hoge__', 'fuga__', 'foo__', 'bar__']
```

### map  
`map`を利用すれば、配列すべてに関数を適用出来ます。  
ただ`map`メソッドの返り値はmapオブジェクトというイテレータなので、listに変換する必要があります。  
内包表記を利用して、簡潔に記述出来るのがPythonらしいですね。  

```python
def for_map(array: List[str]) -> List[str]:
    return list(map(add_suffix, array))

print(for_in(array))
# ['hoge__', 'fuga__', 'foo__', 'bar__']
```

### enumerate  
indexが必要な場合、`enumerate`を利用出来ます。

```python
def for_enum(array: List[str]) -> List[str]:
    ls: list = []
    for idx, item in enumerate(array):
        # idx = 0, 1, 2, 3
        ls.append(add_suffix(item))
    return ls

print(for_enum(array))
# ['hoge__', 'fuga__', 'foo__', 'bar__']
```

## JavaScript

### for
JavaScriptでは、いろんな記述法がありますが、ベーシックなのはc言語と同じスタイルでしょう。

```javascript
var array = ["hoge", "fuga", "foo", "bar"];

function add_suffix(text) {
  return text + "__";
}

function forI(array) {
  returnArray = new Array();
  for (var i = 0; i < array.length; i++) {
    // i = 0, 1, 2, 3
    returnArray.push(add_suffix(array[i]));
  }
  return returnArray;
}

console.log(forI(array));
// ['hoge__', 'fuga__', 'foo__', 'bar__']
```

### for in  
`var i in array`とすると、オブジェクトのプロパティをループします。  
`Array`オブジェクトのプロパティは整数値の配列なので、先のカウンターが取り出せます。  
ただここでの`idx`はstring型なので注意が必要です。

```javascript
function forIn(array) {
  returnArray = new Array();
  for (var idx in array) {
    // idx = "0", "1", "2", "3"
    returnArray.push(add_suffix(array[idx]));
  }
  return returnArray;
}

console.log(forIn(array));
// ['hoge__', 'fuga__', 'foo__', 'bar__']
```
ただこの方式では繰り返し順序が実装依存のため、順番が重要な配列には推奨されていません。  
[for...in - JavaScript _ MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/for...in)

> 注: for...in はインデックスの順序が重要となる 配列 の繰り返しには使うべきではありません。
>> 繰り返しの順序が実装依存なため、配列の繰り返しは要素を一貫した順番で参照することになるとは限りません。このため、アクセスの順番が大事となる配列を繰り返す時には、数値のインデックスでの for ループ (か Array.prototype.forEach() か for...of ループ) を使った方が良いです。

### for of  
ECMAScript6からは`for of`が利用出来ます。  
Pythonユーザーであればなじみの深い挙動です。arrayの中身そのものが取り出されます。

```javascript
function forOf(array) {
  returnArray = new Array();
  for (var item of array) {
    returnArray.push(add_suffix(item));
  }
  return returnArray;
}

console.log(forOf(array));
// ['hoge__', 'fuga__', 'foo__', 'bar__']
```


### forEach  
`Array.prototype.forEach()`を用いれば、各要素に対してひとつづつ関数を実行出来ます。  
[Array.prototype.forEach() - JavaScript _ MDN](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
> forEach() メソッドは与えられた関数を、配列の各要素に対して一度ずつ実行します。  

```javascript
function forEach(array) {
  returnArray = new Array();
  array.forEach(item => {
    returnArray.push(add_suffix(item));
  });
  return returnArray;
}

console.log(forEach(array));
// ['hoge__', 'fuga__', 'foo__', 'bar__']
```
`for of`と異なる点は、例外を発生させる以外、途中でbreakできないところです。  
また、要素が`undefined`の場合関数が呼び出されません。  
ただIE9以上で使用出来ます。


### map  
最後は配列全要素に関数を適用する`map`です。Pythonとは異なり、返り値が`Array`です。  


```javascript
function forMap(array) {
  return array.map(add_suffix);
}

console.log(forMap(array));
// ['hoge__', 'fuga__', 'foo__', 'bar__']
```
