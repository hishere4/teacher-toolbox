"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, Eye, Heart, ExternalLink } from "lucide-react";
import { Tool } from "@/types";

export default function FavoritesPage() {
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
      fetchFavorites();
    }
  }, [status, session]);

  const fetchFavorites = async () => {
    try {
      const res = await fetch(`/api/favorites?userId=${session?.user?.id}`);
      const data = await res.json();
      setTools(data.tools || []);
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    } finally {
      setLoading(false);
    }
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold">我的收藏</h1>
          <p className="text-muted-foreground">你收藏嘅教學工具</p>
        </div>

        {tools.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">還沒有收藏工具</h3>
              <p className="text-muted-foreground mb-6">去工具市場發現有趣嘅工具吧！</p>
              <Link href="/tools">
                <Button>瀏覽工具</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Card key={tool.id} className="group">
                <CardContent className="p-5">
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

                  <Badge variant="outline">{tool.category.nameZh}</Badge>

                  <Link href={`/tools/${tool.slug}`}>
                    <h3 className="font-semibold text-lg mt-2 mb-2 hover:text-primary transition-colors">
                      {tool.titleZh}
                    </h3>
                  </Link>

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

                  <Link href={`/tools/${tool.slug}`}>
                    <Button variant="outline" size="sm" className="w-full gap-1">
                      <ExternalLink className="h-4 w-4" />
                      查看詳情
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
