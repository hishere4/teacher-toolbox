"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  Clock, 
  CheckCircle2,
  Rocket,
  ExternalLink
} from "lucide-react";

export default function VercelGuidePage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-black to-background py-8">
        <div className="container mx-auto px-4">
          <Link href="/deploy" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-4">
            <ChevronLeft className="h-4 w-4" />
            返回部署教學中心
          </Link>

          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-black flex items-center justify-center border">
              <Rocket className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-yellow-100 text-yellow-700">中級</Badge>
                <Badge variant="outline" className="gap-1">
                  <Clock className="h-3 w-3" />
                  20 分鐘
                </Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Vercel 部署教學</h1>
              <p className="text-lg text-muted-foreground">
                專業級前端部署平台，支持 React、Next.js
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
                React / Next.js / Vue 項目
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                已上載到 GitHub
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Node.js 環境
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {[
            {
              title: "登入 Vercel",
              content: "1. 去 vercel.com\n2. 點擊 Sign Up，用 GitHub 登入\n3. 授權 Vercel 訪問你嘅倉庫",
            },
            {
              title: "導入項目",
              content: "1. 點擊 Add New... → Project\n2. 選擇你嘅 GitHub 倉庫\n3. Vercel 會自動檢測框架（React/Next.js）\n4. 點擊 Deploy",
            },
            {
              title: "獲取網址",
              content: "等待部署完成（約 1-2 分鐘）\n你會獲得：\nhttps://你的項目名.vercel.app",
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
