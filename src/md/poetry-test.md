---
title: 【Python】Poetry始めてみた & Pipenv から poetry へ移行した所感
tags: Poetry Python
author: ragnar1904
date: 2020-01-17
slide: false
---

## 動機

近頃 pipenv のインストールがかなり遅いので poetry を試してみました。
一通り使ってみてわかったことをまとめます。Pipenv を使っているのでそことの比較も。
パッケージ関連のコマンド(build, publish...)に関してや、細かい機能に関しては記述しないので、[公式 Doc](https://python-poetry.org/docs/)を参考にしてください。


## Poetry について

Poetry は、Python のパッケージ管理ツールです。Pipenv と同様、依存関係を解決しパッケージのインストール、アンインストールを行ってくれ、
poetry.lock ファイルによって、他のユーザーも適切なバージョン、依存関係でパッケージをインストールすることが出来ます。
仮想環境を利用でき、パッケージングも可能です。


## 環境

- CentOS 7.6.1810
- pyenv 1.2.14-8-g0e7cfc3b
- poetry 1.0.2

Python は pyenv でインストールしたものを使う。

- Python 3.7.4 (pyenv global)


## 導入

```bash
$ curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | python
```

`~./bash_profile`に PATH が記入され、poetry が立ち上がる。

```bash
$ poetry -V
Poetry version 1.0.2
```


## Poetry 設定

- PIPENV_VENV_IN_PROJECT

pipenv の場合、`.venv`フォルダをプロジェクト内に設定するには環境変数を利用していた。

```bash:Pipenv
$ export PIPENV_VENV_IN_PROJECT=1
$ pipenv install...
```

poetry の場合、`poetry config`から設定を行う。
`--list`オプションで現在の設定を確認できる。デフォルトでは`virtualenvs.in-project=false`。

```bash:poetry
$ poetry config --list
cache-dir = "/home/user/.cache/pypoetry"
virtualenvs.create = true
virtualenvs.in-project = false
virtualenvs.path = "{cache-dir}/virtualenvs"  # /home/user/.cache/pypoetry/virtualenvs
```

設定を変更。

```bash:
$ poetry config virtualenvs.in-project true
```

```bash
$ poetry config --list
cache-dir = "/home/user/.cache/pypoetry"
virtualenvs.create = true
virtualenvs.in-project = true
virtualenvs.path = "{cache-dir}/virtualenvs"  # /home/user/.cache/pypoetry/virtualenvs
```

## プロジェクトのスタート

### ひな形の生成

`poetry new`でプロジェクトをスタート、ひな形が生成される。
以下は[公式 Doc](https://python-poetry.org/docs/cli/#new)の通り。

```bash
$ poetry new my-package
Created package my_package in my-package
```

```bash:生成されたひな形
my-package
├── pyproject.toml
├── README.rst
├── my_package
│   └── __init__.py
└── tests
    ├── __init__.py
    └── test_my_package.py
```

生成される`pyproject.toml`は以下の通り。dev-dependencies に自動で pytest が入るようだ。

```toml:pyproject.toml
[tool.poetry]
name = "my-package"
version = "0.1.0"
description = ""
authors = ["Your Name <you@example.com>"]

[tool.poetry.dependencies]
python = "^3.7"

[tool.poetry.dev-dependencies]
pytest = "^5.2"

[build-system]
requires = ["poetry>=0.12"]
build-backend = "poetry.masonry.api"
```

ただどうも my-package の中に my_package ディレクトリが出来るのが使いにくい。`--name`オプションでパッケージ内のディレクトリ名を変更出来る。

- `--name`オプション

```bash
$ poetry new my-package --name app
Created package app in my-package
```

```bash:ひな形
my-package
├── pyproject.toml
├── README.rst
├── app
│   └── __init__.py
└── tests
    ├── __init__.py
    └── test_my_package.py
```

- `--src`オプション

`--src`オプションというのもあるようだが、余計ややこしくなるので使わなそう。

```bash
$ poetry new --src my-package
```

```bash:ひな形
├── pyproject.toml
├── README.rst
├── src
│   └── my_package
│       └── __init__.py
└── tests
    ├── __init__.py
    └── test_my_package.py
```

### `pyproject.toml`の生成

ひな形が必要ない場合、`poetry init`で`pyproject.toml`のみ作成出来る。
`npm init`のように対話式で`pyproject.toml`の内容を決める。

```bash
$ poetry init

Package name [{folder_name}]:
Version [0.1.0]:
Description []:
Author [None, n to skip]:  n
License []:
Compatible Python versions [^3.7]:

Would you like to define your main dependencies interactively? (yes/no) [yes] no
Would you like to define your dev dependencies (require-dev) interactively (yes/no) [yes] no
Generated file

[tool.poetry]
name = "new_ais"
version = "0.1.0"
description = ""
authors = ["Your Name <you@example.com>"]

[tool.poetry.dependencies]
python = "^3.7"

[tool.poetry.dev-dependencies]

[build-system]
requires = ["poetry>=0.12"]
build-backend = "poetry.masonry.api"

Do you confirm generation? (yes/no) [yes] yes
```

package name は何も入力しないとそこのフォルダ名になる。Author と dependencies のところは y/n を入力。これでカレントディレクトリに`pyproject.toml`が作成される。

Pipenv と同じように使うなら init で始めたほうがわかりやすそう。

## install

`poetry install`は`pipenv install`と同じく、上で作成した`pyproject.toml`から、依存関係を解決し、必要なパッケージをインストールする。

```bash
$ poetry new myapp
$ cd myapp
```

```bash
$ poetry install
reating virtualenv myapp in /home/user/workspace/poetry/myapp/.venv
Updating dependencies
Resolving dependencies... (0.5s)

Writing lock file

Package operations: 11 installs, 0 updates, 0 removals

  - Installing more-itertools (8.1.0)
  - Installing zipp (1.0.0)
  - Installing importlib-metadata (1.4.0)
  - Installing pyparsing (2.4.6)
  - Installing six (1.14.0)
  - Installing attrs (19.3.0)
  - Installing packaging (20.0)
  - Installing pluggy (0.13.1)
  - Installing py (1.8.1)
  - Installing wcwidth (0.1.8)
  - Installing pytest (5.3.2)
  - Installing myapp (0.1.0)
```

install を行うと、`poetry.lock`ファイルが作成され、依存関係を見ることが出来る。

- `--no-root`オプション

  poetry はデフォルトで myapp をインストールする。これを回避するには、`--no-root`オプションを付けてインストール。

  ```bash
  $ poetry install --no-root
  ```

- `--no-dev`オプション

  dev-dependencies を install しない場合は、`--no-dev`オプションで OK。

  ```bash
  $ poetry install --no-dev
  ```

## add

パッケージをインストール。Pipenv とは異なり、add なので注意。
pipenv に比べて locking が早い。

```bash
$ poetry add django==2.2.8
```

dev-dependencies の場合、`--dev(-D)`オプション。

```bash
$ poetry add flake8 -D
```

`--dry-run`オプションを用いればインストールは行わず、インストールされる内容を見る事ができる。

```bash
$ poetry add django --dry-run
Using version ^3.0.2 for django

Updating dependencies
Resolving dependencies... (0.4s)

Package operations: 4 installs, 0 updates, 0 removals, 13 skipped

  - Skipping more-itertools (8.1.0) Already installed
  - Skipping zipp (1.0.0) Already installed
  - Skipping importlib-metadata (1.4.0) Already installed
  - Skipping pyparsing (2.4.6) Already installed
  - ...
```

## update

プロジェクトにインストールしたパッケージをアップデートする場合

```bash
$ poetry update
```

個別にアップデート

```bash
$ poetry update requests django
```

add と同じく、`--dry-run`オプションでアップデートの内容を見る事ができる。

```bash
$ poetry update --dry-run
Updating dependencies
Resolving dependencies... (0.4s)

No dependencies to install or update

  - Skipping more-itertools (8.1.0) Already installed
  - Skipping zipp (1.0.0) Already installed
  - Skipping importlib-metadata (1.4.0) Already installed
  - Skipping pyparsing (2.4.6) Already installed
  - Skipping six (1.14.0) Already installed
  - Skipping atomicwrites (1.3.0) Not needed for the current environment
  - ...
```

## remove

インストールしたパッケージを削除。

```bash
$ poetry remove flask
```

dev-dependencies にインストールしたパッケージは`--dev(-D)`オプションが必要なので注意。

```bash
$ poetry add flake8 -D

$ poetry remove flake8 # failed
[ValueError]
Package flake8 not found

$ poetry remove flake8 -D # OK
```

remove でも`--dry-run`オプションが使用できる。

## show

利用可能なパッケージの一覧を表示する。
`pip list`の強化版のような機能。

```bash
$ poetry show
asgiref            3.2.3  ASGI specs, helper code, and ada...
attrs              19.3.0 Classes Without Boilerplate
django             3.0.2  A high-level Python Web framewor...
entrypoints        0.3    Discover and load entry points f...
flake8             3.7.9  the modular source code checker:...
importlib-metadata 1.4.0  Read metadata from Python packages
mccabe             0.6.1  McCabe checker, plugin for flake8
more-itertools     8.1.0  More routines for operating on i...
packaging          20.0   Core utilities for Python packages
pluggy             0.13.1 plugin and hook calling mechanis...
...
```

パッケージに関する情報も表示出来る。

```bash
$ poetry show django
name         : django
version      : 3.0.2
description  : A high-level Python Web framework that
            encourages rapid development and clean, pragmatic
            design.

dependencies
 - asgiref >=3.2,<4.0
 - pytz *
 - sqlparse >=0.2.2
```

- `--tree`オプション

  ツリー構造で依存関係を表示できる。`pipenv graph`に近い機能。実際は色付き出力なので見やすい。

  ```bash
  $ poetry show --tree
  django 3.0.2 A high-level Python Web framework that encourages rapid development and clean, pragmatic design.
  ├── asgiref >=3.2,<4.0
  ├── pytz *
  └── sqlparse >=0.2.2
  flake8 3.7.9 the modular source code checker: pep8, pyflakes and co
  ├── entrypoints >=0.3.0,<0.4.0
  ├── mccabe >=0.6.0,<0.7.0
  ├── pycodestyle >=2.5.0,<2.6.0
  └── pyflakes >=2.1.0,<2.2.0
  ...
  ```

- `--latest(-l)`オプション

  最新バージョンを表示。

  ```bash
  $ poetry show --latest
  asgiref            3.2.3  3.2.3  ASGI specs, helper code, a...
  attrs              19.3.0 19.3.0 Classes Without Boilerplate
  django             3.0.2  3.0.2  A high-level Python Web fr...
  entrypoints        0.3    0.3    Discover and load entry po...
  flake8             3.7.9  3.7.9  the modular source code ch...
  importlib-metadata 1.4.0  1.4.0  Read metadata from Python ...
  ```

- `--outdated(-o)`オプション

  バージョンが古いパッケージの表示。

  ```bash
  $ poetry show -o
  django 2.2.4 3.0.2 A high-level Python Web framework that e...
  ```

## lock

`pyproject.toml`で指定された依存関係をロックする。(インストールは行わない)
`poetry.lock`が生成される。

```bash
$ poetry lock
```

## env

仮想環境関連のコマンド。[python]の部分には 3.7.4 等を指定すればよい。

```bash
$ poetry env info            # 現在の仮想環境の情報
$ poetry env list            # 仮想環境一覧
$ poetry env remove <python> # 仮想環境の削除
$ poetry env use <python>    # 仮想環境をアクティブまたは作成
```

自分の環境だと、`virtualenvs.in-project=true`の場合、list にも表示されず remove も効かなかった。
.venv/を削除すればいい話だが。

## shell

仮想環境内でシェルを起動。`pipenv shell`と同等。

```bash
$ poetry shell
```

## scripts

`pyproject.toml`に以下を記入し、スクリプトを実行することが出来る。

```toml:pyproject.toml
[tool.poetry.scripts]
start = "script:main"
```

```python:script.py
def main():
    print("Run script with poetry!")
```

```bash
$ poetry run start
Run script with poetry!
```

仮想環境に入らずとも、スクリプトから実行すると仮想環境内で実行してくれる。

#### 引数の扱い

poetry の [scripts 実行コード](https://github.com/python-poetry/poetry/blob/master/poetry/console/commands/run.py)を見る限り、引数は渡せないようだ。

```python:poetry/console/commands/run.py
    # poetry script実行コード
    def run_script(self, script, args):
        if isinstance(script, dict):
            script = script["callable"]

        module, callable_ = script.split(":")

        src_in_sys_path = "sys.path.append('src'); " if self._module.is_in_src() else ""

        cmd = ["python", "-c"]

        cmd += [
            "import sys; "
            "from importlib import import_module; "
            "sys.argv = {!r}; {}"
            "import_module('{}').{}()".format(args, src_in_sys_path, module, callable_) # 実行
        ]

        return self.env.execute(*cmd)
```

上のスクリプト設定であれば、`import_module('script').main()`が実行されるので、そもそも引数を渡す部分がない。  
Pipenv ではよく`start = "python manage.py runserver 0.0.0.0:8000"`を登録していたので、困った。

```toml:pyproject.toml
[tool.poetry.scripts]
start = "manage:main"
```

とし、`poetry run start runserver 0.0.0.0:8000`とすれば一応動くが。。。

## 所感

- (pipenv と比べ)良い
  install、add、remove、lock が Pipenv より早く(重要)、コンソール上の表示が見やすいので良い。
  `pip list` や `pipenv graph`に相当する機能もかなり見やすい。

- (pipenv と比べ)申し分ない
  venv との連携。Pipenv と同様の使い心地で使える。
  (venv in project の時の動作が気になるが)
  pipenv から pyenv install できる機能はないようだが、そんな頻繁に使うものでもないので大丈夫。

- (pipenv と比べ)悪い
  やはり script の部分。issue は多く出ていたので改善待ちかな。
  オプションが多い気がする。覚えれば良い。

以上の点を踏まえても、poetry を使っていくことになりそうだ。
贅沢を言うなら`poetry show`で dev かどうかわかればよかったな。

## 参考

- Poetry - Python dependency management and packaging made easy
  https://python-poetry.org/docs/
