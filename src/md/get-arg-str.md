---
title: 【python】変数名をstrで取得する
tags: Python Python3
author: ragnar1904
date: 2019-12-10
slide: false
---
##概要
Djangoを用いた開発中、変数名を使って楽したい部分があった。
~~そもそも変数名を使いたくなる時点で良くないコードな気もするが~~

最初はこんな絶望的な書き方をしてたので、調べてみると**組み込み関数locals()**で実現できるようだ。

```python
def hoge(name, email, message):
    for variable_name, value in zip(("name", "email", "message"), (name, email, message)):
        print(f"{variable_name} -> {value}")
```
・・・にしてもひどいなあ。


##組み込み関数locals()
ドキュメント見ると・・・
https://docs.python.org/ja/3/library/functions.html#locals
> 現在のローカルシンボルテーブルを表す辞書を更新して返します。 関数ブロックで locals() を呼び出したときは自由変数が返されますが、クラスブロックでは返されません。 モジュールレベルでは、 locals() と globals() は同じ辞書であることに注意してください。

>>注釈 この辞書の内容は変更してはいけません; 変更しても、インタプリタが使うローカル変数や自由変数の値には影響しません。

とある。要するに呼び出した場所のスコープの変数と値がdictになって帰ってくる。そしてその値は変更不可とのこと。
このdictのkeyを取り出せば変数名がstrで取得できることがわかった。

##見てみる
こんなコードがあるとします。

```python
class Account(object):
    param = "param"
    print(locals())  # 実行順1

    def __init__(self, name, email):
        self.name = name
        self.email = email
        print(locals())  # 実行順2

    def some_function(self, param1, param2):
        self.param1 = param1
        self.param2 = param2
        print(locals())  # 実行順3


account = Account("ragnar", "ragnar@sample.com")
account.some_function(1, 2)
print(locals())        # 実行順4
print(type(locals()))  # 実行順5
```

上記コードの実行結果は以下の通り。printする場所のスコープの変数が取得できています。
返り値はdictですね。

```
{'__module__': '__main__', '__qualname__': 'Account', 'param': 'param'}

{'self': <__main__.Account object at 0x1065e6990>, 'name': 'ragnar', 'email': 'ragnar@sample.com'}

{'self': <__main__.Account object at 0x1065e6990>, 'param1': 1, 'param2': 2}

{'__name__': '__main__', '__doc__': None, '__package__': None, 
'__loader__': <_frozen_importlib_external.SourceFileLoader object at 0x10652a190>, 
'__spec__': None, '__annotations__': {}, '__builtins__': <module 'builtins' (built-in)>, 
'__file__': '/Users/ragnar/workspace/class/locals.py', '__cached__': None, 
'Account': <class '__main__.Account'>, 'account': <__main__.Account object at 0x1065e6990>}

<class 'dict'>
```

##変数名の取得

返り値は普通のdictなのでkeysとかitems使えば取得できます。最初の例はこう書き換えられます。

```python
def hoge(name, email, message):
    for variable_name, value in locals().items():
        print(f"{variable_name} -> {value}")
```

変数名をリストで取得とかはこんな感じかな。

```python
def hoge(name, email, message):
    ls = [key for key in locals().keys()]
```

#で、どこで使えるの
正直変数名のstrが欲しくなる状況ってあまりないと思うんですけど、一つ思いつきました。
#####*引数と同じ変数名を使いがちなコンストラクタ内でならなんかいい感じに使えるのでは・・・？*
↓こんなコード

```python
class Account(object):
    def __init__(self, name, email, sex, age):
        self.name = name
        self.email = email
        self.sex = sex
        self......
```


これを変数名使ってやるとこうなります。

```python
class Account(object):
    def __init__(self, name, email, sex, age):
        for variable_name, value in locals().items():
            if not variable_name == 'self':
                self.__dict__[variable_name] = value
```
......引数めちゃくちゃ長いとかじゃないと使わないねこれは。


##結論
・locals()を用いて変数名を取得しよう
・楽するより見やすいコードを心がけよう



