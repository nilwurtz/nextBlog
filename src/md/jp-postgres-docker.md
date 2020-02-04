---
title: docker-compose.ymlで相対パスを使いたい & 日本語環境postgresコンテナのメモ
tags: Docker docker-compose volume
author: ragnar1904
date: 2019-10-31
slide: false
---
# ここに書いていること
プロジェクトのディレクトリ内にボリュームディレクトリを作りたかった
=> でも名前付きvolumeの宣言で相対パスって記述できるの・・・？
=> **docker-composeでも$PWDが使える！**

# 環境
- MacOS Mojave version 10.14.6
- Docker version 19.03.2
- docker-compose version 1.24.1

# 相対パスを使いたい
まず ./ で動くかなと試してみました。

```yaml:docker-compose.yml
volumes:
  pg-volume:
    driver_opts:
      type: none
      device: ./docker/postgres/data
      o: bind
```
docker-compose up -d したら案の定ERROR


```bash

Creating postgresql_6543 ... error

ERROR: for postgresql_6543  Cannot create container for service postgresql: 
failed to mount local volume: mount ./docker/postgres/data:/var/lib/docker/volumes/blog_pg-volume/_data, 
flags: 0x1000: no such file or directory

ERROR: for postgresql  Cannot create container for service postgresql: 
failed to mount local volume: mount ./docker/postgres/data:/var/lib/docker/volumes/blog_pg-volume/_data, 
flags: 0x1000: no such file or directory
```


#$PWD = カレントディレクトリ
調べてみると、docker-composeのファイル内でも$PWDが解釈されるようです。
言うまでもありませんが、$PWDはカレントディレクトリです。
環境を共有しやすいのがdockerの大きな利点の一つなのに、絶対パスは書きたくないですよね。  

例えば /home/myname/app がgitで管理しているアプリケーションのディレクトリの場合

```yaml
      device: /home/myname/app/docker/postgres/data # これを
      device: $PWD/docker/postgres/data             # こうしておく
```

これでgit clone後、 docker-compose up -d を叩くだけで良くなりました。
ちなみにWindowsやWSLでは動かないようです。。。:cry:(そりゃそうか)

# Dockerfile
メモも兼ねて書いておきます。

```dockerfile:./docker/postgres/Dockerfile

FROM postgres:10.5
RUN localedef -i ja_JP -c -f UTF-8 -A /usr/share/locale/locale.alias ja_JP.UTF-8
```

```yaml:docker-compose.yml

version: "3"

services:
  postgresql:
    build:
      context: .
      dockerfile: ./docker/postgres/
    container_name: postgresql_6543
    ports:
      - 6543:5432
    volumes:
      - ./docker/postgres/init:/docker-entrypoint-initdb.d
      - pg-volume:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: root
      POSTGRES_PASSWORD: root
      POSTGRES_INITDB_ARGS: "--encoding=UTF-8"
      LANG: ja_JP.utf8
    hostname: postgres
    restart: always
    user: root

volumes:
  pg-volume:
    driver_opts:
      type: none
      device: $PWD/docker/postgres/data
      o: bind
```
