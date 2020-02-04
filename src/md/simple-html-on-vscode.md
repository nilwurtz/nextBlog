---
title: VSCodeで HTMLとSCSSを書くシンプルな環境を構築する
tags: HTML scss Sass VSCode
author: ragnar1904
date: 2020-01-29
slide: false
---
## やること

VScode のみを用いて、HTML と scss(css)と js を書くだけのシンプルな環境を構築する。
イメージとしては CodePen のような環境。


## 環境

- CentOS 7
- VScode 1.41.1


## 拡張機能をインストール

- [Live Sass Compiler](https://marketplace.visualstudio.com/items?itemName=ritwickdey.live-sass) 
Scss をコンパイルするのに用いる。

- [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
  ブラウザの自動更新を行ってくれる。LiveSassComplier を入れるとインストールされます。

## ファイルを作成

### HTML

適当なフォルダを開き、HTML を書く。
HTML ファイルで`!`を入力すると VScode のスニペット機能で HTML の簡単なひな形が出来るのでおすすめ。

- スニペットで生成される HTML

```html:html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body></body>
</html>
```

### SCSS・JS

`scss/`を作成し、そこにscssを作成。ディレクトリの場所や名前は指定するのでどこでもよい。
JSファイルも同じく。

### 作成後

```bash
.
├── index.html
├── js
│   └── index.js
└── scss
    └── style.scss
```

## 拡張機能の設定

### Live Sass Compiler の設定

Live Sass Compilerの出力設定をする。prefixの付与なども行ってくれるので、設定しておく。
以下は自分のセッティング。
他にも設定項目があるので詳しくは[公式 Doc](https://github.com/ritwickdey/vscode-live-sass-compiler/blob/master/docs/settings.md)。

```json
{
    ...
    // liveSassConpiler
    // prefixを付与してくれる
    "liveSassCompile.settings.autoprefix": [
        "> 1%",
        "last 2 versions"
    ],
    // 出力設定、拡張子やフォルダ(相対パス)も指定する。
    "liveSassCompile.settings.formats": [
        {
            "format": "compressed",
            "extensionName": ".min.css",
            "savePath": "/css"
        }
    ],
    // 監視しないディレクトリ(以下はデフォルト値)
    "liveSassCompile.settings.excludeList": [
        "**/node_modules/**",
        ".vscode/**"
    ],
    ...
}
```

### Live Server の設定

自分は Port のみ変更。
[公式 Doc](https://github.com/ritwickdey/vscode-live-server/blob/master/docs/settings.md)

```json
{
    ...
   "liveServer.settings.port": 8000,
    ...
}
```

## 起動

- Live Sass Compiler

scss ファイルを開くと、VSCode 下部に`Watch Sass`ボタンがあるので、そこを押す。
`settings.json`で指定したパスにコンパイル後の css が生成されている。

```bash
.
├── index.html
├── js
│   └── index.js
├── scss
│   └── style.scss
└── css
    ├── style.min.css
    └── style.min.css.map
```

`"format": "compressed"`を選択したので、生成ファイルは圧縮された状態。prefix が付与されているのも確認できる。

```css
html{font-size:62.5%;line-height:1.4;-webkit-box-sizing:border-box;box-sizing:border-box}body{min-height:200vh;background-color:gray}...
```

`style.min.css.map`はソースマップと呼ばれるファイルで、圧縮前のどの css に記述したものかが判別できる。
不要であれば`"liveSassCompile.settings.generateMap": false`

- Live Server

HTML ファイルを開き、`Alt + L, Alt + O`
もしくは、VSCode 下部に`Go Live`ボタン
ブラウザからアクセスできるようになっているはず。(初期設定では`http://localhost:5500`)

## HTML での css, js 読み込み

href, src は相対パスを指定してやれば OK.

```html
<html>
  <head>
    ...
    <link rel="stylesheet" href="./static/css/style.min.css" />
    <script src="./js/index.js" type="text/javascript"></script>
  </head>
  ...
</html>
```
