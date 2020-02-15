---
title: 自動で 番組表取得→カレンダーに登録する システムを1日で作ってみた
tags: Python 趣味 GoogleCloudFunctions CronJob
author: ragnar1904
date: 2020-02-14
slide: false
---

## 概要
作ってみた話 系の投稿をしたかったのと、サーバーレスを触ってみたかったので、
毎回録画している好きな番組**岩合光昭の世界ネコ歩き**の番組表を取得し、カレンダー(timetree)に自動登録するシステムを作ってみました。

## 使用したもの
- [NHK番組表API](http://api-portal.nhk.or.jp/ja) -> 番組表の取得
- Google Cloud Function
- [cron-job.org](https://cron-job.org/en/) -> 無料定期実行サービス
- timetree API

NHK番組表APIというものがあるので、それを1日1回取得し、データをフィルターしてカレンダーのAPIで登録するようにします。
定期実行にはcron-job.orgという無料サービスがあり、指定した時間に指定したURLにリクエストを送れるものがあるので、利用しました。

今回は、なんとなく1日で完成させたかったので、一番慣れているPythonを書けるGoogle Cloud Functionを利用しました。


## 作成
大したコードではないものが続きます。すみません。

最初はエラー検知でメール送信とか考えてたんですが、Google Cloud Functionについて調べていたら気がついたら夜・・・
心のザッカーバーグが[あの言葉](https://stat.ameba.jp/user_images/20151108/15/yorokonbu/40/76/j/o0800044413477938543.jpg?caw=1125)を言ってきたのでとりあえず作成しました。

### 番組表取得
最初はクラス分けてやろうとしてた痕跡が残ってます。  


```python

# default
import os
from typing import List
from datetime import datetime, timedelta
import json
# from pip
import requests


apikey = os.environ["NHK_API_KEY"]


class NHKApi():
    area = "130"
    genre = "1001"
    base_url = "http://api.nhk.or.jp/v2/pg/genre"
    # NHK総合 g1
    # BS プレミアム s3
    @classmethod
    def url(cls, service: str, date_str: str) -> str:
        url = f"{cls.base_url}/{cls.area}/{service}/{cls.genre}/{date_str}.json"
        return url


def get_g1_data(date_str: str):
    url = NHKApi.url("g1", date_str)
    response = requests.get(url, params={"key": apikey})
    if response.status_code == 200:
        return response.json()
    else:
        return {}


def get_s3_data(date_str: str):
    url = NHKApi.url("s3", date_str)
    response = requests.get(url, params={"key": apikey})
    if response.status_code == 200:
        return response.json()
    else:
        return {}


def check_is_nekoaruki(service: str, program: dict) -> bool:
    """番組表データにネコ歩きが入っているかどうかを判定"""
    is_nekoaruki = False
    try:
        title = program["title"]
        if "ネコ歩き" in title:
            is_nekoaruki = True
    except KeyError:
        print("data type is invalided")
    return is_nekoaruki


def filter_nekoaruki(service: str, data: dict) -> List[dict]:
    filtered_programs: list = []
    if data and data.get("list"):
        try:
            programs = data["list"][service]
            filtered_programs = [i for i in programs if check_is_nekoaruki(service, i)]
        except KeyError:
            print("data type is invalided")
    return filtered_programs


def get_days() -> List[str]:
    days_ls = []
    dt_format = "%Y-%m-%d"
    search_day = 6  # 6日分取得
    current = datetime.now()

    for i in range(search_day):
        days_ls.append((current + timedelta(days=i)).strftime(dt_format))
    return days_ls


def get_nekoaruki() -> List[dict]:
    days = get_days()
    programs: list = []
    for day in days:
        g1_data = filter_nekoaruki("g1", get_g1_data(day))
        s3_data = filter_nekoaruki("s3", get_s3_data(day))
        one_day_data = g1_data + s3_data
        if one_day_data:
            for data in one_day_data:
                programs.append(data)
    return programs
```

### カレンダー追加
ここもカレンダーID取得 -> 登録済データと比較 -> 追加しているだけです。
妥協の嵐。

```python
class TimeTreeAPI():
    url = "https://timetreeapis.com"
    api_key = os.environ["TIMETREE_API_KEY"]
    headers = {'Authorization': f'Bearer {api_key}',
               "Accept": "application/vnd.timetree.v1+json",
               "Content-Type": "application/json"}


def get_calendar() -> str:
    response = requests.get(TimeTreeAPI.url + "/calendars", headers=TimeTreeAPI.headers)
    if response.status_code == 200:
        data = response.json()
        calendars = data["data"]
        for calendar in calendars:
            # 1つしかカレンダー使ってないので最初のカレンダーでいいや
            if calendar["attributes"]["order"] == 0:
                return calendar
            else:
                pass
    else:
        return response.text


def check_upcoming_events(calendar_id: str):
    """7日分の登録済イベントを取得"""
    response = requests.get(TimeTreeAPI.url + f"/calendars/{calendar_id}/upcoming_events",
                            headers=TimeTreeAPI.headers,
                            params={"days": 7})
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        return None


def convert_to_timetree_style(data: dict, calendar_id: str):
    timetree_dict = {
        "data": {
            "attributes": {
                "title": data["title"],
                "category": "schedule",
                "all_day": False,
                "start_at": data["start_time"],
                "end_at": data["end_time"],
                "description": data["title"] + "\n" + data["content"],
                "location": data["service"]["name"],
                "url": "https://www4.nhk.or.jp/nekoaruki/"
            },
            "relationships": {
                "label": {
                    "data": {
                        "id": f"{calendar_id},1",
                        "type": "label"
                    }
                }
            }
        }
    }
    return timetree_dict


def add_event(data: dict, calendar_id: str):
    """イベントをAPIに送信し追加する"""
    json_data = json.dumps(data)
    response = requests.post(TimeTreeAPI.url + f"/calendars/{calendar_id}/events",
                             headers=TimeTreeAPI.headers, data=json_data)
    if response.status_code == 201:
        return True
    else:
        return False


def convert_all(programs: dict, cal_id: str):
    events: list = []
    for program in programs:
        events.append(convert_to_timetree_style(program, cal_id))
    return events


def post_events(data_ls: List[dict], calendar_id: str, registered: List[dict]):
    """登録済イベントと取得したデータを比較して追加"""
    add_events: list = []
    title_ls = [i["title"] for i in registered]
    for data in data_ls:
        # タイトルが登録済ならスキップ
        # 登録してから放送時間変わったの感知出来ないけどいいや
        if data["data"]["attributes"]["title"] in title_ls:
            pass
        else:
            add_events.append(data)
    if add_events:
        for event in add_events:
            add_event(data, calendar_id)


def extract_registered_data(data_ls: List[dict]):
    """登録済のデータからネコ歩きイベントのみ抽出"""
    filtered_registered_events = filter(lambda x: "ネコ歩き" in x["attributes"]["title"], data_ls)
    extracted: list = []
    # 最初は開始時間が変わったら更新するつもりだった
    for program in filtered_registered_events:
        extracted.append({"title": program["attributes"]["title"],
                          "start": program["attributes"]["start_at"]})
    return extracted


 def main(request):
     if request.get_json()["hoge"] == "hoge":
         # get programs
         nekoaruki_programs = get_nekoaruki()
         # get cal_id
         cal_id = get_calendar()["id"]
         # get upcoming events
         registered_events = check_upcoming_events(cal_id)["data"]
         # filter upcoming events
         extracted = extract_registered_data(registered_events)
         data_ls = convert_all(nekoaruki_programs, cal_id)
         post_events(data_ls, cal_id, extracted)
         return "success!"
     else:
         return "failed..."
```

## Functionの設定
プロジェクトを作成 -> Function作成 -> コード貼り付け -> 環境変数等設定します。

環境変数にはAPI Keyの他に`TZ=Asia/Tokyo`を入れ、タイムゾーンを変更するのを忘れずに。  
requirements.txtも`requests==2.22.0`を追加。

![スクリーンショット 2020-02-14 21.20.28.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/508043/fa958b4c-25c9-d70b-a5c2-16b3f8a023c4.png)


## 定期実行の設定
`cron-job.org`でアカウントを作成し、`Cronjobs`-> `Create cronjob`からjobを設定するだけです。
Postするデータも設定出来ます。

![スクリーンショット 2020-02-14 21.45.34.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/508043/dffab096-a0d0-44aa-334d-52f2d16d94b2.png)



## まとめ
ただ関数を並べただけのコードを投稿するのは恥ずかしいですね・・・
しかし、動けばいいで作れるのが趣味プロダクトのいいところでもあると思います。
すべて無料でできるのもいいですね。

サーバーレス環境も簡単に作成できることがわかったのも良い収穫でした。


これでネコ歩きの放送時間を忘れることはありません。
**岩合光昭の世界ネコ歩き** 見ましょう。
