---
title: 【Django2.2】リレーション先の値をソートして取得
tags: Django Python
author: ragnar1904
date: 2019-12-29
slide: false
---
# リレーション先の値をsortする方法

`Country -> Team -> Player`
というリレーションがある場合、Team一覧を取得し、かつPlayerの並びを変更したいときがある。

そんな場合、Prefetchオブジェクトを利用すれば良い。

```python:views.py
from django.db.models import Prefetch

    def get_queryset(self):
        queryset = Team.objects.filter(country="japan").prefetch_related(
            Prefetch(Player, queryset=Player.objects.order_by('name')))
        return queryset
```

`prefetch_related`の中身にPrefetchオブジェクトをセットする。

### 公式Doc
QuerySet API reference | Django ドキュメント | Django
https://docs.djangoproject.com/ja/2.2/ref/models/querysets/#prefetch-objects
