---
title: 【CentOS7】juman++ のインストール
tags: juman++ centos7 NLP 自然言語処理
author: ragnar1904
date: 2019-10-10
slide: false
---
## 概要
CentOS7にjuman++ を導入したときのメモ

## 環境

- CentOS 7.6.1810
- Python 3.7.4


### gcc

```bash
 yum -y install gcc gcc-c++
```

### cpu コア確認

```bash
cat /proc/cpuinfo
```

**コマンドで出た processor の数を次の-j 〇オプションに適用**

### Boost C++
juman++ のインストールに必要なBoost C++を導入。

```bash
cd /usr/local/src
wget https://dl.bintray.com/boostorg/release/1.69.0/source/boost_1_69_0.tar.gz
tar xzvf boost_1_69_0.tar.gz
cd boost_1_69_0/
./bootstrap.sh
./b2 install -j4 #(プロセッサ数)
```

### juman
本体のビルドインストール。

```bash
cd /usr/local/src
wget 'http://nlp.ist.i.kyoto-u.ac.jp/DLcounter/lime.cgi?down=http://lotus.kuee.kyoto-u.ac.jp/nl-resource/jumanpp/jumanpp-1.02.tar.xz&name=jumanpp-1.02.tar.xz' -O jumanpp-1.02.tar.xz
tar Jxfv jumanpp-1.02.tar.xz
cd jumanpp-1.02/
./configure
make
make install
```

## 確認

```bash
$ echo "すもももももももものうち" | jumanpp
```



## 参考

- CentOS7 の Python3 で JUMAN++のインストールと利用 - デベロッパー・コラボ
  https://developer-collaboration.com/2019/01/29/centos7-python3-juman/

- メモ帳という名の備忘録\_ Python3 から JUMAN++を使う@CentOS7
  https://umiushizn.blogspot.com/2017/09/python3jumancentos7_9.html
