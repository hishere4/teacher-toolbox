"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  Clock, 
  CheckCircle2,
  Github,
  ExternalLink
} from "lucide-react";

export default function GitHubPagesGuidePage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-gray-50 to-background py-8">
        <div className="container mx-auto px-4">
          <Link href="/deploy" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-4">
            <ChevronLeft className="h-4 w-4" />
            返回部署教學中心
          </Link>

          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center">
              <Github className="h-8 w-8 text-gray-700" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-green-100 text-green-700">入門</Badge>
                <Badge variant="outline" className="gap-1">
                  <Clock className="h-3 w-3" />
                  10 分鐘
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">GitHub Pages 部署教學</h1>
              <p className="text-lg text-muted-foreground">
                免費托管靜態網站，適合純 HTML/CSS/JS 工具
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>開始之前</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                有一個完整嘅 HTML/CSS/JS 項目
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                入口文件係 <code>index.html</code>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                GitHub 帳戶
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {[
            {
              title: "上載代碼到 GitHub",
              content: `
1. 去 github.com/new 創建新倉庫
2. 倉庫名：my-teaching-tool
3. 將你嘅 HTML/CSS/JS 文件上載到倉庫
4. 確保根目錄有 index.html
              `,
            },
            {
              title: "啟用 GitHub Pages",
              content: `
1. 喺倉庫頁面，點擊 Settings（設置）
2. 左側選擇 Pages
3. Source 選擇 Deploy from a branch
4. Branch 選擇 main / root
5. 點擊 Save
              `,
            },
            {
              title: "獲取網址",
              content: `
等待約 1-2 分鐘，你會獲得：
https://你的用戶名.github.io/my-teaching-tool

依家你可以將呢個 URL 上載到教師工具箱！
              `,
            },
          ].map((step, index) => (
            <Card key={step.title}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <CardTitle className="text-lg">{step.title}</CardTitle>
                </div>
              </CardHeader>              
              <CardContent>
                <pre className="whitespace-pre-wrap text-sm text-muted-foreground">{step.content}</pre>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 bg-green-50">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-lg mb-2">部署完成！</h3>
            <Link href="/upload">
              <Button>去上載工具 →</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
