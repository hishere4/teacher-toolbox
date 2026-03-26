"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Wrench, 
  Eye, 
  Heart, 
  Edit, 
  Trash2, 
  Plus,
  ExternalLink 
} from "lucide-react";
import { Tool } from "@/types";

export default function MyToolsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    
    if (status === "authenticated" && session?.user?.id) {
      fetchMyTools();
    }
  }, [status, session]);

  const fetchMyTools = async () => {
    try {
      // Use the dedicated my-tools API
      const res = await fetch(`/api/my-tools?userId=${session?.user?.id}`);
      const data = await res.json();
      setTools(data.tools || []);
    } catch (error) {
      console.error("Failed to fetch tools:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (toolId: string) => {
    if (!confirm("確定要刪除這個工具嗎？")) return;
    
    // In production, call DELETE API
    // For now, just remove from UI
    setTools(tools.filter((t) => t.id !== toolId));
  };

  if (status === "loading" || loading) {
    return <div className="container mx-auto px-4 py-12">載入中...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">我的工具</h1>
            <p className="text-muted-foreground">管理你上載的教學工具</p>
          </div>
          <Link href="/upload">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              上載新工具
            </Button>
          </Link>
        </div>

        {tools.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Wrench className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">還沒有上載工具</h3>
              <p className="text-muted-foreground mb-6">分享你的第一個教學工具吧！</p>
              <Link href="/upload">
                <Button>立即上載</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Card key={tool.id} className="group">
                <CardContent className="p-5">
                  {/* Thumbnail */}
                  <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    {tool.thumbnail ? (
                      <img 
                        src={tool.thumbnail} 
                        alt={tool.titleZh} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <Wrench className="h-10 w-10 text-muted-foreground" />
                    )}
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={tool.status === "PUBLISHED" ? "default" : "secondary"}>
                      {tool.status === "PUBLISHED" ? "已發布" : tool.status}
                    </Badge>
                    <Badge variant="outline">{tool.category.nameZh}</Badge>
                  </div>

                  {/* Title */}
                  <Link href={`/tools/${tool.slug}`}>
                    <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
                      {tool.titleZh}
                    </h3>
                  </Link>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {tool.viewCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      {tool._count?.favorites || 0}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link href={`/tools/${tool.slug}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full gap-1">
                        <ExternalLink className="h-4 w-4" />
                        查看
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(tool.id)}
                      className="text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
