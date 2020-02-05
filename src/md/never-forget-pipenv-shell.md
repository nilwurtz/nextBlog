---
title: もう二度とpipenv shellを忘れないようにするためのshellscript
tags: Pipenv ShellScript Python Bash
author: ragnar1904
date: 2019-11-01
slide: false
---
# はじめに

### *pipenv、使ってますか？*

pipenvはそのプロジェクトのパッケージ管理や仮想環境の構築を簡単に自動で行ってくれるツールです。
pyenvとの連携もしてくれる、かなり便利なやつです。


#### でもこんな経験ありませんか？
> 実行したらエラー起きたからpipで入れたけど仮想環境入ってないだけだったわ...　　

自分はめっちゃやります。

# そこで！
#### Pipfileがあるところにcdしたらpipenv shellするshellscriptを書きました

# 作った


```bash:/.bash_autopipenv
#!/bin/bash

function ispipenv()
{
if [ "$PIPENV_ACTIVE" == 1 ]; then
  :
else
  if [ -e "Pipfile" ]; then
      pipenv shell
  fi
fi
}

function pipenv_cd()
{
  \cd $@ && ispipenv
}

alias cd='pipenv_cd'
```

ポイントは以下の部分。

```bash
if [ "$PIPENV_ACTIVE" == 1 ]; then
   ...
```

仮想環境に入ると、PIPENV_ACTIVEという環境変数が定義されるのを利用しています。  
仮想環境に入っていない場合はPIPENV_ACTIVEは定義されないため、エラー回避の意味で"$PIPENV_ACTIVE"で評価しています。  
これで仮想環境に入った状態ではpipenv shellが実行されません。  

  
またpipenv_cd内の\cdをcdとしてしまうと、  
pipenv_cd内でpipenv_cdが呼ばれその中でpipenv_cdが呼ばれ・・・となってしまうので注意が必要です。  

## 常時読み込ませる
.bash_profileや.bashrcに以下を追記すれば常時読み込みしてくれるので、pipenv shellを実行し忘れることはなくなりました

```bash
if [ -f ~/.bash_autopipenv ]; then
  . ~/.bash_autopipenv
fi
```

# まとめ
- shellscriptで自分だけのbashを作り上げるの楽しい:innocent:
- つぎはexitを忘れないようにしよう！
