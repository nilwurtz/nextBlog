---
title: 【Django】ディレクトリ構成のプラクティス + 注意点
tags: Django Python
author: ragnar1904
date: 2020-02-19
slide: false
---
## Djangoアプリケーションのディレクトリ


Djangoアプリケーションは1アプリごとにディレクトリを生成するので、
`$ python manage.py startapp hoge`でアプリを追加していくと、ルートディレクトリにどんどんフォルダが出来てしまう。

ディレクトリごとに機能を分離できるのは良いのだが、すべての機能が並列ではないので、アプリケーションが増えるたびに見通しが悪くなっていってしまう。  

自分の場合、`./app/sub_app/`...とディレクトリをネストし、すっきりさせることが多い。  


- 並列にアプリケーションを作っていく場合の例  
機能は分離できるものの、urlと対応しておらず見通しが悪い。

```bash
.
├── account/     (/account/login etc)
├── auth_api/    (/api/auth/...)
├── config
│   └── settings.py
├── email/       (/account/email/...)
├── manage.py
├── password/    (/account/password/...)
└── polls_api/   (/api/polls/...)

```

- アプリケーションをネストして作っていく場合の例  
urlとディレクトリが対応し、わかりやすい。

```bash
.
├── account/      (/account/login etc)
│   ├── email/    (/account/email/...)
│   └── password/ (/account/password/...)
├── api/
│   ├── auth/     (/api/auth/...)
│   └── polls/    (/api/polls/...)
├── config
│   └── settings.py
└── manage.py
```

しかし、躓く点が多いので注意点をまとめる。

## 環境
- CentOS 7
- Django 3.0.3
- Python 3.7.4

## 前提
以下は、`$ django-admin startproject config .`とした後、`python manage.py startapp account`とした場合のフォルダ構成。

```bash
.
├── account
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── migrations
│   │   └── __init__.py
│   ├── models.py
│   ├── tests.py
│   └── views.py
├── config
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── manage.py
├── poetry.lock
└── pyproject.toml
```

- urls.pyの作成

`urls.py`はよくアプリケーションディレクトリに作成するので、`account/urls.py`を追加しておく。
TopViewというViewを作成したとする。

```python:account/urls.py
from django.urls import path, include
from . import views

app_name = 'account'
urlpatterns = [
    path("top/", views.TopView.as_view(), name="top")
]
```

`config/urls.py`で`account/urls.py`をincludeしておく。

```python:config/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('account/', include('account.urls')), # 追加
]
```

- settings.pyに登録  
最後に、`account`アプリケーションを`config/settings.py`に記入。

```python:config/settings.py
INSTALLED_APPS = [
    # defaults
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # 追加
    'account'
]
```

- urlの参照

この場合、TopViewのurlは、`/account/top`である。
template内では、以下のようにurlを指定する。

```xml
<a href="{% url 'account:top'%}">トップぺージへのリンク</a>
```

HTMLがレンダーされる際、Djangoが以下のように展開してくれる。

```xml
<a href="/account/top">トップぺージへのリンク</a>
```

## accountディレクトリ内にアプリケーションを作成

### アプリを作成

`account`フォルダの中に、パスワード関連機能をまとめた`password`アプリを作成する。
`python manage.py startapp password account/password`とすると作成されそうなものだが、
残念ながらstartappで位置を指定する場合、ディレクトリを作成してくれない。

```bash
$ python manage.py startapp password account/password
CommandError: Destination directory '.../account/password' does not exist, please create it first.
```

先にディレクトリを作成しろと言われるので、作成。
そうすると、`account/password`内にアプリが作成される。

```bash
$ mkdir account/password
$ python manage.py startapp password account/password
```

現在のディレクトリ。

```bash
.
├── account
│   ├── (略)
│   └── password
│        ├── __init__.py
│        ├── admin.py
│        ├── apps.py
│        ├── migrations
│        │   └── __init__.py
│        ├── models.py
│        ├── tests.py
│        └── views.py
├── config
│   └── (略)
├── manage.py
├── poetry.lock
└── pyproject.toml
```

### urlを登録

今までと同じように、`account/password/urls.py`を作成する。
Viewに`PassChangeView`というViewを作成した。

```python:account/password/urls.py
from django.urls import path, include
from . import views

app_name = 'password'
urlpatterns = [
    path('change/', views.PassChangeView.as_view(), name='change'),
]
```

`account/urls.py`で`urls.py`をincludeする。

この時、`password.urls`をincludeすれば動きそうな気がするが、`account.password.urls`としなければ動かないので注意。

```python:account/urls.py
from django.urls import path, include
from . import views

app_name = 'account'
urlpatterns = [
    path("top/", views.TopView.as_view(), name="top"),
    path("password/", include('account.password.urls'), name="password") # 追加
]
```

このとき、PassChangeViewのurlは`/account/password/change`となる。

### urlの参照
template内では、以下のようにurlを指定する。

```xml
<a href="{% url 'account:password:change'%}">トップぺージへのリンク</a>
```


### settings.pyにアプリケーションを登録

`account/password`にpasswordが作成されたが、`config/settings.py`にアプリケーションを記入しなければマイグレーションができない。
`INSTALLED_APPS`に記入する際は、**:**ではなく**.**を使用する。

```python:config/settings.py
INSTALLED_APPS = [
    # defaults
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'account',
    'account.password' # 追加
]
```

### migrate

`password`アプリケーションのmigrateを行う場合も少し挙動が違うので注意。

```bash
$ python manage.py makemigrations password
    -> 〇
$ python manage.py makemigrations account.password
    -> ×
$ python manage.py makemigrations account:password
    -> ×
$ python manage.py makemigrations account/password
    -> ×
```

## まとめ

パスとある程度対応させたディレクトリ構成のほうが把握しやすいのですが、最初はいろんなところで躓いたのでまとめました。
3階層までやるとかなりごちゃごちゃしていくのですが、2階層であればすっきりするのでおすすめです。
