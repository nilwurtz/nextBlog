---
title: 【VScode】autopep8のフォーマットが効かない【Python】
tags: VSCode Python autopep8
author: ragnar1904
date: 2019-12-16
slide: false
---
#概要
会社のPCではうまくいくのに、自宅のVScodeでautopep8のフォーマッタが効かなくてやる気が失われていた
-> 問題は設定にあり

# 環境
- MacOS Mojave 10.14.6
- Visual Studio Code 1.40.2
- Python 3.7.4
- autopep8 1.4.4

autopep8の他に、flake8とmypyを使用していた。
環境はPipenv使用のvenv（VScode上でインタプリタを適切に選択できていれば問題ないので今回の問題とは無関係。）

# 設定と症状

Settings.jsonはこんな感じ。
formatOnSaveは効いているもののフォーマットはされておらず、右クリックからドキュメントのフォーマットをしても無反応。
ただコマンドラインからフォーマット(```$ autopep8 sample.py```)は効いていた。

```json:settings.json
  "editor.formatOnSave": true,
　"python.linting.enabled": true,
  "python.linting.pylintEnabled": false,
  "python.linting.flake8Enabled": true,
  "python.linting.flake8Args": [
    "--ignore=E402, E501, W503"
  ],
  "python.formatting.autopep8Args": [
    "--ignore=E50", //セミコロンで改行させて
    "--max-line-length=120",
    "--aggressive",
    "--aggressive",
  ],
  "python.jediEnabled": false,
  "python.linting.mypyEnabled": true,
```

#解決
フォーマッター効かせずに書くのがきつすぎたので必死で検索。

こんなissueがあった。
autopep8 formatting not working #2843
https://github.com/Microsoft/vscode-python/issues/2843

>@thernstig your settings aren't quite right; you want as you have to make each individual item you would pass on the command line an individual thing in the array:

>"python.formatting.autopep8Args": ["--max-line-length", "100"]
>>コマンドラインには配列内の個々のアイテムを渡す必要があります。（意訳）

間違っていたのは以下の部分。

```json:settings.json
  "python.formatting.autopep8Args": [
    "--ignore", 
    "E50",
    "--max-line-length",
    "120",
    "--aggressive",
    "--aggressive",
  ],
```

autopep8は以下のように設定できるが、settings.jsonでは配列中の個々で渡す必要があるようだ。
脳死で上のflake8の項目設定と同じように書いてたな・・・

```bash
usage: autopep8 [-h] [--version] [-v] [-d] [-i] [--global-config filename]
                [--ignore-local-config] [-r] [-j n] [-p n] [-a]
                [--experimental] [--exclude globs] [--list-fixes]
                [--ignore errors] [--select errors] [--max-line-length n]
                [--line-range line line] [--hang-closing] [--exit-code]
                [files [files ...]]
```



