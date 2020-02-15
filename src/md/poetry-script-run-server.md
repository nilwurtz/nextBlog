---
title: 【Poetry】Poetry script で Django の runserver を起動
tags: Poetry Python
author: ragnar1904
date: 2020-02-14
slide: false
---

## poetry script は関数の実行を行う

poetry には Pipenv のような scripts 機能があるが、npm scripts のように入力したものがそのままシェルで実行されるわけではない。
引数なしの関数の実行のみが可能である。

詳細については以前書いた記事があるので次のリンクを参考に。[【Python】Poetry始めてみた & Pipenv から poetry へ移行した所感](https://qiita.com/ragnar1904/items/0e5b8382757ccad9a56c#scripts)


今回は 1 コマンドで Django 開発サーバーを立ち上げられるように、簡単な script を書く。

## 環境

- python 3.7.4
- poetry 1.0.2

## 構成

`$ poetry install`した後、`$ django-admin startproject config .`を行った後のディレクトリ。  
`./scripts`に poetry scripts 用のファイルを書いていく。今回はサーバ立ち上げ用なので`server.py`とした。

```bash
.
├── config
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── manage.py
├── poetry.lock
├── pyproject.toml
└── scripts
    └── server.py
```

## 作成

### script

以下の内容で作成。  
最初は`manage.py`を絶対パスで指定していたのだが、絶対でなくても動いた。

```python:scripts/server.py
import subprocess


def main():
    cmd = ["python", "manage.py", "runserver", "0.0.0.0:8000"]
    subprocess.run(cmd)
```

### pyproject.toml

以下を追加する。

```toml:pyproject.toml
[tool.poetry.scripts]
start = 'scripts.server:main'
```

これだけでは、`[ModuleOrPackageNotFound] No file/folder found for package <projectname>`となってしまう。

```bash
$ poetry run start

[ModuleOrPackageNotFound]
No file/folder found for package project
```

scripts のファイルがルートディレクトリ(pyproject.toml のあるディレクトリ)以下にある場合、  
パッケージディレクトリを指定してやる必要がある。

```toml:pyproject.toml
[tool.poetry]
name = "project"
version = "0.1.0"
description = ""
authors = [""]
packages = [
    { include="scripts", from="." },
]
```

これで起動出来る。仮想環境に入っていないシェルから実行しても、仮想環境内で実行してくれる。

```bash
$ poetry run start
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).

February 14, 2020 - 10:41:57
Django version 3.0.3, using settings 'config.settings'
Starting development server at http://0.0.0.0:8000/
Quit the server with CONTROL-C.
...
```

### ちなみに

この書き方で実行する poetry script は pyproject.toml のあるディレクトリで実行する必要がある。  
`from="."`としているので、poetry が`scripts`ディレクトリを見つけられない。

```toml:pyproject.toml
packages = [
    { include="scripts", from="." },
]
```
