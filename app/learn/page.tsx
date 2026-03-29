"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Code2, 
  Rocket, 
  MessageSquare, 
  ArrowRight, 
  Zap,
  BookOpen,
  Lightbulb,
  Terminal
} from "lucide-react";

const lessons = [
  {
    id: "intro",
    title: "咩係 Vibe Coding？",
    description: "用自然語言同 AI 一齊寫代碼嘅革命性方法",
    icon: Sparkles,
    time: "5 分鐘",
  },
  {
    id: "tools",
    title: "選擇你嘅 AI 工具",
    description: "Claude、ChatGPT、Cursor、GitHub Copilot 比較",
    icon: Terminal,
    time: "10 分鐘",
  },
  {
    id: "first-tool",
    title: "寫你嘅第一個工具",
    description: "從零開始創建一個生字卡生成器",
    icon: Rocket,
    time: "20 分鐘",
  },
  {
    id: "prompts",
    title: "提示詞工程",
    description: "學識點樣同 AI 有效溝通，獲得更好結果",
    icon: MessageSquare,
    time: "25 分鐘",
  },
  {
    id: "html-css",
    title: "網頁基礎速成",
    description: "HTML、CSS、JavaScript 核心概念",
    icon: Code2,
    time: "30 分鐘",
  },
  {
    id: "examples",
    title: "教學工具實例",
    description: "6 個常見教學場景嘅完整代碼示例",
    icon: BookOpen,
    time: "40 分鐘",
  },
];

const resources = [
  {
    title: "Cursor 編輯器",
    description: "專為 AI 編程設計嘅代碼編輯器，免費且易用",
    url: "https://cursor.com",
    type: "工具",
  },
  {
    title: "Claude AI",
    description: "Anthropic 出品，特別擅長寫代碼同分析",
    url: "https://claude.ai",
    type: "AI",
  },
  {
    title: "MDN Web Docs",
    description: "最權威嘅網頁技術文檔，由 Mozilla 維護",
    url: "https://developer.mozilla.org",
    type: "文檔",
  },
  {
    title: "freeCodeCamp",
    description: "免費嘅編程學習平台，有中文版本",
    url: "https://chinese.freecodecamp.org",
    type: "課程",
  },
];

const tips = [
  {
    icon: Lightbulb,
    title: "從小處開始",
    description: "先試下修改現成工具，再逐步創建自己嘅",
  },
  {
    icon: MessageSquare,
    title: "多問問題",
    description: "唔明就問 AI，佢會一步步解釋畀你聽",
  },
  {
    icon: Zap,
    title: "保持迭代",
    description: "第一個版本唔使完美，慢慢改進",
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
            <span>唔使編程背景，老師都可以學識</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            學習 Vibe Coding
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
            用 AI 幫你寫代碼，將教學創意變成實際工具
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            無需編程經驗，只需要清楚描述你想要嘅功能，AI 就會幫你生成代碼。
            專為教育工作者設計嘅入門路徑。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/learn/intro">
              <Button size="lg" className="gap-2">
                開始學習
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/learn/examples">
              <Button size="lg" variant="outline">
                睇示例
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-12 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {tips.map((tip) => {
            const Icon = tip.icon;
            return (
              <Card key={tip.title} className="text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">{tip.title}</h3>
                  <p className="text-sm text-muted-foreground">{tip.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Lessons Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">學習路徑</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            按順序完成以下課程，由概念到實踐，逐步掌握 Vibe Coding
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{lesson.time}</Badge>
                        </div>
                      </div>
                      <CardTitle className="mt-4 group-hover:text-primary transition-colors">
                        {index + 1}. {lesson.title}
                      </CardTitle>
                      <CardDescription>{lesson.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="ghost" className="w-full">
                        開始課程 →
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">推薦資源</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {resources.map((resource) => (
            <a 
              key={resource.title}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <Badge>{resource.type}</Badge>
                  </div>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
              </Card>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">準備好開始創建？</h2>
          <p className="text-white/90 mb-8 text-lg">
            完成學習後，去部署教學中心學識點樣將你嘅工具發布到網上
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/learn/intro">
              <Button size="lg" variant="secondary">
                開始第一課
              </Button>
            </Link>
            <Link href="/deploy">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                部署教學
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
