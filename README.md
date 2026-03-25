# Teacher Toolbox | 教師工具箱

一個為教育工作者設計的工具分享平台。老師可以發現、分享和使用各種教學工具。

## 功能

- 🔍 瀏覽和搜尋教學工具
- 📤 上載自己的工具
- 👤 用戶認證（Email/Google）
- 🏷️ 分類和標籤系統
- 📊 工具統計和評分
- 🚨 工具舉報功能

## 技術棧

- Next.js 14 + TypeScript
- Tailwind CSS + shadcn/ui
- NextAuth.js（認證）
- Prisma + PostgreSQL（數據庫）

## 本地開發

```bash
# 安裝依賴
npm install

# 設置環境變數
cp .env.example .env.local
# 編輯 .env.local 填入你的配置

# 運行開發伺服器
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000)

## 部署到 Vercel

### 方法一：Vercel CLI

```bash
# 安裝 Vercel CLI
npm i -g vercel

# 登入 Vercel
vercel login

# 部署
vercel --prod
```

### 方法二：GitHub + Vercel 自動部署（推薦）

1. **在 GitHub 創建倉庫**
   - 去 [github.com/new](https://github.com/new)
   - 倉庫名稱：`teacher-toolbox`
   - 選擇 Public 或 Private

2. **推送代碼到 GitHub**
   ```bash
   git remote add origin https://github.com/你的用戶名/teacher-toolbox.git
   git branch -M main
   git add .
   git commit -m "Initial MVP"
   git push -u origin main
   ```

3. **在 Vercel 導入項目**
   - 去 [vercel.com/new](https://vercel.com/new)
   - 登入並選擇你的 GitHub 帳戶
   - 選擇 `teacher-toolbox` 倉庫
   - 點擊 "Import"

4. **配置環境變數**
   在 Vercel 項目設置中，添加以下環境變數：
   ```
   DATABASE_URL=postgresql://...
   NEXTAUTH_SECRET=你的隨機密鑰（32位以上）
   NEXTAUTH_URL=https://你的域名.vercel.app
   GOOGLE_CLIENT_ID=（可選）
   GOOGLE_CLIENT_SECRET=（可選）
   ```

5. **部署**
   - 點擊 "Deploy"
   - Vercel 會自動構建和部署
   - 每次推送代碼到 GitHub 都會自動重新部署

## 環境變數說明

| 變數名 | 說明 | 必填 |
|--------|------|------|
| `DATABASE_URL` | PostgreSQL 連接字符串 | ✅ |
| `NEXTAUTH_SECRET` | NextAuth 密鑰（隨機字符串） | ✅ |
| `NEXTAUTH_URL` | 網站 URL | ✅ |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | ❌ |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | ❌ |

### 生成 NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

或去 [generate-secret.vercel.app](https://generate-secret.vercel.app/32)

## 數據庫設置

### 使用 Supabase（免費）

1. 去 [supabase.com](https://supabase.com) 創建帳戶
2. 創建新項目
3. 在 Settings > Database 找到 Connection String
4. 複製 `DATABASE_URL` 到環境變數

### 運行數據庫遷移

```bash
npx prisma migrate dev
```

## 項目結構

```
my-app/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   ├── login/             # 登入頁面
│   ├── register/          # 註冊頁面
│   ├── tools/             # 工具列表/詳情
│   ├── upload/            # 上載工具
│   └── profile/           # 個人檔案
├── components/            # React 組件
│   ├── ui/               # shadcn/ui 組件
│   ├── layout/           # 佈局組件
│   └── tools/            # 工具相關組件
├── lib/                   # 工具函數
│   ├── data.ts           # 數據存儲
│   ├── auth.ts           # 認證配置
│   └── prisma.ts         # Prisma 客戶端
├── prisma/               # Prisma 配置
│   └── schema.prisma     # 數據庫模式
├── public/               # 靜態資源
└── types/                # TypeScript 類型
```

## 貢獻

歡迎 Pull Requests！請確保：
1. 代碼通過 TypeScript 類型檢查
2. 遵循現有代碼風格
3. 添加適當的註釋

## 授權

MIT License
