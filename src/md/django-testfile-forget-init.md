---
title: 【Django】ファイルの場所を変えたらTestが動かない
tags: Django Python
author: ragnar1904
date: 2020-01-06
slide: false
---


## 環境
- python 3.7.4
- django 2.2.8
- centOS 7

## 症状

`python manage.py startapp sample`でアプリを作成し、`sample/tests.py`に記述したテストは動く。
ファイル分割のため`sample/tests/`ディレクトリを作成、`sample/tests/test_model.py`を作成したものの、
`python manage.py test`が動かない。


#### 実行結果

```bash
(venv) user@localhost:django-app $ python manage.py test
System check identified no issues (0 silenced).

----------------------------------------------------------------------
Ran 0 tests in 0.000s

OK
```

## 確認した

Djangoのテストは、**テストランナーにテストを発見してもらうためのルール**が存在する。
正しく沿っているか確認した。

- テストのモジュール名(ファイル名)は`test`で始まっているか・・・・・ **OK**  
- `django.test.TestCase`を継承しているか・・・・・・・・・・・・・ **OK**  
  (`unittest.case.Testcase`でもOK)
- テストメソッド名は`test`で始まっているか・・・・・・・・・・・・・ **OK**  
- そもそも`settings.py`の`INSTALLED_APPS`に記述されているか・・・・**OK**  




## 結論
`sample/tests/`ディレクトリに`__init__.py`が存在しないことが原因だった。
Djangoにモジュールとして認識できるようにしてやる必要があるようだ。
空ファイルでよいので作成すれば動く。


## 参考
- [python - Why does django not see my tests? - Stack Overflow](https://stackoverflow.com/questions/3659405/why-does-django-not-see-my-tests)
- 現場で使える Django の教科書《実践編》(横瀬 明仁)
