"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronLeft, Loader2 } from "lucide-react";

const gradeLevels = [
  { id: "P1", label: "小一" },
  { id: "P2", label: "小二" },
  { id: "P3", label: "小三" },
  { id: "P4", label: "小四" },
  { id: "P5", label: "小五" },
  { id: "P6", label: "小六" },
  { id: "S1", label: "中一" },
  { id: "S2", label: "中二" },
  { id: "S3", label: "中三" },
  { id: "S4", label: "中四" },
  { id: "S5", label: "中五" },
  { id: "S6", label: "中六" },
];

const subjects = [
  { id: "math", label: "數學" },
  { id: "chinese", label: "中文" },
  { id: "english", label: "英文" },
  { id: "science", label: "科學" },
  { id: "programming", label: "編程" },
  { id: "admin", label: "行政" },
];

export default function NewRequestPage() {
  const { data: session } = useSession();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    titleZh: "",
    titleEn: "",
    descZh: "",
    descEn: "",
    gradeLevels: [] as string[],
    subjects: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGradeToggle = (grade: string) => {
    setFormData({
      ...formData,
      gradeLevels: formData.gradeLevels.includes(grade)
        ? formData.gradeLevels.filter((g) => g !== grade)
        : [...formData.gradeLevels, grade],
    });
  };

  const handleSubjectToggle = (subject: string) => {
    setFormData({
      ...formData,
      subjects: formData.subjects.includes(subject)
        ? formData.subjects.filter((s) => s !== subject)
        : [...formData.subjects, subject],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.titleZh || !formData.descZh) {
      setError("請填寫標題和描述");
      setLoading(false);
      return;
    }

    if (!session?.user?.id) {
      setError("請先登入");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          userId: session.user.id,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "創建失敗");
      }

      router.push("/requests");
    } catch (err) {
      setError(err instanceof Error ? err.message : "創建時發生錯誤");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href="/requests" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-6">
          <ChevronLeft className="h-4 w-4" />
          返回請求板
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">新增工具請求</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="titleZh">請求標題（中文） *</Label>
                <Input
                  id="titleZh"
                  placeholder="例如：需要一個小學加減法練習工具"
                  value={formData.titleZh}
                  onChange={(e) => setFormData({ ...formData, titleZh: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="titleEn">請求標題（英文）</Label>
                <Input
                  id="titleEn"
                  placeholder="例如：Need a primary math practice tool"
                  value={formData.titleEn}
                  onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descZh">詳細描述（中文） *</Label>
                <Textarea
                  id="descZh"
                  placeholder="描述你需要的工具功能、使用場景..."
                  value={formData.descZh}
                  onChange={(e) => setFormData({ ...formData, descZh: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descEn">詳細描述（英文）</Label>
                <Textarea
                  id="descEn"
                  placeholder="Describe the tool functionality..."
                  value={formData.descEn}
                  onChange={(e) => setFormData({ ...formData, descEn: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="space-y-3">
                <Label>適用年級</Label>
                <div className="flex flex-wrap gap-3">
                  {gradeLevels.map((grade) => (
                    <label key={grade.id} className="flex items-center gap-2">
                      <Checkbox
                        checked={formData.gradeLevels.includes(grade.id)}
                        onCheckedChange={() => handleGradeToggle(grade.id)}
                      />
                      <span className="text-sm">{grade.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>相關科目</Label>
                <div className="flex flex-wrap gap-3">
                  {subjects.map((subject) => (
                    <label key={subject.id} className="flex items-center gap-2">
                      <Checkbox
                        checked={formData.subjects.includes(subject.id)}
                        onCheckedChange={() => handleSubjectToggle(subject.id)}
                      />
                      <span className="text-sm">{subject.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      創建中...
                    </>
                  ) : (
                    "提交請求"
                  )}
                </Button>
                <Link href="/requests">
                  <Button type="button" variant="outline">取消</Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
