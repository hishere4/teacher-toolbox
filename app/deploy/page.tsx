"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Rocket, 
  Code2, 
  Cloud, 
  Terminal, 
  Database,
  Clock,
  BarChart3,
  CheckCircle2
} from "lucide-react";

const platforms = [
  {
    id: "streamlit",
    title: "Streamlit Cloud",
    titleZh: "Streamlit 雲端",
    description: "最適合 Python 數據應用和 AI 工具。無需前端知識，純 Python 即可部署。",
    icon: Cloud,
    difficulty: "入門",
    difficultyColor: "bg-green-100 text-green-700",
    time: "15 分鐘",
    bestFor: ["Python 開發者", "數據可視化", "AI/ML 演示"],
    popular: true,
  },
  {
    id: "github-pages",
    title: "GitHub Pages",
    titleZh: "GitHub 頁面",
    description: "免費托管靜態網站，適合純 HTML/CSS/JS 工具。與 GitHub 倉庫完美整合。",
    icon: Code2,
    difficulty: "入門",
    difficultyColor: "bg-green-100 text-green-700",
    time: "10 分鐘",
    bestFor: ["靜態網頁", "純前端工具", "快速原型"],
    popular: false,
  },
  {
    id: "vercel",
    title: "Vercel",
    titleZh: "Vercel",
    description: "專業級前端部署平台，支持 React、Next.js。自動化 CI/CD，全球 CDN。",
    icon: Rocket,
    difficulty: "中級",
    difficultyColor: "bg-yellow-100 text-yellow-700",
    time: "20 分鐘",
    bestFor: ["React/Next.js", "全棧應用", "生產環境"],
    popular: true,
  },
  {
    id: "replit",
    title: "Replit",
    titleZh: "Replit",
    description: "在線編碼環境，支持即時協作。適合教學和快速測試。",
    icon: Terminal,
    difficulty: "入門",
    difficultyColor: "bg-green-100 text-green-700",
    time: "5 分鐘",
    bestFor: ["快速測試", "協作開發", "教學演示"],
    popular: false,
  },
  {
    id: "gradio",
    title: "Gradio + Hugging Face",
    titleZh: "Gradio + Hugging Face",
    description: "專為機器學習模型設計，快速創建可交互的 AI 演示界面。",
    icon: Database,
    difficulty: "中級",
    difficultyColor: "bg-yellow-100 text-yellow-700",
    time: "25 分鐘",
    bestFor: ["AI/ML 模型", "深度學習", "研究演示"],
    popular: false,
  },
  {
    id: "netlify",
    title: "Netlify",
    titleZh: "Netlify",
    description: "另一個優秀的前端部署平台，支持表單處理和無服務器功能。",
    icon: Code2,
    difficulty: "中級",
    difficultyColor: "bg-yellow-100 text-yellow-700",
    time: "20 分鐘",
    bestFor: ["靜態網站", "JAMstack", "表單處理"],
    popular: false,
  },
];

const steps = [
  {
    title: "選擇平台",
    description: "根據你嘅技術棧和需求選擇最適合嘅部署平台",
    icon: CheckCircle2,
  },
  {
    title: "跟隨教學",
    description: "按照我們嘅 Step-by-step 指南完成部署",
    icon: Terminal,
  },
  {
    title: "獲取連結",
    description: "部署成功後，複製公開 URL 到教師工具箱上載",
    icon: Rocket,
  },
];

export default function DeployHubPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Rocket className="h-4 w-4" />
            <span>部署教學中心</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            學習部署你的教學工具
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            無論你使用咩技術，我們都有詳細嘅部署教學，
            幫助你將工具發布到網上，與全球教師分享。
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-bold">{platforms.length}</div>
              <div className="text-sm text-muted-foreground">部署平台</div>
            </div>
            <div>
              <div className="text-3xl font-bold">15-25</div>
              <div className="text-sm text-muted-foreground">分鐘完成</div>
            </div>
            <div>
              <div className="text-3xl font-bold">100%</div>
              <div className="text-sm text-muted-foreground">免費部署</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">部署流程</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.title} className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-sm font-medium text-primary mb-2">步驟 {index + 1}</div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Platforms Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">選擇部署平台</h2>
            <div className="flex gap-2">
              <Badge variant="secondary">入門</Badge>
              <Badge variant="outline">中級</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <Link key={platform.id} href={`/deploy/${platform.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow group">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        {platform.popular && (
                          <Badge className="bg-primary text-primary-foreground">推薦</Badge>
                        )}
                      </div>
                      <CardTitle className="mt-4 group-hover:text-primary transition-colors">
                        {platform.titleZh}
                      </CardTitle>
                      <CardDescription>{platform.title}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{platform.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${platform.difficultyColor}`}>
                          {platform.difficulty}
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {platform.time}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {platform.bestFor.map((item) => (
                          <span key={item} className="text-xs px-2 py-1 bg-muted rounded">
                            {item}
                          </span>
                        ))}
                      </div>

                      <Button variant="outline" className="w-full">
                        開始學習 →
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="bg-primary/5 rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto">
          <BarChart3 className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            唔確定邊個平台適合你？
          </h2>
          <p className="text-muted-foreground mb-6">
            如果你係第一次部署，我們建議從 Streamlit Cloud 或 GitHub Pages 開始。
            兩個都係免費且易於使用。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/deploy/streamlit">
              <Button size="lg">推薦：Streamlit Cloud</Button>
            </Link>
            <Link href="/deploy/github-pages">
              <Button size="lg" variant="outline">GitHub Pages</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
