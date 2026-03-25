"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Wrench, Eye, Heart, Filter } from "lucide-react";
import { Tool } from "@/types";
import { categories } from "@/lib/data";

export default function ToolsPageContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "");
  const [sortBy, setSortBy] = useState("popular");

  useEffect(() => {
    fetchTools();
  }, [selectedCategory, sortBy]);

  const fetchTools = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory) params.append("category", selectedCategory);
      if (searchQuery) params.append("search", searchQuery);
      params.append("sort", sortBy);
      
      const res = await fetch(`/api/tools?${params.toString()}`);
      const data = await res.json();
      setTools(data.tools || []);
    } catch (error) {
      console.error("Failed to fetch tools:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTools();
  };

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">工具市場</h1>
          <p className="text-muted-foreground">發現和分享教學工具</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 space-y-6">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜尋工具..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </form>

            {/* Categories */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                分類
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedCategory === "" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  全部
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedCategory === cat.slug ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    {cat.nameZh}
                    <span className="ml-2 text-xs opacity-70">({cat._count?.tools || 0})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <h3 className="font-semibold mb-3">排序</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 rounded-md border bg-background"
              >
                <option value="popular">最受歡迎</option>
                <option value="latest">最新上載</option>
              </select>
            </div>
          </aside>

          {/* Tools Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center py-12">載入中...</div>
            ) : tools.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                暫時沒有工具
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {tools.map((tool) => (
                  <Link key={tool.id} href={`/tools/${tool.slug}`}>
                    <Card className="h-full hover:shadow-md transition-shadow">
                      <CardContent className="p-5">
                        {/* Thumbnail */}
                        <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center">
                          {tool.thumbnail ? (
                            <img src={tool.thumbnail} alt={tool.titleZh} className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <Wrench className="h-10 w-10 text-muted-foreground" />
                          )}
                        </div>

                        {/* Category Badge */}
                        <Badge variant="secondary" className="mb-2">
                          {tool.category.nameZh}
                        </Badge>

                        {/* Title */}
                        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{tool.titleZh}</h3>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {tool.descZh}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {tool.viewCount}
                            </span>
                            <span className="flex items-center gap-1">
                              <Heart className="h-4 w-4" />
                              {tool._count?.favorites || 0}
                            </span>
                          </div>
                          <span>{tool.author.name}</span>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mt-3">
                          {tool.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="text-xs px-2 py-0.5 bg-muted rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
