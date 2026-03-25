"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ExternalLink, 
  Heart, 
  Share2, 
  Eye, 
  User, 
  Calendar,
  Wrench,
  ChevronLeft,
  Star
} from "lucide-react";
import { Tool } from "@/types";
import { ReportDialog } from "@/components/tools/ReportDialog";

export default function ToolDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (slug) {
      fetchTool();
    }
  }, [slug]);

  const fetchTool = async () => {
    try {
      const res = await fetch(`/api/tools/${slug}`);
      if (!res.ok) {
        throw new Error("Tool not found");
      }
      const data = await res.json();
      setTool(data.tool);
    } catch (err) {
      setError("找不到此工具");
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: tool?.titleZh,
        text: tool?.descZh,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("連結已複製到剪貼板");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center">載入中...</div>
      </div>
    );
  }

  if (error || !tool) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{error || "找不到工具"}</h1>
          <Link href="/tools">
            <Button variant="outline">
              <ChevronLeft className="h-4 w-4 mr-2" />
              返回工具列表
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <Link href="/tools" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
          <ChevronLeft className="h-4 w-4" />
          返回工具列表
        </Link>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge>{tool.category.nameZh}</Badge>
                {tool.gradeLevels.map((grade) => (
                  <Badge key={grade} variant="outline">{grade}</Badge>
                ))}
              </div>
              <h1 className="text-3xl font-bold mb-4">{tool.titleZh}</h1>
              
              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {tool.author.name}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(tool.createdAt).toLocaleDateString("zh-HK")}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  {tool.viewCount} 瀏覽
                </span>
              </div>
            </div>

            {/* Thumbnail */}
            <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
              {tool.thumbnail ? (
                <img src={tool.thumbnail} alt={tool.titleZh} className="w-full h-full object-cover rounded-xl" />
              ) : (
                <Wrench className="h-20 w-20 text-muted-foreground" />
              )}
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>工具介紹</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{tool.descZh}</p>
                
                {tool.instructions && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-medium mb-2">使用說明</h4>
                      <p className="text-muted-foreground">{tool.instructions}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Tags */}
            <div>
              <h3 className="font-medium mb-3">標籤</h3>
              <div className="flex flex-wrap gap-2">
                {tool.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Action Card */}
            <Card>
              <CardContent className="p-6 space-y-4">
                <a href={tool.externalUrl} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="w-full gap-2">
                    <ExternalLink className="h-5 w-5" />
                    使用工具
                  </Button>
                </a>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 gap-2">
                    <Heart className="h-4 w-4" />
                    收藏
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2" onClick={handleShare}>
                    <Share2 className="h-4 w-4" />
                    分享
                  </Button>
                </div>

                <ReportDialog toolId={tool.id} toolTitle={tool.titleZh} />
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">統計</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">瀏覽次數</span>
                  <span>{tool.viewCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">收藏</span>
                  <span>{tool._count?.favorites || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">評論</span>
                  <span>{tool._count?.reviews || 0}</span>
                </div>
              </CardContent>
            </Card>

            {/* Author Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">作者</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{tool.author.name}</p>
                    <p className="text-sm text-muted-foreground">查看更多工具 →</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
