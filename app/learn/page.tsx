"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Code2, Rocket, MessageSquare, ArrowRight, Zap } from "lucide-react";

const lessons = [
  {
    id: "intro",
    title: "咩係 Vibe Coding？",
    description: "用自然語言同 AI 一齊寫代碼嘅革命性方法",
    icon: Sparkles,
    time: "5 分鐘",
  },
  {
    id: "first-tool",
    title: "寫你嘅第一個工具",
    description: "用 Claude 或 ChatGPT 創建簡單嘅教學工具",
    icon: Rocket,
    time: "15 分鐘",
  },
  {
    id: "prompts",
    title: "提示詞技巧",
    description: "學識點樣同 AI 有效溝通",
    icon: MessageSquare,
    time: "20 分鐘",
  },
  {
    id: "html-css",
    title: "HTML + CSS 基礎",
    description: "建立視覺化工具嘅基礎知識",
    icon: Code2,
    time: "30 分鐘",
  },
];

export default function LearnPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-b from-purple-50 to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            <span>新時代教學工具開發</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            學習 Vibe Coding
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            無需編程經驗，用 AI 幫你寫代碼。
            <br />
            專為教育工作者設計嘅入門課程。
          </p>

          <Link href="/learn/intro">
            <Button size="lg" className="gap-2">
              開始學習
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Lessons Grid */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">學習路徑</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {lessons.map((lesson, index) => {
            const Icon = lesson.icon;
            return (
              <Link key={lesson.id} href={`/learn/${lesson.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-purple-600" />
                      </div>
                      <Badge variant="outline">{lesson.time}</Badge>
                    </div>
                    <CardTitle className="mt-4 group-hover:text-primary transition-colors">
                      {index + 1}. {lesson.title}
                    </CardTitle>
                    <CardDescription>{lesson.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      開始課程 →
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-2xl font-bold mb-4">準備好創建你嘅工具？</h2>
          <p className="text-muted-foreground mb-6">
            學完基礎後，去部署教學中心學識點樣將你嘅工具發布到網上
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/deploy">
              <Button variant="outline">部署教學</Button>
            </Link>
            <Link href="/upload">
              <Button>上載工具</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
