# Retain Tutor

本アプリは、以下の機能を提供します

- 語彙集の作成
- 選択問題集の作成
- 選択問題集への回答

アプリケーションは、Firebase による認証機能を使用しており、ユーザ管理を安全に行います。フロントエンドは TypeScript と React を採用しており、洗練されたユーザインターフェースを提供します。バックエンドには Next.js を使用し、中間 API サーバとして機能しています。データベースとの接続は ORM の Prisma を使用することで、効率的かつ簡単に管理しています。

お手伝い：ChatGPT

## コマンド集

### アプリケーションの起動

デフォルトのポート「3000」

```sh
yarn start
```

### アプリケーションの起動（デバッグモード）

デフォルトのポート「3000」

```sh
yarn dev
```

### ビルド

```sh
yarn build
```

### テスト

```sh
yarn test
```

### FireBase エミュレータの起動

デフォルトのポート「9099」

```sh
yarn firebase init # 最初のみ
yarn emulate
```

### 環境

```sh
yarn install # 依存関係のインストール
yarn prisma migrate init # Prismaの初期化
yarn prisma migrate dev # マイグレーション
```
