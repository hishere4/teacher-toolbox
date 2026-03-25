# 數據庫設置指南 | Database Setup Guide

## 快速開始（使用 Supabase）

### 第一步：創建 Supabase 帳戶

1. 去 [supabase.com](https://supabase.com) 註冊帳戶
2. 使用 GitHub 或 Email 登入

### 第二步：創建項目

1. 點擊 **New Project**
2. **Organization**: 選擇或創建組織
3. **Project name**: `teacher-toolbox`
4. **Database password**: 設置一個強密碼（記住它！）
5. **Region**: 選擇最接近你嘅地區（如 Singapore 或 Hong Kong）
6. 點擊 **Create new project**
7. 等待項目創建（約 1-2 分鐘）

### 第三步：獲取數據庫連接字符串

1. 項目創建後，點擊左側 **Project Settings**（齒輪圖標）
2. 點擊 **Database**
3. 找到 **Connection string** 部分
4. 選擇 **URI** 分頁
5. 點擊 **Copy** 按鈕複製連接字符串
6. 將 `[YOUR-PASSWORD]` 替換成你設置嘅密碼

示例：
```
postgresql://postgres:你的密碼@db.xxxxxxxxx.supabase.co:5432/postgres
```

### 第四步：設置本地環境變數

1. 在項目根目錄創建 `.env.local` 文件：
```bash
cp .env.example .env.local
```

2. 編輯 `.env.local`，添加：
```env
# 數據庫連接
DATABASE_URL=postgresql://postgres:你的密碼@db.xxx.supabase.co:5432/postgres

# NextAuth 配置
NEXTAUTH_SECRET=你的隨機密鑰（32位以上）
NEXTAUTH_URL=http://localhost:3000
```

生成 NEXTAUTH_SECRET：
```bash
openssl rand -base64 32
```

### 第五步：運行數據庫遷移

```bash
# 安裝依賴
npm install

# 生成 Prisma Client
npm run db:generate

# 運行遷移（創建表結構）
npm run db:migrate

# 填充示例數據
npm run db:seed
```

### 第六步：驗證連接

```bash
# 打開 Prisma Studio 查看數據
npm run db:studio
```

會在瀏覽器打開 `http://localhost:5555`，你可以看到所有表和數據。

---

## Vercel 部署時的數據庫設置

### 1. 在 Vercel 添加環境變數

部署到 Vercel 時，需要添加相同嘅環境變數：

1. 去 Vercel Dashboard
2. 選擇你的項目
3. 點擊 **Settings** → **Environment Variables**
4. 添加：
   - `DATABASE_URL` = 你的 Supabase 連接字符串
   - `NEXTAUTH_SECRET` = 你的密鑰
   - `NEXTAUTH_URL` = 你的 Vercel 域名（如 `https://teacher-toolbox.vercel.app`）

### 2. 重新部署

添加環境變數後，Vercel 會自動重新部署。

---

## 常見問題

### Q: 連接超時或失敗？

A: 檢查以下幾點：
1. 密碼是否正確（注意特殊字符可能需要 URL encode）
2. Supabase 項目是否活躍（超過 7 天不活動會暫停）
3. 防火墻設置（本地測試應該沒問題）

### Q: 如何重置數據庫？

A: 在 Supabase Dashboard：
1. 去 **Database** → **Extensions**
2. 找到 **Reset database**（謹慎使用！）

### Q: Prisma 遷移失敗？

A: 嘗試：
```bash
# 重置遷移狀態
npx prisma migrate reset

# 或刪除 migrations 文件夾重新開始
rm -rf prisma/migrations
npx prisma migrate dev --name init
```

---

## 其他數據庫選項

### Neon（免費 PostgreSQL）

1. 去 [neon.tech](https://neon.tech)
2. 創建項目
3. 複製連接字符串（選擇 Prisma 格式）

### Railway

1. 去 [railway.app](https://railway.app)
2. 創建 PostgreSQL 數據庫
3. 複製連接字符串

### Vercel Postgres（付費）

1. 在 Vercel Dashboard 點擊 **Storage**
2. 創建 Postgres 數據庫
3. 自動設置環境變數

---

## 數據備份

### 導出數據

```bash
pg_dump -h db.xxx.supabase.co -U postgres -d postgres > backup.sql
```

### 導入數據

```bash
psql -h db.xxx.supabase.co -U postgres -d postgres < backup.sql
```

---

需要幫助？查看 [Prisma 文檔](https://pris.ly/d/prisma-schema) 或 [Supabase 文檔](https://supabase.com/docs)
