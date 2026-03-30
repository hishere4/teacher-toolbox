"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ChevronLeft } from "lucide-react";
import { Tool } from "@/types";

export default function ToolDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [tool, setTool] = useState<Tool | null>(null);

  useEffect(() => {
    fetch(`/api/tools/${slug}`)
      .then((res) => res.json())
      .then((data) => setTool(data.tool));
  }, [slug]);

  if (!tool) {
    return <div className="container mx-auto px-4 py-12">載入中...</div>;
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link href="/tools" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-6">
          <ChevronLeft className="h-4 w-4" />
          返去搵工具
        </Link>

        <Badge className="mb-4">{tool.category.nameZh}</Badge>
        <h1 className="text-3xl font-bold mb-4">{tool.titleZh}</h1>
        <p className="text-lg text-muted-foreground mb-8">{tool.descZh}</p>

        {tool.instructions && (
          <div className="bg-muted p-4 rounded-lg mb-6">
            <h3 className="font-medium mb-2">使用方法</h3>
            <p className="text-muted-foreground">{tool.instructions}</p>
          </div>
        )}

        <a href={tool.externalUrl} target="_blank" rel="noopener noreferrer">
          <Button size="lg" className="w-full gap-2">
            <ExternalLink className="h-5 w-5" />
            使用工具
          </Button>
        </a>

        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          由 {tool.author.name} 分享
        </div>
      </div>
    </div>
  );
}
