"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, CheckCircle2, XCircle, Star, Zap } from "lucide-react";

const tools = [
  {
    name: "Claude",
    maker: "Anthropic",
    description: "最適合初學者嘅 AI 助手，解釋詳細且耐心",
    pros: [
      "免費版已經好夠用",
      "解釋清晰，適合初學者",
      "處理複雜邏輯能力強",
      "支持上載文件分析",
    ],
    cons: [
      "需要科學上網",
      "無法直接編輯代碼",
    ],
    bestFor: "初學者、需要詳細解釋嘅用戶",
    url: "https://claude.ai",
    free: true,
  },
  {
    name: "ChatGPT",
    maker: "OpenAI",
    description: "最知名嘅 AI 助手，速度快且功能全面",
    pros: [
      "反應速度快",
      "中文支持好",
      "有專門嘅 Code Interpreter",
      "可以上載圖片分析",
    ],
    cons: [
      "免費版功能有限",
      "有時會「幻覺」亂咁答",
    ],
    bestFor: "想快速獲得結果嘅用戶",
    url: "https://chat.openai.com",
    free: true,
  },
  {
    name: "Cursor",
    maker: "Anysphere",
    description: "專為編程設計嘅 AI 編輯器，可以直接寫代碼",
    pros: [
      "專業代碼編輯器",
      "可以直接運行代碼",
      "自動補全功能強大",
      "支持多種編程語言",
    ],
    cons: [
      "需要安裝軟件",
      "介面對初學者可能複雜",
    ],
    bestFor: "認真想學編程嘅用戶",
    url: "https://cursor.com",
    free: true,
  },
  {
    name: "GitHub Copilot",
    maker: "GitHub + OpenAI",
    description: "集成喺 VS Code 中嘅 AI 編程助手",
    pros: [
      "集成喺熱門編輯器",
      "實時代碼建議",
      "支持多種語言",
    ],
    cons: [
      "需要付費（$10/月）",
      "需要一定編程基礎",
      "設置較複雜",
    ],
    bestFor: "已有編程經驗嘅用戶",
    url: "https://github.com/features/copilot",
    free: false,
  },
];

const recommendations = [
  {
    scenario: "完全零基礎",
    recommendation: "Claude",
    reason: "解釋最詳細，會一步步教你，而且有問題可以追問",
  },
  {
    scenario: "想快速試下",
    recommendation: "ChatGPT",
    reason: "速度快，唔使科學上網（如果係 Plus 用戶）",
  },
  {
    scenario: "認真想學編程",
    recommendation: "Cursor",
    reason: "專業工具，可以一邊學一邊實踐",
  },
];

export default function LearnToolsPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <Link href="/learn" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-6">
          <ChevronLeft className="h-4 w-4" />
          返回學習中心
        </Link>

        <div className="mb-8">
          <Badge className="mb-4">課程 2/6</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">選擇你嘅 AI 工具</h1>
          <p className="text-lg text-muted-foreground">
            唔同工具有唔同優勢，選擇最適合你嘅開始
          </p>
        </div>

        {/* Quick Recommendation */}
        <Card className="mb-8 bg-purple-50 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-purple-600" />
              老師推薦
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              <strong>初學者建議：</strong> 由 <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">Claude</a> 開始。
              佢嘅免費版已經好夠用，而且解釋最詳細，最適合冇編程背景嘅老師。
            </p>
            <div className="flex gap-4">
              <a href="https://claude.ai" target="_blank" rel="noopener noreferrer">
                <Button>免費註冊 Claude →</Button>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Tools Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {tools.map((tool) => (
            <Card key={tool.name} className={tool.name === "Claude" ? "border-purple-300" : ""}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{tool.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{tool.maker}</p>
                  </div>
                  <div className="flex gap-2">
                    {tool.free && <Badge variant="secondary">有免費版</Badge>}
                    {tool.name === "Claude" && <Badge className="bg-purple-100 text-purple-700">推薦</Badge>}
                  </div>
                </div>
                <p className="text-muted-foreground mt-2">{tool.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    優點
                  </h4>
                  <ul className="space-y-1 text-sm">
                    {tool.pros.map((pro) => (
                      <li key={pro} className="text-muted-foreground">• {pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    限制
                  </h4>
                  <ul className="space-y-1 text-sm">
                    {tool.cons.map((con) => (
                      <li key={con} className="text-muted-foreground">• {con}</li>
                    ))}
                  </ul>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm">
                    <strong>最適合：</strong> {tool.bestFor}
                  </p>
                </div>
                <a 
                  href={tool.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button variant="outline" className="w-full">
                    訪問 {tool.name} →
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Scenario Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>按場景選擇</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations.map((rec) => (
                <div key={rec.scenario} className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Star className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">{rec.scenario}</h4>
                    <p className="text-primary font-medium">推薦：{rec.recommendation}</p>
                    <p className="text-sm text-muted-foreground">{rec.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card>
          <CardHeader>
            <CardTitle>💡 小貼士</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>• 所有工具都有免費版，可以先試下再決定</li>
              <li>• 唔使局限喺一個工具，可以同時用幾個</li>
              <li>• 重要嘅係開始做，而唔係揀啱工具</li>
              <li>• 遇到問題可以喺教師工具箱社群問</li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex justify-between mt-8">
          <Link href="/learn/intro">
            <Button variant="outline">
              <ChevronLeft className="h-4 w-4 mr-2" />
              上一課
            </Button>
          </Link>
          
          <Link href="/learn/first-tool">
            <Button>
              下一課：寫第一個工具
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
