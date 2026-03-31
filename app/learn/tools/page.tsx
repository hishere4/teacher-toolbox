import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const promptTemplate = `幫我整個教學工具，功能係：
- （寫低你想要嘅功能，例如：計時器，可以設定分鐘，時間到會響）

要求：
- 用 HTML 寫
- 界面簡潔美觀
- 適合（小學/中學）生使用`;

export default function LearnToolsPage() {
  const [copied, setCopied] = useState(false);

  const copyPrompt = () => {
    navigator.clipboard.writeText(promptTemplate);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link href="/learn" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-6">
          <ChevronLeft className="h-4 w-4" />
          返去學習中心
        </Link>

        <div className="mb-8">
          <div className="text-sm text-purple-600 font-medium mb-2">步驟 2/3</div>
          <h1 className="text-3xl font-bold mb-4">點樣用 Gemini</h1>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                <h3 className="font-semibold">開 Gemini</h3>
              </div>
              <p className="text-muted-foreground">
                去 <a href="https://gemini.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">gemini.google.com</a>，用 Google 帳戶登入
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                <h3 className="font-semibold">貼提示詞</h3>
              </div>
              <p className="text-muted-foreground mb-3">複製下面範本，改下你想要嘅功能：</p>
              
              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg text-sm whitespace-pre-wrap">{promptTemplate}</pre>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyPrompt}
                  className="absolute top-2 right-2 gap-1"
                >
                  {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "已複製" : "複製"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                <h3 className="font-semibold">攞網址</h3>
              </div>
              <p className="text-muted-foreground"></p>
                Gemini 會俾你一個網址（通常係 <code className="bg-muted px-1 rounded">https://xxx</code>），
                撳入去試下，滿意就複製個網址，去「上載工具」貼落嚟。
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between mt-8">
          <Link href="/learn/intro">
            <Button variant="outline">
              <ChevronLeft className="h-4 w-4 mr-2" />
              上一步
            </Button>
          </Link>
          
          <Link href="/learn/examples">
            <Button>
              下一步：實例練習
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
