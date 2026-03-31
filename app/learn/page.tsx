import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, MessageSquare, Code2, ArrowRight, Zap } from "lucide-react";

const steps = [
  {
    id: "intro",
    title: "咩係 Vibe Coding？",
    description: "用 AI 幫你寫代碼，唔使學複雜語法",
    icon: Sparkles,
  },
  {
    id: "tools",
    title: "點樣用 Gemini",
    description: "三步學識用 Google Gemini 整工具",
    icon: MessageSquare,
  },
  {
    id: "examples",
    title: "實例練習",
    description: "跟住範例，整你嘅第一個工具",
    icon: Code2,
  },
];

export default function LearnPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-purple-50 to-background py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            <span>3 步學識 Vibe Coding</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">學習 Vibe Coding</h1>
          
          <p className="text-xl text-muted-foreground max-w-xl mx-auto mb-8">
            唔使學編程，用 AI 幫你整教學工具
          </p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Link key={step.id} href={`/learn/${step.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow group">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="text-sm text-purple-600 font-medium mb-2">步驟 {index + 1}</div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {step.title}
                    </CardTitle>
                    <CardDescription>{step.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="w-full">
                      開始 →
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
