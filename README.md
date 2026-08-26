# 筑波大学宇宙技術プロジェクト STEP

筑波大学宇宙技術プロジェクト STEP の公式 Web サイトです。

ロケットと模擬人工衛星 CanSat の活動、製作した機体、ニュースを掲載しています。

## 技術構成

- [Astro](https://astro.build/)：静的サイトの生成
- [Tailwind CSS](https://tailwindcss.com/)：スタイルの構築
- [Bun](https://bun.sh/)：依存関係の管理とスクリプトの実行
- [microCMS](https://microcms.io/)：ニュースの管理
- [Cloudflare Workers](https://workers.cloudflare.com/)：プレビュー環境

## 必要な環境

- Bun
- microCMS の API エンドポイント
- microCMS の API キー

ニュースを含むページを開発・ビルドするには、microCMS の認証情報が必要です。

## セットアップ

依存関係をインストールします。

```sh
bun install
```

プロジェクトルートの `.env` に microCMS の認証情報を設定します。

```dotenv
MICROCMS_ENDPOINT=https://example.microcms.io/api/v1
MICROCMS_API_KEY=your-api-key
```

`.env` は Git の管理対象外です。

## 開発

開発サーバーを起動します。

```sh
bun run dev
```

起動後に `http://localhost:4321` を開きます。

## コマンド

| コマンド             | 用途                                         |
| -------------------- | -------------------------------------------- |
| `bun run dev`        | 開発サーバーを起動する                       |
| `bun run build`      | 通常の本番ビルドを `dist/` に生成する        |
| `bun run build:prod` | `/~step/` 配下で公開する本番ビルドを生成する |
| `bun run preview`    | 生成済みの本番ビルドをローカルで確認する     |
| `bun run lint`       | ESLint を実行する                            |
| `bun run format`     | Prettier でコードを整形する                  |

本番ビルドを確認する場合は、次の順に実行します。

```sh
bun run build
bun run preview
```

## ディレクトリ構成

```text
.
├── public/                 # そのまま配信する静的ファイル
├── src/
│   ├── assets/             # ページで使う画像
│   ├── components/         # 共通コンポーネント
│   ├── content/about/      # About ページのデータ
│   ├── layouts/            # 共通レイアウト
│   ├── lib/microcms.ts     # microCMS との通信
│   └── pages/              # ページと URL の定義
├── astro.config.mjs        # Astro の設定
├── package.json            # スクリプトと依存関係
└── wrangler.jsonc          # Cloudflare Workers の設定
```

## コンテンツの更新

About ページの代表挨拶とメンバー情報は `src/content/about/data.yaml` で管理します。

ロケットと CanSat の紹介文は、それぞれ `src/pages/rocket.astro` と `src/pages/cansat.astro` に定義しています。

ニュースは microCMS の `news` API からビルド時に取得します。

取得したニュース画像は `public/cms-images/` にキャッシュされますが、このディレクトリは Git の管理対象外です。

## デプロイ

GitHub Actions でプレビュー環境と本番環境へデプロイします。

- ブランチへ push すると、Cloudflare Workers のプレビュー環境を生成する
- `Deploy` ワークフローを手動実行すると、本番用のビルドを生成して STB サーバーへ転送する
- microCMS から `repository_dispatch` を送ると、ニュース更新後の本番デプロイを実行できる

GitHub Actions には次の認証情報を設定します。

| 名前                    | 種別     | 用途                           |
| ----------------------- | -------- | ------------------------------ |
| `MICROCMS_ENDPOINT`     | Secret   | microCMS の API エンドポイント |
| `MICROCMS_API_KEY`      | Secret   | microCMS の API キー           |
| `CLOUDFLARE_API_TOKEN`  | Secret   | プレビュー環境のデプロイ       |
| `CLOUDFLARE_ACCOUNT_ID` | Variable | Cloudflare アカウントの識別子  |
| `STB_SSH_PRIVATE_KEY`   | Secret   | 本番サーバーへの SFTP 接続     |

認証情報をソースコードや `.env` 以外の公開ファイルに保存しないでください。
