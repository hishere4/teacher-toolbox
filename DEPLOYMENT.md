# 部署指南 | Deployment Guide

## 快速部署步驟（5 分鐘完成）

### 第一步：創建 GitHub 倉庫

1. 去 [github.com/new](https://github.com/new)
2. **Repository name**: `teacher-toolbox`
3. 選擇 **Public**（或 Private）
4. 點擊 **Create repository**
5. 複製倉庫 URL（例如：`https://github.com/你的用戶名/teacher-toolbox.git`）

### 第二步：推送代碼到 GitHub

在項目文件夾打開 Terminal/PowerShell：

```bash
# 添加遠程倉庫（將 URL 換成你的）
git remote add origin https://github.com/你的用戶名/teacher-toolbox.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 第三步：部署到 Vercel

1. 去 [vercel.com/new](https://vercel.com/new)
2. 點擊 **Continue with GitHub**
3. 授權 Vercel 訪問你的 GitHub
4. 找到 `teacher-toolbox` 倉庫，點擊 **Import**

### 第四步：配置環境變數

在 Vercel 部署設置頁面，點擊 **Environment Variables**，添加：

```
NEXTAUTH_SECRET=your-random-secret-key-here
NEXTAUTH_URL=https://your-domain.vercel.app
```

**生成 SECRET：**
```bash
# 在 Terminal 運行
openssl rand -base64 32
```

或去：[generate-secret.vercel.app](https://generate-secret.vercel.app/32)

### 第五步：部署！

點擊 **Deploy**，等待 1-2 分鐘完成。

---

## 連接數據庫（Supabase）

目前項目使用記憶體存儲，重啟後數據會丟失。建議連接 PostgreSQL。

### 1. 創建 Supabase 項目

1. 去 [supabase.com](https://supabase.com) 註冊/登入
2. 點擊 **New Project**
3. 填寫項目名稱和密碼
4. 等待項目創建（約 1 分鐘）

### 2. 獲取數據庫連接

1. 在 Supabase 項目左側選 **Project Settings**
2. 點擊 **Database**
3. 找到 **Connection string** 
4. 複製 **URI** 格式：
   ```
   postgresql://postgres:[password]@db.xxx.supabase.co:5432/postgres
   ```

### 3. 添加到 Vercel 環境變數

在 Vercel 項目設置 → Environment Variables，添加：

```
DATABASE_URL=postgresql://postgres:你的密碼@db.xxx.supabase.co:5432/postgres
```

### 4. 運行數據庫遷移

在本地 Terminal：

```bash
npx prisma migrate dev --name init
```

然後重新部署：
```bash
git commit --allow-empty -m "Trigger redeploy"
git push
```

---

## 設置 Google OAuth（可選）

讓用戶可以用 Google 帳戶登入。

### 1. 創建 Google Cloud 項目

1. 去 [console.cloud.google.com](https://console.cloud.google.com)
2. 創建新項目
3. 啟用 **Google+ API**

### 2. 創建 OAuth 憑據

1. 去 **APIs & Services** → **Credentials**
2. 點擊 **Create Credentials** → **OAuth client ID**
3. **Application type**: Web application
4. **Name**: Teacher Toolbox
5. **Authorized redirect URIs**: 
   ```
   https://你的域名.vercel.app/api/auth/callback/google
   ```
6. 點擊 **Create**
7. 複製 **Client ID** 和 **Client Secret**

### 3. 添加到 Vercel 環境變數

```
GOOGLE_CLIENT_ID=你的-client-id
GOOGLE_CLIENT_SECRET=你的-client-secret
```

---

## 自動部署

設置完成後，每次推送代碼到 GitHub，`main` 分支會自動部署到 Vercel：

```bash
# 修改代碼後
git add .
git commit -m "Update feature"
git push
# 自動觸發 Vercel 重新部署
```

---

## 常見問題

### Q: 部署後顯示 "Application error"
A: 檢查 Vercel 環境變數是否設置正確，特別是 `NEXTAUTH_SECRET`

### Q: 數據丟失
A: 這是正常的，目前使用記憶體存儲。請按上面步驟連接 Supabase

### Q: 如何更新網站
A: 修改代碼 → `git commit` → `git push` → 自動部署

---

## 支持

有問題請：
1. 查看 Vercel 部署日誌
2. 檢查瀏覽器 Console 錯誤
3. 確認環境變數設置
