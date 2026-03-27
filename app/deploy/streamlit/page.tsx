"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  Cloud,
  Github
} from "lucide-react";

export default function StreamlitGuidePage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-green-50 to-background py-8">
        <div className="container mx-auto px-4">
          <Link href="/deploy" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-4">
            <ChevronLeft className="h-4 w-4" />
            返回部署教學中心
          </Link>

          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-green-100 flex items-center justify-center">
              <Cloud className="h-8 w-8 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-green-100 text-green-700">入門</Badge>
                <Badge variant="outline" className="gap-1">
                  <Clock className="h-3 w-3" />
                  15 分鐘
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Streamlit Cloud 部署教學</h1>
              <p className="text-lg text-muted-foreground">
                最適合 Python 教學工具嘅部署方案，無需前端知識
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Prerequisites */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  開始之前
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>已安裝 Python（3.8 或以上）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>有 GitHub 帳戶</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>已安裝 Git（或用 GitHub 網頁版）</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Step 1 */}
            <Card id="step-1">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                  <CardTitle className="text-lg">準備你的 Python 代碼</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>首先，確保你嘅工具可以用一個 Python 文件運行。例如，創建 <code className="bg-muted px-1 rounded">app.py</code>：</p>
                
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code>{`import streamlit as st

st.title("我嘅教學工具")
st.write("歡迎使用！")

# 你嘅工具邏輯
name = st.text_input("學生姓名")
if st.button("開始"):
    st.success(f"你好，{name}！")`}</code>
                </pre>
                
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                  <p className="text-sm text-blue-700">
                    <strong>💡 提示：</strong> 確保你已安裝 streamlit：pip install streamlit
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card id="step-2">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                  <CardTitle className="text-lg">創建 GitHub 倉庫</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="list-decimal list-inside space-y-2">
                  <li>去 github.com/new 創建新倉庫</li>
                  <li>倉庫名稱：<code className="bg-muted px-1 rounded">my-teaching-tool</code></li>
                  <li>選擇 Public</li>
                  <li>點擊 Create repository</li>
                  <li>上載你嘅代碼到 GitHub</li>
                </ol>
                
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code>{`git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/你的用戶名/my-teaching-tool.git
git push -u origin main`}</code>
                </pre>
                
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                  <p className="text-sm text-blue-700">
                    <strong>💡 提示：</strong> 如果你唔熟識 Git，可以直接喺 GitHub 網頁上載文件
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card id="step-3">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                  <CardTitle className="text-lg">創建 requirements.txt</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>喺項目根目錄創建 <code className="bg-muted px-1 rounded">requirements.txt</code> 文件，列出所有依賴：</p>
                
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                  <code>{`streamlit>=1.28.0
pandas
numpy
# 其他你用到嘅庫`}</code>
                </pre>
                
                <p>呢個文件告訴 Streamlit Cloud 需要安裝咩套件。</p>
                
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                  <p className="text-sm text-blue-700">
                    <strong>💡 提示：</strong> 可以用 pip freeze > requirements.txt 生成依賴列表
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card id="step-4">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">4</div>
                  <CardTitle className="text-lg">登入 Streamlit Cloud</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2">
                  <li>去 share.streamlit.io</li>
                  <li>點擊 "Continue with GitHub"</li>
                  <li>授權 Streamlit 訪問你嘅 GitHub 倉庫</li>
                </ol>
                
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded mt-4">
                  <p className="text-sm text-blue-700">
                    <strong>💡 提示：</strong> 確保授權時選擇咗你放工具嘅倉庫
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Step 5 */}
            <Card id="step-5">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">5</div>
                  <CardTitle className="text-lg">部署應用</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ol className="list-decimal list-inside space-y-2">
                  <li>點擊 "New app"</li>
                  <li>選擇你嘅 GitHub 倉庫</li>
                  <li>選擇主文件（通常是 <code className="bg-muted px-1 rounded">app.py</code>）</li>
                  <li>點擊 "Deploy"</li>
                </ol>
                
                <p>等待約 2-3 分鐘，你就會獲得一個公開 URL：</p>
                <pre className="bg-muted p-4 rounded-lg">
                  <code>https://你的用戶名-我的教學工具.streamlit.app</code>
                </pre>
                
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                  <p className="text-sm text-blue-700">
                    <strong>💡 提示：</strong> 第一次部署可能需要較長時間，因為要安裝依賴
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="bg-green-50">
              <CardHeader>
                <CardTitle>🎉 部署完成！</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>恭喜你！你嘅工具已經部署到網上。依家你可以：</p>
                <ul className="space-y-2">
                  <li>• 複製你嘅工具 URL（類似 <code className="bg-muted px-1 rounded">https://xxx.streamlit.app</code>）</li>
                  <li>• 返到 <Link href="/upload" className="text-primary hover:underline">教師工具箱</Link> 上載你嘅工具</li>
                  <li>• 分享俾其他老師使用</li>
                </ul>
                <Link href="/upload">
                  <Button className="mt-4">去上載工具 →</Button>
                </Link>
              </CardContent>
            </Card>

            {/* FAQ */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">常見問題</h2>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Q: Streamlit Cloud 收費嗎？</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">A: 有免費層！可以部署無限個公開應用，每個應用有 1GB 存儲空間。</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Q: 可以部署私人應用嗎？</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">A: 可以，但需要付費計劃。免費層只支持公開應用。</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Q: 支持咩 Python 版本？</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">A: Streamlit Cloud 支持 Python 3.8、3.9、3.10、3.11。</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Q: 如何更新已部署嘅工具？</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">A: 只需推送新代碼到 GitHub，Streamlit Cloud 會自動重新部署。</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">有用連結</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <a 
                  href="https://share.streamlit.io" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-primary"
                >
                  <ExternalLink className="h-4 w-4" />
                  Streamlit Cloud
                </a>
                <a 
                  href="https://docs.streamlit.io" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-primary"
                >
                  <ExternalLink className="h-4 w-4" />
                  Streamlit 文檔
                </a>
                <a 
                  href="https://github.com/new" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm hover:text-primary"
                >
                  <Github className="h-4 w-4" />
                  創建 GitHub 倉庫
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">其他部署方案</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/deploy/github-pages" className="block text-sm hover:text-primary">
                  GitHub Pages →
                </Link>
                <Link href="/deploy/vercel" className="block text-sm hover:text-primary">
                  Vercel →
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
