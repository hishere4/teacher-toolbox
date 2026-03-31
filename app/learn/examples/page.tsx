import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const examples = [
  {
    name: "計時器",
    prompt: `幫我整個課堂計時器：
- 可以設定分鐘數
- 倒數顯示
- 時間到有聲音提示
- 界面簡潔靚仔

用 HTML 寫，要可以直接用。`,
  },
  {
    name: "抽問系統",
    prompt: `幫我整個抽問系統：
- 可以輸入學生名單
- 撳掣隨機抽一個名
- 有動畫效果
- 已抽過嘅唔會再抽

用 HTML 寫，要可以直接用。`,
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
    <Button variant="outline" size="sm" onClick={copy} className="gap-1">
      {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "已複製" : "複製"}
    </Button>
  );
}

export default function LearnExamplesPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link href="/learn" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-6">
          <ChevronLeft className="h-4 w-4" />
          返去學習中心
        </Link>

        <div className="mb-8">
          <div className="text-sm text-purple-600 font-medium mb-2">步驟 3/3</div>
          <h1 className="text-3xl font-bold mb-4">實例練習</h1>
          <p className="text-muted-foreground">揀個你有興趣嘅，複製提示詞去 Gemini 試下</p>
        </div>

        <div className="space-y-6">
          {examples.map((example) => (
            <Card key={example.name}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">{example.name}</h3>
                  <CopyButton text={example.prompt} />
                </div>
                <pre className="bg-muted p-4 rounded-lg text-sm whitespace-pre-wrap">{example.prompt}</pre>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 bg-purple-50 border-purple-200">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-3">下一步</h3>
            <p className="text-sm mb-4">
              試咗上面嘅範例之後，試下改吓提示詞，整個屬於你自己嘅工具！
            </p>
            <Link href="/upload">
              <Button>去上載工具 →</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
