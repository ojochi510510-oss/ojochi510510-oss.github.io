# ojochiの作業部屋

Astro + TypeScript で作成した静的サイトです。
Markdown（Content Collections）で News と Blog を更新できます。

公開URL: https://ojochi.github.io/

## ローカル起動手順

```bash
npm install
npm run dev
```

本番ビルド確認:

```bash
npm run build
npm run preview
```

## コンテンツ更新方法

### Newsの追加

`src/content/news/` に Markdown を追加します。

frontmatter 例:

```md
---
title: "お知らせタイトル"
date: 2026-03-04
description: "お知らせの要約"
link: "https://ojochi.github.io/blog/2026-03-04-first-post/"
draft: false
---

本文
```

`link` は任意です。設定するとお知らせ欄に「ブログを読む」リンクが表示されます。

### Blogの追加

`src/content/blog/` に Markdown を追加します。

frontmatter 例:

```md
---
title: "ブログタイトル"
date: 2026-03-04
description: "ブログの要約"
draft: false
---

本文
```

### draft の使い方

公開したくない記事は `draft: true` を指定します。
`draft: true` の記事はトップページ・一覧ページから除外されます。

## GitHub Pages 設定手順（ユーザーサイト）

このリポジトリは `ojochi.github.io` を想定しています。
GitHub Actions が `gh-pages` 以外のブランチへの push をトリガーに `dist/` を build し、`gh-pages` ブランチのルートへデプロイします。

1. GitHub リポジトリの `Settings` -> `Pages` を開く
2. `Source` で `Deploy from a branch` を選択
3. `Branch` は `gh-pages`、`Folder` は `/(root)` を選択

`gh-pages` ブランチは Actions の初回成功後に自動生成されます。

補足:
- `Settings` -> `Actions` -> `General` の `Workflow permissions` は `Read and write permissions` を推奨します（`GITHUB_TOKEN` で `gh-pages` へ push するため）。
- `gh-pages` は生成物置き場です。手動コミットやPR対象にしない運用にしてください。

## Astro 設定について

`astro.config.mjs` には以下を設定しています。

- `site: "https://ojochi.github.io"`

`base` は設定していません。
ユーザーサイト（`https://ojochi.github.io/`）はルート配信のため、`/blog` などをそのまま使えます。
将来 Project Pages（例: `https://<user>.github.io/<repo>/`）へ変更する場合のみ `base` の設定が必要です。
