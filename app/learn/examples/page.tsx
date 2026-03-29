"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const examples = [
  {
    title: "生字卡生成器",
    description: "輸入中文字，生成可打印嘅生字卡",
    prompt: `請幫我寫一個 HTML 網頁，功能係生字卡生成器：

1. 用戶可以輸入一個中文字
2. 顯示該字嘅筆順、部首、同義詞
3. 生成 A4 紙大小嘅生字卡格式
4. 可以打印出黎

請用 HTML + CSS + JavaScript 寫，要簡潔美觀，適合小學生使用。`,
    tips: ["可以擴展到多個生字", "加埋拼音顯示", "加入例句功能"],
  },
  {
    title: "計時器",
    description: "課堂活動計時，有視覺化進度條",
    prompt: `請幫我寫一個課堂計時器：

1. 可以設置分鐘同秒數
2. 有大數字顯示剩餘時間
3. 有進度條顯示
4. 時間到會有聲音提示
5. 可以暫停同修攺時間

請用 HTML + CSS + JavaScript，要簡單易用。`,
    tips: ["加埋背景色變化提醒", "支持多個計時器", "記錄常用時間"],
  },
  {
    title: "隨機分組工具",
    description: "將學生名單隨機分成小組",
    prompt: `請幫我寫一個隨機分組工具：

1. 可以貼上學生名單（每行一個名）
2. 設置每組幾多人
3. 按掣隨機分組
4. 顯示分組結果
5. 可以重新分組

請用 HTML + CSS + JavaScript，界面要清晰易用。`,
    tips: ["加埋儲存名單功能", "支持匯出結果", "可以加組長標記"],
  },
  {
    title: "數學練習產生器",
    description: "生成加減乘除練習題",
    prompt: `請幫我寫一個數學練習產生器：

1. 可以選擇題型（加減乘除）
2. 設置數字範圍
3. 設置題數
4. 產生練習題同答案
5. 可以打印

請用 HTML + CSS + JavaScript，適合小學生使用。`,
    tips: ["加埋計時功能", "記錄分數", "難度分級"],
  },
  {
    title: "抽問系統",
    description: "隨機抽學生回答問題",
    prompt: `請幫我寫一個課堂抽問系統：

1. 貼入學生名單
2. 隨機抽取一個名
3. 有動畫效果
4. 可以標記已回答過嘅學生
5. 重置功能

請用 HTML + CSS + JavaScript，要有趣味性。`,
    tips: ["加埋計分板", "記錄回答歷史", "支持多班級"],
  },
  {
    title: "詞彙配對遊戲",
    description: "中英詞彙配對記憶遊戲",
    prompt: `請幫我寫一個詞彙配對遊戲：

1. 左邊顯示中文詞，右邊顯示英文詞
2. 玩家要配對正確嘅組合
3. 計時功能
4. 計分功能
5. 可以自訂詞彙

請用 HTML + CSS + JavaScript，要互動性強。`,
    tips: ["加埋音效", "不同難度級別", "記錄最快時間"],
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button variant="outline" size="sm" onClick={copy} className="gap-2">
      {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "已複製" : "複製提示詞"}
    </Button>
  );
}

export default function LearnExamplesPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/learn" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-6">
          <ChevronLeft className="h-4 w-4" />
          返回學習中心
        </Link>

        <div className="mb-8">
          <Badge className="mb-4">課程 6/6</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">教學工具實例</h1>
          <p className="text-lg text-muted-foreground">
            6 個常見教學場景，附帶可以直接用嘅 AI 提示詞
          </p>
        </div>

        <div className="space-y-6">
          {examples.map((example, index) => (
            <Card key={example.title} id={`example-${index + 1}`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <CardTitle>{example.title}</CardTitle>
                </div>
                <p className="text-muted-foreground mt-2">{example.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">AI 提示詞</h4>
                    <CopyButton text={example.prompt} />
                  </div>
                  <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto whitespace-pre-wrap">
                    {example.prompt}
                  </pre>
                </div>

                <div>
                  <h4 className="font-medium mb-2">改進方向</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {example.tips.map((tip) => (
                      <li key={tip}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 bg-green-50">
          <CardHeader>
            <CardTitle>🎯 下一步</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              揀一個你有興趣嘅工具，複製提示詞到 Claude 或 ChatGPT，
              開始你嘅第一個 Vibe Coding 項目！
            </p>
            <div className="flex gap-4">
              <a href="https://claude.ai" target="_blank" rel="noopener noreferrer">
                <Button>打開 Claude →</Button>
              </a>
              <Link href="/deploy">
                <Button variant="outline">學習部署 →</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between mt-8">
          <Link href="/learn">
            <Button variant="outline">
              <ChevronLeft className="h-4 w-4 mr-2" />
              返回學習中心
            </Button>
          </Link>
          
          <Link href="/upload">
            <Button>
              上載你嘅工具
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
