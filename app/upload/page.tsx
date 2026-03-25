"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { categories } from "@/lib/data";
import { Upload, X, Globe, Tag, Link2 } from "lucide-react";

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

export default function UploadToolPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    titleZh: "",
    titleEn: "",
    descZh: "",
    descEn: "",
    externalUrl: "",
    categoryId: "",
    instructions: "",
    tags: [] as string[],
    gradeLevels: [] as string[],
  });
  const [tagInput, setTagInput] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if not logged in
  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) });
  };

  const handleGradeToggle = (grade: string) => {
    setFormData({
      ...formData,
      gradeLevels: formData.gradeLevels.includes(grade)
        ? formData.gradeLevels.filter((g) => g !== grade)
        : [...formData.gradeLevels, grade],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (!formData.titleZh || !formData.descZh || !formData.externalUrl || !formData.categoryId) {
      setError("請填寫所有必填字段");
      setLoading(false);
      return;
    }

    try {
      const submitData = new FormData();
      submitData.append("userId", session.user.id);
      submitData.append("titleZh", formData.titleZh);
      submitData.append("titleEn", formData.titleEn || formData.titleZh);
      submitData.append("descZh", formData.descZh);
      submitData.append("descEn", formData.descEn || formData.descZh);
      submitData.append("externalUrl", formData.externalUrl);
      submitData.append("categoryId", formData.categoryId);
      submitData.append("instructions", formData.instructions);
      submitData.append("tags", JSON.stringify(formData.tags));
      submitData.append("gradeLevels", JSON.stringify(formData.gradeLevels));
      
      if (thumbnail) {
        submitData.append("thumbnail", thumbnail);
      }

      const res = await fetch("/api/tools/upload", {
        method: "POST",
        body: submitData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "上載失敗");
      }

      const data = await res.json();
      router.push(`/tools/${data.tool.slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "上載時發生錯誤");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return <div className="container mx-auto px-4 py-12">載入中...</div>;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <Link href="/tools" className="text-sm text-muted-foreground hover:text-foreground">
            ← 返回工具市場
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">上載工具</CardTitle>
            <CardDescription>
              分享你的教學工具給全球教育工作者
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Thumbnail */}
              <div className="space-y-2">
                <Label>縮圖（選填）</Label>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-24 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                    {thumbnailPreview ? (
                      <img src={thumbnailPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Tool URL */}
              <div className="space-y-2">
                <Label htmlFor="url">
                  工具連結 *
                  <span className="text-xs text-muted-foreground ml-2">工具必須已部署到網上</span>
                </Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://your-tool.vercel.app"
                    value={formData.externalUrl}
                    onChange={(e) => setFormData({ ...formData, externalUrl: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Chinese Title & Description */}
              <div className="space-y-2">
                <Label htmlFor="titleZh">工具名稱（中文） *</Label>
                <Input
                  id="titleZh"
                  placeholder="例如：乘法表練習器"
                  value={formData.titleZh}
                  onChange={(e) => setFormData({ ...formData, titleZh: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descZh">描述（中文） *</Label>
                <Textarea
                  id="descZh"
                  placeholder="簡單描述這個工具的功能和用途..."
                  value={formData.descZh}
                  onChange={(e) => setFormData({ ...formData, descZh: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              {/* English Title & Description */}
              <div className="space-y-2">
                <Label htmlFor="titleEn">工具名稱（英文）</Label>
                <Input
                  id="titleEn"
                  placeholder="例如：Multiplication Practice"
                  value={formData.titleEn}
                  onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descEn">描述（英文）</Label>
                <Textarea
                  id="descEn"
                  placeholder="Describe the tool's functionality..."
                  value={formData.descEn}
                  onChange={(e) => setFormData({ ...formData, descEn: e.target.value })}
                  rows={3}
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">分類 *</Label>
                <select
                  id="category"
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full px-3 py-2 rounded-md border bg-background"
                  required
                >
                  <option value="">選擇分類</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.nameZh}</option>
                  ))}
                </select>
              </div>

              {/* Grade Levels */}
              <div className="space-y-2">
                <Label>適用年級</Label>
                <div className="flex flex-wrap gap-2">
                  {gradeLevels.map((grade) => (
                    <label key={grade.id} className="flex items-center gap-1.5 cursor-pointer">
                      <Checkbox
                        checked={formData.gradeLevels.includes(grade.id)}
                        onCheckedChange={() => handleGradeToggle(grade.id)}
                      />
                      <span className="text-sm">{grade.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label>標籤</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="添加標籤，按 Enter 確認"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddTag())}
                      className="pl-10"
                    />
                  </div>
                  <Button type="button" variant="outline" onClick={handleAddTag}>
                    添加
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveTag(tag)}>
                      {tag} <X className="h-3 w-3 ml-1 inline" />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-2">
                <Label htmlFor="instructions">使用說明（選填）</Label>
                <Textarea
                  id="instructions"
                  placeholder="簡單說明如何使用這個工具..."
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                  rows={2}
                />
              </div>

              {/* Submit */}
              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? "上載中..." : "上載工具"}
                </Button>
                <Link href="/tools">
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
