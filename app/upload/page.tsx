"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, ExternalLink, Copy, CheckCircle2 } from "lucide-react";

const examplePrompt = `幫我整個教學工具，功能係：
- （描述你想要嘅功能）

請用 HTML 寫，要簡單易用，適合（小學/中學）生。`;

export default function UploadPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [showTip, setShowTip] = useState(true);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    title: "",
    url: "",
    desc: "",
  });

  const copyPrompt = () => {
    navigator.clipboard.writeText(examplePrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session?.user?.id) {
      alert("請先登入");
      return;
    }

    // Submit to API
    const res = await fetch("/api/tools", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titleZh: form.title,
        titleEn: form.title,
        descZh: form.desc,
        descEn: form.desc,
        externalUrl: form.url,
        categoryId: "1",
        userId: session.user.id,
        tags: [],
        gradeLevels: [],
      }),
    });

    if (res.ok) {
      router.push("/tools");
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-xl">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-6">
          <ChevronLeft className="h-4 w-4" />
          返去
        </Link>

        <h1 className="text-3xl font-bold mb-2">上載工具</h1>
        <p className="text-muted-foreground mb-8">分享你嘅教學工具畀其他老師</p>

        {/* 三步提示 */}
        {showTip && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
            <h3 className="font-semibold text-blue-900 mb-4">唔識整？三步搞定：</h3>
            
            <ol className="space-y-3 text-sm text-blue-800">
              <li className="flex items-start gap-2">
                <span className="font-bold">1.</span>
                <div>
                  去 <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="underline font-medium">Claude.ai</a>
                  <span className="text-xs block text-blue-600 mt-0.5">（免費，唔使科學上網）</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">2.</span>
                <div className="flex-1">
                  貼呢段嘢，改下你想要嘅功能：
                  <div className="mt-2 bg-white p-3 rounded border text-xs font-mono relative">
                    {examplePrompt}
                    <button
                      onClick={copyPrompt}
                      className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded"
                    >
                      {copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold">3.</span>
                <div>
                  AI 會俾你個網址，貼喺下面「工具連結」就搞掂
                </div>
              </li>
            </ol>

            <button
              onClick={() => setShowTip(false)}
              className="text-xs text-blue-600 hover:underline mt-4"
            >
              我已經識咗，收埋呢個提示
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>工具名稱 *</Label>
            <Input
              placeholder="例如：乘法表練習器"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>工具連結 *</Label>
            <Input
              type="url"
              placeholder="https://..."
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              required
            />
            <p className="text-xs text-muted-foreground">
              將 AI 俾你嘅網址貼呢度
            </p>
          </div>

          <div className="space-y-2">
            <Label>簡介 *</Label>
            <Textarea
              placeholder="呢個工具做咩㗎？適合幾多年級？"
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              rows={3}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            上載工具
          </Button>
        </form>
      </div>
    </div>
  );
}
