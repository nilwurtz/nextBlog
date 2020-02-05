---
title: 【Django2.2】Djangoでリレーション先はどう表示するの？【ListView編】
tags: Django Python
author: ragnar1904
date: 2019-12-17
slide: false
---

# はじめに

こんにちは。(実務での)Django歴1.5ヶ月のragnarと申します。
Djangoを始めた際、チュートリアルは行ったものの、実際作るとなると新しい概念が多く、どうしていいかよくわからなくなることがありました。

最初に詰まったのはリレーションです。
Djangoを扱う前はSQLを書いてDB操作していたので、Querysetという概念がよくわからず、これでデータ取れてるの？どうなの？状態でした。

今回はそんな「Djangoをチュートリアルまで触ってみたけどよくわからなかった」人向けの記事です。

# 環境
- Python 3.7.4
- MacOS Mojave 10.14.6
- Django 2.2.8



# 前提となるmodel
今回は、サッカーチームとプレイヤー、プレイヤーの情報を一覧で見れるサイトを想定します。
チーム、ポジション、プレイヤーのテーブル（model）を作成しました。

```python:sample/models.py
from django.db import models

FOOT_CHOICES = (
    ('right', '右足'),
    ('left', '左足'),
    ('both', '両足'),
)


class Team(models.Model):
    name = models.CharField(max_length=40)
    country = models.CharField(max_length=40)

    def __str__(self):
        return self.name

    class Meta:
        # Django管理サイトで表示される名前
        verbose_name = "チーム"
        verbose_name_plural = "チーム"


class Position(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "ポジション"
        verbose_name_plural = "ポジション"


class SoccerPlayer(models.Model):
    name = models.CharField(max_length=40)
    foot = models.CharField(max_length=5, choices=FOOT_CHOICES)
    # 選手は１つのクラブに所属する。チームには複数のプレイヤーが所属する。１対n構造
    # 選手が無所属になる場合もある。on_delete=models.SET_NULL
    team = models.ForeignKey(Team, null=True, on_delete=models.SET_NULL, related_name='player')
    # 選手は複数のポジションを務める事がある。一つのポジションには複数の選手がいる。n対n構造
    position = models.ManyToManyField(Position, related_name='player')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "プレイヤー"
        verbose_name_plural = "プレイヤー"
```


Django管理サイトからデータを登録できるよう、モデルを登録します。
（適当にデータを入れました。）

```python:sample/admin.py
from django.contrib import admin

from . import models

admin.site.register(models.Position)
admin.site.register(models.SoccerPlayer)
admin.site.register(models.Team)
```

また、クエリの確認のためdjango-debug-toolbarを導入しています。
Djangoの開発で欠かせないと言っても過言ではないため、入れていない方はこの際に。

```python:config/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('sample/', include('sample.urls'), name='sample')  # 今回のアプリ
]

if settings.DEBUG:
    import debug_toolbar
    urlpatterns = [
        path('__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
```

# ListView
Djangoには、Generic Viewという、Webアプリケーションが行う、
GETメソッドを受け取りページを表示、POSTメソッドを受け取りフォームのバリデーション、レコードの更新、削除・・・など
ごく一般的な挙動がまとまったクラスが用意されています。

今回は、レコードの一覧表示に特化したListViewを用いて、一覧表示、およびリレーションの扱いについてまとめます。


## プレイヤー一覧を表示する
まずは、全プレイヤーの名前を取り出してみます。

```python:sample/views.py
from django.views.generic import ListView
from .models import SoccerPlayer


class PlayerListView(ListView):
    model = SoccerPlayer  # 一覧表示を行うmodel
    template_name = 'player_list.html'  # template


player_list = PlayerListView.as_view()
```

```python:sample/urls.py
from django.urls import path
from . import views

app_name = 'sample'
urlpatterns = [
    path('list/', views.player_list, name='player_list'),
]
```

```html:templates/player_list.html
<!DOCTYPE html>
<html>
  <head>
    <title>sample</title>
  </head>
  <body>
    <table>
      <tr>
        <th>名前</th>
      </tr>
      {% for player in soccerplayer_list %}
      <tr>
        <td>{{ player.name }}</td>
      </tr>
      {% endfor %}
    </table>
  </body>
</html>
```
まずListViewで覚えておかないといけないのは、ViewからTemplateには **[model名(小文字)]_list** という名前でオブジェクトが渡されることです。（自分で指定することも出来ます。）

これをtemplate内でforで取り出し、**[forで取り出した変数].name** で名前を取り出すことが出来ます。
**name**はmodelで定義したmodelのfieldのことです。
おそらくチュートリアル等でやったことがあると思います。

`http://localhost:8000/sample/list/` にアクセスすると、一覧表示できることがわかります。
![スクリーンショット 2019-12-16 23.16.56.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/508043/0f2f7df1-8c44-b1d9-68a0-b7b223496828.png)

---
### Foreignkeyで結びついた値の取り出し

つぎに、プレイヤーに紐付いたチームを取り出してみます。
リレーション先と言っても、OnetoOneField（1対1）およびForeignkey(1対n)の関係の場合、通常の書き方と変わりません。
nameの場合と同じ様に、リレーション先のfield名を指定するだけです。

```html:templates/player_list.html
<!DOCTYPE html>
<html>
  <head>
    <title>sample</title>
  </head>
  <body>
    <table>
      <tr>
        <th>名前</th>
        <th>チーム</th>
      </tr>
      {% for player in soccerplayer_list %}
      <tr>
        <td>{{ player.name }}</td>
        <td>{{ player.team }}</td> 
      </tr>
      {% endfor %}
    </table>
  </body>
</html>
```
![スクリーンショット 2019-12-16 23.30.16.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/508043/71e8b3ee-2837-3f22-eaf7-c422d59e4821.png)

Djangoは特に指定せずとも、Playerオブジェクトに紐付いたレコードも取得してくれます。
最初はこの感覚がわからず、慣れるのに苦労しました。

---
### ManytoManyFieldで結びついた値の取り出し

次はManytoManyField、n対nで結びついたリレーションの場合です。
n対nなので、複数のレコードが取得されます。今回の場合、プレイヤー一人に付き複数のポジションです。
1対n等とは異なり、`player.position`では取得出来ません。`player.position.all`とし、それをforで取り出す必要があります。

```html:templates/player_list.html
<!DOCTYPE html>
<html>
  <head>
    <title>sample</title>
  </head>
  <body>
    <table>
      <tr>
        <th>名前</th>
        <th>チーム</th>
        <th>ポジション</th>
      </tr>
      {% for player in soccerplayer_list %}
      <tr>
        <td>{{ player.name }}</td>
        <td>{{ player.team }}</td> 
        <td>
          {% for position in player.position.all %}
          {{ position.name }}
          {% endfor %}
        </td>
      </tr>
      {% endfor %}
    </table>
  </body>
</html>
```

(入れた選手が適当すぎて複数ポジションの選手が少ない)
![スクリーンショット 2019-12-16 23.45.25.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/508043/fd160ba1-e0df-8c45-bc9c-ccd0634800bd.png)


## 逆参照の場合

次に、Team -> Playerという、いわゆる逆の参照をしてみます。

逆の参照の場合、前のパターンとは異なりそのモデルにfieldが定義されていません。
しかし、modelのfieldには含まれないものの、ちゃんと参照はされています。
それを明示し、わかりやすくするには、related_nameを定義するのが良いです。

```python:sample/models.py
# 一部省略
class Team(models.Model):
    name = models.CharField(max_length=40)
    country = models.CharField(max_length=40)
    # team にはplayerフィールドがない！

class SoccerPlayer(models.Model):
    name = models.CharField(max_length=40)
    foot = models.CharField(max_length=5, choices=FOOT_CHOICES)
    # related_nameで逆参照の場合使う語句を指定してやる
    team = models.ForeignKey(Team, null=True, on_delete=models.SET_NULL, related_name='player')
    position...
```

逆から(TeamからPlayer)を取得する場合、このrelated_nameで設定した名前を使用して取得することが出来ます。
ここでは、`player`を指定したので、`team.player.all`でそのチームに紐付いたプレイヤーのレコードが取得出来ます。

```python:sample/views.py
# 追加
from .models import Team

class TeamList(ListView):
    model = Team
    template_name = 'team_list.html'
```
```python:sample/urls.py
from django.urls import path
from . import views

app_name = 'sample'
urlpatterns = [
    path('list/', views.player_list, name='player_list'),
    path('list/team/', views.team_list, name='team_list'),
]
```

`team.player.all`で取得したらforでひとつずつ取り出すのは先程と同じです。

```html:templates/team_list.html
<!DOCTYPE html>
<html>
  <head>
    <title>sample</title>
  </head>
  <body>
    <table>
      <tr>
        <th>名前</th>
        <th>人数</th>
        <th>選手</th>
      </tr>
      {% for team in team_list %}
      <tr>
        <td>{{ team.name }}</td>
        <td>{{ team.player.all.count }}</td>
        <td>
          {% for player in team.player.all %} 
          {{ player }} 
          {% endfor %}
        </td>
      </tr>
      {% endfor %}
    </table>
  </body>
</html>
```
`http://localhost:8000/sample/list/team/`にアクセスすると、それぞれのチームに紐付いた選手が取得出来ていることがわかります。（サッカーわからないとピンと来ないかもしれません。すみません。）
![スクリーンショット 2019-12-17 0.27.10.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/508043/885f97ba-b2ea-6680-6545-406c18e2aead.png)


## 発行されるSQLを確認する

チーム一覧ページにて、django-debug-toolbarを用いてSQLの確認をしてみます。
サイドに表示されている、django-debug-toolbarからSQLパネルをクリックすると、こうなっています。
![スクリーンショット 2019-12-17 0.33.10.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/508043/a8d7b40d-38dc-3551-2f56-881597422ada.png)
小さくてわかりにくいのですが、このページの情報を表示するのに13個のSQLが実行されています。
この現象は、template内のループで毎回毎回リレーション先の情報を取得する・・・という処理になっているからです。（N+1問題と言います）
このままでは、レコードの数が増えるにつれページ読み込みの際のSQL実行回数が増加し、ものすごく重いページになってしまいます。

これを解決するには、prefetch_relatedというメソッドを使用します。

### prefetch_related および select_related
- 結びついたn個のレコードを取得する場合、**prefetch_related**
- 結びついた1個のレコードを取得する場合、**select_related**

簡単に説明すると、
　　　prefetch_relatedは、事前にDBからレコードを取得し、python（Django）でそれぞれを紐付ける
　　　select_relatedはDBからJOINして取得
　　　というメソッドです。（間違っていたらすみません。）

ListViewの場合、Viewに*get_queryset*というメソッドがあり、これを書き換えることで実現できます。

```python:sample/views.py
class TeamList(ListView):
    model = Team
    template_name = 'team_list.html'

    def get_queryset(self):
        # Viewで表示するクエリセットを取得するメソッド
        qs = self.model.objects.prefetch_related('player')  # team -> playerの逆参照なので、related_nameを使用
        return qs
```

こうする事によって、SQLの実行数は2個にまで減少しました。
![スクリーンショット 2019-12-17 0.51.25.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/508043/846c4d8c-071d-a9b3-7d27-fb1425e3c900.png)

最初のプレイヤーリストのページも確認してみると、13クエリが発行されています。
![スクリーンショット 2019-12-17 0.55.26.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/508043/ff107800-4694-87cc-2548-fa5095c678e4.png)

このページでは、playerからteamおよびpositionを取得しています。
こういった場合も、prefetch_relatedとselect_relatedをつなげてやれば大丈夫です。

```python:sample/views.py
class PlayerListView(ListView):
    model = SoccerPlayer
    template_name = 'player_list.html'

    def get_queryset(self):
        qs = self.model.objects.prefetch_related('position').select_related('team')
        return qs
```

これによりクエリ発行数が2にまで減少しました。
![スクリーンショット 2019-12-17 0.59.54.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/508043/17e87145-545f-d4ca-ce83-ce150dd7738d.png)

SQLを確認してみて、`6 similar queries`や、`4 duplicates`等の表記が見えたら、prefetch_related(select_related)を使うことを忘れないようにします。


# まとめ
- **1対n** 及び **1対1** のリレーションは、フィールドの名前を使って値を取り出せる
- **n対n** のリレーションは、[フィールドの名前].allで取り出し、forを使って一つづつ取り出す
- **逆参照**の場合は、フィールドに設定したrelated_nameを使用して取り出す
- forでリレーション先の値を取り出す場合は、prefetch_related(select_related)を忘れない

以上、参考になれば幸いです。
個人的にはもっと日本語情報に乏しいと言われるDjangoのアウトプットを増やしていきたいです。






