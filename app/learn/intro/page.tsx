"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Sparkles, MessageSquare, Code2 } from "lucide-react";

export default function LearnIntroPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/learn" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-6">
          <ChevronLeft className="h-4 w-4" />
          返回學習中心
        </Link>

        <div className="mb-8">
          <Badge className="mb-4">課程 1/4</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">咩係 Vibe Coding？</h1>
          <p className="text-lg text-muted-foreground">
            一種全新嘅編程方式，讓每個人都可以創建數碼工具
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">傳統編程 vs Vibe Coding</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">傳統方式</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• 需要學習編程語言語法</li>
                    <li>• 記住大量命令同修飾</li>
                    <li>• 花費數月甚至數年先熟識</li>
                    <li>• 寫錯咗要自己逐行搵</li>
                  </ul>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h3 className="font-medium mb-2 text-purple-900">Vibe Coding</h3>
                  <ul className="space-y-2 text-sm text-purple-700">
                    <li>• 用平時講嘢嘅方式描述需求</li>
                    <li>• AI 幫你寫代碼</li>
                    <li>• 幾分鐘就可以有成果</li>
                    <li>• 有問題直接問 AI，即時解答</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">點樣運作？</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">1. 描述你想要嘅功能</h3>
                    <p className="text-sm text-muted-foreground">
                      用自然語言告訴 AI，例如：「我想要一個小學生用嘅乘法表練習器，要有計時功能同分數統計」
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">2. AI 生成代碼</h3>
                    <p className="text-sm text-muted-foreground">
                      AI 會根據你嘅描述，生成完整嘅代碼同解釋
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Code2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">3. 測試同修攺</h3>
                    <p className="text-sm text-muted-foreground">
                      運行代碼，睇下有咩要調整，再同 AI 溝通改進
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">老師點解要學？</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">🎯 量身訂做工具</h3>
                  <p className="text-sm text-muted-foreground">為你嘅課程、學生度身訂造，唔使遷就現成軟件</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">⚡ 快速實現想法</h3>
                  <p className="text-sm text-muted-foreground">有想法？幾分鐘就可以變成可用嘅工具</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">💡 激發創意</h3>
                  <p className="text-sm text-muted-foreground">AI 可以提議你未諗過嘅功能同修攺方向</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium mb-2">🚀 與時並進</h3>
                  <p className="text-sm text-muted-foreground">掌握 AI 時代嘅新技能，提升教學效能</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between mt-8">
          <Link href="/learn">
            <Button variant="outline">
              <ChevronLeft className="h-4 w-4 mr-2" />
              上一課
            </Button>
          </Link>
          
          <Link href="/learn/first-tool">
            <Button>
              下一課：寫你嘅第一個工具
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
