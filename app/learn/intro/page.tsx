import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Sparkles, MessageSquare, Code2 } from "lucide-react";

export default function LearnIntroPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link href="/learn" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-6">
          <ChevronLeft className="h-4 w-4" />
          返去學習中心
        </Link>

        <div className="mb-8">
          <div className="text-sm text-purple-600 font-medium mb-2">步驟 1/3</div>
          <h1 className="text-3xl font-bold mb-4">咩係 Vibe Coding？</h1>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">你講，AI 寫</h3>
                <p className="text-muted-foreground">用平時講嘢嘅方式描述你想要嘅功能，AI 就會幫你生成代碼</p>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Code2 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">唔使學語法</h3>
                <p className="text-muted-foreground">唔使記 HTML、CSS、JavaScript 語法，AI 幫你處理</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">幾分鐘搞掂</h3>
                <p className="text-muted-foreground">傳統要學幾個月，而家幾分鐘就有成品</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3">例子</h3>
            <p className="text-sm mb-3">你同 AI 講：</p>
            <div className="bg-white p-3 rounded border text-sm mb-3">
              「幫我整個計時器，要有倒數功能，時間到會響，畫面要靚啲」
            </div>
            <p className="text-sm">AI 就會俾你一個完整嘅計時器，可以直接用</p>
          </CardContent>
        </Card>

        <div className="flex justify-end mt-8">
          <Link href="/learn/tools">
            <Button>
              下一步：點樣用 Gemini
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
